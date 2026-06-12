import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.pexels.com' },
      { protocol: 'https', hostname: 'videos.pexels.com' },
      { protocol: 'https', hostname: 'player.vimeo.com' },
    ],
  },
};

export default withNextIntl(nextConfig);
