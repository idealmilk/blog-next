"use client";

import { Inter } from "next/font/google";

import Header from "@/components/header";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="flex max-w-5xl w-full mx-auto min-h-screen flex-col p-14">
          <Header />
          <div className="mt-10">{children}</div>
        </main>
      </body>
    </html>
  );
}
