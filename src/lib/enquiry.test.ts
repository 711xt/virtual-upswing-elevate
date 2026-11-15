import { describe, it, expect } from "vitest";
import { buildRow, isSpam } from "./enquiry.server";

const d = { firstName: "A", lastName: "B", email: "a@b.com", phoneCode: "+91", phone: "98765 43210", company: "C", country: "India", website: "c.com",
  role: "Other", capabilities: ["Header Bidding", "Video Advertising"], message: "Hi", consent: true } as never;

describe("enquiry row", () => {
  it("uses the sheet column order and New status", () => {
    const r = buildRow(d, new Date("2026-01-01T00:00:00Z"));
    expect(r).toEqual(["2026-01-01T00:00:00.000Z","A","B","a@b.com","+91 98765 43210","C","India","c.com","Other","Header Bidding, Video Advertising","Hi","New"]);
  });
  it("flags honeypot and too-fast fills as spam", () => {
    expect(isSpam("x", 0, 10000)).toBe(true);
    expect(isSpam("", 9000, 10000)).toBe(true);
    expect(isSpam("", 0, 10000)).toBe(false);
  });
});
