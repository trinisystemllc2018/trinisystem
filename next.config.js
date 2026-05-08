/** @type {import('next').NextConfig} */
const nextConfig = {
  // Performance: compress output
  compress: true,

  experimental: {
    optimizeCss: true,
    optimizePackageImports: [
      "@react-three/fiber",
      "@react-three/drei",
      "@react-three/postprocessing",
      "framer-motion",
      "lucide-react",
      "three",
    ],
  },

  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [375, 640, 768, 1024, 1280, 1920],
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
        ],
      },
      {
        source: "/_next/static/:path*",
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
