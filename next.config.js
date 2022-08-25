/** @type {import('next').NextConfig} */

const {
  NEXT_PUBLIC_APP_AUTH_URL,
  NEXT_PUBLIC_MYRIAD_API_URL,
  NEXT_PUBLIC_MYRIAD_API_KEY,
  MYRIAD_RPC_URL,
} = process.env;

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  experimental: {
    styledComponent: true,
  },
  serverRuntimeConfig: {
    myriadAPIKey: NEXT_PUBLIC_MYRIAD_API_KEY,
    myriadAPIURL: NEXT_PUBLIC_MYRIAD_API_URL,
  },
  publicRuntimeConfig: {
    urlRPC: MYRIAD_RPC_URL,
    appAuthURL: NEXT_PUBLIC_APP_AUTH_URL,
  },
  images: {
    domains: ["i.pravatar.cc", "firebasestorage.googleapis.com"],
  },
  webpack(config) {
    // config.module.rules.push({
    //   test: /\.mjs$/,
    //   include: /node_modules/,
    //   type: "javascript/auto",
    // });

    // config.module.rules.push({
    //   test: /\.svg$/,
    //   use: ["@svgr/webpack"],
    // });

    return config;
  },
};

module.exports = nextConfig;
