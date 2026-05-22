import { motion } from "framer-motion";

export default function Nav() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:py-6">
        <a href="#top" className="flex items-center gap-2 group">
          <span className="h-2.5 w-2.5 rounded-full bg-brand-teal shadow-[0_0_12px_var(--brand-teal)] group-hover:bg-brand-lime transition-colors" />
          <span className="font-display text-lg font-semibold tracking-tight">
            Virtual Upswing
          </span>
        </a>
        <a
          href="#contact"
          className="rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-medium backdrop-blur-md transition-all hover:border-brand-teal hover:bg-brand-teal/10 hover:shadow-[var(--glow-teal)]"
        >
          Book a Call
        </a>
      </div>
    </motion.header>
  );
}
