import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'Portfolio | Jubayer Alam',
    template: '%s | Portfolio'
  },
  description: 'Full-stack developer portfolio showcasing modern web applications, technical blogs, and innovative projects built with Next.js, TypeScript, and cutting-edge technologies.',
  keywords: ['portfolio', 'web developer', 'full-stack', 'Next.js', 'TypeScript', 'React', 'Jubayer Alam'],
  authors: [{ name: 'Jubayer Alam' }],
  creator: 'Jubayer Alam',
  publisher: 'Jubayer Alam',
  metadataBase: new URL('https://yourportfolio.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://yourportfolio.com',
    title: 'Portfolio | Jubayer Alam',
    description: 'Full-stack developer portfolio showcasing modern web applications, technical blogs, and innovative projects.',
    siteName: 'Jubayer Alam Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portfolio | Jubayer Alam',
    description: 'Full-stack developer portfolio showcasing modern web applications and technical expertise.',
    creator: '@jubayer98',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      {
        url: '/favicon.svg',
        type: 'image/svg+xml',
      },
    ],
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  manifest: '/site.webmanifest',
};

import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ToasterProvider } from '@/providers/ToasterProvider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900 antialiased">
        <ToasterProvider />
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="container mx-auto w-full max-w-5xl flex-1 p-4 sm:p-6">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
