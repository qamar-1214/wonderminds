import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingChat from "@/components/FloatingChat";
// import { PerformanceOptimizer } from "@/components/PerformanceOptimizer";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
  preload: true,
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "WonderMinds - Nurturing Young Minds | Early Childhood Education",
  description:
    "Premier early childhood education center offering programs for infants, daycare, preschool, kindergarten, and primary students. Nurturing young minds through innovative learning.",
  keywords:
    "school, education, daycare, preschool, kindergarten, primary, children, learning, WonderMinds",
  authors: [{ name: "WonderMinds" }],
  openGraph: {
    title: "WonderMinds - Nurturing Young Minds | Early Childhood Education",
    description:
      "Premier early childhood education center offering programs for infants, daycare, preschool, kindergarten, and primary students. Nurturing young minds through innovative learning.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />
        <meta name="theme-color" content="#8b5cf6" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
      </head>
      <body
        className={`${poppins.variable} ${inter.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        {/* <PerformanceOptimizer /> */}
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <FloatingChat />
      </body>
    </html>
  );
}
