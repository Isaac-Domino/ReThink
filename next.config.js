/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.alias.canvas = false;
 
    return config;
   },
   output: 'standalone',
   experimental: {
    serverComponentsExternalPackages: ['sharp', 'onnxruntime-node'],
   },
}

module.exports = nextConfig
