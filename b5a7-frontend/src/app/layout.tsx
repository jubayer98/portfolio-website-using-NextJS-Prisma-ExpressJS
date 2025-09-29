export const metadata = {
  title: 'B5A7 Portfolio',
  description: 'Portfolio with Blogs, Projects, Auth (Next + Prisma + Express)',
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
