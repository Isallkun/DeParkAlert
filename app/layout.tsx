'use client';

import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import { Toaster } from "@/components/ui/toaster";

import "./globals.css";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Auto-detect manifest URL based on environment
  const manifestUrl = process.env.NEXT_PUBLIC_MANIFEST_URL || 
    (typeof window !== 'undefined' && window.location.hostname !== 'localhost'
      ? `${window.location.origin}/tonconnect-manifest.json`
      : 'https://ton-connect.github.io/demo-dapp-with-react-ui/tonconnect-manifest.json');

  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        <TonConnectUIProvider manifestUrl={manifestUrl}>
          {children}
          <Toaster />
        </TonConnectUIProvider>
        <Analytics />
      </body>
    </html>
  );
}