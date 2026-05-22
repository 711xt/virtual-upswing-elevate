import { motion } from "framer-motion";
import TubesBackground from "./TubesBackground";

export default function Hero() {
  return (
    <section id="top" className="relative h-screen w-full overflow-hidden bg-black">
      <TubesBackground />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6 text-xs uppercase tracking-[0.3em] text-brand-lime"
        >
          AI Automation Agency
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="max-w-5xl text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl lg:text-8xl"
        >
          We build the systems <br className="hidden md:block" />
          that <span className="text-gradient">run your business</span>.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 max-w-xl text-base text-white/70 md:text-lg"
        >
          Custom AI workflows that replace the busywork eating your team's day. No retainers. Outcomes only.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-10 flex items-center gap-4"
        >
          <a
            href="#contact"
            className="group relative inline-flex items-center gap-2 rounded-full bg-brand-offwhite px-7 py-3.5 text-sm font-medium text-black transition-all hover:bg-brand-lime hover:shadow-[var(--glow-lime)]"
          >
            Book a Call
            <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </a>
          <a href="#services" className="text-sm text-white/60 hover:text-white transition-colors">
            See what we build
          </a>
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-8 text-[10px] uppercase tracking-[0.25em] text-white/30"
        >
          Click anywhere
        </motion.p>
      </div>
    </section>
  );
}
