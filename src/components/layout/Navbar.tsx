"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PHONE, PHONE_HREF, DOWNLOAD_URL } from "@/lib/utils";

/* ════════════════════════════════════════════════════════════════════
   WOODEN-PLAQUE NAVBAR — workshop-themed top navigation.

   Renders as a dark wood-grain crossbeam with carved/burnt wooden
   plaques hanging from "ropes" for each menu item. Pure CSS (no
   Three.js) so it loads instantly on every page and stays accessible.

   On the homepage (data-page="home"), the layout's CSS hides this
   so the 3D scene fills the screen unobstructed.
═════════════════════════════════════════════════════════════════════ */

const navLinks = [
  { href: "/",                label: "HOME",        icon: "🏠" },
  { href: "/printer-support", label: "PRINTERS",    icon: "🖨" },
  { href: "/computer-help",   label: "PC HELP",     icon: "💻" },
  { href: "/gps-help",        label: "GPS",         icon: "📍" },
  { href: "/how-to",          label: "GUIDES",      icon: "📖" },
  { href: "/products",        label: "FREE TOOLS",  icon: "⚡" },
  { href: "/contact",         label: "CONTACT",     icon: "📞" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "shadow-2xl" : ""
      }`}
      style={{
        background:
          "linear-gradient(180deg, #2a1810 0%, #3a2218 50%, #1a0f08 100%)",
        borderBottom: "3px solid #1a0f08",
        boxShadow: scrolled
          ? "0 12px 40px -8px rgba(0,0,0,0.7), inset 0 -2px 0 rgba(0,0,0,0.6)"
          : "0 4px 20px rgba(0,0,0,0.5), inset 0 -2px 0 rgba(0,0,0,0.6)",
      }}
    >
      {/* Wood grain overlay (subtle horizontal stripes) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent 0px, transparent 3px, rgba(0,0,0,0.15) 3px, rgba(0,0,0,0.15) 4px)",
        }}
      />
      {/* Wood knot accents */}
      <div
        className="absolute top-1/2 left-[18%] w-3 h-3 rounded-full pointer-events-none opacity-50"
        style={{ background: "radial-gradient(circle, #1a0a05 0%, transparent 70%)" }}
      />
      <div
        className="absolute top-2 right-[22%] w-2 h-2 rounded-full pointer-events-none opacity-40"
        style={{ background: "radial-gradient(circle, #1a0a05 0%, transparent 70%)" }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 md:h-24">
          {/* BRAND */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative">
              <div
                className="text-xl md:text-2xl font-black tracking-tight text-amber-100 leading-none"
                style={{ textShadow: "0 2px 4px rgba(0,0,0,0.6), 0 0 20px rgba(251,191,36,0.2)" }}
              >
                TRINI<span className="text-amber-400">.</span>SYSTEM
              </div>
              <div className="text-[9px] font-mono tracking-[0.2em] text-amber-200/60 mt-0.5">
                THE WORKSHOP
              </div>
            </div>
          </Link>

          {/* DESKTOP NAV — wooden plaques hanging */}
          <nav className="hidden lg:flex items-end gap-1">
            {navLinks.map((link) => {
              const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              return <WoodenPlaque key={link.href} link={link} isActive={isActive} />;
            })}
          </nav>

          {/* RIGHT CTAs */}
          <div className="flex items-center gap-2 md:gap-3">
            <a
              href={DOWNLOAD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-1.5 px-3 py-2 text-xs font-bold tracking-wider rounded-md transition-all hover:scale-105"
              style={{
                background: "linear-gradient(180deg, #5a3818 0%, #3a2218 100%)",
                color: "#fde68a",
                boxShadow: "0 2px 0 #1a0f08, 0 4px 8px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,200,100,0.15)",
                border: "1px solid #1a0f08",
              }}
            >
              ⚡ FREE TOOL
            </a>

            <a
              href={PHONE_HREF}
              className="flex items-center gap-2 px-4 md:px-5 py-2.5 md:py-3 rounded-full font-bold text-sm md:text-base text-stone-900 transition-all hover:scale-105"
              style={{
                background: "linear-gradient(180deg, #fbbf24 0%, #f59e0b 100%)",
                boxShadow:
                  "0 0 25px rgba(251,191,36,0.5), 0 4px 12px rgba(0,0,0,0.4), inset 0 2px 0 rgba(255,255,255,0.4)",
              }}
            >
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="hidden sm:inline">📞 {PHONE}</span>
              <span className="sm:hidden">CALL</span>
            </a>

            {/* Mobile burger */}
            <button
              onClick={() => setMobileOpen((o) => !o)}
              className="lg:hidden w-11 h-11 rounded-md flex items-center justify-center"
              style={{
                background: "linear-gradient(180deg, #5a3818 0%, #3a2218 100%)",
                color: "#fde68a",
                boxShadow: "0 2px 0 #1a0f08, 0 4px 8px rgba(0,0,0,0.4)",
                border: "1px solid #1a0f08",
              }}
              aria-label="Menu"
            >
              {mobileOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {mobileOpen && (
          <div className="lg:hidden pb-4 pt-2 grid grid-cols-2 gap-2">
            {navLinks.map((link) => {
              const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-2 px-3 py-3 rounded-md font-bold text-sm tracking-wider"
                  style={{
                    background: isActive
                      ? "linear-gradient(180deg, #fbbf24 0%, #d97706 100%)"
                      : "linear-gradient(180deg, #6b4423 0%, #3a2218 100%)",
                    color: isActive ? "#1a0f08" : "#fde68a",
                    boxShadow: isActive
                      ? "0 2px 0 #92400e, 0 4px 8px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.3)"
                      : "0 2px 0 #1a0f08, 0 4px 8px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,200,100,0.15)",
                    border: "1px solid #1a0f08",
                  }}
                >
                  <span>{link.icon}</span>
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </header>
  );
}

/* ════════════════════════════════════════════════════════════════════
   WOODEN PLAQUE — single nav item carved/burnt look, hanging from
   a tiny rope. CSS-only 3D depth via box-shadow + gradients.
═════════════════════════════════════════════════════════════════════ */

function WoodenPlaque({
  link,
  isActive,
}: {
  link: { href: string; label: string; icon: string };
  isActive: boolean;
}) {
  return (
    <Link href={link.href} className="group relative block">
      {/* Hanging "rope" / nail */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-3 bg-amber-900/60 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-amber-700 -translate-y-0.5 pointer-events-none"
        style={{ boxShadow: "0 1px 1px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,200,100,0.4)" }}
      />

      {/* THE PLAQUE */}
      <div
        className="relative mt-3 px-3.5 py-2 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:rotate-[-1deg]"
        style={{
          background: isActive
            ? "linear-gradient(180deg, #92400e 0%, #6b2e08 100%)"
            : "linear-gradient(180deg, #6b4423 0%, #4a2e15 100%)",
          color: isActive ? "#fde68a" : "#e9c891",
          boxShadow: [
            "0 3px 0 #1a0a05",                          // bottom edge depth
            "0 6px 12px rgba(0,0,0,0.5)",               // drop shadow
            "inset 0 1px 0 rgba(255,200,100,0.25)",     // top highlight (carved bevel)
            "inset 0 -1px 0 rgba(0,0,0,0.4)",           // bottom shadow inside
            "inset 1px 0 0 rgba(255,200,100,0.1)",      // left highlight
            "inset -1px 0 0 rgba(0,0,0,0.2)",           // right shadow
            isActive ? "0 0 20px rgba(251,191,36,0.4)" : "",
          ].filter(Boolean).join(", "),
          border: "1px solid #1a0a05",
          borderRadius: "4px",
          textShadow: "0 1px 1px rgba(0,0,0,0.7), 0 0 1px rgba(255,150,50,0.3)",
          fontFamily: "'Courier New', monospace",
        }}
      >
        {/* Wood grain overlay on plaque */}
        <div
          className="absolute inset-0 pointer-events-none opacity-25 rounded"
          style={{
            background:
              "repeating-linear-gradient(0deg, transparent 0px, transparent 2px, rgba(0,0,0,0.4) 2px, rgba(0,0,0,0.4) 2.5px)",
          }}
        />
        {/* Tiny screw/nail dots in corners (carved detail) */}
        <div className="absolute top-1 left-1 w-1 h-1 rounded-full bg-black/50 pointer-events-none" />
        <div className="absolute top-1 right-1 w-1 h-1 rounded-full bg-black/50 pointer-events-none" />
        <div className="absolute bottom-1 left-1 w-1 h-1 rounded-full bg-black/50 pointer-events-none" />
        <div className="absolute bottom-1 right-1 w-1 h-1 rounded-full bg-black/50 pointer-events-none" />

        {/* Content */}
        <div className="relative flex items-center gap-1.5">
          <span className="text-xs">{link.icon}</span>
          <span className="text-[11px] font-black tracking-[0.18em]">{link.label}</span>
        </div>
      </div>
    </Link>
  );
}
