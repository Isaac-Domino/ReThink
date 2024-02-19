/** @type {import('next').NextConfig} */

const webpack = require("webpack");

const nextConfig = {

  webpack: (config) => {
    config.resolve.alias.canvas = false;

    return config;
   },
}

module.exports = nextConfig
