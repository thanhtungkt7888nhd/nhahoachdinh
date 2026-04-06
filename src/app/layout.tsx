import type { Metadata } from "next";
import { Alegreya, Nunito_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const alegreya = Alegreya({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "700"],
  variable: "--font-alegreya",
  display: "swap",
});

const nunito = Nunito_Sans({
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-nunito",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Phạm Thanh Tùng - Nhà Hoạch Định",
  description: "Tư vấn phát triển du lịch nông nghiệp và farmstay tại Việt Nam.",
  keywords: ["farmstay", "du lịch nông nghiệp", "Phạm Thanh Tùng", "tư vấn"],
  openGraph: {
    title: "Phạm Thanh Tùng - Nhà Hoạch Định",
    description: "Định vị Việt Nam trở thành quốc gia du lịch nông nghiệp hàng đầu Đông Nam Á",
    url: "https://phamthanhtung.com.vn",
    siteName: "Phạm Thanh Tùng",
    locale: "vi_VN",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={`${alegreya.variable} ${nunito.variable}`}>
      <body className="font-sans text-charcoal bg-white antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
