import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Taskly",
  description: "Todo application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <NextTopLoader
          color="#3b82f6"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          showSpinner={false}
        />
        {children}
      </body>
    </html>
  );
}

// : Readonly<{
//   children: React.ReactNode;
// }>
