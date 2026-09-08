import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://mubashir1255.github.io/Portfolio";

export const metadata: Metadata = {
  title: "Mubashir | Full Stack, Cloud & AI Developer",
  description: "Explore the portfolio of Mubashir, a Full Stack Developer specializing in Next.js, React, Supabase, Cloud Computing, AI Automation, and Cybersecurity.",
  keywords: [
    "Mubashir",
    "Full Stack Developer",
    "Next.js",
    "React Portfolio",
    "Cloud Computing",
    "AWS",
    "Supabase",
    "Cybersecurity",
    "AI Automation",
    "API Integration",
    "Docker",
    "Vercel",
    "TypeScript",
  ],
  authors: [{ name: "Mubashir" }],
  openGraph: {
    title: "Mubashir | Full Stack, Cloud & AI Developer",
    description: "Personal portfolio showcasing modern web applications, cloud architectures, and AI automations.",
    url: siteUrl,
    siteName: "Mubashir Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mubashir | Full Stack, Cloud & AI Developer",
    description: "Personal portfolio showcasing modern web applications, cloud architectures, and AI automations.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${inter.className} overflow-x-hidden antialiased`}>
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-md focus:bg-blue-600 focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}