import { z } from "zod";

export const projectTypeValues = [
  "Architectural photography",
  "Real estate photography",
  "Construction progress",
  "Drone & aerial",
  "Property video & film",
  "Other / not sure",
] as const;

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max, `Please keep this under ${max} characters.`)
    .optional()
    .or(z.literal(""));

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(100),
  email: z.string().trim().email("Please enter a valid email address.").max(200),
  company: optionalText(150),
  projectType: z.enum(projectTypeValues, {
    message: "Please choose a project type.",
  }),
  projectLocation: z
    .string()
    .trim()
    .min(2, "Please enter the project location.")
    .max(200),
  preferredShootDate: z
    .string()
    .trim()
    .refine((value) => !value || /^\d{4}-\d{2}-\d{2}$/.test(value), {
      message: "Please enter a valid date.",
    })
    .optional()
    .or(z.literal("")),
  projectDetails: z
    .string()
    .trim()
    .min(20, "A few more details will help shape the response.")
    .max(4000, "Please keep project details under 4,000 characters."),
  website: z.string().max(0).optional().or(z.literal("")),
  formStartedAt: z.number().int().positive(),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
