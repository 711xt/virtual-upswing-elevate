import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useConnect } from "@/components/ConnectDialog";
import ParticlesBackground from "./ParticlesBackground";

export default function Hero() {
  const connect = useConnect();
  return (
    <section id="top" className="relative h-screen w-full overflow-hidden bg-black">
      <ParticlesBackground />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="max-w-5xl font-body text-5xl font-bold leading-[1.05] tracking-normal md:text-7xl lg:text-8xl lg:whitespace-nowrap"
        >
          Bridging Publishers <br className="hidden md:block" />
          with <span className="text-gradient">Global Advertising <br className="hidden lg:block" />Ecosystem</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-8 text-[11px] uppercase tracking-[0.32em] text-white/45"
        >
          Engineering Autonomous Operations
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-6 max-w-2xl text-base text-white/85 md:text-lg"
        >
          Virtual Upswing bridges digital inventory with global advertising demand, driving advertising revenue growth for publishers.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="mt-10 flex items-center gap-6"
        >
          <Button
            type="button"
            onClick={connect.open}
            variant="ghost"
            className="group relative inline-flex h-auto items-center gap-2 rounded-full bg-brand-offwhite px-7 py-3.5 text-sm font-medium text-black transition-all hover:bg-brand-lime hover:text-black hover:shadow-[var(--glow-lime)]"
          >
            Partner with Us
            <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </Button>
          <a href="#services" className="text-sm text-white/60 hover:text-white transition-colors">
            Explore Solutions
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#services"
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center gap-3"
        aria-label="Scroll"
      >
        <span className="block h-10 w-px bg-brand-teal/70 animate-scroll-pulse" />
        <span className="text-[10px] uppercase tracking-[0.4em] text-white/40 animate-scroll-pulse">
          Scroll
        </span>
      </a>

      {/* Hero → next section transition */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-px bg-white/[0.06]" />
    </section>
  );
}
