import { useReveal } from "@/hooks/use-reveal";

const steps = [
  { n: "01", title: "Discovery", body: "We map your operations and find the loops worth automating." },
  { n: "02", title: "System Design", body: "We architect the workflows, agents, and integrations end-to-end." },
  { n: "03", title: "Deployment", body: "We build, test, and roll it out. You see progress every week." },
  { n: "04", title: "Optimization", body: "We monitor, tune, and improve. The system keeps getting sharper." },
];

export default function HowItWorks() {
  const heading = useReveal<HTMLDivElement>();
  const grid = useReveal<HTMLDivElement>({ threshold: 0.1 });

  return (
    <section id="process" className="relative px-6 py-32 md:py-40">
      <div className="mx-auto max-w-7xl">
        <div
          ref={heading.ref}
          className={`mb-16 max-w-2xl transition-all duration-700 ease-out ${
            heading.visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
          }`}
        >
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-brand-lime">How we work</p>
          <h2 className="text-4xl font-semibold leading-tight md:text-6xl">
            How <span className="text-gradient">we work</span>.
          </h2>
        </div>

        <div ref={grid.ref} className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
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
