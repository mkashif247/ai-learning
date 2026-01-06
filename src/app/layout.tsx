import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/providers';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'LearnPath - AI-Powered Learning Roadmaps',
  description:
    'Generate personalized learning roadmaps with AI. Master new skills, prepare for interviews, and track your progress.',
  keywords: ['learning', 'roadmap', 'AI', 'interview prep', 'coding', 'education'],
  authors: [{ name: 'LearnPath' }],
  openGraph: {
    title: 'LearnPath - AI-Powered Learning Roadmaps',
    description:
      'Generate personalized learning roadmaps with AI. Master new skills, prepare for interviews, and track your progress.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
