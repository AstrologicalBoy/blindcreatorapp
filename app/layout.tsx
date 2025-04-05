import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import TanstackProvider from "@/components/providers/tanstack-provider";
import { AppWrapper } from "./contexts/context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Blind Creator App",
  description: "Application made by Astrological Boy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} overflow-x-hidden min-h-dvh`}>
        <AppWrapper>
          <TanstackProvider>
            {children}
          </TanstackProvider>
        </AppWrapper>
      </body>
    </html>
  );
}
