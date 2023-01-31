/** @type {import('next').NextConfig} */

const {
  APP_SECRET,
  NEXT_PUBLIC_APP_NAME,
  NEXT_PUBLIC_APP_AUTH_URL,
  NEXT_PUBLIC_MYRIAD_WEBSITE_URL,
  NEXT_PUBLIC_MYRIAD_SUPPORT_MAIL,
  NEXT_PUBLIC_MYRIAD_RPC_URL,
  NEXT_PUBLIC_MYRIAD_APP_URL,
} = process.env;

const nextConfig = {
  compiler: {
    emotion: true,
  },
  images: {
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*',
      },
    ],
  },
  reactStrictMode: true,
  serverRuntimeConfig: {
    appSecret: APP_SECRET ?? 'd98b4af078b46a9984829a72030976e0',
  },
  publicRuntimeConfig: {
    appName: NEXT_PUBLIC_APP_NAME ?? 'Federated Local',
    appAuthURL: NEXT_PUBLIC_APP_AUTH_URL ?? 'http://localhost:3000',
    myriadWebsiteURL: NEXT_PUBLIC_MYRIAD_WEBSITE_URL ?? 'https://myriad.social',
    myriadSupportMail:
      NEXT_PUBLIC_MYRIAD_SUPPORT_MAIL ?? 'support@myriad.social',
    myriadRPCURL: NEXT_PUBLIC_MYRIAD_RPC_URL ?? 'ws://localhost:9944',
    myriadAppURL:
      NEXT_PUBLIC_MYRIAD_APP_URL ?? 'https://app.testnet.myriad.social',
  },
};

module.exports = nextConfig;
