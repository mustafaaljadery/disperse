const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.jsx',
});

module.exports = withNextra({
  env: {
    REMOTION_AWS_ACCESS_KEY_ID: 'AKIAQB6JFDVFU3HVSP4N',
    REMOTION_AWS_SECRET_ACCESS_KEY:
      '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',
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
  swcMinify: false,
  reactStrictMode: true,
  images: {
    domains: [
      'lh3.googleusercontent.com',
      'i.ytimg.com',
      'storage.googleapis.com',
      'pbs.twimg.com',
      'replicate.delivery',
      'p19-sign.tiktokcdn-us.com',
      'p16-sign.tiktokcdn-us.com',
      'yt3.ggpht.com',
      'media.licdn.com',
      'fbcdn.net',
      'scontent-lax3-2.xx.fbcdn.net',
    ],
  },
  env: {
    ENV: process.env.ENV,
    DEV_ROUTE: process.env.DEV_ROUTE,
    PRODUCTION_ROUTE: process.env.PRODUCTION_ROUTE,
    DATABASE_URL: process.env.DATABASE_URL,
    NEXT_PUBLIC_GA_MEASUREMENT_ID:
      process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
  },
  webpack: (config) => {
    config.resolve = {
      ...config.resolve,
      fallback: {
        fs: false,
        path: false,
        os: false,
        crypto: require.resolve('crypto-browserify'),
      },
    };
    return config;
  },
  async headers() {
    return [
      {
        source: '/(.*?)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'Referrer-Policy',
            value: 'no-referrer-when-downgrade',
          },
        ],
      },
    ];
  },
});
