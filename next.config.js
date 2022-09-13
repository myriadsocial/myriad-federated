/** @type {import('next').NextConfig} */

const {
  APP_SECRET,
  NEXT_PUBLIC_APP_NAME,
  NEXT_PUBLIC_APP_AUTH_URL,

  NEXT_PUBLIC_APP_BUILD_ID,
  NEXT_PUBLIC_MYRIAD_RPC_URL,
  NEXT_PUBLIC_MYRIAD_WEBSITE_URL,
  NEXT_PUBLIC_MYRIAD_SUPPORT_MAIL,
} = process.env;

const {version} = require('./package.json')

const nextConfig = {
  reactStrictMode: false,
  experimental: {
    styledComponent: true,
  },
  serverRuntimeConfig: {
    appSecret: APP_SECRET ?? 'd98b4af078b46a9984829a72030976e0',
  },
  publicRuntimeConfig: {
    appName: NEXT_PUBLIC_APP_NAME ?? 'Federated Local',
    appAuthURL: NEXT_PUBLIC_APP_AUTH_URL ?? 'http://localhost:3000',
    myriadRPCURL: NEXT_PUBLIC_MYRIAD_RPC_URL ?? 'ws://localhost:9944',
    myriadWebsiteURL: NEXT_PUBLIC_MYRIAD_WEBSITE_URL ?? 'https://myriad.social',
    myriadSupportMail: NEXT_PUBLIC_MYRIAD_SUPPORT_MAIL ?? 'support@myriad.social',
  },
  images: {
    domains: ['i.pravatar.cc', 'firebasestorage.googleapis.com', 'storage.googleapis.com'],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.mjs$/,
      include: /node_modules/,
      type: 'javascript/auto',
    });

    return config;
  },
  generateBuildId: async () => {
    if (NEXT_PUBLIC_APP_BUILD_ID) {
      return NEXT_PUBLIC_APP_BUILD_ID;
    }
      
    return version;
  }
};

module.exports = nextConfig;
