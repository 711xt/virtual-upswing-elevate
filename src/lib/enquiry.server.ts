import type { z } from "zod";
import type { connectSchema } from "./connect-schema";

export type Enquiry = z.infer<typeof connectSchema>;

export const MIN_FILL_MS = 3000;

/** Column order in the Google Sheet. */
export function buildRow(d: Enquiry, now: Date = new Date()): string[] {
  return [
    now.toISOString(),
    d.firstName, d.lastName, d.email, `${d.phoneCode} ${d.phone}`, d.company, d.country, d.website,
    d.role, d.capabilities.join(", "), d.message, "New",
  ];
}

export function isSpam(honeypot: string | undefined, startedAt: number, now = Date.now()): boolean {
  return !!honeypot?.trim() || now - startedAt < MIN_FILL_MS;
}

const ALIASES: string[][] = [
  ["submissionDate", "Submission Date"],
  ["firstName", "First Name"],
  ["lastName", "Last Name"],
  ["email", "businessEmail", "Business Email"],
  ["phone", "phoneWhatsapp", "phoneWhatsApp", "Phone / WhatsApp"],
  ["company", "companyName", "Company Name"],
  ["country", "Country"],
  ["website", "companyWebsite", "Company Website"],
  ["organisationType", "Organisation Type"],
  ["capabilities", "Capabilities"],
  ["requirements", "Requirements"],
  ["leadStatus", "Lead Status"],
];

/** Named fields for the Apps Script, under every name it might read. */
export function buildFields(row: string[]): Record<string, string> {
  const out: Record<string, string> = {};
  ALIASES.forEach((names, i) => names.forEach((n) => (out[n] = row[i])));
  return out;
}
