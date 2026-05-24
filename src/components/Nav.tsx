import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import logo from "@/assets/logo.png";

const links = [
  { id: "services", label: "Systems We Deploy" },
  { id: "operations", label: "Autonomous Operations" },
  { id: "process", label: "How We Work" },
];

export default function Nav() {
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const ids = [...links.map((l) => l.id), "contact"];
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4"
    >
      <div className="flex w-full max-w-5xl items-center justify-between gap-6 rounded-full border border-white/10 bg-black/50 px-4 py-2.5 backdrop-blur-xl shadow-[0_8px_40px_-12px_rgba(0,0,0,0.6)]">
        <a href="#top" className="flex items-center gap-2.5 pl-2">
          <img src={logo} alt="Virtual Upswing logo" className="h-7 w-7 rounded-full" />
          <span
            className="font-display text-sm text-white whitespace-nowrap"
            style={{ fontWeight: 400, letterSpacing: "0.04em" }}
          >
            Virtual Upswing
          </span>
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className={`relative rounded-full px-3.5 py-1.5 text-[13px] transition-colors ${
                active === l.id
                  ? "text-white"
                  : "text-white/55 hover:text-white"
              }`}
            >
              {active === l.id && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute inset-0 rounded-full bg-white/5 border border-white/10"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative">{l.label}</span>
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="rounded-full bg-brand-teal px-4 py-2 text-[13px] font-medium text-white transition-all hover:bg-brand-teal/90 hover:shadow-[var(--glow-teal)]"
        >
          Book A Call
        </a>
      </div>
    </motion.header>
  );
}
