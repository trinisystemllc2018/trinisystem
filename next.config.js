/** @type {import('next').NextConfig} */
const nextConfig = {
  // Compress responses with gzip/brotli
  compress: true,

  // Strip console.* in production
  compiler: {
    removeConsole: process.env.NODE_ENV === "production" ? { exclude: ["error", "warn"] } : false,
  },

  // SWC minification — faster + smaller than Terser
  swcMinify: true,

  poweredByHeader: false,
  generateEtags: true,
  reactStrictMode: true,

  experimental: {
    // Tree-shake icon and animation libraries
    optimizePackageImports: ["framer-motion", "lucide-react"],
    // Partial Pre-Rendering (PPR) — opt-in per route via `export const experimental_ppr = true`
    // Static shell renders instantly; dynamic islands stream in via Suspense fallbacks.
    // To enable: install `next@canary` then uncomment the line below.
    // ppr: "incremental",
  },

  // Built-in image optimization
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [375, 640, 768, 1024, 1280, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000,
    domains: [],
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-DNS-Prefetch-Control", value: "on" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          // Preconnect hints for faster font loading
          { key: "Link", value: "<https://fonts.gstatic.com>; rel=preconnect; crossorigin" },
        ],
      },
      {
        source: "/_next/static/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/fonts/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/:path*\\.(jpg|jpeg|png|webp|avif|svg|ico)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },

  async redirects() {
    return [
      { source: "/fix", destination: "/printer-support", permanent: true },
      { source: "/support", destination: "/printer-support", permanent: false },
      { source: "/hp-offline", destination: "/hp-printer-offline", permanent: true },
      { source: "/printer-not-printing", destination: "/printer-wont-print", permanent: true },
      { source: "/windows-slow", destination: "/windows-11-slow-fix", permanent: true },
      { source: "/brother", destination: "/brother-printer-repair", permanent: false },
      { source: "/compare", destination: "/comparison", permanent: false },
    ];
  },
};

module.exports = nextConfig;
