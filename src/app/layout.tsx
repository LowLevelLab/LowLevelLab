import type { Metadata } from "next";
import { Inter, Space_Grotesk, Space_Mono } from "next/font/google";
import { LenisProvider } from "@/components/lenis-provider";
import { Navbar } from "@/components/navbar";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space-mono",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "LowLevelLabs",
  description: "Low Level Labs - Open Source Systems Programming",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceMono.variable} ${spaceGrotesk.variable} dark antialiased`}
    >
      <body
        className="bg-background text-foreground min-h-screen flex flex-col font-sans"
        suppressHydrationWarning
      >
        <LenisProvider>
          <Navbar />
          <main className="flex-grow flex flex-col pt-16">{children}</main>
        </LenisProvider>
      </body>
    </html>
  );
}
