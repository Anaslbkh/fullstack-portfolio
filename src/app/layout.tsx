import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/app/components/Footer";
import Nav from "@/app/components/Nav";
import FloatingSocialBar from "@/app/components/FloatingSocialBar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Anass Lebkhaiti - Frontend Developer",
  description: "Frontend Developer based in El Jadida, Morocco. Specializing in Vue.js, React, and modern web technologies.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <Nav />
        <main className="min-h-max mb-2.5">{children}</main>
        <Footer />
        <FloatingSocialBar />
      </body>
    </html>
  );
}
