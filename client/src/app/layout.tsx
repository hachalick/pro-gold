import Navbar from "@/layout/Navbar";
import "./globals.css";
import type { Metadata } from "next";
import React from "react";
import localFont from "next/font/local";
import Footer from "@/layout/Footer";
import Main from "@/layout/Main";
import axios from "axios";

const yekan = localFont({
  src: [
    {
      path: "../assets/fonts/woff/YekanBakh-thin.woff",
      weight: "100",
      style: "normal",
    },
    {
      path: "../assets/fonts/woff/YekanBakh-Light.woff",
      weight: "200",
      style: "normal",
    },
    {
      path: "../assets/fonts/woff/YekanBakh-Regular.woff",
      weight: "300",
      style: "normal",
    },
    {
      path: "../assets/fonts/woff/YekanBakh-SemiBold.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/woff/YekanBakh-Bold.woff",
      weight: "500",
      style: "normal",
    },
    {
      path: "../assets/fonts/woff/YekanBakh-ExtraBold.woff",
      weight: "600",
      style: "normal",
    },
    {
      path: "../assets/fonts/woff/YekanBakh-Black.woff",
      weight: "700",
      style: "normal",
    },
    {
      path: "../assets/fonts/woff/YekanBakh-ExtraBlack.woff",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-yekan",
});

export const metadata: Metadata = {
  title: { default: "طلا جلالی", template: "طلا جلالی" },
  description: "application cross-platform gold",
  applicationName: "طلا جلالی",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "طلا جلالی",
  },
  formatDetection: {
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <body className={`${yekan.variable} font-yekan`}>
        <Navbar />
        <Main>{children}</Main>
        <Footer />
      </body>
    </html>
  );
}
