import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable static export for Netlify drop deployment
  output: 'export',
  
  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },
  
  // Silence "inferred workspace root" warnings when multiple lockfiles exist.
  turbopack: {
    root: __dirname,
  },
  // Add security headers at the edge/CDN layer where possible.
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "geolocation=(), microphone=(), camera=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
