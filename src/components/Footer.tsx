import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer id="contact" className="relative overflow-hidden border-t border-white/5 px-6 py-24 md:py-32">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black to-brand-charcoal" />
      <div className="absolute left-1/2 top-0 -z-10 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-brand-teal/10 blur-[120px]" />

      <div className="mx-auto max-w-5xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-semibold leading-tight md:text-6xl lg:text-7xl"
        >
          Stop running on <br />
          <span className="text-gradient">borrowed time.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mx-auto mt-6 max-w-lg text-white/60"
        >
          One call. Thirty minutes. We tell you what's worth automating and what isn't.
        </motion.p>
        <motion.a
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          href="mailto:hello@virtualupswing.com"
          className="mt-10 inline-flex items-center gap-2 rounded-full bg-brand-offwhite px-8 py-4 text-sm font-medium text-black transition-all hover:bg-brand-lime hover:shadow-[var(--glow-lime)]"
        >
          Book a Call <span>→</span>
        </motion.a>
      </div>

      <div className="mx-auto mt-24 flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 md:flex-row">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-brand-teal" />
          <span className="font-display text-sm font-semibold">Virtual Upswing</span>
        </div>
        <p className="text-xs text-white/40">
          © {new Date().getFullYear()} Virtual Upswing. Built to ship.
        </p>
      </div>
    </footer>
  );
}
