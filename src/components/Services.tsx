import { useReveal } from "@/hooks/use-reveal";

const services = [
  {
    n: "01",
    title: "Workflow Automation",
    body: "We map the operations choking your team and rebuild them as AI-driven pipelines. CRM, ops, finance — connected and quiet.",
  },
  {
    n: "02",
    title: "Custom AI Agents",
    body: "Purpose-built agents that handle inbound, qualify leads, draft proposals, and route work. Trained on your data, not someone else's.",
  },
  {
    n: "03",
    title: "Systems Integration",
    body: "Your stack, finally talking to itself. We wire your tools into one source of truth and own it end-to-end.",
  },
];

export default function Services() {
  const heading = useReveal<HTMLDivElement>();
  const grid = useReveal<HTMLDivElement>({ threshold: 0.15 });

  return (
    <section id="services" className="relative px-6 py-32 md:py-40">
      <div className="mx-auto max-w-7xl">
        <div
          ref={heading.ref}
          className={`mb-16 max-w-2xl transition-all duration-700 ease-out ${
            heading.visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
          }`}
        >
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-brand-lime">What we do</p>
          <h2 className="text-4xl font-semibold leading-tight md:text-6xl">
            Three things, done <span className="text-gradient">properly</span>.
          </h2>
        </div>

        <div ref={grid.ref} className="grid gap-6 md:grid-cols-3">
          {services.map((s, i) => (
            <div
              key={s.n}
              style={{ transitionDelay: grid.visible ? `${i * 100}ms` : "0ms" }}
              className={`glass glass-hover group relative overflow-hidden rounded-2xl p-8 transition-all duration-700 ease-out ${
                grid.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-brand-teal/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative">
                <span className="font-display text-xs text-brand-teal">{s.n}</span>
                <h3 className="mt-4 text-2xl font-semibold">{s.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-white/60">{s.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
