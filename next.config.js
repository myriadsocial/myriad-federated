/** @type {import('next').NextConfig} */

const {
  NEXT_PUBLIC_APP_AUTH_URL,
  NEXT_PUBLIC_MYRIAD_API_URL,
  NEXT_PUBLIC_MYRIAD_API_KEY,
  NEXT_PUBLIC_MYRIAD_RPC_URL,
} = process.env;

const nextConfig = {
  reactStrictMode: false,
  experimental: {
    styledComponent: true,
  },
  serverRuntimeConfig: {
    myriadAPIURL: NEXT_PUBLIC_MYRIAD_API_URL ?? "http://localhost:3001",
    myriadAPIKey: NEXT_PUBLIC_MYRIAD_API_KEY ?? "s3cr3t",
  },
  publicRuntimeConfig: {
    myriadRPCURL: NEXT_PUBLIC_MYRIAD_RPC_URL ?? "ws://localhost:9944",
    appAuthURL: NEXT_PUBLIC_APP_AUTH_URL ?? "http://localhost:3000",
  },
  images: {
    domains: ["i.pravatar.cc", "firebasestorage.googleapis.com"],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.mjs$/,
      include: /node_modules/,
      type: "javascript/auto",
    });

    return config;
  },
};

module.exports = nextConfig;
