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
    youtube: "https://www.youtube.com/@NhaHoachDinhPhamThanhTung",
    pinterest: "https://pin.it/4ZOSKcq8T",
  },
};

export const navLinks = [
  { label: "Về Tôi", href: "/ve-toi" },
  { label: "Tôi Làm", href: "/#viec-toi-lam" },
  { label: "Chia Sẻ", href: "/chia-se-kien-thuc" },
  { label: "Sách Farmstay", href: "/sach-farmstay" },
  { label: "Thông Tin", href: "/lien-he" },
];

export const missions = [
  {
    icon: "🗺️",
    label: "Hoạch Định Vùng Đất",
    title: "Biến Mỗi Vùng Đất Thành Tương Lai",
    body: "Hơn 12 năm quy hoạch và phát triển tổng thể vùng đất nông nghiệp — từ Đắk Nông, Quảng Nam đến khắp các tỉnh thành Việt Nam. Mình giúp nhà đầu tư nhìn thấy tiềm năng ẩn trong từng mảnh đất trước khi bất kỳ ai khác nhận ra.",
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
    href: "/lien-he",
  },
  {
    name: "MASTERY",
    role: "CEO & Founder",
    description: "Hoạch định Chiến lược Đầu tư Dự án nông nghiệp sinh thái",
    logo: "",
    href: "/lien-he",
  },
  {
    name: "HTX Khe Sanh",
    role: "Cố Vấn Chiến Lược",
    description: "Truyền lửa, chuyển giao tri thức vào vùng đất — Mô hình HTX tiên phong",
    logo: "",
    href: "/lien-he",
  },
  {
    name: "Xuyên Việt Farmstay",
    role: "Nhà Sáng Lập",
    description: "Hành trình kết nối cộng đồng Farmstay toàn quốc — 4 mùa, 100+ điểm đến",
    logo: "",
    href: "/ve-toi",
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
  {
    name: "Tuổi Trẻ",
    title: "Vì sao nhiều người đầu tư homestay, farmstay thất bại chóng vánh?",
    href: "https://tuoitre.vn/vi-sao-nhieu-nguoi-dau-tu-homestay-farmstay-that-bai-chong-vanh-20250819145343618.htm",
  },
  {
    name: "CafeBiz",
    title: "Việt Nam có đầy đủ tiềm năng để trở thành quốc gia farmstay",
    href: "https://cafebiz.vn/kts-pham-thanh-tung-viet-nam-co-day-du-tiem-nang-ve-thien-nhien-va-con-nguoi-de-tro-thanh-mot-quoc-gia-farmstay-20200928192118412.chn",
  },
  {
    name: "Tiền Phong",
    title: "Kiến trúc sư thuận tự nhiên",
    href: "https://tienphong.vn/gioi-tre/kien-truc-su-thuan-tu-nhien-1717276.tpo",
  },
  {
    name: "The Leader",
    title: "Đất nông nghiệp thành vàng nhờ du lịch: Cơ hội hay cạm bẫy?",
    href: "https://theleader.vn/dat-nong-nghiep-thanh-vang-nho-du-lich-co-hoi-hay-cam-bay-d41697.html",
  },
  {
    name: "Tạp Chí Tài Chính",
    title: "7 sai lầm cơ bản khi thiết kế homestay và farmstay",
    href: "https://tapchitaichinh.vn/tai-chinh-gia-dinh/7-sai-lam-co-ban-khi-thiet-ke-homestay-va-farmstay-322575.html",
  },
  {
    name: "Đời Sống Kinh Tế",
    title: "Phạm Thanh Tùng — Nhà Hoạch Định với khát vọng đưa Việt Nam trở thành quốc gia du lịch nông nghiệp",
    href: "https://doisongkinhte.com.vn/bai-viet/pham-thanh-tung-nha-hoach-dinh-voi-khat-vong-dua-viet-nam-tro-thanh-quoc-gia-du-lich-nong-nghiep",
  },
  {
    name: "Reatimes",
    title: "Xu hướng phát triển farmstay nhìn từ tiềm năng BĐS nông nghiệp",
    href: "https://reatimes.vn/xu-huong-phat-trien-farmstay-nhin-tu-tiem-nang-bds-nong-nghiep-1597387193831.html",
  },
  {
    name: "TBTC Việt Nam",
    title: "BĐS du lịch nông nghiệp — phân khúc nhiều tiềm năng",
    href: "https://thoibaotaichinhvietnam.vn/bat-dong-san-du-lich-nong-nghiep-phan-khuc-nhieu-tiem-nang-127352.html",
  },
  {
    name: "Cafeland",
    title: "Farmstay trước cơn lốc phân lô bán nền",
    href: "https://cafeland.vn/tin-tuc/farmstay-truoc-con-loc-phan-lo-ban-nen-89860.html",
  },
  {
    name: "Ngôi Sao",
    title: "Có bố chủ nhiệm",
    href: "https://ngoisao.net/gia-dinh/co-bo-chu-nhiem-2928575.html",
  },
  {
    name: "Báo Quảng Nam",
    title: "Nông Sơn: Hội thảo giới thiệu tiềm năng du lịch Đại Bình",
    href: "https://baoquangnam.vn/du-lich/nong-son-hoi-thao-gioi-thieu-tiem-nang-du-lich-dai-binh-111408.html",
  },
  {
    name: "TN Chứng Khoán",
    title: "Farmstay: Trước hết phải là Farm",
    href: "https://bds.tinnhanhchungkhoan.vn/bat-dong-san/farmstay-truoc-het-phai-la-farm-257934.html",
  },
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
