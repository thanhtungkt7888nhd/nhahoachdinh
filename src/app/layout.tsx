import type { Metadata } from "next";
import { Alegreya, Nunito_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const alegreya = Alegreya({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500"],          // bỏ 700 — ít dùng
  variable: "--font-alegreya",
  display: "swap",
  preload: true,
});

const nunito = Nunito_Sans({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "600", "700"],   // bỏ 300 — ít dùng
  variable: "--font-nunito",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nhahoachdinh.com"),
  title: {
    default: "Phạm Thanh Tùng — Nhà Hoạch Định Farmstay & Du Lịch Nông Nghiệp",
    template: "%s | Phạm Thanh Tùng",
  },
  description:
    "Phạm Thanh Tùng — chuyên gia hoạch định farmstay hàng đầu Việt Nam. Hơn 9 năm tư vấn 50+ dự án farmstay, đào tạo 3.000+ lượt, tác giả bộ sách Farmstay Bền Vững.",
  keywords: [
    "farmstay Việt Nam", "du lịch nông nghiệp", "tư vấn farmstay", "thiết kế farmstay",
    "Phạm Thanh Tùng", "nhà hoạch định farmstay", "DEFARM", "Farmstay Bền Vững",
    "quy hoạch farmstay", "đầu tư farmstay", "homestead", "ecovillage",
    "farmstay bền vững", "du lịch sinh thái", "nông nghiệp sinh thái",
  ],
  authors: [{ name: "Phạm Thanh Tùng", url: "https://nhahoachdinh.com/ve-toi" }],
  creator: "Phạm Thanh Tùng",
  publisher: "Phạm Thanh Tùng",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    title: "Phạm Thanh Tùng — Nhà Hoạch Định Farmstay & Du Lịch Nông Nghiệp",
    description:
      "Hơn 9 năm hoạch định 50+ dự án farmstay trên toàn Việt Nam. Kiến thức thực chiến về thiết kế, quy hoạch và vận hành farmstay bền vững.",
    url: "https://nhahoachdinh.com",
    siteName: "Phạm Thanh Tùng — Nhà Hoạch Định",
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Phạm Thanh Tùng — Nhà Hoạch Định Farmstay",
    description: "Kiến thức thực chiến về farmstay & du lịch nông nghiệp Việt Nam.",
    creator: "@phamthanhtung",
  },
  alternates: { canonical: "https://nhahoachdinh.com" },
};

// JSON-LD Person schema — injected globally for AI crawlers
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Phạm Thanh Tùng",
  url: "https://nhahoachdinh.com",
  jobTitle: "Nhà Hoạch Định Farmstay & Du Lịch Nông Nghiệp",
  description:
    "Chuyên gia hoạch định farmstay hàng đầu Việt Nam với hơn 9 năm kinh nghiệm. Sáng lập DEFARM, MASTERY, Xuyên Việt Farmstay, Farmstay Update. Tác giả bộ sách Farmstay Bền Vững.",
  knowsAbout: [
    "Farmstay", "Du lịch nông nghiệp", "Quy hoạch vùng đất", "Homestead",
    "Ecovillage", "Du lịch sinh thái", "Phát triển nông thôn bền vững",
  ],
  sameAs: [
    "https://www.facebook.com/phamthanhtung.farmstay",
  ],
  worksFor: {
    "@type": "Organization",
    name: "DEFARM",
    url: "https://nhahoachdinh.com",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={`${alegreya.variable} ${nunito.variable}`}>
      <head>
        {/* Preconnect để giảm latency font & third-party */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* DNS prefetch cho các domain có thể dùng */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className="font-sans text-charcoal bg-white antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
