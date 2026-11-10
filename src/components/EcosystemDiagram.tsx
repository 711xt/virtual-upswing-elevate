import { useEffect, useRef } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Monitor, Smartphone, AppWindow, Tv, PlaySquare,
  Server, Gavel, Video, Network, Code,
} from "lucide-react";
import logo from "@/assets/vu-logo-circle.png.asset.json";

type Node = { label: string; icon: LucideIcon };
const publishers: Node[] = [
  { label: "Desktop", icon: Monitor },
  { label: "Mobile", icon: Smartphone },
  { label: "In-app", icon: AppWindow },
  { label: "CTV", icon: Tv },
  { label: "OTT", icon: PlaySquare },
];
const platforms: Node[] = [
  { label: "Ad Server", icon: Server },
  { label: "Header Bidding", icon: Gavel },
  { label: "Video", icon: Video },
  { label: "SSPs", icon: Network },
  { label: "Ad Tags", icon: Code },
];
const prices = ["$1.72", "$0.41", "$1.22", "$0.98", "$1.34", "$0.72", "$0.88", "$1.56", "$0.63", "$1.08", "$1.49"];
const tech = ["GAM", "prebid.js", "VAST 4.0", "JS", "ads.txt", "OpenRTB"];

// Desktop geometry (viewBox 1200 x 640)
const W = 1200, H = 640, CX = 600, CY = 320;
const ROWS = [88, 204, 320, 436, 552];
const PUB_X = 200, PLAT_X = 1000;
// floating price positions inside the left panel (x, y, scale)
const pricePos: [number, number, number][] = [
  [64, 40, 1], [338, 70, 0.85], [62, 150, 0.8], [342, 175, 1], [66, 262, 0.9],
  [340, 290, 0.8], [62, 380, 1], [338, 400, 0.9], [66, 495, 0.85], [342, 515, 1], [200, 618, 0.8],
];
const techPos: [number, number][] = [[864, 146], [1140, 146], [864, 378], [1140, 262], [864, 494], [1140, 494]];

const leftPath = (y: number) => `M${PUB_X + 36},${y} C${PUB_X + 200},${y} ${CX - 170},${CY} ${CX - 64},${CY}`;
const rightPath = (y: number) => `M${CX + 64},${CY} C${CX + 170},${CY} ${PLAT_X - 200},${y} ${PLAT_X - 36},${y}`;

const DUR = "8s";

function Bubble({ node, size = 72, cls }: { node: Node; size?: number; cls: string }) {
  const Icon = node.icon;
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={`eco-node ${cls} flex items-center justify-center rounded-full border border-brand-teal/40 bg-black/70 backdrop-blur-md`}
        style={{ width: size, height: size }}
      >
        <Icon className="h-6 w-6 text-brand-offwhite/90" strokeWidth={1.5} />
      </div>
      <span className="whitespace-nowrap text-[11px] uppercase tracking-[0.18em] text-brand-offwhite/80">{node.label}</span>
    </div>
  );
}

function Price({ v, i }: { v: string; i: number }) {
  return (
    <div className="eco-float flex flex-col items-center rounded-full border border-brand-teal/30 bg-brand-charcoal/80 px-3 py-1.5 shadow-[0_0_14px_-4px_rgba(0,130,122,0.6)]"
      style={{ animationDelay: `${-(i * 0.7)}s` }}>
      <span className="font-display text-xs text-brand-offwhite">{v}</span>
      <span className="text-[8px] uppercase tracking-[0.15em] text-white/45">Floor Price</span>
    </div>
  );
}

function Chip({ v, i }: { v: string; i: number }) {
  return (
    <div className="eco-float rounded-full border border-brand-lime/30 bg-brand-charcoal/80 px-3 py-1 font-mono text-[11px] text-brand-offwhite/85 shadow-[0_0_14px_-4px_rgba(94,173,110,0.5)]"
      style={{ animationDelay: `${-(i * 0.9)}s` }}>
      {v}
    </div>
  );
}

function Core({ size }: { size: number }) {
  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <div className="eco-backlight absolute inset-[-30%] rounded-full" />
      <div className="eco-core relative flex h-full w-full items-center justify-center rounded-full border border-brand-teal/50 bg-black">
        <img src={logo.url} alt="Virtual Upswing" className="eco-logo h-[86%] w-[86%] rounded-full object-contain" />
      </div>
    </div>
  );
}

const pct = (v: number, t: number) => `${(v / t) * 100}%`;

export default function EcosystemDiagram() {
  const svgRef = useRef<SVGSVGElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrapRef.current;
    const svg = svgRef.current;
    if (!el || !svg) return;
    const obs = new IntersectionObserver(([e]) => {
      el.dataset.paused = e.isIntersecting ? "false" : "true";
      if (e.isIntersecting) svg.unpauseAnimations?.();
      else svg.pauseAnimations?.();
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={wrapRef} className="eco-root relative w-full">
      <style>{`
        @keyframes eco-float { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-6px) } }
        @keyframes eco-core { 0%,8% { box-shadow: 0 0 30px -10px rgba(0,130,122,.35) } 28%,70% { box-shadow: 0 0 70px -6px rgba(0,130,122,.75), inset 0 0 30px -10px rgba(94,173,110,.4) } 100% { box-shadow: 0 0 30px -10px rgba(0,130,122,.35) } }
        @keyframes eco-backlight { 0%,10% { opacity:.25; transform: scale(.85) } 32%,68% { opacity:.9; transform: scale(1) } 100% { opacity:.25; transform: scale(.85) } }
        @keyframes eco-logo { 0%,10% { filter: brightness(.75) } 30%,70% { filter: brightness(1.15) } 100% { filter: brightness(.75) } }
        @keyframes eco-pub { 0%,4%,94%,100% { box-shadow: 0 0 26px -4px rgba(0,130,122,.7); border-color: rgba(0,130,122,.8) } 18%,82% { box-shadow: 0 0 12px -6px rgba(0,130,122,.4); border-color: rgba(0,130,122,.35) } }
        @keyframes eco-plat { 0%,40%,72%,100% { box-shadow: 0 0 12px -6px rgba(94,173,110,.35); border-color: rgba(0,130,122,.35) } 52%,58% { box-shadow: 0 0 26px -4px rgba(94,173,110,.7); border-color: rgba(94,173,110,.75) } }
        @keyframes eco-dash { to { stroke-dashoffset: -40 } }
        @keyframes eco-vpulse { 0% { top: 0; opacity: 0 } 15% { opacity: 1 } 85% { opacity: 1 } 100% { top: 100%; opacity: 0 } }
        .eco-float { animation: eco-float 6s ease-in-out infinite }
        .eco-core { animation: eco-core ${DUR} ease-in-out infinite }
        .eco-backlight { background: radial-gradient(circle, rgba(94,173,110,.28) 0%, rgba(0,130,122,.22) 40%, transparent 70%); animation: eco-backlight ${DUR} ease-in-out infinite }
        .eco-logo { animation: eco-logo ${DUR} ease-in-out infinite }
        .eco-pub { animation: eco-pub ${DUR} ease-in-out infinite }
        .eco-plat { animation: eco-plat ${DUR} ease-in-out infinite }
        .eco-dash { stroke-dasharray: 2 18; animation: eco-dash 2.4s linear infinite }
        .eco-vline::after { content:""; position:absolute; left:-2px; width:5px; height:5px; border-radius:9999px; background: var(--brand-lime); box-shadow: 0 0 10px var(--brand-teal); animation: eco-vpulse 2.4s ease-in-out infinite }
        .eco-vline.rev::after { animation-direction: reverse; animation-delay: -1.2s }
        .eco-root[data-paused="true"] * { animation-play-state: paused }
        @media (prefers-reduced-motion: reduce) {
          .eco-root * { animation: none !important }
          .eco-pulse { display: none }
          .eco-backlight { opacity: .8 }
          .eco-core { box-shadow: 0 0 60px -8px rgba(0,130,122,.7) }
          .eco-vline::after { display: none }
        }
      `}</style>

      {/* Desktop */}
      <div className="relative mx-auto hidden w-full max-w-6xl lg:block" style={{ aspectRatio: `${W} / ${H}` }}>
        {/* panels */}
        <div className="glass absolute rounded-2xl" style={{ left: 0, top: pct(10, H), width: pct(400, W), height: pct(620, H) }} />
        <div className="glass absolute rounded-2xl" style={{ right: 0, top: pct(10, H), width: pct(400, W), height: pct(620, H) }} />

        <svg ref={svgRef} viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full" aria-hidden="true">
          <defs>
            <radialGradient id="eco-dot"><stop offset="0%" stopColor="#F0F0F0" /><stop offset="40%" stopColor="#5EAD6E" /><stop offset="100%" stopColor="#00827A" stopOpacity="0" /></radialGradient>
          </defs>
          {ROWS.map((y, i) => (
            <g key={`l${i}`}>
              <path id={`eco-l${i}`} d={leftPath(y)} fill="none" stroke="#00827A" strokeOpacity="0.35" strokeWidth="1" />
              <path d={leftPath(y)} fill="none" stroke="#00827A" strokeOpacity="0.7" strokeWidth="1.2" className="eco-dash" />
              {/* inbound pub -> centre (0–25%) and return centre -> pub (75–100%) */}
              {[0, 0.12].map((off) => (
                <circle key={off} r={off ? 2 : 4} fill="url(#eco-dot)" className="eco-pulse">
                  <animateMotion dur={DUR} begin={`${i * 0.12 + off}s`} repeatCount="indefinite" keyPoints="0;1;1;1;0" keyTimes="0;0.25;0.5;0.75;1" calcMode="linear"><mpath href={`#eco-l${i}`} /></animateMotion>
                  <animate attributeName="opacity" dur={DUR} begin={`${i * 0.12 + off}s`} repeatCount="indefinite" values="1;1;0;0;1;1" keyTimes="0;0.24;0.26;0.74;0.76;1" />
                </circle>
              ))}
            </g>
          ))}
          {ROWS.map((y, i) => (
            <g key={`r${i}`}>
              <path id={`eco-r${i}`} d={rightPath(y)} fill="none" stroke="#5EAD6E" strokeOpacity="0.3" strokeWidth="1" />
              <path d={rightPath(y)} fill="none" stroke="#5EAD6E" strokeOpacity="0.6" strokeWidth="1.2" className="eco-dash" />
              {/* outbound centre -> plat (30–52%) and return plat -> centre (55–75%) */}
              {[0, 0.12].map((off) => (
                <circle key={off} r={off ? 2 : 4} fill="url(#eco-dot)" className="eco-pulse">
                  <animateMotion dur={DUR} begin={`${i * 0.12 + off}s`} repeatCount="indefinite" keyPoints="0;0;1;1;0;0" keyTimes="0;0.3;0.52;0.55;0.75;1" calcMode="linear"><mpath href={`#eco-r${i}`} /></animateMotion>
                  <animate attributeName="opacity" dur={DUR} begin={`${i * 0.12 + off}s`} repeatCount="indefinite" values="0;0;1;1;0;0" keyTimes="0;0.29;0.31;0.74;0.76;1" />
                </circle>
              ))}
            </g>
          ))}
        </svg>

        {/* panel titles */}
        <div className="absolute text-center text-[10px] uppercase tracking-[0.3em] text-white/45" style={{ left: 0, width: pct(400, W), top: `calc(${pct(10, H)} - 1.75rem)` }}>Publishers</div>
        <div className="absolute text-center text-[10px] uppercase tracking-[0.3em] text-white/45" style={{ right: 0, width: pct(400, W), top: `calc(${pct(10, H)} - 1.75rem)` }}>Monetising Platforms</div>

        {pricePos.map(([x, y, s], i) => (
          <div key={prices[i]} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: pct(x, W), top: pct(y, H), scale: String(s), opacity: 0.55 + s * 0.4 }}>
            <Price v={prices[i]} i={i} />
          </div>
        ))}
        {techPos.map(([x, y], i) => (
          <div key={tech[i]} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: pct(x, W), top: pct(y, H) }}>
            <Chip v={tech[i]} i={i} />
          </div>
        ))}

        {publishers.map((n, i) => (
          <div key={n.label} className="absolute -translate-x-1/2" style={{ left: pct(PUB_X, W), top: `calc(${pct(ROWS[i], H)} - 32px)` }}>
            <Bubble node={n} size={64} cls="eco-pub" />
          </div>
        ))}
        {platforms.map((n, i) => (
          <div key={n.label} className="absolute -translate-x-1/2" style={{ left: pct(PLAT_X, W), top: `calc(${pct(ROWS[i], H)} - 32px)` }}>
            <Bubble node={n} size={64} cls="eco-plat" />
          </div>
        ))}

        <div className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: "50%", top: pct(CY, H) }}>
          <Core size={128} />
        </div>
        <div className="absolute -translate-x-1/2 text-[9px] uppercase tracking-[0.25em] text-white/30" style={{ left: pct(200, W), bottom: `calc(${pct(10, H)} - 1.5rem)` }}>
          Illustrative values
        </div>
      </div>

      {/* Tablet / mobile */}
      <div className="flex flex-col items-center lg:hidden">
        <div className="glass w-full max-w-xl rounded-2xl p-6">
          <p className="mb-5 text-center text-[10px] uppercase tracking-[0.3em] text-white/45">Publishers</p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-5">
            {publishers.map((n) => <Bubble key={n.label} node={n} size={58} cls="eco-pub" />)}
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {prices.slice(0, 6).map((p, i) => <Price key={p} v={p} i={i} />)}
          </div>
          <p className="mt-3 text-center text-[9px] uppercase tracking-[0.25em] text-white/30">Illustrative values</p>
        </div>
        <div className="flex gap-6">
          <div className="eco-vline relative h-14 w-px bg-brand-teal/50" />
          <div className="eco-vline rev relative h-14 w-px bg-brand-teal/50" />
        </div>
        <Core size={112} />
        <div className="flex gap-6">
          <div className="eco-vline relative h-14 w-px bg-brand-lime/50" />
          <div className="eco-vline rev relative h-14 w-px bg-brand-lime/50" />
        </div>
        <div className="glass w-full max-w-xl rounded-2xl p-6">
          <p className="mb-5 text-center text-[10px] uppercase tracking-[0.3em] text-white/45">Monetising Platforms</p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-5">
            {platforms.map((n) => <Bubble key={n.label} node={n} size={58} cls="eco-plat" />)}
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {tech.map((t, i) => <Chip key={t} v={t} i={i} />)}
          </div>
        </div>
      </div>
    </div>
  );
}
