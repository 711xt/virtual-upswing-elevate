import { motion } from "framer-motion";

const industries = [
  "Real Estate", "Professional Services", "E-Commerce", "Healthcare",
  "Finance", "SaaS", "Legal", "Manufacturing", "Logistics", "Hospitality",
  "Education", "Construction",
];

export default function Industries() {
  const loop = [...industries, ...industries];
  return (
    <section className="relative overflow-hidden border-y border-white/5 bg-brand-charcoal/40 py-16">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-8 text-center"
      >
        <p className="text-xs uppercase tracking-[0.3em] text-white/40">
          Operators we work with
        </p>
      </motion.div>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-black to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-black to-transparent" />
        <div className="flex w-max marquee">
          {loop.map((name, i) => (
            <div key={i} className="flex items-center gap-12 px-6">
              <span className="whitespace-nowrap font-display text-3xl font-light text-white/40 md:text-5xl">
                {name}
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-brand-teal" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
