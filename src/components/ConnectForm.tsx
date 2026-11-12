import { useState, type FormEvent } from "react";
import { Loader2, CheckCircle2, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { CAPABILITIES, ROLES, connectSchema, needsCapabilities, nextCapabilities } from "@/lib/connect-schema";

const COUNTRIES = ["Argentina","Australia","Austria","Bangladesh","Belgium","Brazil","Canada","Chile","China","Colombia","Czech Republic","Denmark","Egypt","Finland","France","Germany","Greece","Hong Kong","Hungary","India","Indonesia","Ireland","Israel","Italy","Japan","Kenya","Malaysia","Mexico","Netherlands","New Zealand","Nigeria","Norway","Pakistan","Philippines","Poland","Portugal","Qatar","Romania","Saudi Arabia","Singapore","South Africa","South Korea","Spain","Sri Lanka","Sweden","Switzerland","Taiwan","Thailand","Turkey","Ukraine","United Arab Emirates","United Kingdom","United States","Vietnam","Other"];

const inputCls = "w-full rounded-xl border border-border bg-secondary/40 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 outline-none transition focus:border-brand-teal focus:ring-1 focus:ring-brand-teal";
const menuCls = "z-[60] border-border bg-[#080808] text-foreground";

type Errors = Record<string, string>;
const ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT as string | undefined;

export default function ConnectForm({ onClose }: { onClose: () => void }) {
  const [v, setV] = useState({ firstName: "", lastName: "", email: "", phone: "", company: "", country: "", website: "", message: "" });
  const [role, setRole] = useState("");
  const [caps, setCaps] = useState<string[]>([]);
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [formError, setFormError] = useState("");

  const set = (k: keyof typeof v) => (e: { target: { value: string } }) => setV({ ...v, [k]: e.target.value });

  async function submit(e: FormEvent) {
    e.preventDefault();
    setFormError("");
    const parsed = connectSchema.safeParse({ ...v, role: role || undefined, capabilities: needsCapabilities(role) ? caps : [], consent });
    if (!parsed.success) {
      const errs: Errors = {};
      parsed.error.issues.forEach((i) => { const k = String(i.path[0]); if (!errs[k]) errs[k] = i.message; });
      setErrors(errs);
      return;
    }
    setErrors({});
    if (!ENDPOINT) { setFormError("Form not connected yet. Submissions can't be sent until the form service is set up."); return; }
    setStatus("sending");
    try {
      const d = parsed.data;
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...d, capabilities: d.capabilities.join(", "), _replyto: d.email, _subject: `New enquiry from ${d.firstName} ${d.lastName}` }),
      });
      if (!res.ok) throw new Error();
      setStatus("done");
    } catch {
      setStatus("idle");
      setFormError("Something went wrong sending your enquiry. Please try again.");
    }
  }

  if (status === "done")
    return (
      <div className="mt-10 flex flex-col items-center py-10 text-center">
        <CheckCircle2 className="h-14 w-14 text-brand-lime" />
        <h3 className="mt-6 font-body text-2xl font-bold">Thank you — we'll be in touch</h3>
        <p className="mt-3 max-w-md text-sm text-muted-foreground">Your enquiry has reached the Virtual Upswing team.</p>
        <Button type="button" variant="ghost" onClick={onClose} className="mt-8 h-auto rounded-full bg-brand-offwhite px-7 py-3 text-sm font-medium text-background hover:bg-brand-lime hover:text-background">Close</Button>
      </div>
    );

  const Err = ({ k }: { k: string }) => (errors[k] ? <p className="mt-1.5 text-xs text-destructive">{errors[k]}</p> : null);
  const field = (k: keyof typeof v, label: string, type = "text", ph = "") => (
    <div>
      <label htmlFor={`c-${k}`} className="mb-1.5 block text-xs text-muted-foreground">{label} *</label>
      <input id={`c-${k}`} type={type} value={v[k]} onChange={set(k)} placeholder={ph} maxLength={255} className={inputCls} aria-invalid={!!errors[k]} />
      <Err k={k} />
    </div>
  );

  return (
    <form onSubmit={submit} noValidate className="mt-8 space-y-8">
      <fieldset>
        <legend className="mb-4 text-xs uppercase tracking-[0.25em] text-brand-teal">Contact details</legend>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {field("firstName", "First Name")}
          {field("lastName", "Last Name")}
          {field("email", "Business Email", "email")}
          {field("phone", "Phone / WhatsApp", "tel")}
          {field("company", "Company Name")}
          <div>
            <label htmlFor="c-country" className="mb-1.5 block text-xs text-muted-foreground">Country *</label>
            <select id="c-country" value={v.country} onChange={set("country")} className={inputCls}>
              <option value="">Select country</option>
              {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            <Err k="country" />
          </div>
          <div className="sm:col-span-2">{field("website", "Company Website", "url", "example.com")}</div>
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-4 text-xs uppercase tracking-[0.25em] text-brand-teal">Organisation</legend>
        <label htmlFor="c-role" className="mb-1.5 block text-xs text-muted-foreground">I represent *</label>
        <Select value={role} onValueChange={(r) => { setRole(r); setCaps(nextCapabilities()); }}>
          <SelectTrigger id="c-role" aria-invalid={!!errors.role} className={`${inputCls} h-auto`}>
            <SelectValue placeholder="Select your organisation type" />
          </SelectTrigger>
          <SelectContent className={menuCls}>
            {ROLES.map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}
          </SelectContent>
        </Select>
        <Err k="role" />
        {needsCapabilities(role) && (
          <div className="mt-6 animate-in fade-in slide-in-from-top-2 duration-300">
            <label htmlFor="c-caps" className="mb-1.5 block text-xs text-muted-foreground">Which solutions or capabilities do you support? *</label>
            <Popover>
              <PopoverTrigger asChild>
                <button id="c-caps" type="button" aria-invalid={!!errors.capabilities} className={`${inputCls} flex items-center justify-between gap-3 text-left`}>
                  {caps.length === 0 ? <span className="text-muted-foreground/70">Select your capabilities</span> : (
                    <span className="flex flex-wrap gap-1.5">
                      {caps.map((c) => <span key={c} className="rounded-full border border-brand-teal/50 bg-brand-teal/15 px-2.5 py-0.5 text-xs">{c}</span>)}
                    </span>
                  )}
                  <ChevronDown className="h-4 w-4 shrink-0 opacity-60" />
                </button>
              </PopoverTrigger>
              <PopoverContent align="start" className={`${menuCls} w-[var(--radix-popover-trigger-width)] p-1`}>
                {CAPABILITIES.map((c) => {
                  const on = caps.includes(c);
                  return (
                    <label key={c} className="flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-secondary/60">
                      <Checkbox checked={on} onCheckedChange={() => setCaps(on ? caps.filter((x) => x !== c) : [...caps, c])} />
                      {c}
                    </label>
                  );
                })}
              </PopoverContent>
            </Popover>
            <Err k="capabilities" />
          </div>
        )}
      </fieldset>

      <fieldset>
        <legend className="mb-4 text-xs uppercase tracking-[0.25em] text-brand-teal">Enquiry</legend>
        <label htmlFor="c-message" className="mb-1.5 block text-xs text-muted-foreground">Tell Us About Your Requirements *</label>
        <textarea id="c-message" rows={5} maxLength={2000} value={v.message} onChange={set("message")} className={inputCls}
          placeholder="Share details about your business, inventory, capabilities or potential partnership." />
        <Err k="message" />
      </fieldset>

      <div>
        <label className="flex cursor-pointer items-start gap-3 text-sm text-muted-foreground">
          <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5 h-4 w-4 accent-[var(--brand-teal)]" />
          I agree to be contacted by Virtual Upswing regarding my enquiry using the contact details provided.
        </label>
        <Err k="consent" />
      </div>

      {formError && <p className="rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-foreground">{formError}</p>}

      <Button type="submit" variant="ghost" disabled={status === "sending"}
        className="h-auto w-full rounded-full bg-brand-offwhite px-7 py-3.5 text-sm font-medium text-background transition-all hover:bg-brand-lime hover:text-background hover:shadow-[var(--glow-lime)] sm:w-auto">
        {status === "sending" ? <><Loader2 className="h-4 w-4 animate-spin" /> Sending…</> : <>Submit Enquiry <span>→</span></>}
      </Button>
    </form>
  );
}
