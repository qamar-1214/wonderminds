import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
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
      </head>
      <body
        className={`${poppins.variable} ${inter.variable} font-sans antialiased`}
      >
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
