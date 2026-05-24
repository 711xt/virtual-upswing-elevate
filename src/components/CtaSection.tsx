import { useReveal } from "@/hooks/use-reveal";

export default function CtaSection() {
  const r = useReveal<HTMLDivElement>({ threshold: 0.2 });
  return (
    <section id="contact" className="relative px-6 py-32 md:py-40">
      <div
        ref={r.ref}
        className={`glass relative mx-auto max-w-5xl overflow-hidden rounded-3xl px-8 py-20 text-center transition-all duration-700 ease-out md:px-16 ${
          r.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-brand-teal/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-brand-lime/15 blur-3xl" />
        <div className="relative">
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-brand-lime">Ready when you are</p>
          <h2 className="mx-auto max-w-3xl text-4xl font-semibold leading-tight md:text-6xl">
            Let's build the system that <span className="text-gradient">runs your business</span>.
          </h2>
          <div className="mt-10">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full bg-brand-offwhite px-7 py-3.5 text-sm font-medium text-black transition-all hover:bg-brand-lime hover:shadow-[var(--glow-lime)]"
            >
              Book A Call <span>→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
