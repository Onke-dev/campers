import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header/Header';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'TravelTrucks — Camper rental',
    template: '%s | TravelTrucks',
  },
  description:
    'Find and book a campervan for your next journey with TravelTrucks.',
  keywords: ['camper rental', 'campervan', 'motorhome', 'TravelTrucks'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'TravelTrucks',
    title: 'TravelTrucks — Camper rental',
    description:
      'Find and book a campervan for your next journey with TravelTrucks.',
  },
  twitter: {
    card: 'summary',
    title: 'TravelTrucks — Camper rental',
    description:
      'Find and book a campervan for your next journey with TravelTrucks.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <TanStackProvider>
          <Header />
          <main>{children}</main>
        </TanStackProvider>
      </body>
    </html>
  );
}
