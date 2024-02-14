import type { Metadata } from "next";

import "./globals.css";
import { Montserrat } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'

import { dark } from "@clerk/themes"
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner"

const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Twitch Clone",
  description: "Streaming platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={{baseTheme:dark}}>
      <html lang="en">
        <body className={montserrat.className}>
        <ThemeProvider
            attribute="class"
            forcedTheme="dark"
            storageKey="gamehub-theme"
            >
            <Toaster theme="light" position="bottom-center" />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
