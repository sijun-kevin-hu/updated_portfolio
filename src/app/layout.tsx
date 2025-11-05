import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LenisProvider } from "@/components/LenisProvider";
import { IntroProvider } from "@/components/IntroContext";
import { Navbar } from "@/components/Navbar";
import { ScrollProgress } from "@/components/ScrollProgress";
import { baseMetadata } from "@/lib/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = baseMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100`}
      >
        <ThemeProvider>
          <IntroProvider>
            <LenisProvider>
              <ScrollProgress />
              <Navbar />
              {children}
            </LenisProvider>
          </IntroProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
