import type { Metadata } from 'next';
import './globals.css';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';

export const metadata: Metadata = {
  title: {
    default: 'NAPLAN Tutoring Melbourne | IgniteMind Academy',
    template: '%s | IgniteMind Academy',
  },
  description: 'Expert NAPLAN tutoring for Years 3, 5, 7 & 9 in Melbourne. Personalized learning, certified tutors, 95% improvement rate. Book your free diagnostic today!',
  keywords: 'NAPLAN tutoring, NAPLAN preparation, NAPLAN practice, NAPLAN Melbourne, Year 3 NAPLAN, Year 5 NAPLAN, Year 7 NAPLAN, Year 9 NAPLAN, tutoring Melbourne, exam preparation',
  metadataBase: new URL('https://ignitemindacademy.com'),
  openGraph: {
    title: 'NAPLAN Tutoring Melbourne | IgniteMind Academy',
    description: 'Expert NAPLAN tutoring for Years 3, 5, 7 & 9. Personalized learning, certified tutors, 95% improvement rate.',
    url: 'https://ignitemindacademy.com',
    siteName: 'IgniteMind Academy',
    locale: 'en_AU',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'IgniteMind Academy - NAPLAN Tutoring',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NAPLAN Tutoring Melbourne | IgniteMind Academy',
    description: 'Expert NAPLAN tutoring for Years 3, 5, 7 & 9. Personalized learning, certified tutors, 95% improvement rate.',
    images: ['/og-image.jpg'],
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
  verification: {
    google: 'google-site-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
        <nav className="bg-white shadow-sm border-b border-orange-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <a href="/" className="text-2xl font-bold text-orange-600">
                  IgniteMind Academy
                </a>
              </div>
              <div className="flex items-center space-x-4">
                <a href="/dashboard" className="text-gray-600 hover:text-orange-600 px-3 py-2 rounded-md font-medium">
                  Dashboard
                </a>
                <a href="/admin" className="text-gray-600 hover:text-orange-600 px-3 py-2 rounded-md font-medium">
                  Admin
                </a>
              </div>
            </div>
          </div>
        </nav>
        <main>{children}</main>
        <WhatsAppButton />
      </body>
    </html>
  );
}
