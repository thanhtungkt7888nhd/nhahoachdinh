"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { FadeUp, SlideIn, StaggerParent, StaggerChild } from "@/components/animations";

const easeOut = [0.22, 1, 0.36, 1] as const;

const teachers: { stt: string; name: string; desc: string; detail: string; img?: string; imgPos?: string; cardImgPos?: string; modalImgPos?: string }[] = [
  {
    stt: "01", name: "GS. Phan Văn Trường",
    desc: "Triết lý cho đi vô điều kiện — nền tảng tổ chức cộng đồng dựa trên sự tử tế và lòng vị tha.",
    detail: "Mình xin cúi đầu biết ơn Giáo sư Phan Văn Trường — người đã khai sáng cho mình về triết lý của sự cho đi vô điều kiện. Nhờ Thầy, mình giác ngộ được phương pháp tổ chức cộng đồng dựa trên nền tảng của sự tử tế và lòng vị tha. Thầy dạy mình rằng một hệ sinh thái chỉ trường tồn khi những người tham gia biết đặt lợi ích của tập thể lên trên sự ích kỷ của cá nhân. Đây là nền tảng triết học cốt lõi của mọi mô hình cộng đồng farmstay mà mình xây dựng.",
    img: "/images/teacher-phan-van-truong.webp",
  },
  {
    stt: "02", name: "Thầy Giản Tư Trung",
    desc: "Tư duy quản trị mục tiêu cuộc đời — kinh doanh là hành trình tu thân, không chỉ là kiếm tiền.",
    detail: "Thầy Giản Tư Trung là ngọn hải đăng soi sáng cho mình những nền tảng tối thượng về tư duy quản trị mục tiêu cuộc đời. Nhờ những bài học sâu sắc của Thầy, mình hiểu rằng kinh doanh không chỉ là kiếm tiền, mà là một hành trình tu thân. Qua đó, mình biết cách quản trị các mối quan hệ, cân bằng các giá trị cốt lõi trong cuộc sống hàng ngày để không bao giờ bị lạc lối giữa ma trận vật chất. Mỗi dự án farmstay mình tư vấn đều mang trong đó triết lý: phát triển kinh tế đi liền với tu dưỡng nhân cách.",
    img: "/images/teacher-gian-tu-trung.jpg",
  },
  {
    stt: "03", name: "Anh Tạ Minh Trãi",
    desc: "Tư duy sáng tạo bứt phá — phá vỡ giới hạn để dám nghĩ đến những đại dự án mang tầm quốc gia.",
    detail: "Anh Tạ Minh Trãi là người anh lớn đã đập tan những rào cản cằn cỗi trong tâm trí mình, trao cho mình những tư duy bứt phá về mặt sáng tạo. Anh dạy mình cách tư duy đi ra khỏi lối mòn quen thuộc. Chính anh đã cung cấp cho mình một phương thức tư duy sắc lẹm để phá vỡ mọi giới hạn được đặt ra trước đó, giúp mình dám nghĩ đến những đại dự án mang tầm vóc quốc gia — điều mà trước kia mình chưa bao giờ dám mơ đến.",
    img: "/images/teacher-ta-minh-trai.jpg", imgPos: "object-top",
  },
  {
    stt: "04", name: "Thầy Phạm Thành Long",
    desc: "Kỷ luật thép và thói quen của người chiến thắng — liên tục vượt qua giới hạn của ngày hôm qua.",
    detail: "Thầy Phạm Thành Long là ngọn lửa cuồng nộ đã nung nấu và dạy cho mình sự bứt phá khủng khiếp về những mục tiêu kinh doanh và mục tiêu khẳng định giá trị bản thân. Đây là người đã giúp mình rất nhiều trong việc rèn luyện kỷ luật thép, tạo ra những thói quen của người chiến thắng. Một trong những thói quen mang tính sinh tử mà Thầy truyền lại chính là: Phải liên tục vượt qua giới hạn của chính mình ngày hôm qua. Triết lý này hiện diện trong từng buổi sáng mình thức dậy để làm việc.",
    img: "/images/teacher-pham-thanh-long.jpg",
  },
  {
    stt: "05", name: "Anh Trần Đình Tú",
    desc: "Quản trị công ty bài bản — mọi quyết định đầu tư, nhân sự hôm nay đều trổ quả trong tương lai.",
    detail: "Anh Trần Đình Tú là người đã trao cho mình những kiến thức cơ sở nền tảng về việc quản trị công ty bài bản. Nhờ sự chỉ dẫn chi tiết của anh, mình thấu hiểu được tính nhân quả trong sự vận động của một doanh nghiệp — rằng mọi quyết định đầu tư, mọi chính sách nhân sự ngày hôm nay đều sẽ trổ quả tốt hay xấu trong tương lai. Đây là lý do mình luôn đặt nặng chiến lược dài hạn trong từng dự án tư vấn.",
    img: "/images/teacher-tran-dinh-tu.jpg", imgPos: "object-top", cardImgPos: "center 25%", modalImgPos: "center 20%",
  },
  {
    stt: "06", name: "Người Vợ — Nguyễn Thị Thanh Huyền",
    desc: "Người đồng hành bền bỉ, kỷ luật yêu thương phía sau những quyết định táo bạo nhất.",
    detail: "Người phụ nữ quyền lực nhất, cô giáo chủ nhiệm và đồng thời cũng là người Vợ tào khang của mình — Nguyễn Thị Thanh Huyền. Phía sau những quyết định táo bạo của mình luôn có bóng dáng của sự vun vén. Mình đã phát triển mạnh mẽ về mặt tri thức, rèn giũa được những thói quen tốt chính là nhờ sự khắt khe, sự yêu thương kỷ luật và sự đồng hành bền bỉ của cô ấy qua bao thăng trầm. Không có cô ấy, sẽ không có Phạm Thanh Tùng của ngày hôm nay.",
    img: "/images/portrait-vo-thanh-huyen.jpg",
    cardImgPos: "center 30%",
    modalImgPos: "center 18%",
  },
  {
    stt: "07", name: "Học Trò & Nhân Sự",
    desc: "Những câu hỏi hóc búa, sự tận tụy, lòng trung thành — chất liệu vô giá để mài giũa hệ thống tư duy.",
    detail: "Trong quá trình đi chia sẻ và giảng dạy, mình nhận ra chính những học viên — những người gọi mình là Thầy — lại là những người thầy thực tiễn sâu sắc nhất. Những góp ý chân thành, những câu hỏi hóc búa, những trăn trở và cả những điểm nghẽn mà họ gặp phải trên thực địa chính là chất liệu vô giá để mình liên tục mài giũa hệ thống tư duy. Việc đồng hành tháo gỡ vấn đề cho học trò chính là quá trình mình tự hoàn thiện bản thân không ngừng.",
    img: "/images/teacher-hoc-tro-nhan-su.jpg",
  },
  {
    stt: "08", name: "Anh Nguyễn An Nam",
    desc: "Đả thông tư tưởng tâm linh — giúp tâm trí tĩnh tại, đôi chân vững trên mặt đất.",
    detail: "Anh Nguyễn An Nam là một người bạn tri kỷ đã ngồi lại trò chuyện với mình về những quan điểm tâm linh sâu thẳm. Nhờ sự đả thông tư tưởng từ anh, mình đã kết thúc được những hoang mang, những giá trị tâm linh vướng mắc trong suy nghĩ. Nhờ đó, tâm trí mình hoàn toàn tĩnh tại và giữ vững đôi chân trên mặt đất khi đưa ra những quyết định chiến lược lớn. Đây là nền tảng nội tâm không thể thiếu của một người làm công việc hoạch định.",
    img: "/images/teacher-nguyen-an-nam.jpg",
    modalImgPos: "center center",
  },
  {
    stt: "09", name: "Cộng Đồng Làng Farmstay VN",
    desc: "Đồng sáng lập — hàng nghìn chủ Farm là người thầy thực tiễn sâu sắc nhất.",
    detail: "Người thầy khổng lồ mang tên Cộng đồng Du lịch Nông nghiệp Việt Nam — nay là Làng Farmstay Việt Nam. Mình là người đồng sáng lập, nhưng chính cộng đồng lại là người dạy mình nhiều nhất. Nhờ sự va đập hàng ngày với hàng nghìn anh em chủ Farm, mình đã học được cách tổ chức một cộng đồng có sự kết nối sâu sắc, biết hy sinh cho đi và hình thành một văn hóa chung để tạo ra sức mạnh tác động vào toàn ngành du lịch nông nghiệp Việt Nam.",
    img: "/images/teacher-cong-dong-farmstay.jpg",
  },
  {
    stt: "10", name: "Tổ Chức BNI",
    desc: "Hiểu thấu hệ thống vận hành toàn cầu — nền tảng Giáo dục là cốt lõi thành công.",
    detail: "Nhờ 2 năm dấn thân tham gia tổ chức BNI và hấp thụ những kiến thức được truyền dạy từ các thành viên xuất chúng, mình đã hiểu thấu đáo tính hệ thống của một cỗ máy vận hành toàn cầu. Qua đó, mình ngộ ra câu trả lời cho bài toán: Một hệ thống toàn cầu cần có những gì? Và nhận ra rằng điều cốt lõi làm nên thành công của một tổ chức toàn cầu chính là nền tảng Giáo dục — bài học mình áp dụng vào mọi hệ sinh thái farmstay mình xây dựng.",
    img: "/images/teacher-bni.jpg",
    modalImgPos: "center center",
  },
];

const principles = [
  {
    icon: "🌱",
    title: "Tận Dụng Nội Lực",
    body: "Phát triển dựa trên tiềm năng vốn có — thiên nhiên, văn hóa, con người địa phương. Không sao chép giải pháp chung chung.",
    detail: "Cách tiếp cận của mình nhấn mạnh sự phát triển phải dựa trên nền tảng tiềm năng vốn có của một khu vực, từ thiên nhiên, văn hóa đến con người.\n\nMình ủng hộ tuyệt đối việc xác định các đặc điểm độc đáo của địa phương làm bệ phóng cho sự phát triển, thay vì sao chép các giải pháp chung chung khiên cưỡng.\n\nMỗi vùng đất đều mang trong mình một ADN riêng biệt — câu chuyện về lịch sử, con người, địa hình, khí hậu, cây trồng đặc hữu. Nhiệm vụ của Nhà Hoạch Định là bóc tách, giải phẫu và biến những đặc điểm độc bản đó thành lợi thế cạnh tranh không thể sao chép.",
  },
  {
    icon: "♻️",
    title: "Bền Vững & Hài Hòa",
    body: "Mọi nhát cuốc, mọi viên gạch đặt xuống đều bắt nguồn từ sự phát triển bền vững và tôn trọng tối thượng với môi trường.",
    detail: "Mình hướng tới nghệ thuật thiết kế sinh thái và quy hoạch thuận tự nhiên. Mọi nhát cuốc, mọi viên gạch đặt xuống đều bắt nguồn từ sự phát triển bền vững và sự tôn trọng tối thượng đối với môi trường sống.\n\nMột dự án farmstay thực sự bền vững không phải là dự án kiếm được nhiều tiền nhất trong năm đầu tiên — mà là dự án vẫn còn đẹp, còn sống và còn sinh ra dòng tiền sau 20 năm.\n\nTriết lý này đòi hỏi sự kiên nhẫn và bản lĩnh của người làm nghề. Khi địa hình nói không, ta phải biết nghe. Khi cây cổ thụ cần được giữ lại, ta phải dám từ chối những giải pháp tiện lợi ngắn hạn.",
  },
  {
    icon: "👥",
    title: "Trọng Tâm Cộng Đồng",
    body: "Đào tạo, trao quyền người dân địa phương. Nâng tầm con người là chìa khóa duy nhất cho sự phát triển không thể phá vỡ.",
    detail: "Mình đồng sáng lập các cộng đồng du lịch nông nghiệp và nhấn mạnh việc đào tạo, trao quyền cho người dân địa phương. Mình tập trung vào sứ mệnh đào tạo các nhà lãnh đạo, nâng tầm con người, coi đó là chìa khóa duy nhất cho sự phát triển không thể bị phá vỡ.\n\nMột farmstay mà dân địa phương không được hưởng lợi, không có việc làm, không tự hào về mảnh đất của mình — đó là dự án chờ ngày sụp đổ.\n\nNgược lại, khi cộng đồng bản địa được trao quyền làm chủ câu chuyện của mình, họ trở thành người bảo vệ dự án mạnh mẽ nhất, người kể chuyện có sức lan tỏa nhất và nguồn nhân lực trung thành nhất.",
  },
  {
    icon: "🔗",
    title: "Mô Hình Tích Hợp",
    body: "Kinh tế — sinh thái — cộng đồng đan xen thành khối thống nhất. Không có gì tồn tại đơn lẻ trong hệ sinh thái bền vững.",
    detail: "Mình luôn khát khao thúc đẩy một mô hình tích hợp toàn diện. Nơi đó, sự phát triển kinh tế thông qua du lịch và bất động sản, sự bền vững của hệ sinh thái và việc trao quyền vinh danh cộng đồng được đan xen chặt chẽ với nhau thành một khối thống nhất.\n\nKhông có gì tồn tại đơn lẻ trong một hệ sinh thái bền vững. Cây trồng nuôi đất. Đất nuôi nước. Nước nuôi cảnh quan. Cảnh quan thu hút khách. Khách tạo ra doanh thu. Doanh thu nuôi con người. Con người chăm sóc lại cây trồng.\n\nKhi vòng tròn này được thiết kế đúng, dự án không chỉ sinh lời — mà trở thành di sản.",
  },
];

const services = [
  {
    title: "Một Giờ Mentor Giải Cứu",
    desc: "Trực tuyến — cắt đứt nút thắt tư duy đang khiến bạn bế tắc và đốt tiền vô ích.",
    detail: "Dành cho những ai đang rối rắm. Chỉ với một giờ làm việc trực tiếp, mình sẽ giúp cắt đứt nút thắt tư duy đang khiến bạn bế tắc.\n\nĐôi khi, một câu nói đúng thời điểm sẽ cứu bạn khỏi việc đốt tiền oan uổng.\n\nHình thức: Online, 1-on-1 trực tiếp với Phạm Thanh Tùng.",
    icon: "⚡",
  },
  {
    title: "Khảo Sát Thực Địa & Định Hướng",
    desc: "Trực tiếp giẫm chân lên mảnh đất của bạn — đọc vị và phác thảo định hướng phát triển thực tế nhất.",
    detail: "Mình sẽ trực tiếp xách ba lô đến giẫm chân lên mảnh đất của bạn. Quan sát địa thế, đọc vị khu đất và phác thảo ngay định hướng phát triển chia theo từng giai đoạn.\n\nDựa trên chính nguồn lực thực tế bạn đang có — tuyệt đối không vẽ vời ảo tưởng.\n\nBạn sẽ ra về với một bản đồ hành động rõ ràng, khả thi và được cá nhân hóa hoàn toàn.",
    icon: "🗺️",
  },
  {
    title: "Cố Vấn Chiến Lược Dài Hạn",
    desc: "Đồng hành từ lúc thai nghén ý tưởng đến khi vận hành ra dòng tiền ổn định.",
    detail: "Đồng hành sát cánh từ lúc thai nghén ý tưởng, vượt rào cản pháp lý, thiết kế quy hoạch cho đến khi vận hành ra dòng tiền ổn định.\n\nSự đồng hành này có thể kéo dài bền bỉ theo suốt vòng đời dự án — miễn là đôi bên còn chung một hệ giá trị và tầm nhìn.\n\nĐây là gói hợp tác sâu nhất và có giá trị lâu dài nhất mình cung cấp.",
    icon: "🧭",
  },
  {
    title: "Member Hội Đồng Nhà Hoạch Định",
    desc: "Sinh hoạt chuyên sâu hàng tháng — cập nhật tri thức và giải phẫu các bài toán thực tế.",
    detail: "Sân chơi dành riêng cho cộng đồng tinh hoa. Mỗi tháng chúng ta sinh hoạt online kín 8 tiếng để cập nhật tri thức mới nhất về Farmstay thế giới, ngách kinh doanh, chính sách.\n\nVà trực tiếp giải phẫu các bài toán thực tế của hội viên — cùng nhau phân tích, phản biện và tìm ra giải pháp.\n\nĐây là cộng đồng của những người làm thật, không có chỗ cho lý thuyết suông.",
    icon: "🏛️",
  },
  {
    title: "Tư Vấn Vĩ Mô Cấp Địa Phương",
    desc: "Dành riêng cho Lãnh đạo cấp Xã, Tỉnh về khai phóng nguồn lực nông thôn và chuyển đổi số.",
    detail: "Dành riêng cho Lãnh đạo cấp Xã, Tỉnh. Mình đóng vai trò cố vấn chiến lược phát triển kinh tế địa phương thông qua khai phóng nguồn lực nông thôn, du lịch bản địa và chuyển đổi số.\n\nMình đã làm việc trực tiếp với nhiều tỉnh thành từ Quảng Nam, Đắk Lắk, Phú Yên, Bình Định, Hà Tĩnh đến Quảng Trị — giúp địa phương định vị đúng thế mạnh và xây dựng chiến lược phát triển dài hạn.\n\nKhi chính quyền và cộng đồng cùng đi một hướng, sức mạnh tổng lực tạo ra là không thể đo đếm.",
    icon: "🌐",
  },
];

const statsData = [
  {
    num: "50+",
    label: "Dự Án Farmstay & Sinh Thái",
    details: [
      { title: "Hana Land Ecostay", sub: "Đà Lạt — Mô hình farmstay sinh thái tích hợp nông nghiệp & lưu trú cao cấp" },
      { title: "Sản Việt Farm", sub: "Khánh Hòa — Hoạch định tổng thể từ đất trống đến điểm đến du lịch nông nghiệp" },
      { title: "Muonglo Farmstay", sub: "Yên Bái — Kết hợp văn hóa Thái bản địa với mô hình sinh thái cộng đồng" },
      { title: "Khe Sanh Coffee Tour", sub: "Quảng Trị — Tour du lịch cà phê đầu tiên gắn kết trải nghiệm nông nghiệp vùng cao" },
      { title: "HTX Nông Nghiệp Khe Sanh", sub: "Cố vấn chiến lược — chuyển giao mô hình HTX tiên phong khu vực miền Trung" },
      { title: "...và 45+ dự án khác", sub: "Trải dài từ Hà Giang, Yên Bái, Đắk Nông, Gia Lai đến Quảng Nam, Bình Thuận" },
    ],
  },
  {
    num: "3.000+",
    label: "Lượt Tư Vấn",
    details: [
      { title: "Đắk Nông & Tây Nguyên", sub: "Vùng đất bazan màu mỡ — hoạch định phát triển nông nghiệp sinh thái quy mô lớn" },
      { title: "Quảng Nam & Duyên Hải", sub: "Kết nối di sản văn hóa Chăm với du lịch nông nghiệp ven biển" },
      { title: "Tây Bắc & Vùng Núi", sub: "Bảo tồn bản sắc dân tộc thiểu số gắn liền với phát triển farmstay cộng đồng" },
      { title: "Phương Pháp Đọc Vị Đất", sub: "12 tiêu chí vàng đánh giá quỹ đất: địa hình, thổ nhưỡng, hạ tầng, sinh thái & pháp lý" },
    ],
  },
  {
    num: "40+",
    label: "Tọa Đàm Cấp Tỉnh / Bộ",
    details: [
      { title: "Hội Thảo Quốc Gia Farmstay Update", sub: "Hà Nội, TP.HCM, Đà Nẵng — Hội tụ chuyên gia hàng đầu, hàng trăm nhà đầu tư" },
      { title: "Tọa Đàm Cấp Tỉnh", sub: "Đắk Lắk, Gia Lai, Quảng Ngãi, Huế, Quảng Nam — Đào tạo cán bộ công chức địa phương" },
      { title: "Xuyên Việt Farmstay", sub: "4 mùa (2021, 2023, 2024, 2025) — Hành trình kết nối 100+ farm/farmstay toàn quốc" },
      { title: "Diễn Giả Khách Mời", sub: "BNI, VCCI, Bộ NN&PTNT, Hiệp hội Du lịch — Truyền bá tư duy farmstay bền vững" },
    ],
  },
  {
    num: "150+",
    label: "Bài Viết Chuyên Đề",
    details: [
      { title: "Chiến Lược & Tư Duy", sub: "Phân tích sâu về mô hình farmstay, tư duy đầu tư đất nông nghiệp bền vững" },
      { title: "Marketing & Thương Hiệu", sub: "Xây dựng thương hiệu farmstay, kể chuyện văn hóa và digital marketing thực chiến" },
      { title: "Đất Đai & Pháp Lý", sub: "Hướng dẫn chọn đất, đọc vị địa hình và các vấn đề pháp lý trong phát triển farmstay" },
      { title: "Cộng Đồng & Con Người", sub: "Bài học thực địa từ hàng trăm dự án — gắn kết cộng đồng địa phương trong mô hình phát triển" },
    ],
  },
];

function StatsSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIdx(openIdx === i ? null : i);

  return (
    <section
      className="py-20"
      style={{ background: "linear-gradient(135deg, #1C2A1C 0%, #1D3A1D 100%)" }}
    >
      <div className="container-main">
        <FadeUp>
          <p className="gold-shine font-sans font-semibold uppercase tracking-[0.2em] text-sm text-center mb-12">
            Những Con Số Thực Chứng
          </p>
        </FadeUp>

        {/* Stat buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-2">
          {statsData.map((s, i) => (
            <button
              key={i}
              onClick={() => toggle(i)}
              className="group text-center px-4 py-6 border transition-all duration-300 rounded-sm focus:outline-none"
              style={{
                borderColor: openIdx === i ? "#C8A84B" : "rgba(200,168,75,0.2)",
                background: openIdx === i ? "rgba(200,168,75,0.08)" : "transparent",
              }}
            >
              <p
                className="gold-shine font-serif font-bold mb-2 transition-all duration-300"
                style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}
              >
                {s.num}
              </p>
              <p className="font-sans text-white/50 text-xs uppercase tracking-widest leading-relaxed group-hover:text-white/70 transition-colors">
                {s.label}
              </p>
              <motion.div
                className="mx-auto mt-3 text-primary/60"
                animate={{ rotate: openIdx === i ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 10.5L2.5 5h11L8 10.5z" />
                </svg>
              </motion.div>
            </button>
          ))}
        </div>

        {/* Accordion content */}
        <AnimatePresence mode="wait">
          {openIdx !== null && (
            <motion.div
              key={openIdx}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div
                className="mt-4 p-8 md:p-10 border rounded-sm"
                style={{ borderColor: "rgba(200,168,75,0.25)", background: "rgba(200,168,75,0.05)" }}
              >
                <div className="flex items-center gap-4 mb-8">
                  <span className="gold-shine font-serif font-bold" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
                    {statsData[openIdx].num}
                  </span>
                  <div>
                    <div className="w-8 h-px bg-primary mb-2" />
                    <p className="font-sans text-white/70 text-sm uppercase tracking-widest">
                      {statsData[openIdx].label}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {statsData[openIdx].details.map((d, j) => (
                    <motion.div
                      key={j}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.35, delay: j * 0.07, ease: [0.22, 1, 0.36, 1] }}
                      className="flex gap-3"
                    >
                      <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                      <div>
                        <p className="font-serif text-white/90 text-sm font-medium mb-0.5">{d.title}</p>
                        <p className="font-sans text-white/45 text-xs leading-relaxed">{d.sub}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

function SectionDivider() {
  return <div className="w-12 h-0.5 bg-primary mt-5 mb-6" />;
}

export default function VeToi() {
  const teachersRef = useRef<HTMLDivElement>(null);
  const teachersInView = useInView(teachersRef, { once: true, margin: "-60px 0px" });
  const [selectedTeacher, setSelectedTeacher] = useState<typeof teachers[0] | null>(null);
  const [selectedPrinciple, setSelectedPrinciple] = useState<typeof principles[0] | null>(null);
  const [openServiceIdx, setOpenServiceIdx] = useState<number | null>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedTeacher(null);
        setSelectedPrinciple(null);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <div className="pt-[88px]">

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section
        className="relative min-h-[90vh] flex items-center overflow-hidden"
        style={{ background: "linear-gradient(135deg, #1C2A1C 0%, #1D3A1D 100%)" }}
      >
        {/* BG orb */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle at 70% 40%, #C8A84B 0%, transparent 55%)", opacity: 0.08 }}
          animate={{ scale: [1, 1.12, 1], opacity: [0.07, 0.13, 0.07] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="container-main relative z-10 w-full">
          <div className="flex flex-col lg:flex-row items-center gap-14 lg:gap-20 py-20">

            {/* Portrait */}
            <motion.div
              className="w-full lg:w-2/5 flex-shrink-0"
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: easeOut }}
            >
              <div className="relative mx-auto" style={{ maxWidth: 420 }}>
                {/* Gold frame accent — chìm sau ảnh */}
                <div className="absolute -bottom-4 -right-4 w-3/4 h-3/4 border border-primary/30 rounded-sm pointer-events-none z-0" />
                <div className="aspect-[3/4] relative overflow-hidden rounded-sm img-shadow z-10">
                  <Image
                    src="/images/portrait-nhahoachdinh.jpg"
                    alt="Phạm Thanh Tùng — Nhà Hoạch Định"
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 1024px) 90vw, 420px"
                    priority
                  />
                  {/* Gold overlay bottom */}
                  <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-navy/70 to-transparent" />
                </div>
              </div>
            </motion.div>

            {/* Text */}
            <div className="w-full lg:w-3/5 text-white">
              <motion.p
                className="gold-shine font-sans font-semibold uppercase tracking-[0.25em] text-sm mb-5"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.35, ease: easeOut }}
              >
                Mình Là Ai
              </motion.p>
              <motion.h1
                className="font-serif text-white leading-tight mb-2"
                style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)" }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, delay: 0.45, ease: easeOut }}
              >
                Phạm Thanh Tùng
              </motion.h1>
              <motion.p
                className="gold-shine font-serif italic mb-6"
                style={{ fontSize: "clamp(1.2rem, 2.5vw, 1.8rem)" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.55, ease: easeOut }}
              >
                Nhà Hoạch Định
              </motion.p>
              <motion.div
                className="w-12 h-0.5 bg-primary mb-7"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5, delay: 0.7, ease: easeOut }}
                style={{ transformOrigin: "left" }}
              />
              <motion.p
                className="font-sans text-white/70 leading-relaxed text-base mb-8 text-justify"
                style={{ maxWidth: 560 }}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.8, ease: easeOut }}
              >
                Người tạo tác động để Việt Nam định vị là Quốc gia Du lịch Nông nghiệp độc đáo nhất thế giới.
                Hành trình bắt đầu từ một kiến trúc sư — vươn tới tầm nhìn kiến tạo hệ sinh thái quốc gia.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1, ease: easeOut }}
                className="flex flex-wrap gap-4"
              >
                <Link href="/lien-he" className="btn-lienhe">
                  <span className="gold-shine">Liên Hệ Tư Vấn</span>
                </Link>
                <Link href="#triet-ly" className="btn-white">Triết Lý Của Mình</Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── DANH XƯNG NHÀ HOẠCH ĐỊNH ───────────────────────────── */}
      <section className="relative overflow-hidden py-24 md:py-32" style={{ background: "#F6F3EE" }}>
        {/* Corner accent */}
        <div className="absolute top-0 left-0 w-72 h-72 pointer-events-none" style={{ background: "radial-gradient(circle at 0% 0%, rgba(28,42,28,0.06) 0%, transparent 70%)" }} />
        <div className="absolute bottom-0 right-0 w-96 h-96 pointer-events-none" style={{ background: "radial-gradient(circle at 100% 100%, rgba(200,168,75,0.07) 0%, transparent 65%)" }} />

        <div className="container-main max-w-5xl relative z-10">
          <div className="flex flex-col lg:flex-row-reverse gap-12 lg:gap-16 items-center">

            {/* Ảnh — bên PHẢI, tỉ lệ dọc, khuôn mặt nổi bật */}
            <motion.div
              className="w-full lg:w-[42%] flex-shrink-0"
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.85, delay: 0.15, ease: easeOut }}
            >
              <div className="relative" style={{ maxWidth: 400, margin: "0 auto" }}>
                {/* Gold frame accent behind */}
                <div
                  className="absolute -bottom-5 -left-5 w-full h-full rounded-sm pointer-events-none"
                  style={{ border: "2px solid rgba(200,168,75,0.35)", zIndex: 0 }}
                />
                {/* Dark green corner tag */}
                <div
                  className="absolute top-5 -left-3 z-20 px-3 py-1 font-sans text-xs font-semibold uppercase tracking-widest"
                  style={{ background: "#1C2A1C", color: "#C8A84B", letterSpacing: "0.18em" }}
                >
                  Nhà Hoạch Định
                </div>
                <div className="relative overflow-hidden rounded-sm img-shadow" style={{ aspectRatio: "3/4", zIndex: 1 }}>
                  <Image
                    src="/images/portrait-chandung.jpg"
                    alt="Phạm Thanh Tùng — Nhà Hoạch Định"
                    fill
                    className="object-cover"
                    style={{ objectPosition: "center 8%" }}
                    sizes="(max-width: 1024px) 90vw, 400px"
                  />
                  {/* Subtle vignette bottom */}
                  <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
              </div>
            </motion.div>

            {/* Nội dung — bên TRÁI */}
            <div className="w-full lg:w-[58%]">
              <FadeUp>
                <p className="font-sans font-semibold uppercase tracking-[0.25em] text-xs mb-3" style={{ color: "#C8A84B" }}>
                  Danh Xưng
                </p>
                <h2 className="font-serif leading-tight mb-2" style={{ fontSize: "clamp(1.9rem, 3.2vw, 2.9rem)", color: "#1C2A1C" }}>
                  Vượt Ra Khỏi<br />
                  <span style={{ color: "#C8A84B" }}>Bản Vẽ Kiến Trúc</span>
                </h2>
                <SectionDivider />
              </FadeUp>
              <FadeUp delay={0.15}>
                <p className="font-sans leading-relaxed mb-5 text-justify" style={{ color: "#5C5C4A", fontSize: "0.97rem" }}>
                  Danh xưng{" "}
                  <strong style={{ color: "#1C2A1C", fontWeight: 700 }}>Nhà Hoạch Định</strong>{" "}
                  không phải tự tôn hay đánh bóng tên tuổi, mà xác lập một vai trò vượt ra ngoài
                  giới hạn của nhà tư vấn hay người thợ vẽ bản vẽ đơn thuần.
                </p>
              </FadeUp>
              <FadeUp delay={0.25}>
                <p className="font-sans leading-relaxed mb-5 text-justify" style={{ color: "#5C5C4A", fontSize: "0.97rem" }}>
                  Mình là người có khả năng{" "}
                  <span style={{ color: "#1C2A1C", fontWeight: 600 }}>thay đổi và tác động trực tiếp</span>{" "}
                  đến sự phát triển các vùng đất từ cấp làng, xã, huyện đến cấp tỉnh — đồng thời
                  định hướng{" "}
                  <span style={{ color: "#1C2A1C", fontWeight: 600 }}>chiến lược vĩ mô</span>{" "}
                  cho các tổ chức kinh tế, văn hóa và cộng đồng.
                </p>
              </FadeUp>
              <FadeUp delay={0.35}>
                <p className="font-sans leading-relaxed mb-8 text-justify" style={{ color: "#5C5C4A", fontSize: "0.97rem" }}>
                  Công tác hoạch định nhắm cụ thể vào việc bóc tách, giải phẫu và{" "}
                  <span style={{ color: "#1C2A1C", fontWeight: 600 }}>tận dụng triệt để thế mạnh nội tại độc bản</span>{" "}
                  của địa phương về thiên nhiên, văn hóa, con người để phát triển.
                </p>
              </FadeUp>
              <FadeUp delay={0.45}>
                <blockquote
                  className="pl-5 border-l-[3px] font-serif italic leading-relaxed"
                  style={{ borderColor: "#C8A84B", fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)", color: "#3A3A2A" }}
                >
                  &ldquo;Một bản vẽ kiến trúc dù lung linh đến mấy cũng trở nên vô nghĩa nếu đặt trên
                  một vùng đất{" "}
                  <span style={{ color: "#1C2A1C", fontStyle: "normal", fontWeight: 600 }}>sai chiến lược</span>{" "}
                  và thiếu vắng sinh kế cho người dân bản địa.&rdquo;
                </blockquote>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4 NĂNG LỰC CỐT LÕI ──────────────────────────────────── */}
      <section className="bg-white py-24 md:py-32">
        <div className="container-main">
          <div className="text-center mb-14">
            <FadeUp>
              <p className="gold-shine-subtle font-sans font-semibold uppercase tracking-[0.2em] text-sm mb-2">Năng Lực</p>
              <h2 className="font-serif text-charcoal" style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)" }}>
                4 Năng Lực Cốt Lõi
              </h2>
              <div className="w-12 h-0.5 bg-primary mx-auto mt-5" />
            </FadeUp>
          </div>
          <StaggerParent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                num: "01",
                icon: "🗺️",
                title: "Hoạch Định Vùng Đất",
                body: "Năng lực đọc vị địa thế, phân tích tiềm năng vùng đất từ góc độ sinh thái, văn hóa bản địa và kinh tế. Biến các mảnh đất thô sơ thành những điểm đến có tầm nhìn chiến lược rõ ràng và bền vững lâu dài — từ quy hoạch tổng thể đến từng lối đi, từng cây trồng.",
              },
              {
                num: "02",
                icon: "🌿",
                title: "Kiến Tạo Mô Hình Farmstay",
                body: "Thiết kế tổng thể hệ sinh thái farmstay từ concept, quy hoạch không gian, mô hình kinh doanh đến vận hành ra dòng tiền. Hơn 100 dự án thực chiến tại khắp Việt Nam — từ cao nguyên Tây Bắc đến đồng bằng Cửu Long.",
              },
              {
                num: "03",
                icon: "🌐",
                title: "Xây Dựng Hệ Sinh Thái Cộng Đồng",
                body: "Sáng lập và dẫn dắt các cộng đồng du lịch nông nghiệp quy mô quốc gia. Tổ chức hành trình Xuyên Việt Farmstay 4 mùa, kết nối hơn 100 farm/farmstay toàn quốc. Đồng sáng lập Làng Farmstay Việt Nam — cộng đồng hàng nghìn chủ farm.",
              },
              {
                num: "04",
                icon: "📣",
                title: "Lan Truyền & Kiến Tạo Tri Thức",
                body: "Diễn giả quốc gia về farmstay và du lịch nông nghiệp tại BNI, VCCI, Bộ NN&PTNT. Tác giả cuốn 'Hướng Dẫn Thiết Lập Farmstay'. Hơn 40 hội thảo cấp tỉnh/bộ, đào tạo cán bộ và truyền lửa cho cộng đồng địa phương.",
              },
            ].map((item, i) => (
              <StaggerChild key={i}>
                <motion.div
                  className="p-8 border border-earth/10 bg-beige/30 relative overflow-hidden group"
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="flex items-start gap-5">
                    <span className="gold-shine-subtle font-serif text-4xl font-bold flex-shrink-0">{item.num}</span>
                    <div>
                      <h3 className="font-serif text-charcoal text-lg mb-3">{item.title}</h3>
                      <p className="font-sans text-muted text-sm leading-relaxed text-justify">{item.body}</p>
                    </div>
                  </div>
                  <motion.div
                    className="absolute bottom-0 left-0 h-0.5 bg-primary"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.35 }}
                  />
                </motion.div>
              </StaggerChild>
            ))}
          </StaggerParent>
        </div>
      </section>

      {/* ── STATS ────────────────────────────────────────────────── */}
      <StatsSection />

      {/* ── SỰ THỨC TỈNH ─────────────────────────────────────────── */}
      <section className="bg-beige py-24 md:py-32">
        <div className="container-main max-w-3xl text-center">
          <FadeUp>
            <p className="gold-shine-subtle font-sans font-semibold uppercase tracking-[0.2em] text-sm mb-2">
              Hành Trình
            </p>
            <h2 className="font-serif text-charcoal" style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)" }}>
              Sự Thức Tỉnh từ năm 2019–2020
            </h2>
            <SectionDivider />
          </FadeUp>
          <FadeUp delay={0.15}>
            <p className="font-sans text-muted leading-relaxed mb-6 text-justify">
              Thời điểm hoàng kim của trào lưu <em>bỏ phố về rừng</em> — một sự bùng nổ mang tính bản năng nhưng thiếu vắng
              hoàn toàn nền tảng lý luận và tư duy quản trị, đa số làm vì thấy đó là trào lưu. Hàng loạt cá nhân nhân danh{" "}
              <strong>Farmstay</strong> để ngụy trang cho hoạt động đầu cơ, phân lô bán nền trái phép, băm nát địa hình,
              tiêu diệt cảnh quan sinh thái tự nhiên, san gạt địa hình.
            </p>
          </FadeUp>
          <FadeUp delay={0.25}>
            <p className="font-sans text-muted leading-relaxed mb-6 text-justify">
              Đứng trước sự tàn phá khủng khiếp đó, mình nhận ra: <em>Một bản vẽ kiến trúc dù lung linh đến mấy cũng trở thành
              vô nghĩa nếu đặt trên vùng đất sai chiến lược, không nhắm đúng vào đối tượng khách hàng mục tiêu.</em> Mình
              quyết định bước ra khỏi ranh giới an toàn của một kiến trúc sư, để dùng tư duy vĩ mô tác động, tạo ra tác động
              và thiết lập lại những chuẩn mực mà Farmstay toàn cầu đang làm đúng, hướng đi chân chính cho toàn ngành Farmstay Việt Nam.
            </p>
          </FadeUp>
          <FadeUp delay={0.35}>
            <div
              className="mx-auto mt-4 px-8 py-6 border-l-2 border-primary text-left font-serif text-charcoal/80 italic"
              style={{ fontSize: "clamp(1rem, 1.5vw, 1.25rem)" }}
            >
              &ldquo;Mình dùng tư duy vĩ mô để tác động, bẻ lái và thiết lập lại luật chơi chân chính
              cho toàn ngành Farmstay và Du lịch nông nghiệp Việt Nam.&rdquo;
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── DẤU ẤN XUYÊN VIỆT FARMSTAY ──────────────────────────── */}
      <section className="bg-white py-24 md:py-32">
        <div className="container-main">
          <div className="text-center mb-14">
            <FadeUp>
              <p className="gold-shine-subtle font-sans font-semibold uppercase tracking-[0.2em] text-sm mb-2">Hành Trình</p>
              <h2 className="font-serif text-charcoal" style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)" }}>
                Dấu Ấn Xuyên Việt Farmstay
              </h2>
              <div className="w-12 h-0.5 bg-primary mx-auto mt-5 mb-4" />
              <p className="font-sans text-muted text-sm max-w-xl mx-auto">
                4 mùa hành trình — kết nối cộng đồng farmstay từ Bắc vào Nam, từ biên giới đến hải đảo.
              </p>
            </FadeUp>
          </div>
          <StaggerParent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                year: "2021",
                title: "Mùa Khai Phá",
                stats: [{ label: "Mùa đầu tiên", val: "#01" }, { label: "Khởi nguồn", val: "Cộng đồng" }],
                desc: "Hành trình đặt nền móng kết nối cộng đồng farmstay toàn quốc lần đầu tiên — từ ý tưởng táo bạo đến hiện thực, mở ra một phong trào mới cho ngành du lịch nông nghiệp.",
              },
              {
                year: "2023",
                title: "Mùa Bứt Phá",
                stats: [{ label: "Quãng đường", val: "2.000km" }, { label: "Hành trình", val: "10 ngày" }, { label: "Tỉnh thành", val: "19 tỉnh" }, { label: "Thành viên", val: "90 người" }],
                desc: "Xuyên suốt 19 tỉnh thành trong 10 ngày, 90 thành viên cùng nhau khám phá và kết nối hệ sinh thái farmstay toàn quốc từ Bắc vào Nam.",
              },
              {
                year: "2024",
                title: "Mùa Di Sản",
                stats: [{ label: "Quãng đường", val: "2.000km" }, { label: "Hành trình", val: "15 ngày" }, { label: "Tỉnh thành", val: "15 tỉnh" }, { label: "Thành viên", val: "70 người" }],
                desc: "15 ngày băng qua 15 tỉnh với điểm nhấn đặc biệt: đấu giá sâm Ngọc Linh — đặc sản quý hiếm Tây Nguyên, tôn vinh di sản văn hóa bản địa vùng cao.",
              },
              {
                year: "2025",
                title: "Mùa Tiếp Nối",
                stats: [{ label: "Mùa thứ", val: "4" }, { label: "Vẫn đang", val: "Tiếp tục" }],
                desc: "Hành trình tiếp tục — mở rộng tầm nhìn, sâu thêm kết nối, lan tỏa giá trị du lịch nông nghiệp Việt Nam ra cộng đồng quốc tế.",
              },
            ].map((season, i) => (
              <StaggerChild key={i}>
                <motion.div
                  className="p-7 border border-earth/10 bg-beige/30 h-full flex flex-col relative overflow-hidden group"
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.25 }}
                >
                  <span className="gold-shine-subtle font-serif text-4xl font-bold block mb-1">{season.year}</span>
                  <h3 className="font-serif text-charcoal text-base font-medium mb-4">{season.title}</h3>
                  <div className="grid grid-cols-2 gap-2 mb-5">
                    {season.stats.map((s, j) => (
                      <div key={j} className="bg-white/80 px-3 py-2 rounded-sm text-center">
                        <p className="font-serif text-primary font-bold text-lg leading-none mb-0.5">{s.val}</p>
                        <p className="font-sans text-muted text-[10px] uppercase tracking-wide leading-tight">{s.label}</p>
                      </div>
                    ))}
                  </div>
                  <p className="font-sans text-muted text-sm leading-relaxed flex-1 text-justify">{season.desc}</p>
                  <motion.div
                    className="absolute bottom-0 left-0 h-0.5 bg-primary"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.35 }}
                  />
                </motion.div>
              </StaggerChild>
            ))}
          </StaggerParent>
        </div>
      </section>

      {/* ── NHỮNG NGƯỜI THẦY ─────────────────────────────────────── */}
      <section className="bg-white py-24 md:py-32">
        <div className="container-main">
          <div className="text-center mb-14">
            <FadeUp>
              <p className="gold-shine-subtle font-sans font-semibold uppercase tracking-[0.2em] text-sm mb-2">
                Tri Ân
              </p>
              <h2 className="font-serif text-charcoal" style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)" }}>
                Những Người Thầy Vĩ Đại
              </h2>
              <div className="w-12 h-0.5 bg-primary mx-auto mt-5 mb-4" />
              <p className="font-sans text-muted text-sm max-w-xl mx-auto">
                Không một cây cổ thụ nào vươn cao mà không có bộ rễ cắm sâu vào lòng đất mẹ.
              </p>
            </FadeUp>
          </div>

          <div ref={teachersRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teachers.map((t, i) => (
              <motion.button
                key={i}
                onClick={() => setSelectedTeacher(t)}
                className="group relative border border-earth/10 bg-beige/40 hover:bg-beige transition-colors duration-300 overflow-hidden text-left cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                animate={teachersInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: i * 0.06, ease: easeOut }}
                whileHover={{ y: -3 }}
              >
                {t.img && (
                  <div className="relative w-full h-56 overflow-hidden">
                    <Image
                      src={t.img}
                      alt={t.name}
                      fill
                      className={`object-cover transition-transform duration-700 group-hover:scale-105 ${t.cardImgPos ? "" : (t.imgPos ?? "object-center")}`}
                      style={t.cardImgPos ? { objectPosition: t.cardImgPos } : undefined}
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-beige/90 via-beige/20 to-transparent" />
                  </div>
                )}
                <div className="p-6">
                  <span className="gold-shine-subtle font-serif text-3xl font-bold block mb-3">{t.stt}</span>
                  <h3 className="font-serif text-charcoal text-base font-medium mb-2">{t.name}</h3>
                  <p className="font-sans text-muted text-sm leading-relaxed mb-4 text-justify">{t.desc}</p>
                  <span className="inline-flex items-center gap-1.5 font-sans text-xs font-semibold uppercase tracking-widest text-primary/70 group-hover:text-primary transition-colors">
                    Đọc thêm
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                      <path d="M6.5 1L11 6l-4.5 5M1 6h10" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                    </svg>
                  </span>
                </div>
                <motion.div
                  className="absolute bottom-0 left-0 h-0.5 bg-primary"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            ))}
          </div>

          {/* ── MODAL CHI TIẾT ── */}
          <AnimatePresence>
            {selectedTeacher && (
              <>
                {/* Backdrop */}
                <motion.div
                  className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setSelectedTeacher(null)}
                />
                {/* Panel */}
                <motion.div
                  className="fixed inset-x-0 bottom-0 md:inset-0 md:flex md:items-center md:justify-center z-50 p-0 md:p-6"
                  initial={{ opacity: 0, y: 60 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 40 }}
                  transition={{ duration: 0.4, ease: easeOut }}
                  onClick={() => setSelectedTeacher(null)}
                >
                  <div
                    className="relative w-full md:max-w-2xl max-h-[90vh] overflow-y-auto rounded-t-2xl md:rounded-xl"
                    style={{ background: "linear-gradient(135deg, #1C2A1C 0%, #1D3A1D 100%)" }}
                    onClick={e => e.stopPropagation()}
                    onWheel={e => { if (Math.abs(e.deltaX) > 60 && Math.abs(e.deltaX) > Math.abs(e.deltaY)) setSelectedTeacher(null); }}
                  >
                    {/* Close button */}
                    <motion.button
                      onClick={() => setSelectedTeacher(null)}
                      className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full"
                      style={{ border: "2px solid #C8A84B", color: "#C8A84B" }}
                      animate={{ boxShadow: ["0 0 0px 0px rgba(200,168,75,0)", "0 0 12px 4px rgba(200,168,75,0.5)", "0 0 0px 0px rgba(200,168,75,0)"] }}
                      transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                      whileHover={{ scale: 1.1, backgroundColor: "rgba(200,168,75,0.15)" }}
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        <path d="M1 1l12 12M13 1L1 13"/>
                      </svg>
                    </motion.button>

                    {/* Ảnh header */}
                    {selectedTeacher.img && (
                      <div className="relative w-full h-64 overflow-hidden rounded-t-2xl md:rounded-t-xl flex-shrink-0">
                        <Image
                          src={selectedTeacher.img}
                          alt={selectedTeacher.name}
                          fill
                          className="object-cover"
                          style={{ objectPosition: selectedTeacher.modalImgPos ?? "center 22%" }}
                          sizes="672px"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1C2A1C] via-[#1C2A1C]/30 to-transparent" />
                      </div>
                    )}

                    {/* Nội dung */}
                    <div className="p-8">
                      <p className="gold-shine font-sans font-semibold uppercase tracking-[0.2em] text-xs mb-2">
                        Người Thầy {selectedTeacher.stt}
                      </p>
                      <h2 className="font-serif text-white mb-1" style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)" }}>
                        {selectedTeacher.name}
                      </h2>
                      <div className="w-10 h-0.5 bg-primary mb-6" />
                      <p className="font-sans text-white/80 leading-relaxed text-base text-justify">
                        {selectedTeacher.detail}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ── TRIẾT LÝ & SỨ MỆNH ──────────────────────────────────── */}
      <section
        id="triet-ly"
        className="py-24 md:py-32 relative overflow-hidden scroll-mt-[88px]"
        style={{ background: "linear-gradient(135deg, #1C2A1C 0%, #1D3A1D 100%)" }}
      >
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle at 30% 60%, #C8A84B 0%, transparent 50%)", opacity: 0.07 }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="container-main relative z-10">
          <div className="text-center mb-14">
            <FadeUp>
              <p className="gold-shine font-sans font-semibold uppercase tracking-[0.2em] text-sm mb-2">
                Nguyên Tắc Bất Di Bất Dịch
              </p>
              <h2 className="font-serif text-white" style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)" }}>
                Triết Lý Làm Nghề
              </h2>
              <div className="w-12 h-0.5 bg-primary mx-auto mt-5" />
            </FadeUp>
          </div>

          <StaggerParent className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-20">
            {principles.map((p, i) => (
              <StaggerChild key={i}>
                <button
                  onClick={() => setSelectedPrinciple(p)}
                  className="group p-8 border transition-all duration-300 rounded-sm w-full text-left cursor-pointer focus:outline-none"
                  style={{ borderColor: "rgba(200,168,75,0.2)", background: "rgba(200,168,75,0.04)" }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = "#C8A84B")}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(200,168,75,0.2)")}
                >
                  <p className="gold-shine font-serif font-bold mb-4" style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)" }}>
                    0{i + 1}
                  </p>
                  <div className="w-8 h-px mb-4" style={{ background: "#C8A84B" }} />
                  <h3 className="font-serif text-white text-xl mb-3">{p.title}</h3>
                  <p className="font-sans text-white/60 text-sm leading-relaxed text-justify">{p.body}</p>
                  <span className="inline-flex items-center gap-1.5 mt-4 font-sans text-xs font-semibold uppercase tracking-widest text-primary/60 group-hover:text-primary transition-colors">
                    Đọc thêm
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                      <path d="M6.5 1L11 6l-4.5 5M1 6h10" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                    </svg>
                  </span>
                </button>
              </StaggerChild>
            ))}
          </StaggerParent>

          {/* ── MODAL TRIẾT LÝ ── */}
          <AnimatePresence>
            {selectedPrinciple && (
              <>
                <motion.div
                  className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setSelectedPrinciple(null)}
                />
                <motion.div
                  className="fixed inset-x-0 bottom-0 md:inset-0 md:flex md:items-center md:justify-center z-50 p-0 md:p-6"
                  initial={{ opacity: 0, y: 60 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 40 }}
                  transition={{ duration: 0.4, ease: easeOut }}
                  onClick={() => setSelectedPrinciple(null)}
                >
                  <div
                    className="relative w-full md:max-w-xl max-h-[90vh] overflow-y-auto rounded-t-2xl md:rounded-xl"
                    style={{ background: "linear-gradient(135deg, #1C2A1C 0%, #1D3A1D 100%)" }}
                    onClick={e => e.stopPropagation()}
                    onWheel={e => { if (Math.abs(e.deltaX) > 60 && Math.abs(e.deltaX) > Math.abs(e.deltaY)) setSelectedPrinciple(null); }}
                  >
                    <motion.button
                      onClick={() => setSelectedPrinciple(null)}
                      className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full"
                      style={{ border: "2px solid #C8A84B", color: "#C8A84B" }}
                      animate={{ boxShadow: ["0 0 0px 0px rgba(200,168,75,0)", "0 0 12px 4px rgba(200,168,75,0.5)", "0 0 0px 0px rgba(200,168,75,0)"] }}
                      transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                      whileHover={{ scale: 1.1, backgroundColor: "rgba(200,168,75,0.15)" }}
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        <path d="M1 1l12 12M13 1L1 13"/>
                      </svg>
                    </motion.button>
                    <div className="p-8 pt-14">
                      <p className="gold-shine font-sans font-semibold uppercase tracking-[0.2em] text-xs mb-2">
                        Nguyên Tắc 0{principles.indexOf(selectedPrinciple) + 1}
                      </p>
                      <h2 className="font-serif text-white mb-1" style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)" }}>
                        {selectedPrinciple.title}
                      </h2>
                      <div className="w-10 h-0.5 bg-primary mb-6" />
                      {selectedPrinciple.detail.split("\n\n").map((para, idx) => (
                        <p key={idx} className="font-sans text-white/80 leading-relaxed text-base mb-4 text-justify">
                          {para}
                        </p>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Sứ mệnh quốc gia */}
          <FadeUp>
            <div className="max-w-3xl mx-auto text-center">
              <p className="gold-shine font-sans font-semibold uppercase tracking-[0.2em] text-sm mb-4">
                Sứ Mệnh Cả Đời
              </p>
              <p
                className="font-serif text-white/90 leading-relaxed italic text-justify"
                style={{ fontSize: "clamp(1.1rem, 2vw, 1.5rem)" }}
              >
                &ldquo;Nâng tầm ngành du lịch nông nghiệp Việt Nam vươn lên mức độ ảnh hưởng toàn cầu.
                Định vị Việt Nam trở thành Quốc gia Du lịch Nông nghiệp độc đáo nhất trong mắt bạn bè thế giới.&rdquo;
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── CÁC GÓI ĐỒNG HÀNH ───────────────────────────────────── */}
      <section className="py-20" style={{ background: "linear-gradient(135deg, #1C2A1C 0%, #1D3A1D 100%)" }}>
        <div className="container-main">
          <FadeUp>
            <p className="gold-shine font-sans font-semibold uppercase tracking-[0.2em] text-sm text-center mb-12">
              Các Gói Đồng Hành
            </p>
          </FadeUp>

          {/* 5 nút dàn ngang */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-2">
            {services.map((s, i) => (
              <button
                key={i}
                onClick={() => setOpenServiceIdx(openServiceIdx === i ? null : i)}
                className="group text-center px-4 py-6 border transition-all duration-300 rounded-sm focus:outline-none"
                style={{
                  borderColor: openServiceIdx === i ? "#C8A84B" : "rgba(200,168,75,0.2)",
                  background: openServiceIdx === i ? "rgba(200,168,75,0.08)" : "transparent",
                }}
              >
                <p
                  className="gold-shine font-serif font-bold mb-2 transition-all duration-300"
                  style={{ fontSize: "clamp(1.4rem, 3vw, 2.2rem)" }}
                >
                  0{i + 1}
                </p>
                <p className="font-sans text-white/50 text-xs uppercase tracking-widest leading-relaxed group-hover:text-white/70 transition-colors">
                  {s.title}
                </p>
                <motion.div
                  className="mx-auto mt-3 text-primary/60"
                  animate={{ rotate: openServiceIdx === i ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M8 10.5L2.5 5h11L8 10.5z" />
                  </svg>
                </motion.div>
              </button>
            ))}
          </div>

          {/* Accordion nội dung */}
          <AnimatePresence mode="wait">
            {openServiceIdx !== null && (
              <motion.div
                key={openServiceIdx}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <div
                  className="mt-4 p-8 md:p-10 border rounded-sm"
                  style={{ borderColor: "rgba(200,168,75,0.25)", background: "rgba(200,168,75,0.05)" }}
                >
                  <div className="flex items-center gap-4 mb-8">
                    <span className="gold-shine font-serif font-bold" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
                      0{openServiceIdx + 1}
                    </span>
                    <div>
                      <div className="w-8 h-px bg-primary mb-2" />
                      <p className="font-sans text-white/70 text-sm uppercase tracking-widest">
                        {services[openServiceIdx].title}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3 mb-8">
                    {services[openServiceIdx].detail.split("\n\n").map((para, j) => (
                      <motion.div
                        key={j}
                        initial={{ opacity: 0, x: -16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.35, delay: j * 0.08, ease: [0.22, 1, 0.36, 1] }}
                        className="flex gap-3"
                      >
                        <div className="mt-2 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                        <p className="font-sans text-white/70 text-sm leading-relaxed">{para}</p>
                      </motion.div>
                    ))}
                  </div>
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.25 }}
                  >
                    <Link href="/lien-he" className="btn-lienhe inline-flex">
                      <span className="gold-shine">Liên Hệ Đăng Ký</span>
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section
        className="py-28 flex items-center justify-center text-center"
        style={{ background: "linear-gradient(135deg, #1C2A1C 0%, #1D3A1D 100%)" }}
      >
        <div className="container-main max-w-2xl">
          <FadeUp>
            <p className="gold-shine font-sans font-semibold uppercase tracking-[0.2em] text-sm mb-5">
              Kích Hoạt Hợp Tác
            </p>
          </FadeUp>
          <FadeUp delay={0.15}>
            <h2 className="font-serif text-white mb-5" style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)" }}>
              Sẵn Sàng Bước Vào Cuộc Chơi Lớn?
            </h2>
          </FadeUp>
          <FadeUp delay={0.25}>
            <div className="w-12 h-0.5 bg-primary mx-auto mb-7" />
          </FadeUp>
          <FadeUp delay={0.35}>
            <p className="font-sans text-white/60 leading-relaxed mb-10 text-sm">
              Nếu bạn cùng chung hệ giá trị và đã sẵn sàng cho một hành trình mang tầm vóc di sản —
              hãy nhấn nút kích hoạt liên hệ.
            </p>
          </FadeUp>
          <FadeUp delay={0.45}>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/lien-he" className="btn-lienhe">
                <span className="gold-shine">Liên Hệ Ngay</span>
              </Link>
              <Link href="/" className="btn-white">Về Trang Chủ</Link>
            </div>
          </FadeUp>
        </div>
      </section>

    </div>
  );
}
