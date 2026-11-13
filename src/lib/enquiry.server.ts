import type { z } from "zod";
import type { connectSchema } from "./connect-schema";

export type Enquiry = z.infer<typeof connectSchema>;

export const MIN_FILL_MS = 3000;

/** Column order in the Google Sheet. */
export function buildRow(d: Enquiry, now: Date = new Date()): string[] {
  return [
    now.toISOString(),
    d.firstName, d.lastName, d.email, d.phone, d.company, d.country, d.website,
    d.role, d.capabilities.join(", "), d.message, "New",
  ];
}

export function isSpam(honeypot: string | undefined, startedAt: number, now = Date.now()): boolean {
  return !!honeypot?.trim() || now - startedAt < MIN_FILL_MS;
}
