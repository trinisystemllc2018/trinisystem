import Link from "next/link";
import { PHONE, PHONE_HREF, DOWNLOAD_URL, SUPPORT_FORM, MAPS_URL, OFFICIAL_SITE } from "@/lib/utils";

const footerSections = [
  {
    title: "Software",
    links: [
      { label: "TriniCleaner — Free Download", href: "/products" },
      { label: "PC Speed Optimizer", href: "/products" },
      { label: "Registry Cleaner Free", href: "/products" },
      { label: "Junk File Remover", href: "/products" },
      { label: "Download Center", href: "/downloads" },
    ],
  },
  {
    title: "Printer Support",
    links: [
      { label: "HP Printer Repair", href: "/services" },
      { label: "HP DeskJet 4155e Setup", href: "/guides" },
      { label: "HP DeskJet 2755e Setup", href: "/guides" },
      { label: "Canon Printer Support", href: "/services" },
      { label: "Epson EcoTank Repair", href: "/services" },
      { label: "Brother Printer Setup", href: "/services" },
    ],
  },
  {
    title: "Tech Services",
    links: [
      { label: "PC & Windows Repair", href: "/services" },
      { label: "Virus Removal", href: "/services" },
      { label: "Antivirus Setup", href: "/services" },
      { label: "Garmin GPS Updates", href: "/services" },
      { label: "Home Office Setup", href: "/services" },
      { label: "Interactive Tools", href: "/tools" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Contact & Book", href: "/contact" },
      { label: "Step-by-Step Guides", href: "/guides" },
      { label: "vs. Geek Squad", href: "/about" },
      { label: "Official Google Site", href: OFFICIAL_SITE, external: true },
      { label: "Service Area Map", href: MAPS_URL, external: true },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-gray-950 text-white">
      {/* CTA Strip */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-900 py-12 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-1">
              Printer broken? PC slow? We fix it today.
            </h2>
            <p className="text-blue-200">24/7 remote support · All brands · No fix, no fee</p>
          </div>
          <div className="flex gap-3 shrink-0 flex-wrap justify-center">
            <a
              href={PHONE_HREF}
              className="bg-white text-blue-700 font-bold px-6 py-3.5 rounded-2xl hover:bg-blue-50 transition-colors shadow-lg"
            >
              📞 {PHONE}
            </a>
            <Link
              href="/contact"
              className="bg-blue-500 hover:bg-blue-400 text-white font-bold px-6 py-3.5 rounded-2xl transition-colors"
            >
              Book Online →
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-black text-sm">
                TS
              </div>
              <span className="font-bold text-lg">Trini System <span className="text-blue-400">LLC</span></span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4 max-w-xs">
              Software tools and expert tech support for everyday people across USA & Canada. Printer repair, free PC optimizer, and more launching soon.
            </p>
            <a href={PHONE_HREF} className="text-xl font-bold text-blue-400 hover:text-blue-300 transition-colors block mb-2">
              📞 {PHONE}
            </a>
            <p className="text-xs text-gray-500">Available 24/7 · Remote & On-Site</p>
            <a
              href={DOWNLOAD_URL}
              className="inline-flex items-center gap-2 mt-4 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors"
            >
              ⬇ Download TriniCleaner — Free
            </a>
          </div>

          {/* Link Columns */}
          {footerSections.map(section => (
            <div key={section.title}>
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">
                {section.title}
              </h3>
              <ul className="space-y-2.5">
                {section.links.map(link => (
                  <li key={link.label}>
                    {"external" in link && link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-gray-400 hover:text-white transition-colors"
                      >
                        {link.label} ↗
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-gray-400 hover:text-white transition-colors"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500 text-center md:text-left">
            © 2025 Trini System LLC. Independent tech support — not affiliated with HP, Canon, Epson, Brother, Best Buy, or Geek Squad.
          </p>
          <div className="flex items-center gap-3">
            {["24/7 Available", "USA & Canada", "All Brands"].map(b => (
              <span key={b} className="text-xs bg-gray-800 text-gray-400 px-3 py-1 rounded-full border border-gray-700">
                {b}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
