import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Free Shop Billing - Offline POS', short_name: 'Shop Billing',
    description: 'Offline-first sales, inventory and expenses.',
    start_url: '/', scope: '/', display: 'standalone',
    background_color: '#ffffff', theme_color: '#ffffff',
    icons: [
      { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
    ],
  };
}
