import Link from "next/link";

const PHONE      = "347-953-1531";
const PHONE_HREF = "tel:+13479531531";
const EMAIL      = "trinisystemllc@gmail.com";
const ADDRESS    = "Corona, Queens, NY 11368";
const YEAR       = new Date().getFullYear();

const FOOTER_LINKS = [
  {
    heading: "Printer Repair",
    links: [
      { label: "HP Printer Repair",     href: "/hp-printer-repair" },
      { label: "Canon Printer Repair",  href: "/canon-printer-repair" },
      { label: "Epson Printer Repair",  href: "/epson-printer-repair" },
      { label: "Fix Any Problem",       href: "/fix" },
      { label: "All Services",          href: "/services" },
      { label: "Reparación Impresoras", href: "/reparacion-impresoras" },
    ],
  },
  {
    heading: "Tools & Resources",
    links: [
      { label: "Free Interactive Tools", href: "/tools" },
      { label: "Fix My Problem Now",     href: "/fix" },
      { label: "Step-by-Step Guides",    href: "/guides" },
      { label: "TriniCleaner Download",  href: "/downloads" },
      { label: "Products",               href: "/products" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "Home",           href: "/" },
      { label: "Contact Us",     href: "/contact" },
      { label: "Facebook",       href: "https://www.facebook.com/Trinisystem/",      external: true },
      { label: "YouTube",        href: "https://www.youtube.com/@trinisystemllc",    external: true },
      { label: "Google Reviews", href: "https://share.google/1mtrJVk8Ya0PkjG76",   external: true },
      { label: "Yelp",           href: "https://www.yelp.com/biz/trini-system-new-york", external: true },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-300">
      <div className="bg-blue-700 py-4">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div>
            <p className="text-white font-black text-lg">Need help right now?</p>
            <p className="text-blue-200 text-sm">Technician available · No fix = no fee · All 50 states</p>
          </div>
          <a href={PHONE_HREF} className="flex items-center gap-2 bg-white text-blue-700 font-black text-lg px-7 py-3 rounded-2xl hover:bg-blue-50 transition-colors shrink-0">
            📞 {PHONE}
          </a>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-blue-600 text-white font-black text-sm flex items-center justify-center">TS</div>
              <div>
                <p className="text-white font-black text-sm leading-none">Trini System LLC</p>
                <p className="text-gray-500 text-xs">USA &amp; Canada Support</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Expert remote printer repair &amp; PC support. HP, Canon, Epson, Brother, Garmin GPS. Serving all 50 states since 2016.
            </p>
            <address className="not-italic text-sm text-gray-500 space-y-1">
              <p>📍 {ADDRESS}</p>
              <p><a href={PHONE_HREF} className="hover:text-white transition-colors">📞 {PHONE}</a></p>
              <p><a href={`mailto:${EMAIL}`} className="hover:text-white transition-colors">✉️ {EMAIL}</a></p>
            </address>
            <div className="mt-5 flex items-center gap-1.5">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="text-gray-400 text-xs ml-1">4.9 · 47 reviews</span>
            </div>
          </div>

          {FOOTER_LINKS.map(col => (
            <div key={col.heading}>
              <h3 className="text-white font-black text-sm uppercase tracking-widest mb-4">{col.heading}</h3>
              <ul className="space-y-2.5">
                {col.links.map(link => (
                  <li key={link.href}>
                    {"external" in link && link.external ? (
                      <a href={link.href} target="_blank" rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white text-sm transition-colors flex items-center gap-1.5">
                        {link.label}
                        <svg className="w-3 h-3 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                      </a>
                    ) : (
                      <Link href={link.href} className="text-gray-400 hover:text-white text-sm transition-colors">
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-600">
          <p>© {YEAR} Trini System LLC. All rights reserved. Corona, Queens, NY.</p>
          <div className="flex items-center gap-4">
            <Link href="/services" className="hover:text-gray-400 transition-colors">Services</Link>
            <Link href="/contact"  className="hover:text-gray-400 transition-colors">Contact</Link>
            <Link href="/fix"      className="hover:text-gray-400 transition-colors">Fix My Problem</Link>
            <Link href="/reparacion-impresoras" className="hover:text-gray-400 transition-colors">Español</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
