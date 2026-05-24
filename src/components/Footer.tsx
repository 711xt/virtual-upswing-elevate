import logo from "@/assets/logo.png";
  return (
    <footer id="footer" className="relative bg-black px-6 pb-10 pt-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 h-px w-full bg-white/[0.06]" />
        <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-3">
          <div className="flex items-center gap-3">
            <img src="/src/assets/logo.png" alt="" className="h-8 w-8 rounded-full" />
            <div>
              <div className="font-display text-sm text-white" style={{ letterSpacing: "0.04em" }}>
                Virtual Upswing
              </div>
              <div className="text-[11px] uppercase tracking-[0.25em] text-white/40">
                Engineering Autonomous Operations
              </div>
            </div>
          </div>
          <div className="text-center text-xs text-white/35">
            © 2026 Virtual Upswing. All rights reserved.
          </div>
          <div />
        </div>
      </div>
    </footer>
  );
}
