"use client";
import { useState, useRef } from "react";
import Link from "next/link";

/*
  CSS 3D service cards — no WebGL, no Three.js, near-zero perf cost.
  Uses CSS perspective + rotateX/Y on mousemove for tactile 3D feel.
  Works on mobile with a simpler scale-up.
  Enhanced v2: richer gradients, neon glow borders, better typography.
*/

const SERVICES = [
  {
    icon: "🖨️",
    title: "Printer Repair",
    sub: "All Brands",
    desc: "HP, Canon, Epson & Brother. Offline errors, ink jams, wireless setup — fixed remotely in minutes.",
    href: "/printer-support",
    accent: "#3b82f6",
    bg: "linear-gradient(135deg, #0c1f4a 0%, #1a3a8a 50%, #1d4ed8 100%)",
    glowColor: "rgba(59,130,246,0.6)",
  },
  {
    icon: "💻",
    title: "Computer Help",
    sub: "PC & Laptop",
    desc: "Slow Windows PC, startup errors, driver issues — we optimize remotely so you don't lose your files.",
    href: "/computer-help",
    accent: "#8b5cf6",
    bg: "linear-gradient(135deg, #1e0640 0%, #3b0764 50%, #b91c1c 100%)",
    glowColor: "rgba(139,92,246,0.6)",
  },
  {
    icon: "🛡️",
    title: "Virus Removal",
    sub: "Malware & Pop-ups",
    desc: "Ransomware, fake alerts, browser hijacks — removed safely without wiping your data.",
    href: "/virus-removal",
    accent: "#ef4444",
    bg: "linear-gradient(135deg, #3f0d0d 0%, #7f1d1d 50%, #dc2626 100%)",
    glowColor: "rgba(239,68,68,0.6)",
  },
  {
    icon: "🗺️",
    title: "GPS Help",
    sub: "Garmin & More",
    desc: "Map updates, routing issues, device freezes. Garmin Nuvi, DriveSmart, GPS watch support.",
    href: "/garmin-gps-help",
    accent: "#06b6d4",
    bg: "linear-gradient(135deg, #042030 0%, #0c4a6e 50%, #0369a1 100%)",
    glowColor: "rgba(6,182,212,0.6)",
  },
  {
    icon: "✉️",
    title: "Gmail & Email",
    sub: "Login & Recovery",
    desc: "Locked out? Two-factor issues? We walk you through account recovery step by step.",
    href: "/how-to/gmail-help",
    accent: "#f97316",
    bg: "linear-gradient(135deg, #3d1505 0%, #7c2d12 50%, #c2410c 100%)",
    glowColor: "rgba(249,115,22,0.6)",
  },
  {
    icon: "⚡",
    title: "Free PC Cleaner",
    sub: "TriniCleaner",
    desc: "Our free tool removes junk files, fixes startup slowdowns, and speeds up your PC in one click.",
    href: "/products",
    accent: "#10b981",
    bg: "linear-gradient(135deg, #012015 0%, #064e3b 50%, #059669 100%)",
    glowColor: "rgba(16,185,129,0.6)",
  },
];

function Card3D({ service }: { service: typeof SERVICES[0] }) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [transform, setTransform] = useState("perspective(800px) rotateX(0deg) rotateY(0deg)");
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rotX = (y - 0.5) * -16;
    const rotY = (x - 0.5) * 16;
    setTransform(`perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.05)`);
    setGlowPos({ x: x * 100, y: y * 100 });
  };

  const handleMouseLeave = () => {
    setTransform("perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)");
    setGlowPos({ x: 50, y: 50 });
    setHovered(false);
  };

  return (
    <Link
      ref={cardRef}
      href={service.href}
      className="relative block rounded-2xl p-6 overflow-hidden group"
      style={{
        background: service.bg,
        transform,
        transition: "transform 0.14s ease-out, box-shadow 0.2s ease",
        boxShadow: hovered
          ? `0 20px 60px ${service.glowColor}, 0 0 0 1px rgba(255,255,255,0.12)`
          : `0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.07)`,
        willChange: "transform",
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setHovered(true)}
    >
      {/* Moving glow spotlight */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
        style={{
          background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, rgba(255,255,255,0.14) 0%, transparent 60%)`,
        }}
      />

      {/* Top accent bar */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl"
        style={{ background: `linear-gradient(90deg, transparent, ${service.accent}, transparent)` }}
      />

      {/* Corner shine */}
      <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full opacity-10 pointer-events-none"
        style={{ background: `radial-gradient(circle, white, transparent)` }} />

      {/* Icon */}
      <div
        className="text-4xl mb-3 inline-block transition-transform duration-200 group-hover:scale-110 group-hover:-translate-y-1"
        style={{ filter: `drop-shadow(0 4px 12px ${service.glowColor})` }}
      >
        {service.icon}
      </div>

      {/* Text */}
      <div className="font-black text-white text-xl mb-0.5" style={{ textShadow: "0 1px 10px rgba(0,0,0,0.6)" }}>
        {service.title}
      </div>
      <div className="text-white/50 text-xs font-mono tracking-widest mb-3 uppercase">
        {service.sub}
      </div>
      <p className="text-white/70 text-sm leading-relaxed">
        {service.desc}
      </p>

      {/* CTA arrow */}
      <div className="mt-5 flex items-center gap-1.5 text-sm font-bold transition-colors duration-200"
        style={{ color: service.accent }}>
        <span>Open guide</span>
        <span className="inline-block transition-transform duration-200 group-hover:translate-x-1.5">→</span>
      </div>

      {/* Bottom glow line */}
      <div
        className="absolute bottom-0 left-6 right-6 h-px opacity-30 group-hover:opacity-60 transition-opacity"
        style={{ background: `linear-gradient(90deg, transparent, ${service.accent}, transparent)` }}
      />
    </Link>
  );
}

export function ServiceCards3D() {
  return (
    <section className="py-24 px-4" style={{ background: "linear-gradient(180deg, #060f20 0%, #0d1a30 100%)" }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-6 px-5 py-2.5 rounded-full"
            style={{ background: "rgba(249,115,22,0.1)", border: "1px solid rgba(249,115,22,0.25)" }}>
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-amber-300/80 text-xs font-mono tracking-widest uppercase">Remote Support — All 50 States</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
            What can we fix<br />
            <span style={{ background: "linear-gradient(90deg, #fb923c, #f97316)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              for you today?
            </span>
          </h2>
          <p className="text-white/45 mt-4 text-lg max-w-xl mx-auto">
            Hover any card for a 3D preview. Click to go to the full guide or call us live.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map(s => <Card3D key={s.href} service={s} />)}
        </div>

        {/* Trust strip */}
        <div className="flex flex-wrap justify-center gap-6 mt-16 text-white/30 text-sm font-mono">
          {["⚡ Response < 15 min", "🛡️ No fix = no fee", "🌎 All 50 US states", "⭐ 4.9 / 5 stars", "🔒 Never asks for passwords"].map(b => (
            <span key={b} className="hover:text-white/60 transition-colors cursor-default">{b}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
