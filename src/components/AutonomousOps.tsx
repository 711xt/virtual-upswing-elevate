import { useEffect, useState } from "react";
import { useReveal } from "@/hooks/use-reveal";

const flow = [
  "Lead Arrives",
  "AI Qualifies",
  "Response Sent",
  "Assigned Automatically",
  "Appointment Booked",
];

export default function AutonomousOps() {
  const heading = useReveal<HTMLDivElement>();
  const body = useReveal<HTMLDivElement>({ threshold: 0.15 });
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!body.visible) return;
    const id = setInterval(() => setActive((a) => (a + 1) % flow.length), 1600);
    return () => clearInterval(id);
  }, [body.visible]);

  return (
    <section id="operations" className="relative px-6 py-32 md:py-40">
      <div className="mx-auto max-w-7xl">
        <div
          ref={heading.ref}
          className={`mb-16 max-w-3xl transition-all duration-700 ease-out ${
            heading.visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
          }`}
        >
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-brand-lime">
            Autonomous Operations
          </p>
          <h2 className="text-4xl font-semibold leading-tight md:text-6xl">
            Every Lead Enters.{" "}
            <span className="text-gradient">Nothing Falls Through.</span>
          </h2>
        </div>

        <div
          ref={body.ref}
          className={`grid gap-10 md:grid-cols-2 md:gap-16 transition-all duration-700 ease-out ${
            body.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Left: flow */}
          <div className="flex flex-col gap-3">
            {flow.map((step, i) => (
              <div key={step} className="flex flex-col items-start">
                <div
                  className={`glass w-full rounded-xl px-6 py-5 transition-all duration-500 ${
                    active === i
                      ? "border-brand-teal/60 shadow-[var(--glow-teal)]"
                      : ""
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span
                      className={`h-2 w-2 rounded-full transition-all duration-500 ${
                        active === i
                          ? "bg-brand-lime shadow-[0_0_10px_var(--brand-lime)]"
                          : "bg-white/20"
                      }`}
                    />
                    <span className="font-display text-lg text-white/90">
                      {step}
                    </span>
                  </div>
                </div>
                {i < flow.length - 1 && (
                  <div className="ml-7 h-6 w-px bg-gradient-to-b from-brand-teal/60 to-transparent" />
                )}
              </div>
            ))}
            <div className="mt-8">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full bg-brand-teal px-7 py-3.5 text-sm font-medium text-white transition-all hover:bg-brand-teal/90 hover:shadow-[var(--glow-teal)]"
              >
                Book A Call <span>→</span>
              </a>
            </div>
          </div>

          {/* Right: fake SaaS dashboard */}
          <div className="glass relative overflow-hidden rounded-2xl p-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
              </div>
              <span className="font-display text-xs uppercase tracking-[0.25em] text-white/40">
                Operations / Live
              </span>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              {[
                { label: "Leads / 24h", value: "247" },
                { label: "Qualified", value: "189" },
                { label: "Booked", value: "62" },
              ].map((m) => (
                <div
                  key={m.label}
                  className="rounded-lg border border-white/5 bg-black/40 p-3"
                >
                  <div className="text-[10px] uppercase tracking-[0.2em] text-white/40">
                    {m.label}
                  </div>
                  <div className="mt-1 font-display text-2xl text-white">
                    {m.value}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 space-y-2">
              {flow.map((step, i) => (
                <div
                  key={step}
                  className={`flex items-center justify-between rounded-lg border px-4 py-3 transition-all duration-500 ${
                    active === i
                      ? "border-brand-teal/50 bg-brand-teal/5"
                      : "border-white/5 bg-black/20"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`flex h-5 w-5 items-center justify-center rounded-full border text-[10px] transition-all ${
                        active >= i
                          ? "border-brand-lime text-brand-lime"
                          : "border-white/20 text-white/30"
                      }`}
                    >
                      {active > i ? "✓" : i + 1}
                    </span>
                    <span className="text-sm text-white/80">{step}</span>
                  </div>
                  <span
                    className={`text-[10px] uppercase tracking-[0.2em] ${
                      active === i
                        ? "text-brand-lime"
                        : active > i
                        ? "text-white/40"
                        : "text-white/20"
                    }`}
                  >
                    {active === i ? "Running" : active > i ? "Done" : "Queued"}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 h-1 w-full overflow-hidden rounded-full bg-white/5">
              <div
                className="h-full bg-gradient-to-r from-brand-teal to-brand-lime transition-all duration-700"
                style={{ width: `${((active + 1) / flow.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
