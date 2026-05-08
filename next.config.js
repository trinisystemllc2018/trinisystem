/** @type {import('next').NextConfig} */
const nextConfig = {
  // Compress responses with gzip/brotli
  compress: true,

  // Strip `console.*` in production builds (smaller JS, less main-thread work)
  compiler: {
    removeConsole: process.env.NODE_ENV === "production" ? { exclude: ["error", "warn"] } : false,
  },

  // SWC minification (faster + smaller than Terser)
  swcMinify: true,

  // Don't ship a giant powered-by header
  poweredByHeader: false,

  // Generate ETags for static asset caching
  generateEtags: true,

  // React strict mode helps catch hydration issues that hurt performance
  reactStrictMode: true,

  experimental: {
    // Tree-shake icon and animation libraries on a per-icon / per-component basis.
    // Without this, importing a single Lucide icon pulls in 500+.
    optimizePackageImports: [
      "framer-motion",
      "lucide-react",
    ],
  },

  // Built-in image optimization (AVIF/WebP, responsive sizes, long cache)
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
        ],
      },
      {
        // Static assets — cache forever (filenames are content-hashed)
        source: "/_next/static/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        // Self-hosted Next.js fonts — cache forever
        source: "/fonts/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        // Images — long cache
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
    ];
  },
};

module.exports = nextConfig;
