import { z } from "zod";

export const ROLES = [
  "Digital Publisher",
  "App Developer / Owner",
  "Monetisation Partner",
  "Ad Network / Demand Partner",
  "Other",
] as const;

export const CAPABILITIES = [
  "Programmatic Demand",
  "Display Advertising",
  "Video Advertising",
  "Native Advertising",
  "In-App Monetisation",
  "Header Bidding",
  "Ad Serving Technology",
  "Other",
] as const;

export const ROLES_WITH_CAPABILITIES: readonly string[] = [
  "Monetisation Partner",
  "Ad Network / Demand Partner",
  "Other",
];

export const needsCapabilities = (role?: string) => !!role && ROLES_WITH_CAPABILITIES.includes(role);

const req = (label: string, max = 100) =>
  z.string().trim().min(1, { message: `${label} is required` }).max(max, { message: `${label} is too long` });

export const connectSchema = z
  .object({
    firstName: req("First name"),
    lastName: req("Last name"),
    email: req("Business email", 255).email({ message: "Enter a valid email address" }),
    phone: req("Phone / WhatsApp", 30).regex(/^[+\d][\d\s().-]{5,}$/, { message: "Enter a valid phone number" }),
    company: req("Company name", 150),
    country: req("Country"),
    website: req("Company website", 255).regex(/^(https?:\/\/)?([\w-]+\.)+[a-z]{2,}(\/\S*)?$/i, {
      message: "Enter a valid website, e.g. example.com",
    }),
    role: z.enum(ROLES, { errorMap: () => ({ message: "Please select who you represent" }) }),
    capabilities: z.array(z.enum(CAPABILITIES)).default([]),
    message: req("Your requirements", 2000),
    consent: z.literal(true, { errorMap: () => ({ message: "Please agree to be contacted" }) }),
  })
  .superRefine((v, ctx) => {
    if (needsCapabilities(v.role) && v.capabilities.length === 0) {
      ctx.addIssue({ code: "custom", path: ["capabilities"], message: "Select at least one option" });
    }
  });

export type ConnectValues = z.input<typeof connectSchema>;
