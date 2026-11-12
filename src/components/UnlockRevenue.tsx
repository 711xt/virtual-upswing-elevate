import { useEffect, useRef, useState } from "react";
import { Search, Link2, TrendingUp, ChevronDown } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";

const stages = [
  { n: "01", title: "Publisher Audit", body: "Analysis of your website or app, existing ad stack, traffic and monetisation potential.", Icon: Search },
  { n: "02", title: "Partner Integration", body: "Connecting your inventory with suitable monetisation platforms and coordinating seamless integration.", Icon: Link2 },
  { n: "03", title: "Monetisation & Growth", body: "Activating advertising demand, optimising floor prices and formats, and improving revenue performance.", Icon: TrendingUp },
];

export default function UnlockRevenue() {
  const heading = useReveal<HTMLDivElement>();
  const list = useReveal<HTMLDivElement>({ threshold: 0.1 });
  const sectionRef = useRef<HTMLElement | null>(null);
  const [active, setActive] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    if (mq.matches) return;
    let timer: ReturnType<typeof setInterval> | null = null;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !timer) {
        timer = setInterval(() => setActive((a) => (a + 1) % stages.length), 2200);
      } else if (!e.isIntersecting && timer) {
        clearInterval(timer);
        timer = null;
      }
    });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => {
      obs.disconnect();
      if (timer) clearInterval(timer);
    };
  }, []);

  return (
    <section ref={sectionRef} id="revenue" className="relative px-6 md:px-10 xl:px-16 py-32 md:py-40">
      <div className="mx-auto grid max-w-[1600px] gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <div
          ref={heading.ref}
          className={`transition-all duration-700 ease-out lg:border-r lg:border-white/10 lg:pr-12 lg:self-center ${
            heading.visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
          }`}
        >
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-brand-lime">How we work</p>
          <h2 className="font-body text-4xl font-bold leading-tight tracking-normal md:text-6xl">
            Unlock More <span className="text-gradient">Revenue</span>
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-white/70">
            Three simple steps to connect your inventory with the right monetisation opportunities.
          </p>
        </div>

        <div ref={list.ref} className="flex flex-col">
          {stages.map((s, i) => {
            const on = reduced || active === i;
            return (
              <div key={s.n}>
                <div
                  style={{ transitionDelay: list.visible ? `${i * 100}ms` : "0ms" }}
                  className={`transition-all duration-700 ease-out ${
                    list.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  }`}
                >
                  <div
                    className={`glass relative flex items-center gap-4 overflow-hidden rounded-2xl p-5 transition-[border-color,box-shadow] duration-1000 ease-in-out sm:gap-6 sm:p-7 ${
                      on ? "border-brand-teal/50 shadow-[var(--glow-teal)]" : ""
                    }`}
                  >
                    <div
                      className={`pointer-events-none absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-brand-teal/10 to-transparent transition-opacity duration-1000 ${
                        on ? "opacity-100" : "opacity-0"
                      }`}
                    />
                    <div
                      className={`relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border transition-colors duration-1000 sm:h-14 sm:w-14 ${
                        on ? "border-brand-teal/50 bg-brand-teal/15 text-brand-offwhite" : "border-white/10 bg-white/[0.03] text-white/60"
                      }`}
                    >
                      <s.Icon className="h-6 w-6" strokeWidth={1.5} />
                    </div>
                    <div className="relative h-12 w-px shrink-0 bg-white/10" />
                    <div className="relative min-w-0">
                      <span className="font-display text-xs text-brand-teal">{s.n}</span>
                      <h3 className="mt-1 text-xl font-semibold sm:text-2xl">{s.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-white/60">{s.body}</p>
                    </div>
                  </div>
                </div>
                {i < stages.length - 1 && (
                  <div className="flex justify-center py-2">
                    <span
                      className={`flex h-7 w-7 items-center justify-center rounded-full border transition-colors duration-1000 ${
                        !reduced && active === i ? "border-brand-teal/60 text-brand-teal" : "border-white/10 text-white/40"
                      }`}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
