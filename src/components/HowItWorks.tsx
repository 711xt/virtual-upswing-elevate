import { useReveal } from "@/hooks/use-reveal";

const steps = [
  {
    n: "01",
    title: "Audit",
    body: "We sit with your team for a week. Map every workflow. Find the loops worth automating and the ones to leave alone.",
  },
  {
    n: "02",
    title: "Build",
    body: "We design, build, and deploy. Two to six weeks, depending on scope. You see progress every Friday.",
  },
  {
    n: "03",
    title: "Operate",
    body: "We hand it over with documentation and stay on call. You own the system. We own that it works.",
  },
];

export default function HowItWorks() {
  const heading = useReveal<HTMLDivElement>();
  const list = useReveal<HTMLDivElement>({ threshold: 0.1 });

  return (
    <section id="process" className="relative px-6 py-32 md:py-40">
      <div className="mx-auto max-w-6xl">
        <div
          ref={heading.ref}
          className={`mb-20 max-w-2xl transition-all duration-700 ease-out ${
            heading.visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
          }`}
        >
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-brand-lime">Process</p>
          <h2 className="text-4xl font-semibold leading-tight md:text-6xl">How we work.</h2>
        </div>

        <div ref={list.ref} className="relative">
          <div
            className={`absolute left-[15px] top-2 hidden h-[calc(100%-2rem)] w-px bg-gradient-to-b from-brand-teal via-brand-lime to-transparent md:block origin-top transition-transform duration-1000 ease-out ${
              list.visible ? "scale-y-100" : "scale-y-0"
            }`}
          />

          <div className="space-y-16 md:space-y-24">
            {steps.map((s, i) => (
              <div
                key={s.n}
                style={{ transitionDelay: list.visible ? `${i * 200}ms` : "0ms" }}
                className={`grid gap-6 md:grid-cols-[80px_1fr] md:gap-12 transition-all duration-700 ease-out ${
                  list.visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
                }`}
              >
                <div className="relative flex items-start">
                  <div className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border border-brand-teal bg-black">
                    <span className="h-2 w-2 rounded-full bg-brand-teal shadow-[0_0_10px_var(--brand-teal)]" />
                  </div>
                </div>
                <div className="max-w-2xl pb-2">
                  <span className="font-display text-xs text-brand-teal">{s.n}</span>
                  <h3 className="mt-2 text-3xl font-semibold md:text-4xl">{s.title}</h3>
                  <p className="mt-4 text-base leading-relaxed text-white/60">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
