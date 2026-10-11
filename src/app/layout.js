import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Category from "./components/Category";
import PriceTicker from "./components/PriceTicker";
import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Bazar Dor | বাজার দর",
  description: "Bazar Dor থেকে নিত্যপ্রয়োজনীয় পণ্যের বর্তমান বাজার দর, দাম বৃদ্ধি ও মূল্য পরিবর্তনের তথ্য জানুন।",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="bn"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        
        <Navbar />
        <Suspense fallback={null}>
          <Category />
        </Suspense>
        <PriceTicker />
        <Toaster position="top-center" />
        <main>
          {children}
        </main>
        <Footer/>
      </body>
    </html>
  );
}
