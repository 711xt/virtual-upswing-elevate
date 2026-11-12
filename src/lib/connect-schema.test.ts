import { describe, it, expect } from "vitest";
import { connectSchema } from "./connect-schema";

const base = {
  firstName: "A", lastName: "B", email: "a@b.com", phone: "+44 7700 900000",
  company: "Co", country: "India", website: "example.com", message: "Hi", consent: true as const,
};

describe("connect form rules", () => {
  it("publisher needs no capabilities", () => {
    expect(connectSchema.safeParse({ ...base, role: "Digital Publisher", capabilities: [] }).success).toBe(true);
  });
  it("monetisation partner must pick a capability", () => {
    expect(connectSchema.safeParse({ ...base, role: "Monetisation Partner", capabilities: [] }).success).toBe(false);
    expect(connectSchema.safeParse({ ...base, role: "Monetisation Partner", capabilities: ["Header Bidding"] }).success).toBe(true);
  });
  it("consent is required", () => {
    expect(connectSchema.safeParse({ ...base, role: "Other", capabilities: ["Other"], consent: false }).success).toBe(false);
  });
});
