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
    // Partial Pre-Rendering — static shell + dynamic islands (Next 14.x canary)
    // ppr: true,  // Enable on Next 15 upgrade
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
      // Additional redirects for common typos/old paths
      { source: "/support", destination: "/printer-support", permanent: false },
    ];
  },
};

module.exports = nextConfig;
