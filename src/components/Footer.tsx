export default function Footer() {
  return (
    <footer
      id="contact"
      className="relative bg-black border-t border-white/10 px-6 py-12"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="font-display text-lg font-bold text-white">
            Virtual Upswing
          </div>
          <p className="mt-1 text-xs text-white/40">
            Engineering Autonomous Operations
          </p>
        </div>
        <a
          href="mailto:hello@virtualupswing.com"
          className="inline-flex w-fit items-center gap-2 rounded-full bg-brand-teal px-6 py-3 text-sm font-medium text-white transition-all hover:shadow-[var(--glow-teal)] hover:bg-brand-teal/90"
        >
          Book a Call <span>→</span>
        </a>
      </div>
      <div className="mt-10 text-center text-xs text-white/30">
        © 2025 Virtual Upswing. All rights reserved.
      </div>
    </footer>
  );
}
