import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HOẠCH ĐỊNH | Phạm Thanh Tùng Nhà Hoạch Định",
  description:
    "Phần mềm hoạch định đầu tư Farmstay, Du lịch sinh thái, Du lịch nông nghiệp, Du lịch thiên nhiên dành cho chủ Farm, kiến trúc sư và nhà đầu tư.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-stone-50 text-stone-900">
        {children}
      </body>
    </html>
  );
}
