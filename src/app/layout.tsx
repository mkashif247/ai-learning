import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";

import { Providers } from "@/components/providers";
import { APP_CONFIG } from "@/lib/constants";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(APP_CONFIG.url),
  title: {
    default: `${APP_CONFIG.name} - ${APP_CONFIG.description}`,
    template: `%s | ${APP_CONFIG.name}`,
  },
  description:
    "Generate personalized learning roadmaps with AI. Master new skills, prepare for interviews, and track your progress.",
  keywords: [
    "learning",
    "roadmap",
    "AI",
    "interview prep",
    "coding",
    "education",
    "tech career",
    "programming",
  ],
  authors: [{ name: APP_CONFIG.name }],
  openGraph: {
    title: `${APP_CONFIG.name} - ${APP_CONFIG.description}`,
    description:
      "Generate personalized learning roadmaps with AI. Master new skills, prepare for interviews, and track your progress.",
    type: "website",
    siteName: APP_CONFIG.name,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${APP_CONFIG.name} - ${APP_CONFIG.description}`,
    description:
      "Generate personalized learning roadmaps with AI. Master new skills and prepare for interviews.",
  },
  robots: {
    index: true,
    follow: true,
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
        <Toaster
          position="bottom-right"
          toastOptions={{
            className:
              "!bg-slate-800 !text-slate-100 !border !border-slate-700",
            duration: 4000,
          }}
        />
      </body>
    </html>
  );
}
