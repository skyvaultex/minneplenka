import { Resend } from "resend";
import { contactSchema } from "@/lib/contact-schema";

export const runtime = "edge";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const MAX_BODY_BYTES = 24_000;
const MIN_COMPLETION_MS = 1_500;
const MAX_FORM_AGE_MS = 24 * 60 * 60 * 1000;
const MAX_TRACKED_CLIENTS = 5_000;

type RateRecord = { count: number; resetAt: number };
const rateStore = new Map<string, RateRecord>();

function clientIdentifier(request: Request): string {
  return (
    request.headers.get("cf-connecting-ip") ??
    request.headers.get("x-real-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown"
  );
}

async function anonymizedRateKey(request: Request): Promise<string> {
  const input = new TextEncoder().encode(clientIdentifier(request));
  const digest = await crypto.subtle.digest("SHA-256", input);
  const shortHash = Array.from(new Uint8Array(digest))
    .slice(0, 16)
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
  return `minneplenka:contact:${shortHash}`;
}

function consumeLocalRateLimit(key: string, now: number) {
  if (rateStore.size > MAX_TRACKED_CLIENTS) {
    for (const [entryKey, entry] of rateStore) {
      if (entry.resetAt <= now) rateStore.delete(entryKey);
      if (rateStore.size <= MAX_TRACKED_CLIENTS) break;
    }
  }

  const current = rateStore.get(key);
  if (!current || current.resetAt <= now) {
    const record = { count: 1, resetAt: now + WINDOW_MS };
    rateStore.set(key, record);
    return { allowed: true, remaining: MAX_REQUESTS - 1, resetAt: record.resetAt };
  }

  current.count += 1;
  return {
    allowed: current.count <= MAX_REQUESTS,
    remaining: Math.max(0, MAX_REQUESTS - current.count),
    resetAt: current.resetAt,
  };
}

async function consumeRateLimit(key: string, now: number) {
  const redisUrl = process.env.UPSTASH_REDIS_REST_URL?.replace(/\/+$/, "");
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!redisUrl || !redisToken) return consumeLocalRateLimit(key, now);

  try {
    const response = await fetch(`${redisUrl}/pipeline`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${redisToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify([
        ["INCR", key],
        ["PEXPIRE", key, WINDOW_MS, "NX"],
        ["PTTL", key],
      ]),
      cache: "no-store",
    });

    if (!response.ok) throw new Error("Distributed rate-limit request failed");
    const result = (await response.json()) as Array<{ result?: unknown; error?: string }>;
    const count = Number(result[0]?.result);
    const ttl = Number(result[2]?.result);
    if (!Number.isFinite(count)) throw new Error("Distributed rate-limit response was invalid");

    return {
      allowed: count <= MAX_REQUESTS,
      remaining: Math.max(0, MAX_REQUESTS - count),
      resetAt: now + (Number.isFinite(ttl) && ttl > 0 ? ttl : WINDOW_MS),
    };
  } catch (error) {
    console.error(
      "Distributed rate limiting unavailable; using the bounded local fallback:",
      error instanceof Error ? error.name : "UnknownError",
    );
    return consumeLocalRateLimit(key, now);
  }
}

function json(message: string, status: number, headers?: HeadersInit) {
  return Response.json(
    { message },
    {
      status,
      headers: {
        "Cache-Control": "no-store",
        ...headers,
      },
    },
  );
}

export async function POST(request: Request) {
  const now = Date.now();
  const rate = await consumeRateLimit(await anonymizedRateKey(request), now);
  const rateHeaders = {
    "X-RateLimit-Limit": String(MAX_REQUESTS),
    "X-RateLimit-Remaining": String(rate.remaining),
    "X-RateLimit-Reset": String(Math.ceil(rate.resetAt / 1000)),
  };

  if (!rate.allowed) {
    return json("Too many attempts. Please wait a few minutes and try again.", 429, {
      ...rateHeaders,
      "Retry-After": String(Math.ceil((rate.resetAt - now) / 1000)),
    });
  }

  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > MAX_BODY_BYTES) {
    return json("The inquiry is too large to process.", 413, rateHeaders);
  }

  let raw: unknown;
  try {
    const body = await request.text();
    if (body.length > MAX_BODY_BYTES) return json("The inquiry is too large to process.", 413, rateHeaders);
    raw = JSON.parse(body);
  } catch {
    return json("The inquiry could not be read.", 400, rateHeaders);
  }

  if (
    raw &&
    typeof raw === "object" &&
    "website" in raw &&
    typeof raw.website === "string" &&
    raw.website.length > 0
  ) {
    return json("Thank you. Your project note has been sent.", 200, rateHeaders);
  }

  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    return json("Please review the highlighted fields and try again.", 400, rateHeaders);
  }

  const elapsed = now - parsed.data.formStartedAt;
  if (elapsed < MIN_COMPLETION_MS || elapsed > MAX_FORM_AGE_MS) {
    return json("Thank you. Your project note has been sent.", 200, rateHeaders);
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !from || !to) {
    console.error("Contact delivery is missing required server environment variables.");
    return json(
      "Email delivery is not configured yet. Please try again after the studio email is connected.",
      503,
      rateHeaders,
    );
  }

  const { name, email, company, projectType, projectLocation, preferredShootDate, projectDetails } = parsed.data;
  const cleanSubjectLocation = projectLocation.replace(/[\r\n]+/g, " ").slice(0, 80);
  const text = [
    "New Minneplenka project inquiry",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    `Company: ${company || "Not provided"}`,
    `Project type: ${projectType}`,
    `Project location: ${projectLocation}`,
    `Preferred shoot date: ${preferredShootDate || "Not provided"}`,
    "",
    "Project details:",
    projectDetails,
  ].join("\n");

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: email,
      subject: `${projectType} inquiry — ${cleanSubjectLocation}`,
      text,
    });

    if (error) {
      console.error("Resend rejected the contact email:", error.name);
      return json("The inquiry could not be sent right now. Please try again.", 502, rateHeaders);
    }

    return json("Thank you. Your project note has been sent.", 200, rateHeaders);
  } catch (error) {
    console.error("Contact email delivery failed:", error instanceof Error ? error.name : "UnknownError");
    return json("The inquiry could not be sent right now. Please try again.", 502, rateHeaders);
  }
}
