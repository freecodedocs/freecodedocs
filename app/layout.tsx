import type { Metadata } from "next";
import ImpactScript from "@/components/ImpactScript";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";

const sans = Inter({ subsets: ["latin"], variable: "--font-sans" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: { default: "FreeCodeDocs — free developer documentation", template: "%s · FreeCodeDocs" },
  description: "A fast, quiet reader for the documentation of hundreds of languages, frameworks and libraries.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body className="font-sans">
        <ImpactScript />
        {children}
        <GoogleAnalytics gaId="G-ZPYQ2T4P2J" />
        <footer className="border-t border-line py-6 text-center text-sm text-muted">© {new Date().getFullYear()} FreeCodeDocs. All rights reserved.</footer>
      </body>
    </html>
  );
}
