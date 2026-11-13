import { createServerFn } from "@tanstack/react-start";
import { connectSchema } from "./connect-schema";
import { buildRow, isSpam } from "./enquiry.server";

type Input = { enquiry: unknown; website2?: string; startedAt: number };

export const submitEnquiry = createServerFn({ method: "POST" })
  .inputValidator((d: Input) => d)
  .handler(async ({ data }): Promise<{ ok: boolean }> => {
    const parsed = connectSchema.safeParse(data.enquiry);
    if (!parsed.success) return { ok: false };
    if (isSpam(data.website2, Number(data.startedAt))) return { ok: true }; // quietly drop bots
    const url = process.env["GOOGLE_SHEETS_WEBAPP_URL"];
    const token = process.env["GOOGLE_SHEETS_SHARED_TOKEN"];
    if (!url || !token) { console.error("Enquiry: Google Sheets secrets missing"); return { ok: false }; }
    const row = buildRow(parsed.data);
    const keys = ["submissionDate","firstName","lastName","email","phone","company","country","website","organisationType","capabilities","requirements","leadStatus"];
    const fields = Object.fromEntries(keys.map((k, i) => [k, row[i]]));
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({ token, row, ...fields }),
        redirect: "follow",
        signal: AbortSignal.timeout(15000),
      });
      const text = await res.text();
      if (!res.ok) { console.error(`Enquiry: Sheets failed [${res.status}]: ${text.slice(0, 300)}`); return { ok: false }; }
      let body: { ok?: boolean; success?: boolean } = {};
      try { body = JSON.parse(text); } catch { /* not JSON */ }
      if (body.ok !== true && body.success !== true) { console.error(`Enquiry: Sheets rejected: ${text.slice(0, 300)}`); return { ok: false }; }
      return { ok: true };
    } catch (e) {
      console.error("Enquiry: Sheets request error", e);
      return { ok: false };
    }
  });
