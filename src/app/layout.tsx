import type { Metadata, Viewport } from 'next';
import './globals.css';
import './premium.css';

export const metadata: Metadata = {
  title: 'Free Shop Billing | Offline POS',
  description: 'Free, offline-first shop billing, inventory and expenses. Your data stays on this device.',
  applicationName: 'Free Shop Billing',
  appleWebApp: { capable: true, statusBarStyle: 'default', title: 'Shop Billing' },
};
export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#ffffff' };
export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) {
  return <html lang="en"><body>{children}</body></html>;
}
