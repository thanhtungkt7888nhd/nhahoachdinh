// ============================================================
// DATA LAYER — chỉnh sửa nội dung tại đây, không cần đụng UI
// ============================================================

export const siteConfig = {
  name: "Phạm Thanh Tùng",
  tagline: "Nhà Hoạch Định",
  vision:
    "Tạo tác động để Việt Nam định vị là quốc gia Du lịch Nông nghiệp.",
  email: "nhahoachdinh.ptt@gmail.com",
  phone: "0935 396 705",
  address: "79 Ngô Mây, Cẩm Lệ, Đà Nẵng",
  social: {
    facebook: "https://www.facebook.com/NhaHoachDinhPhamThanhTung",
    youtube: "https://youtube.com/@phamthanhtung",
    pinterest: "https://pinterest.com/phamthanhtung",
  },
};

export const navLinks = [
  { label: "Về Tôi", href: "/ve-toi" },
  { label: "Việc Tôi Làm", href: "#viec-toi-lam" },
  { label: "Chia Sẻ Kiến Thức", href: "/chia-se-kien-thuc" },
  { label: "Blog", href: "/blog" },
  { label: "Liên Hệ", href: "/lien-he" },
];

export const missions = [
  {
    icon: "🗺️",
    label: "Hoạch Định Vùng Đất",
    title: "Biến Mỗi Vùng Đất Thành Tương Lai",
    body: "Hơn 12 năm quy hoạch và phát triển tổng thể vùng đất nông nghiệp — từ Đắk Nông, Quảng Nam đến khắp các tỉnh thành Việt Nam. Tôi giúp nhà đầu tư nhìn thấy tiềm năng ẩn trong từng mảnh đất trước khi bất kỳ ai khác nhận ra.",
    img: "/images/mission-1.jpg",
    imgAlt: "Hoạch định phát triển vùng đất",
    imgRight: false,
    bg: "bg-white",
  },
  {
    icon: "🧭",
    label: "Tư Vấn Chiến Lược",
    title: "Kiến Tạo Farmstay Bền Vững",
    body: "Hơn 100 dự án farmstay & du lịch sinh thái được tư vấn trên toàn quốc — từ Hana Land Ecostay Đà Lạt, Sản Việt Farm Khánh Hòa, đến Muonglo Farmstay Yên Bái. Mỗi dự án là một hành trình riêng, cần chiến lược riêng.",
    img: "/images/mission-2.jpg",
    imgAlt: "Tư vấn chiến lược farmstay",
    imgRight: true,
    bg: "bg-white",
  },
  {
    icon: "🌐",
    label: "Xây Dựng Hệ Sinh Thái",
    title: "Kết Nối Cộng Đồng Farmstay Việt Nam",
    body: "Sáng lập Xuyên Việt Farmstay — hành trình 4 mùa (2021, 2023, 2024, 2025) kết nối hơn 100 farm/farmstay toàn quốc. Cùng Farmstay Update — nền tảng tri thức cấp quốc gia, hội tụ chuyên gia hàng đầu về hoạch định vùng đất.",
    img: "/images/mission-3.jpg",
    imgAlt: "Xuyên Việt Farmstay",
    imgRight: false,
    bg: "bg-beige/30",
  },
  {
    icon: "👥",
    label: "Dẫn Dắt Cộng Đồng",
    title: "Trao Quyền Cho Địa Phương",
    body: "Tổ chức hơn 30+ hội thảo, tọa đàm tại Hà Nội, Quảng Nam, Đắk Lắk, Gia Lai, Quảng Ngãi, Huế... Đào tạo cán bộ công chức, cấy nền farmstay bền vững — tạo sinh kế lâu dài cho cộng đồng địa phương.",
    img: "/images/mission-4.jpg",
    imgAlt: "Dẫn dắt cộng đồng",
    imgRight: true,
    bg: "bg-beige/30",
  },
];

export const companies = [
  {
    name: "DEFARM",
    role: "CEO & Founder",
    description: "Tư vấn, Thiết kế & Quản trị Farmstay chuyên nghiệp",
    logo: "",
    href: "#",
  },
  {
    name: "MASTERY",
    role: "CEO & Founder",
    description: "Hoạch định Chiến lược Đầu tư Dự án nông nghiệp sinh thái",
    logo: "",
    href: "#",
  },
  {
    name: "HTX Khe Sanh",
    role: "Cố Vấn Chiến Lược",
    description: "Truyền lửa, chuyển giao tri thức vào vùng đất — Mô hình HTX tiên phong",
    logo: "",
    href: "#",
  },
  {
    name: "Xuyên Việt Farmstay",
    role: "Nhà Sáng Lập",
    description: "Hành trình kết nối cộng đồng Farmstay toàn quốc — 4 mùa, 100+ điểm đến",
    logo: "",
    href: "#",
  },
];

export const testimonials = [
  {
    name: "Chủ Đầu Tư Farmstay",
    role: "Yên Bái",
    avatar: "",
    content:
      "Anh Tùng đã giúp tôi định hình lại toàn bộ mô hình kinh doanh farmstay. Từ một khu đất hoang, chúng tôi đã xây dựng được một điểm đến du lịch thu hút hàng nghìn khách mỗi năm.",
  },
  {
    name: "Nhà Đầu Tư BĐS Nông Nghiệp",
    role: "Đà Lạt",
    avatar: "",
    content:
      "Sự hiểu biết sâu sắc về cả chiến lược lẫn kinh tế nông nghiệp của anh Tùng là điều hiếm thấy. Những tư vấn của anh đã giúp dự án của tôi tránh được nhiều rủi ro nghiêm trọng và đúng hướng ngay từ đầu.",
  },
  {
    name: "Giám Đốc HTX Nông Nghiệp",
    role: "Khánh Hòa",
    avatar: "",
    content:
      "Phương pháp tiếp cận hệ thống của anh Tùng — từ đất đai, con người đến thị trường — đã tạo ra bước ngoặt thực sự cho hợp tác xã chúng tôi. Chúng tôi không còn hoạt động đơn lẻ nữa.",
  },
];

export const pressItems = [
  { name: "Vietnominhap.vn", logo: "", href: "https://vietnominhap.vn" },
  { name: "Baolong.vn", logo: "", href: "https://baolong.vn" },
  { name: "Trenphong.vn", logo: "", href: "https://trenphong.vn" },
  { name: "The Saigon Times", logo: "", href: "https://thesaigontimes.vn" },
  { name: "LinkedIn", logo: "", href: "https://linkedin.com" },
];

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image: string;
  readTime: number;
}

export const articles: Article[] = [
  {
    slug: "5-tu-duy-sai-lam-lam-chet-farmstay",
    title: "5 Tư Duy Sai Lầm Khiến Farmstay Thất Bại Ngay Từ Đầu",
    excerpt:
      "Nhiều chủ đầu tư mắc phải những sai lầm tư duy cơ bản trước khi xây dựng farmstay. Bài viết phân tích 5 lỗi phổ biến nhất và cách tránh.",
    category: "Chiến Lược",
    date: "2024-03-15",
    image: "/images/portrait-speaking.jpg",
    readTime: 8,
  },
  {
    slug: "marketing-farmstay-hieu-qua",
    title: "Chiến Lược Marketing Farmstay Hiệu Quả Trong Kỷ Nguyên Số",
    excerpt:
      "Cách xây dựng thương hiệu và thu hút khách hàng cho farmstay thông qua digital marketing, content và community building.",
    category: "Marketing",
    date: "2024-02-20",
    image: "/images/event-conference.jpg",
    readTime: 10,
  },
  {
    slug: "7-buoc-lap-ke-hoach-kinh-doanh-farmstay",
    title: "7 Bước Lập Kế Hoạch Kinh Doanh Farmstay Từ A–Z",
    excerpt:
      "Hướng dẫn chi tiết quy trình lập kế hoạch kinh doanh farmstay, từ nghiên cứu thị trường đến mô hình tài chính.",
    category: "Chiến Lược",
    date: "2024-01-10",
    image: "/images/portrait-casual.jpg",
    readTime: 15,
  },
  {
    slug: "tieu-chi-chon-dat-lam-farmstay",
    title: "Tiêu Chí Vàng Chọn Đất Phát Triển Farmstay Bền Vững",
    excerpt:
      "Những yếu tố quyết định khi lựa chọn quỹ đất: địa hình, thổ nhưỡng, kết nối hạ tầng và tiềm năng sinh thái lâu dài.",
    category: "Đất Đai",
    date: "2023-12-05",
    image: "/images/hero-bg.jpg",
    readTime: 12,
  },
  {
    slug: "xuyen-viet-farmstay-hanh-trinh",
    title: "Xuyên Việt Farmstay: Hành Trình Kết Nối 100+ Điểm Đến",
    excerpt:
      "Câu chuyện đằng sau 4 mùa Xuyên Việt Farmstay — hành trình kết nối cộng đồng, truyền cảm hứng và định hướng phát triển toàn quốc.",
    category: "Cộng Đồng",
    date: "2025-01-20",
    image: "/images/event-farmstay-update.jpg",
    readTime: 9,
  },
  {
    slug: "he-sinh-thai-thuong-hieu-farmstay",
    title: "Xây Dựng Hệ Sinh Thái Thương Hiệu Cho Dự Án Farmstay",
    excerpt:
      "Từ DEFARM đến MASTERY, HTX và Xuyên Việt — mô hình hệ sinh thái thương hiệu tích hợp để tạo ra tác động lớn hơn.",
    category: "Chiến Lược",
    date: "2023-10-30",
    image: "/images/portrait-main.jpg",
    readTime: 11,
  },
  {
    slug: "doanh-thu-farmstay-da-dang",
    title: "Các Nguồn Doanh Thu Đa Dạng Cho Mô Hình Farmstay",
    excerpt:
      "Cách tạo ra nhiều luồng doanh thu từ lưu trú, ẩm thực, trải nghiệm nông nghiệp, sự kiện và sản phẩm địa phương.",
    category: "Tài Chính",
    date: "2023-09-22",
    image: "/images/mission-2.jpg",
    readTime: 7,
  },
  {
    slug: "khe-sanh-coffee-tour",
    title: "Khe Sanh Coffee Tour — Mô Hình Du Lịch Nông Nghiệp Đặc Sắc",
    excerpt:
      "Tour du lịch cà phê đầu tiên của Quảng Trị, gắn kết trải nghiệm nông nghiệp với văn hóa bản địa và hành trình khám phá vùng cao.",
    category: "Đất Đai",
    date: "2024-06-10",
    image: "/images/mission-3.jpg",
    readTime: 8,
  },
  {
    slug: "cong-dong-dia-phuong-farmstay",
    title: "Xây Dựng Cộng Đồng Địa Phương Trong Dự Án Farmstay",
    excerpt:
      "Phương pháp gắn kết và trao quyền cho cộng đồng địa phương — yếu tố tạo nên sự bền vững lâu dài của bất kỳ mô hình farmstay nào.",
    category: "Cộng Đồng",
    date: "2023-07-01",
    image: "/images/community.jpg",
    readTime: 10,
  },
];
