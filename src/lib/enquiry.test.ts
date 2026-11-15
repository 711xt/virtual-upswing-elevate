import { describe, it, expect } from "vitest";
import { buildFields, buildRow, isSpam } from "./enquiry.server";

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
  it("sends the four contact values under the sheet header names", () => {
    const f = buildFields(buildRow(d));
    expect(f["Business Email"]).toBe("a@b.com");
    expect(f["Phone / WhatsApp"]).toBe("+91 98765 43210");
    expect(f["Company Name"]).toBe("C");
    expect(f["Company Website"]).toBe("c.com");
    expect(f.businessEmail).toBe("a@b.com");
  });
});
