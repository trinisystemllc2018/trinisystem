"use client";
import { useState, useRef } from "react";
import Link from "next/link";

/*
  CSS 3D service cards — no WebGL, no Three.js, near-zero perf cost.
  Uses CSS perspective + rotateX/Y on mousemove for tactile 3D feel.
  Works on mobile with a simpler scale-up.
*/

const SERVICES = [
  {
    icon: "🖨️",
    title: "Printer Repair",
    sub: "All Brands",
    desc: "HP, Canon, Epson & Brother. Offline errors, ink jams, wireless setup — fixed remotely in minutes.",
    href: "/printer-support",
    accent: "#3b82f6",
    bg: "linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 100%)",
  },
  {
    icon: "💻",
    title: "Computer Help",
    sub: "PC & Laptop",
    desc: "Slow Windows PC, startup errors, driver issues — we optimize remotely so you don't lose your files.",
    href: "/computer-help",
    accent: "#8b5cf6",
    bg: "linear-gradient(135deg, #3b0764 0%, #6d28d9 100%)",
  },
  {
    icon: "🛡️",
    title: "Virus Removal",
    sub: "Malware & Pop-ups",
    desc: "Ransomware, fake alerts, browser hijacks — removed safely without wiping your data.",
    href: "/virus-removal",
    accent: "#ef4444",
    bg: "linear-gradient(135deg, #7f1d1d 0%, #dc2626 100%)",
  },
  {
    icon: "🗺️",
    title: "GPS Help",
    sub: "Garmin & More",
    desc: "Map updates, routing issues, device freezes. Garmin Nuvi, DriveSmart, GPS watch support.",
    href: "/garmin-gps-help",
    accent: "#0070BB",
    bg: "linear-gradient(135deg, #0c4a6e 0%, #0369a1 100%)",
  },
  {
    icon: "✉️",
    title: "Gmail & Email",
    sub: "Login & Recovery",
    desc: "Locked out? Two-factor issues? We walk you through account recovery step by step.",
    href: "/how-to/gmail-help",
    accent: "#ea4335",
    bg: "linear-gradient(135deg, #7f1d1d 0%, #b91c1c 100%)",
  },
  {
    icon: "⚡",
    title: "Free PC Cleaner",
    sub: "TriniCleaner",
    desc: "Our free tool removes junk files, fixes startup slowdowns, and speeds up your PC in one click.",
    href: "/products",
    accent: "#10b981",
    bg: "linear-gradient(135deg, #064e3b 0%, #059669 100%)",
  },
];

function Card3D({ service }: { service: typeof SERVICES[0] }) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [transform, setTransform] = useState("rotateX(0deg) rotateY(0deg)");
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rotX = (y - 0.5) * -14;
    const rotY = (x - 0.5) * 14;
    setTransform(`perspective(600px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.04)`);
    setGlowPos({ x: x * 100, y: y * 100 });
  };

  const handleMouseLeave = () => {
    setTransform("perspective(600px) rotateX(0deg) rotateY(0deg) scale(1)");
    setGlowPos({ x: 50, y: 50 });
  };

  return (
    <Link
      ref={cardRef}
      href={service.href}
      className="relative block rounded-2xl p-6 overflow-hidden group"
      style={{
        background: service.bg,
        transform,
        transition: "transform 0.12s ease-out, box-shadow 0.2s ease",
        boxShadow: `0 8px 32px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.06)`,
        willChange: "transform",
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Moving glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
        style={{
          background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, rgba(255,255,255,0.12) 0%, transparent 65%)`,
        }}
      />

      {/* Top corner shine */}
      <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full opacity-15 pointer-events-none"
        style={{ background: `radial-gradient(circle, white, transparent)` }} />

      {/* Icon */}
      <div className="text-4xl mb-3" style={{ filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.4))" }}>
        {service.icon}
      </div>

      {/* Text */}
      <div className="font-black text-white text-xl mb-0.5" style={{ textShadow: "0 1px 8px rgba(0,0,0,0.5)" }}>
        {service.title}
      </div>
      <div className="text-white/55 text-xs font-mono tracking-widest mb-3 uppercase">
        {service.sub}
      </div>
      <p className="text-white/75 text-sm leading-relaxed">
        {service.desc}
      </p>

      {/* Arrow */}
      <div className="mt-4 flex items-center gap-1.5 text-white/60 group-hover:text-white transition-colors text-sm font-semibold">
        <span>Open guide</span>
        <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
      </div>

      {/* Bottom edge light */}
      <div
        className="absolute bottom-0 left-4 right-4 h-px opacity-20"
        style={{ background: `linear-gradient(90deg, transparent, ${service.accent}, transparent)` }}
      />
    </Link>
  );
}

export function ServiceCards3D() {
  return (
    <section className="py-20 px-4" style={{ background: "linear-gradient(180deg, #0f172a 0%, #1e293b 100%)" }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-5 py-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-white/60 text-xs font-mono tracking-widest uppercase">Remote Support — All 50 States</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
            What can we fix<br />
            <span style={{ background: "linear-gradient(90deg, #fbbf24, #f59e0b)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              for you today?
            </span>
          </h2>
          <p className="text-white/50 mt-4 text-lg max-w-xl mx-auto">
            Hover any card and click to go to the full guide or call us for live help.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map(s => <Card3D key={s.href} service={s} />)}
        </div>

        {/* Trust strip */}
        <div className="flex flex-wrap justify-center gap-6 mt-14 text-white/30 text-sm font-mono">
          {["⚡ Response < 15 min", "🛡️ No fix = no fee", "🌎 All 50 US states", "⭐ 4.9 / 5 stars", "🔒 Never asks for passwords"].map(b => (
            <span key={b}>{b}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
