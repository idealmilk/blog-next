"use client";

import { Inter } from "next/font/google";

import Header from "@/components/Header";

import "./globals.css";
import { usePosts } from "./store/usePosts";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    usePosts.getState().fetchPosts();
  }, []);

  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="flex max-w-5xl w-full mx-auto min-h-screen flex-col p-14">
          <Header />
          {children}
        </main>
      </body>
    </html>
  );
}
