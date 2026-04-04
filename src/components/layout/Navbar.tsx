"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { PHONE, PHONE_HREF } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Home",         href: "/" },
  { label: "TriniCleaner", href: "/products" },
  { label: "Services",     href: "/services" },
  { label: "Tools",        href: "/tools" },
  { label: "Guides",       href: "/guides" },
  { label: "Contact",      href: "/contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-200 ${
        scrolled ? "bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-100" : "bg-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black text-sm shadow-sm">
            TS
          </div>
          <div className="hidden sm:block">
            <span className="font-black text-gray-900 text-base leading-none">
              Trini System <span className="text-blue-600">LLC</span>
            </span>
            <p className="text-xs text-gray-400 leading-none mt-0.5">USA &amp; Canada Support</p>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right side CTAs */}
        <div className="flex items-center gap-2 shrink-0">
          <a
            href={PHONE_HREF}
            className="hidden sm:flex items-center gap-1.5 text-blue-600 font-bold text-sm hover:text-blue-800 transition-colors"
            aria-label={`Call us at ${PHONE}`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            {PHONE}
          </a>
          <Link
            href="/fix"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-4 py-2 rounded-xl transition-colors shadow-sm"
          >
            Get Help Now
          </Link>
          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {open
                ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-4 space-y-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block px-4 py-3 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3 border-t border-gray-100 space-y-2">
            {/* Spanish page link in mobile nav */}
            <Link
              href="/reparacion-impresoras"
              onClick={() => setOpen(false)}
              className="block px-4 py-3 text-sm font-medium text-orange-600 hover:bg-orange-50 rounded-xl transition-colors"
            >
              🇪🇸 Soporte en Español
            </Link>
            <a href={PHONE_HREF}
              className="flex items-center gap-2 px-4 py-3 bg-blue-600 text-white font-bold text-sm rounded-xl">
              📞 {PHONE} — Call Now
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
