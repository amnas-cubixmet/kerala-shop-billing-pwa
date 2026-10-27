import type { Metadata, Viewport } from 'next';
import './globals.css';
import './premium.css';
import './reference-ui.css';

export const metadata: Metadata = {
  title: 'Kerala Shop Billing | Offline Sales',
  description: 'Free, offline-first shop billing, inventory and expenses. Your data stays on this device.',
  applicationName: 'Shop Billing',
  icons: { icon: [{ url: '/favicon.png', sizes: '48x48', type: 'image/png' }, { url: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' }], apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }] },
  appleWebApp: { capable: true, statusBarStyle: 'default', title: 'Shop Billing' },
};
export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#ffffff' };
export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) {
  return <html lang="en"><body>{children}</body></html>;
}
