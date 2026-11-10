import { useReveal } from "@/hooks/use-reveal";
import EcosystemDiagram from "@/components/EcosystemDiagram";

export default function AutonomousOps() {
  const heading = useReveal<HTMLDivElement>();
  const body = useReveal<HTMLDivElement>({ threshold: 0.1 });

  return (
    <section id="operations" className="relative overflow-hidden px-6 py-32 md:py-40">
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
            Connecting the <span className="text-gradient">Ecosystem</span>
          </h2>
        </div>

        <div
          ref={body.ref}
          className={`pt-6 transition-all duration-700 ease-out ${
            body.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <EcosystemDiagram />
          <div className="mt-14 flex justify-center">
            <a
              href="https://calendly.com/noel-virtualupswing/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-brand-teal px-7 py-3.5 text-sm font-medium text-white transition-all hover:bg-brand-teal/90 hover:shadow-[var(--glow-teal)]"
            >
              Book A Call <span>→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
