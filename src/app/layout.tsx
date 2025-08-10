import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "StreakNFit Blog",
    template: "%s | StreakNFit Blog",
  },
  description: "Your ultimate destination for fitness tips, workout routines, and healthy living advice.",
  keywords: ["fitness", "workout", "nutrition", "health", "wellness", "exercise"],
  authors: [{ name: "StreakNFit Team" }],
  creator: "StreakNFit",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://streakn.fit",
    siteName: "StreakNFit Blog",
    title: "StreakNFit Blog - Your Ultimate Fitness Companion",
    description: "Your ultimate destination for fitness tips, workout routines, and healthy living advice.",
  },
  twitter: {
    card: "summary_large_image",
    title: "StreakNFit Blog",
    description: "Your ultimate destination for fitness tips, workout routines, and healthy living advice.",
    creator: "@streakn_fit",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans bg-white text-gray-900 antialiased transition-colors">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
