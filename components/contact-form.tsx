"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  contactSchema,
  projectTypeValues,
  type ContactFormValues,
} from "@/lib/contact-schema";

type SubmissionState =
  | { status: "idle" }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

export function ContactForm() {
  const [submission, setSubmission] = useState<SubmissionState>({ status: "idle" });
  const [initialStart] = useState(() => Date.now());
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      projectLocation: "",
      preferredShootDate: "",
      projectDetails: "",
      website: "",
      formStartedAt: initialStart,
    },
  });

  async function onSubmit(values: ContactFormValues) {
    setSubmission({ status: "idle" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const payload = (await response.json().catch(() => null)) as
        | { message?: string }
        | null;

      if (!response.ok) {
        throw new Error(
          payload?.message ?? "The inquiry could not be sent. Please try again.",
        );
      }

      setSubmission({
        status: "success",
        message: payload?.message ?? "Thank you. Your project note has been sent.",
      });
      reset({
        name: "",
        email: "",
        company: "",
        projectLocation: "",
        preferredShootDate: "",
        projectDetails: "",
        website: "",
        formStartedAt: initialStart,
      });
    } catch (error) {
      setSubmission({
        status: "error",
        message:
          error instanceof Error
            ? error.message
            : "The inquiry could not be sent. Please try again.",
      });
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <input type="hidden" {...register("formStartedAt", { valueAsNumber: true })} />
      <div className="honeypot" aria-hidden="true">
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      <div className="form-grid">
        <Field label="Name" error={errors.name?.message}>
          <input id="name" autoComplete="name" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "name-error" : undefined} {...register("name")} />
        </Field>
        <Field label="Email" error={errors.email?.message}>
          <input id="email" type="email" autoComplete="email" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "email-error" : undefined} {...register("email")} />
        </Field>
        <Field label="Company (optional)" error={errors.company?.message}>
          <input id="company" autoComplete="organization" aria-invalid={Boolean(errors.company)} aria-describedby={errors.company ? "company-error" : undefined} {...register("company")} />
        </Field>
        <Field label="Project type" error={errors.projectType?.message}>
          <select id="projectType" defaultValue="" aria-invalid={Boolean(errors.projectType)} aria-describedby={errors.projectType ? "projectType-error" : undefined} {...register("projectType")}>
            <option value="" disabled>Select a service</option>
            {projectTypeValues.map((value) => <option key={value} value={value}>{value}</option>)}
          </select>
        </Field>
        <Field label="Property / project location" error={errors.projectLocation?.message}>
          <input id="projectLocation" autoComplete="street-address" aria-invalid={Boolean(errors.projectLocation)} aria-describedby={errors.projectLocation ? "projectLocation-error" : undefined} {...register("projectLocation")} />
        </Field>
        <Field label="Preferred shoot date (optional)" error={errors.preferredShootDate?.message}>
          <input id="preferredShootDate" type="date" aria-invalid={Boolean(errors.preferredShootDate)} aria-describedby={errors.preferredShootDate ? "preferredShootDate-error" : undefined} {...register("preferredShootDate")} />
        </Field>
        <Field className="wide" label="Project details" error={errors.projectDetails?.message}>
          <textarea id="projectDetails" aria-invalid={Boolean(errors.projectDetails)} aria-describedby={errors.projectDetails ? "projectDetails-error" : undefined} placeholder="Property type, intended use, approximate scope, timing, and anything else that matters." {...register("projectDetails")} />
        </Field>
      </div>

      <div className="form-footer">
        <div aria-live="polite" aria-atomic="true">
          {submission.status !== "idle" ? (
            <p className={`form-status ${submission.status}`}>{submission.message}</p>
          ) : (
            <p className="form-status">Fields marked by their label are required unless noted.</p>
          )}
        </div>
        <button className="submit-button" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Sending…" : "Send inquiry"}
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  error,
  className = "",
  children,
}: {
  label: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  const id = label.startsWith("Name")
    ? "name"
    : label.startsWith("Email")
      ? "email"
      : label.startsWith("Company")
        ? "company"
        : label.startsWith("Project type")
          ? "projectType"
          : label.startsWith("Property")
            ? "projectLocation"
            : label.startsWith("Preferred")
              ? "preferredShootDate"
              : "projectDetails";

  return (
    <div className={`field ${className}`.trim()}>
      <label htmlFor={id}>{label}</label>
      {children}
      {error ? <p className="field-error" id={`${id}-error`}>{error}</p> : null}
    </div>
  );
}
