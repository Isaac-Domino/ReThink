/** @type {import('next').NextConfig} */

const webpack = require("webpack"); 

const nextConfig = {

  webpack: (config) => {
    config.resolve.alias.canvas = false;
    return config;
   },
   images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.clerk.com',
      },
    ],
  },
}

module.exports = nextConfig
