import type { Metadata, Viewport } from "next";
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
  metadataBase: new URL("https://nhahoachdinh.vn"),
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
  authors: [{ name: "Phạm Thanh Tùng", url: "https://nhahoachdinh.vn/ve-toi" }],
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
    url: "https://nhahoachdinh.vn",
    siteName: "Phạm Thanh Tùng — Nhà Hoạch Định",
    locale: "vi_VN",
    type: "website",
    images: [{ url: "https://nhahoachdinh.vn/og?title=Ph%E1%BA%A1m+Thanh+T%C3%B9ng&subtitle=Nh%C3%A0+Ho%E1%BA%A1ch+%C4%90%E1%BB%8Bnh+Farmstay", width: 1200, height: 630, alt: "Phạm Thanh Tùng — Nhà Hoạch Định Farmstay" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Phạm Thanh Tùng — Nhà Hoạch Định Farmstay",
    description: "Kiến thức thực chiến về farmstay & du lịch nông nghiệp Việt Nam.",
    creator: "@phamthanhtung",
  },
  alternates: { canonical: "https://nhahoachdinh.vn" },
  verification: {
    google: "B_34in_wOVkiYJqKRkqcSyP6PEroYb7DBx9pnlvVgAc",
    other: {
      "msvalidate.01": "PENDING",
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#0A1208",
  width: "device-width",
  initialScale: 1,
};

// JSON-LD Person schema — injected globally for AI crawlers & Google Knowledge Panel
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Phạm Thanh Tùng",
  alternateName: ["Tùng Nhà Hoạch Định", "KTS Phạm Thanh Tùng"],
  url: "https://nhahoachdinh.vn",
  image: "https://nhahoachdinh.vn/images/portrait-main.jpg",
  jobTitle: "Nhà Hoạch Định Farmstay & Du Lịch Nông Nghiệp",
  description:
    "Chuyên gia hoạch định farmstay hàng đầu Việt Nam với hơn 9 năm kinh nghiệm. Tư vấn 50+ dự án, 3.000+ hecta, đào tạo 3.000+ lượt. Sáng lập DEFARM, Xuyên Việt Farmstay, Farmstay Update. Tác giả bộ sách Farmstay Bền Vững.",
  telephone: "+84935396705",
  email: "nhahoachdinh.ptt@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Đà Nẵng",
    addressCountry: "VN",
    streetAddress: "79 Ngô Mây, Cẩm Lệ",
  },
  knowsAbout: [
    "Farmstay Việt Nam",
    "Du lịch nông nghiệp",
    "Quy hoạch vùng đất nông nghiệp",
    "Thiết kế farmstay bền vững",
    "Homestead",
    "Ecovillage",
    "Du lịch sinh thái",
    "Phát triển nông thôn bền vững",
    "Tư vấn đầu tư farmstay",
    "Xuyên Việt Farmstay",
  ],
  sameAs: [
    "https://www.facebook.com/PhamThanhTung.NhaHoachDinh",
    "https://www.youtube.com/channel/UCH-5OgcU08KAKHgFgJTaRcg",
    "https://www.pinterest.com/tungkientruc",
    "https://twitter.com/tungkientruc",
    "https://phamthanhtung.com.vn",
  ],
  worksFor: {
    "@type": "Organization",
    name: "DEFARM",
    url: "https://nhahoachdinh.vn",
  },
  founder: [
    { "@type": "Organization", name: "DEFARM" },
    { "@type": "Event", name: "Xuyên Việt Farmstay" },
    { "@type": "Event", name: "Farmstay Update" },
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Phạm Thanh Tùng — Nhà Hoạch Định",
  url: "https://nhahoachdinh.vn",
  description: "Hướng dẫn xây dựng và vận hành farmstay bền vững tại Việt Nam",
  inLanguage: "vi-VN",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://nhahoachdinh.vn/chia-se-kien-thuc?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
  publisher: {
    "@type": "Person",
    name: "Phạm Thanh Tùng",
    url: "https://nhahoachdinh.vn",
  },
};

const blogJsonLd = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "Kiến Thức Farmstay — Phạm Thanh Tùng",
  url: "https://nhahoachdinh.vn/chia-se-kien-thuc",
  description: "Kho kiến thức thực chiến về farmstay, du lịch nông nghiệp và phát triển bền vững",
  inLanguage: "vi-VN",
  author: {
    "@type": "Person",
    name: "Phạm Thanh Tùng",
    url: "https://nhahoachdinh.vn",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
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
