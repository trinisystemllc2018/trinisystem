"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PHONE, PHONE_HREF, DOWNLOAD_URL } from "@/lib/utils";

const navLinks = [
  { href: "/",                label: "HOME",       icon: "🏠" },
  { href: "/printer-support", label: "PRINTERS",   icon: "🖨" },
  { href: "/computer-help",   label: "PC HELP",    icon: "💻" },
  { href: "/gps-help",        label: "GPS",        icon: "📍" },
  { href: "/how-to",          label: "GUIDES",     icon: "📖" },
  { href: "/products",        label: "FREE TOOLS", icon: "⚡" },
  { href: "/contact",         label: "CONTACT",    icon: "📞" },
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
      className={`sticky top-0 z-50 transition-all duration-300${scrolled ? " navbar-scrolled" : ""}`}
      style={{
        background: scrolled
          ? "rgba(0,0,0,0.95)"
          : "#000000",
        borderBottom: scrolled
          ? "1px solid rgba(249,115,22,0.2)"
          : "1px solid rgba(255,255,255,0.06)",
        boxShadow: scrolled
          ? "0 8px 32px -4px rgba(0,0,0,0.6), 0 0 1px rgba(249,115,22,0.1)"
          : "none",
      }}
    >
      {/* Subtle top glow line */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent, rgba(249,115,22,0.4), rgba(59,130,246,0.3), transparent)" }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-18">

          {/* BRAND */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="relative">
              <div
                className="text-xl md:text-2xl font-black tracking-tight leading-none"
                style={{
                  background: "linear-gradient(135deg, #fb923c, #f97316)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                TRINI<span style={{ color: "#60a5fa", WebkitTextFillColor: "#60a5fa" }}>.</span>SYSTEM
              </div>
              <div className="text-[9px] font-mono tracking-[0.25em] mt-0.5"
                style={{ color: "rgba(255,255,255,0.35)" }}>
                TECH SUPPORT USA
              </div>
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold tracking-wider transition-all duration-200 group"
                  style={{
                    color: isActive ? "#fb923c" : "rgba(255,255,255,0.55)",
                    background: isActive ? "rgba(249,115,22,0.1)" : "transparent",
                  }}
                >
                  {/* Hover background */}
                  <span
                    className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    style={{ background: "rgba(255,255,255,0.05)" }}
                    aria-hidden
                  />
                  <span className="relative">{link.icon}</span>
                  <span className="relative">{link.label}</span>
                  {isActive && (
                    <span
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                      style={{ background: "#f97316" }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* RIGHT CTAs */}
          <div className="flex items-center gap-2">
            <a
              href={DOWNLOAD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold tracking-wider transition-all hover:scale-105"
              style={{
                background: "rgba(16,185,129,0.1)",
                border: "1px solid rgba(16,185,129,0.25)",
                color: "#34d399",
              }}
            >
              ⚡ FREE TOOL
            </a>

            <a
              href={PHONE_HREF}
              className="flex items-center gap-2 px-4 md:px-5 py-2.5 rounded-full font-black text-sm text-black transition-all hover:scale-105 active:scale-95"
              style={{
                background: "linear-gradient(135deg, #f97316 0%, #ef4444 100%)",
                boxShadow: "0 0 20px rgba(239,68,68,0.5), 0 4px 12px rgba(0,0,0,0.4)",
              }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
              </span>
              <span className="hidden sm:inline">📞 {PHONE}</span>
              <span className="sm:hidden font-black">CALL</span>
            </a>

            {/* Mobile burger */}
            <button
              onClick={() => setMobileOpen((o) => !o)}
              className="lg:hidden w-10 h-10 rounded-lg flex items-center justify-center text-lg transition-all"
              style={{
                background: mobileOpen ? "rgba(249,115,22,0.2)" : "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: mobileOpen ? "#f97316" : "rgba(255,255,255,0.6)",
              }}
              aria-label="Menu"
            >
              {mobileOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {mobileOpen && (
          <div
            className="lg:hidden pb-4 pt-2 border-t grid grid-cols-2 gap-2"
            style={{ borderColor: "rgba(255,255,255,0.07)" }}
          >
            {navLinks.map((link) => {
              const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-2 px-3 py-3 rounded-xl font-bold text-sm tracking-wider transition-all"
                  style={{
                    background: isActive
                      ? "rgba(249,115,22,0.2)"
                      : "rgba(255,255,255,0.04)",
                    border: isActive
                      ? "1px solid rgba(249,115,22,0.3)"
                      : "1px solid rgba(255,255,255,0.07)",
                    color: isActive ? "#fb923c" : "rgba(255,255,255,0.6)",
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
