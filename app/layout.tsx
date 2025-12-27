// app/layout.tsx
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ReactNode } from "react";

export const metadata = {
  title: "MS Visuals",
  description: "Graphic Designer & Digital Growth Specialist",
  icons: {
    icon: "/favicon.ico",              // main favicon
    apple: "/apple-touch-icon.png",    // iOS devices
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Full favicon support for all devices */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" href="/favicon-32x32.png" sizes="32x32" />
        <link rel="icon" type="image/png" href="/favicon-16x16.png" sizes="16x16" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className="bg-white text-[#0B1F3A]">
        {/* Navbar */}
        <Navbar />

        {/* Page content */}
        <main className="pt-16">{children}</main>

        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}
