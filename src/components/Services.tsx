import { useReveal } from "@/hooks/use-reveal";

const services = [
  {
    title: "Unlock Web Revenue",
    body: "We connect mobile and desktop web publishers with monetisation partners to unlock ad revenue.",
  },
  {
    title: "In-App Advertising",
    body: "Connecting app inventory with advertising demand through our monetisation partners.",
  },
  {
    title: "Publisher Partnerships",
    body: "We partner with digital publishers across categories, markets and platforms.",
  },
  {
    title: "Advertising Ecosystem",
    body: "Bringing technology and advertising demand to our publisher network.",
  },
];

export default function Services() {
  const heading = useReveal<HTMLDivElement>();
  const grid = useReveal<HTMLDivElement>({ threshold: 0.15 });

  return (
    <section id="services" className="relative px-6 md:px-10 xl:px-16 py-32 md:py-40">
      <div className="mx-auto max-w-[1600px]">
        <div
          ref={heading.ref}
          className={`mb-16 max-w-2xl transition-all duration-700 ease-out ${
            heading.visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
          }`}
        >
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-brand-lime">Systems we deploy</p>
          <h2 className="font-body text-4xl font-bold leading-tight tracking-normal md:text-6xl">
            Built for <span className="text-gradient">Publishers</span>
          </h2>
        </div>

        <div ref={grid.ref} className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <div
              key={s.title}
              style={{ transitionDelay: grid.visible ? `${i * 100}ms` : "0ms" }}
              className={`glass glass-hover group relative overflow-hidden rounded-2xl p-8 transition-all duration-700 ease-out ${
                grid.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-brand-teal/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative">
                <h3 className="text-2xl font-semibold">{s.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-white/60">{s.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
