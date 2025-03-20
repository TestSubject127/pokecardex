const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Enable static exports
  trailingSlash: true,
  // Optimize for production
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Disable type checking during build
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
