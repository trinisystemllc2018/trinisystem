"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home, Printer, Monitor, MapPin, BookOpen, Zap, Phone, Menu, X, Download,
} from "lucide-react";
import { PHONE, PHONE_HREF, DOWNLOAD_URL } from "@/lib/utils";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const navLinks = [
  { href: "/",                label: "Home",     Icon: Home },
  { href: "/printer-support", label: "Printers", Icon: Printer },
  { href: "/computer-help",   label: "PC Help",  Icon: Monitor },
  { href: "/gps-help",        label: "GPS",      Icon: MapPin },
  { href: "/how-to",          label: "Guides",   Icon: BookOpen },
  { href: "/products",        label: "Free Tools", Icon: Zap },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 16);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50">
      <div
        className="px-3 sm:px-4 lg:px-6 transition-all duration-300"
        style={{ paddingTop: scrolled ? 8 : 14, paddingBottom: scrolled ? 8 : 14 }}
      >
        <div
          className="nav-shell relative max-w-7xl mx-auto rounded-2xl px-3 sm:px-4 transition-all duration-300"
          style={{ boxShadow: scrolled ? "var(--shadow)" : "none" }}
        >
          <div className="flex items-center justify-between h-14">
            {/* Brand */}
            <Link href="/" className="flex items-center gap-2.5 shrink-0">
              <span
                className="grid place-items-center w-9 h-9 rounded-xl font-black text-sm"
                style={{ background: "linear-gradient(135deg, var(--primary), var(--primary-2))", color: "var(--on-primary)" }}
              >
                TS
              </span>
              <span className="leading-none">
                <span className="block font-black tracking-tight text-[15px] t-text">
                  Trini<span style={{ color: "var(--accent)" }}>·</span>System
                </span>
                <span className="block text-[9px] font-mono tracking-[0.22em] t-faint mt-0.5">
                  TECH SUPPORT USA
                </span>
              </span>
            </Link>

            {/* Center segmented nav */}
            <nav className="hidden lg:flex items-center">
              {navLinks.map(({ href, label, Icon }) => (
                <Link
                  key={href}
                  href={href}
                  data-active={isActive(href)}
                  className="nav-pill flex items-center gap-2 px-3.5 py-2 text-[13px] font-semibold"
                >
                  <Icon size={15} strokeWidth={2.2} />
                  {label}
                </Link>
              ))}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              <ThemeToggle className="hidden sm:inline-flex" />

              <a
                href={DOWNLOAD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden xl:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-colors"
                style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text-muted)" }}
              >
                <Download size={14} /> Free Tool
              </a>

              <a
                href={PHONE_HREF}
                className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2.5 rounded-xl font-black text-sm transition-transform hover:scale-[1.03] active:scale-95"
                style={{ background: "linear-gradient(135deg, var(--primary), var(--primary-2))", color: "var(--on-primary)", boxShadow: "0 6px 20px rgba(239,68,68,0.35)" }}
              >
                <span className="relative flex h-2 w-2" aria-hidden>
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white/80 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
                </span>
                <Phone size={15} className="hidden sm:block" />
                <span className="hidden md:inline">{PHONE}</span>
                <span className="md:hidden">Call</span>
              </a>

              <button
                onClick={() => setOpen((o) => !o)}
                className="lg:hidden grid place-items-center w-10 h-10 rounded-xl transition-colors"
                style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text)" }}
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
              >
                {open ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>

          {/* Mobile sheet */}
          {open && (
            <div className="lg:hidden pb-3 pt-1">
              <div className="grid grid-cols-2 gap-2">
                {navLinks.concat([{ href: "/contact", label: "Contact", Icon: Phone }]).map(({ href, label, Icon }) => (
                  <Link
                    key={href}
                    href={href}
                    data-active={isActive(href)}
                    className="flex items-center gap-2.5 px-3.5 py-3 rounded-xl text-sm font-semibold transition-colors"
                    style={{
                      background: isActive(href) ? "var(--primary-soft)" : "var(--surface)",
                      border: `1px solid ${isActive(href) ? "var(--border-strong)" : "var(--border)"}`,
                      color: isActive(href) ? "var(--primary)" : "var(--text-muted)",
                    }}
                  >
                    <Icon size={16} strokeWidth={2.2} />
                    {label}
                  </Link>
                ))}
              </div>
              <div className="flex items-center justify-between mt-3 px-1">
                <span className="text-xs t-faint font-mono tracking-wider">APPEARANCE</span>
                <ThemeToggle />
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
