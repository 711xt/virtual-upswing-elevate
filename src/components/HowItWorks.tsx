import { Target, BarChart3, MonitorPlay, Activity } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";

const steps = [
  { n: "01", title: "Monetisation Strategies", body: "Tailored approaches to maximise inventory potential.", Icon: Target, tone: "teal" },
  { n: "02", title: "Revenue Optimisation", body: "Smarter strategies to improve yield and eCPMs.", Icon: BarChart3, tone: "lime" },
  { n: "03", title: "Ad Format Recommendations", body: "Identifying formats that complement your inventory.", Icon: MonitorPlay, tone: "teal" },
  { n: "04", title: "Performance Monitoring", body: "Tracking results and identifying growth opportunities.", Icon: Activity, tone: "lime" },
];

export default function HowItWorks() {
  const heading = useReveal<HTMLDivElement>();
  const grid = useReveal<HTMLDivElement>({ threshold: 0.1 });

  return (
    <section id="process" className="relative px-6 py-32 md:py-40">
      <div className="mx-auto max-w-7xl">
        <div
          ref={heading.ref}
          className={`mb-16 max-w-3xl transition-all duration-700 ease-out ${
            heading.visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
          }`}
        >
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-brand-lime">Revenue Growth</p>
          <h2 className="font-body text-4xl font-bold leading-tight tracking-normal md:text-6xl">
            Beyond <span className="text-gradient">Monetisation</span>
          </h2>
          <p className="mt-8 font-display text-2xl font-semibold leading-snug md:text-3xl">
            More Than Connections
            <br />
            <span className="text-gradient">A Partner in Revenue Growth</span>
          </p>
          <p className="mt-6 text-base leading-relaxed text-white/70">
            Virtual Upswing connects digital publishers with established monetisation partners, advertising technology and global programmatic demand. Beyond monetisation, we focus on revenue optimisation, ad format strategy and performance analysis to drive stronger returns from digital inventory.
          </p>
        </div>

        <div ref={grid.ref} className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => {
            const teal = s.tone === "teal";
            return (
              <div
                key={s.n}
                style={{ transitionDelay: grid.visible ? `${i * 100}ms` : "0ms" }}
                className={`transition-all duration-700 ease-out ${
                  grid.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
              >
                <div
                  className={`glass glass-hover group relative h-full overflow-hidden rounded-2xl p-8 shadow-[0_24px_48px_-20px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.06)] transition-[border-color,box-shadow,transform] duration-500 hover:-translate-y-1 ${
                    teal ? "border-brand-teal/25" : "border-brand-lime/20"
                  }`}
                >
                  <div
                    className={`pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent to-transparent ${
                      teal ? "via-brand-teal/60" : "via-brand-lime/50"
                    }`}
                  />
                  <div
                    className={`pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full blur-3xl opacity-40 transition-opacity duration-700 group-hover:opacity-100 ${
                      teal ? "bg-brand-teal/10" : "bg-brand-lime/10"
                    }`}
                  />
                  <div className="relative">
                    <div className="flex items-center justify-between">
                      <span className="font-display text-xs text-brand-teal">{s.n}</span>
                      <div
                        className={`flex h-11 w-11 items-center justify-center rounded-xl border bg-white/[0.03] text-brand-offwhite ${
                          teal ? "border-brand-teal/40" : "border-brand-lime/35"
                        }`}
                      >
                        <s.Icon className="h-5 w-5" strokeWidth={1.5} />
                      </div>
                    </div>
                    <h3 className="mt-6 text-2xl font-semibold">{s.title}</h3>
                    <p className="mt-4 text-sm leading-relaxed text-white/60">{s.body}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
