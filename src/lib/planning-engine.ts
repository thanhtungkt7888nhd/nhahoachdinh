export interface PlanInputData {
  // Bước 1
  province: string;
  area: number;
  tourismType: "farmstay" | "eco" | "agri" | "nature";
  terrain: "flatland" | "highland" | "coastal" | "riverside";

  // Bước 2
  budget: number;
  fundingSource: "self" | "loan" | "mixed";
  targetPayback: number;
  targetRevenue: number;

  // Bước 3
  climate: "tropical" | "subtropical" | "highland";
  waterSource: string;
  existingCrops?: string;
  infrastructure?: string;
  landscape?: string;

  // Bước 4
  targetGuests: string;
  roomCount: number;
  serviceLevel: "budget" | "mid" | "luxury";
  activities: string[];
}

export interface Scenario {
  name: string;
  type: "conservative" | "balanced" | "optimistic";
  description: string;
  occupancyRate: number;
  avgRoomPrice: number;
  yearlyRevenue: number;
  yearlyCost: number;
  yearlyProfit: number;
  roi: number;
  breakEvenMonths: number;
  revenueByYear: { year: number; revenue: number; cost: number; profit: number }[];
}

export interface SwotAnalysis {
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
}

export interface PlanResult {
  projectId: string;
  positioning: {
    brand: string;
    tagline: string;
    description: string;
    targetSegment: string;
  };
  swot: SwotAnalysis;
  scenarios: Scenario[];
  spaceDesign: {
    category: string;
    items: string[];
    estimatedCost: number;
    priority: "high" | "medium" | "low";
  }[];
  roadmap: {
    phase: number;
    title: string;
    duration: string;
    tasks: string[];
    budget: number;
  }[];
  recommendedActivities: {
    name: string;
    description: string;
    season: string;
    targetGuest: string;
  }[];
}

const TOURISM_TYPE_LABELS: Record<string, string> = {
  farmstay: "Farmstay",
  eco: "Du lịch sinh thái",
  agri: "Du lịch nông nghiệp",
  nature: "Du lịch thiên nhiên",
};

const TERRAIN_LABELS: Record<string, string> = {
  flatland: "đồng bằng",
  highland: "đồi núi",
  coastal: "ven biển",
  riverside: "ven sông",
};

const SERVICE_LEVEL_LABELS: Record<string, string> = {
  budget: "bình dân",
  mid: "trung cấp",
  luxury: "cao cấp",
};

function getRoomPriceRange(serviceLevel: string, terrain: string): [number, number] {
  const base: Record<string, [number, number]> = {
    budget: [300000, 600000],
    mid: [700000, 1500000],
    luxury: [1800000, 5000000],
  };
  const terrainMultiplier: Record<string, number> = {
    coastal: 1.3,
    highland: 1.2,
    riverside: 1.1,
    flatland: 1.0,
  };
  const [min, max] = base[serviceLevel] || base.mid;
  const m = terrainMultiplier[terrain] || 1;
  return [Math.round(min * m), Math.round(max * m)];
}

function buildScenario(
  type: "conservative" | "balanced" | "optimistic",
  input: PlanInputData,
  roomPrice: number,
  occupancy: number
): Scenario {
  const names = {
    conservative: "Thận trọng",
    balanced: "Cân bằng",
    optimistic: "Lạc quan",
  };
  const descriptions = {
    conservative: "Kịch bản an toàn, phù hợp nếu thị trường chưa quen với mô hình.",
    balanced: "Kịch bản thực tế nhất dựa trên trung bình ngành du lịch sinh thái Việt Nam.",
    optimistic: "Kịch bản lý tưởng khi marketing tốt và vị trí đắc địa.",
  };

  const yearlyRooms = input.roomCount * 365 * occupancy;
  const yearlyRevenue = yearlyRooms * roomPrice;
  const opexRatio = input.serviceLevel === "luxury" ? 0.45 : input.serviceLevel === "mid" ? 0.5 : 0.55;
  const yearlyCost = yearlyRevenue * opexRatio + input.budget * 0.05;
  const yearlyProfit = yearlyRevenue - yearlyCost;
  const roi = (yearlyProfit / input.budget) * 100;
  const breakEvenMonths = Math.ceil((input.budget / yearlyProfit) * 12);

  const revenueByYear = Array.from({ length: 5 }, (_, i) => {
    const growth = type === "conservative" ? 0.05 : type === "balanced" ? 0.1 : 0.15;
    const yr = yearlyRevenue * Math.pow(1 + growth, i);
    const cost = yr * opexRatio + input.budget * 0.03;
    return {
      year: i + 1,
      revenue: Math.round(yr),
      cost: Math.round(cost),
      profit: Math.round(yr - cost),
    };
  });

  return {
    name: names[type],
    type,
    description: descriptions[type],
    occupancyRate: Math.round(occupancy * 100),
    avgRoomPrice: roomPrice,
    yearlyRevenue: Math.round(yearlyRevenue),
    yearlyCost: Math.round(yearlyCost),
    yearlyProfit: Math.round(yearlyProfit),
    roi: Math.round(roi * 10) / 10,
    breakEvenMonths,
    revenueByYear,
  };
}

function buildSwot(input: PlanInputData): SwotAnalysis {
  const strengths: string[] = [];
  const weaknesses: string[] = [];
  const opportunities: string[] = [];
  const threats: string[] = [];

  if (input.area >= 5) strengths.push(`Diện tích ${input.area}ha đủ lớn để phát triển đa dạng sản phẩm trải nghiệm.`);
  if (input.terrain === "coastal") strengths.push("Vị trí ven biển là lợi thế thu hút khách du lịch nghỉ dưỡng.");
  if (input.terrain === "highland") strengths.push("Địa hình đồi núi tạo cảnh quan thiên nhiên độc đáo, khí hậu mát mẻ.");
  if (input.terrain === "riverside") strengths.push("Cạnh sông suối tạo điểm nhấn thiên nhiên và nguồn nước dồi dào.");
  if (input.existingCrops) strengths.push(`Đã có sẵn ${input.existingCrops} – lợi thế cho trải nghiệm nông nghiệp thực thụ.`);
  if (input.fundingSource === "self") strengths.push("Nguồn vốn tự có giúp chủ động trong quyết định và không áp lực lãi suất.");

  if (input.budget < 2000000000) weaknesses.push("Ngân sách hạn chế cần ưu tiên hạng mục thiết yếu, tránh dàn trải.");
  if (!input.infrastructure) weaknesses.push("Cơ sở hạ tầng chưa rõ ràng – cần đánh giá thực địa về đường, điện, nước.");
  if (input.fundingSource === "loan") weaknesses.push("Vay ngân hàng tạo áp lực hoàn vốn – cần kiểm soát dòng tiền chặt chẽ.");
  if (input.roomCount < 5) weaknesses.push("Ít phòng có thể làm giảm doanh thu, khó đạt điểm hòa vốn sớm.");

  opportunities.push("Nhu cầu du lịch nội địa ngắn ngày cuối tuần đang tăng mạnh sau COVID-19.");
  if (input.tourismType === "farmstay") opportunities.push("Xu hướng 'back to nature' và trải nghiệm nông trại hữu cơ ngày càng phổ biến với giới trẻ.");
  if (input.tourismType === "eco") opportunities.push("Du lịch sinh thái được Chính phủ ưu tiên phát triển với nhiều chính sách hỗ trợ.");
  opportunities.push("Mạng xã hội (TikTok, Instagram) giúp viral chi phí thấp nếu thiết kế check-in đẹp.");
  opportunities.push("Có thể hợp tác với các công ty du lịch, trường học để đặt tour tập thể.");

  threats.push("Cạnh tranh ngày càng tăng từ các mô hình farmstay/homestay mới mở trong khu vực.");
  if (input.climate === "tropical") threats.push("Mùa mưa kéo dài ảnh hưởng đến tỷ lệ lấp đầy phòng theo mùa vụ.");
  threats.push("Biến động kinh tế có thể ảnh hưởng đến chi tiêu du lịch tùy ý của người dân.");
  threats.push("Quy định pháp lý về đất nông nghiệp và xây dựng cần được tìm hiểu kỹ trước khi đầu tư.");

  return { strengths, weaknesses, opportunities, threats };
}

function buildSpaceDesign(input: PlanInputData): PlanResult["spaceDesign"] {
  const perRoomCost = input.serviceLevel === "luxury" ? 500000000 : input.serviceLevel === "mid" ? 250000000 : 120000000;
  const items: PlanResult["spaceDesign"] = [];

  items.push({
    category: "Khu lưu trú",
    items: [
      `${input.roomCount} phòng/cabin tiêu chuẩn ${SERVICE_LEVEL_LABELS[input.serviceLevel]}`,
      "Nhà vệ sinh riêng mỗi phòng, nước nóng lạnh",
      "Bảo đảm thông gió, cách âm tốt",
      input.serviceLevel === "luxury" ? "Ban công view thiên nhiên, bồn tắm" : "Hiên ngồi uống trà",
    ],
    estimatedCost: input.roomCount * perRoomCost,
    priority: "high",
  });

  items.push({
    category: "Khu tiếp đón & Sinh hoạt chung",
    items: [
      "Nhà đón khách / Reception (20–40m²)",
      "Nhà ăn / Bếp phục vụ ăn sáng hoặc fullboard",
      "Không gian nghỉ ngơi ngoài trời: võng, ghế, lửa trại",
      "Khu chơi dành cho trẻ em (nếu target gia đình)",
    ],
    estimatedCost: Math.round(input.budget * 0.15),
    priority: "high",
  });

  if (input.tourismType === "farmstay" || input.tourismType === "agri") {
    items.push({
      category: "Khu nông trại trải nghiệm",
      items: [
        "Vườn rau sạch hữu cơ có thể hái tự do",
        "Khu chăn nuôi gà, vịt, thỏ cho khách tương tác",
        "Nhà kho, chuồng trại sạch sẽ, có che chắn",
        "Bảng giải thích cây trồng song ngữ Việt – Anh",
      ],
      estimatedCost: Math.round(input.budget * 0.1),
      priority: "high",
    });
  }

  if (input.terrain === "coastal" || input.waterSource.includes("river") || input.waterSource.includes("lake")) {
    items.push({
      category: "Khu hoạt động nước",
      items: [
        "Bến đậu thuyền kayak / thuyền gỗ",
        "Khu vực câu cá có mái che",
        "Không gian picnic ven nước",
        "Hệ thống an toàn: áo phao, biển cảnh báo",
      ],
      estimatedCost: Math.round(input.budget * 0.08),
      priority: "medium",
    });
  }

  items.push({
    category: "Hạ tầng & Cảnh quan",
    items: [
      "Đường nội khu (bê tông hoặc đá cuội tự nhiên)",
      "Hệ thống điện, nước, xử lý nước thải",
      "Cây xanh, hoa, đèn chiếu sáng cảnh quan",
      "Biển hiệu thương hiệu, điểm check-in đặc trưng",
      "Bãi đậu xe ô tô, xe máy",
    ],
    estimatedCost: Math.round(input.budget * 0.2),
    priority: "high",
  });

  return items;
}

function buildRoadmap(input: PlanInputData): PlanResult["roadmap"] {
  const totalBudget = input.budget;
  return [
    {
      phase: 1,
      title: "Chuẩn bị & Hạ tầng cơ bản",
      duration: "Tháng 1–4",
      tasks: [
        "Hoàn thiện pháp lý đất đai, xin giấy phép xây dựng",
        "San ủi mặt bằng, làm đường nội khu",
        "Kéo điện, nước sạch đến khu vực xây dựng",
        "Xây dựng khu lưu trú (50% số phòng đầu tiên)",
        "Lắp đặt hệ thống xử lý nước thải",
      ],
      budget: Math.round(totalBudget * 0.45),
    },
    {
      phase: 2,
      title: "Xây dựng khu trải nghiệm & Thương hiệu",
      duration: "Tháng 4–8",
      tasks: [
        "Hoàn thiện nốt các phòng còn lại",
        "Xây nhà đón khách, nhà ăn, bếp",
        "Thi công khu nông trại/trải nghiệm",
        "Thiết kế và triển khai nhận diện thương hiệu",
        "Xây dựng website, fanpage, đăng ký trên Airbnb/Booking",
        "Tuyển dụng và đào tạo nhân viên 2–4 người",
      ],
      budget: Math.round(totalBudget * 0.35),
    },
    {
      phase: 3,
      title: "Vận hành thử & Mở rộng",
      duration: "Tháng 8–12",
      tasks: [
        "Vận hành thử nghiệm với khách mời (gia đình, bạn bè)",
        "Thu thập phản hồi, cải tiến dịch vụ",
        "Grand opening – mở đặt phòng chính thức",
        "Triển khai marketing: KOL, content, review",
        "Dự phòng vốn lưu động cho 3 tháng đầu",
        "Đánh giá hiệu quả và lập kế hoạch mở rộng năm 2",
      ],
      budget: Math.round(totalBudget * 0.2),
    },
  ];
}

function buildActivities(input: PlanInputData): PlanResult["recommendedActivities"] {
  const activities: PlanResult["recommendedActivities"] = [];

  if (input.tourismType === "farmstay" || input.tourismType === "agri") {
    activities.push(
      {
        name: "Thu hoạch rau củ quả",
        description: "Khách tự tay hái rau, trái cây tươi tại vườn và mang về dùng bữa.",
        season: "Quanh năm",
        targetGuest: "Gia đình, học sinh",
      },
      {
        name: "Nấu ăn cùng nông dân",
        description: "Học chế biến món ăn truyền thống từ nguyên liệu vườn nhà.",
        season: "Quanh năm",
        targetGuest: "Cặp đôi, gia đình",
      },
      {
        name: "Chăm sóc vật nuôi",
        description: "Cho gà, thỏ ăn, vắt sữa, thu trứng – trải nghiệm sống nhà nông.",
        season: "Quanh năm",
        targetGuest: "Trẻ em, học sinh",
      }
    );
  }

  if (input.terrain === "highland") {
    activities.push(
      {
        name: "Trekking khám phá rừng",
        description: "Dẫn tour khám phá rừng nguyên sinh, thác nước, hang động với hướng dẫn viên bản địa.",
        season: "Mùa khô (11–4)",
        targetGuest: "Nhóm bạn, doanh nghiệp",
      },
      {
        name: "Lửa trại & Ngắm sao",
        description: "Lửa trại tập thể với âm nhạc, nướng BBQ, ngắm sao trời đêm không ô nhiễm ánh sáng.",
        season: "Quanh năm",
        targetGuest: "Tất cả đối tượng",
      }
    );
  }

  if (input.terrain === "coastal") {
    activities.push(
      {
        name: "Kayak & Bơi lội",
        description: "Chèo kayak khám phá bờ biển, tắm biển, snorkeling ngắm san hô.",
        season: "Mùa hè (4–10)",
        targetGuest: "Thanh niên, gia đình",
      },
      {
        name: "Câu cá & Nướng cá",
        description: "Ra khơi câu cá cùng ngư dân, đánh bắt và nướng ngay trên bãi biển.",
        season: "Quanh năm",
        targetGuest: "Nhóm bạn, gia đình",
      }
    );
  }

  if (input.terrain === "riverside") {
    activities.push(
      {
        name: "Bơi thuyền thăm quan",
        description: "Thuyền gỗ dọc sông ngắm cảnh bình minh/hoàng hôn với trà và bánh địa phương.",
        season: "Quanh năm",
        targetGuest: "Cặp đôi, gia đình",
      }
    );
  }

  activities.push(
    {
      name: "Yoga & Thiền buổi sáng",
      description: "Lớp yoga/thiền định ngoài trời giữa thiên nhiên – phục vụ khách cần nghỉ ngơi phục hồi.",
      season: "Quanh năm",
      targetGuest: "Phụ nữ, nhóm wellness",
    },
    {
      name: "Workshop thủ công địa phương",
      description: "Làm gốm, đan lát, nhuộm vải batik, làm hương – mang sản phẩm về làm kỷ niệm.",
      season: "Quanh năm",
      targetGuest: "Cặp đôi, nhóm doanh nghiệp",
    },
    {
      name: "Teambuilding doanh nghiệp",
      description: "Các hoạt động gắn kết đội nhóm: thử thách nông trại, nấu ăn thi đấu, cắm trại.",
      season: "Quanh năm",
      targetGuest: "Nhóm doanh nghiệp",
    }
  );

  return activities;
}

export function generatePlanResult(input: PlanInputData, projectId: string): PlanResult {
  const [minPrice, maxPrice] = getRoomPriceRange(input.serviceLevel, input.terrain);
  const avgPrice = Math.round((minPrice + maxPrice) / 2);

  const tourismLabel = TOURISM_TYPE_LABELS[input.tourismType];
  const terrainLabel = TERRAIN_LABELS[input.terrain];
  const serviceLevelLabel = SERVICE_LEVEL_LABELS[input.serviceLevel];

  return {
    projectId,
    positioning: {
      brand: `${tourismLabel} ${terrainLabel} ${input.province}`,
      tagline: `Về với thiên nhiên – Chữa lành tâm hồn`,
      description: `Mô hình ${tourismLabel} chuẩn ${serviceLevelLabel} tại vùng ${terrainLabel} ${input.province}, khai thác tài nguyên bản địa và mang đến trải nghiệm chân thực cho khách du lịch hiện đại.`,
      targetSegment:
        input.serviceLevel === "luxury"
          ? "Khách thành thị thu nhập cao, cặp đôi, nhóm gia đình lên kế hoạch kỹ"
          : input.serviceLevel === "mid"
          ? "Gia đình trẻ, nhóm bạn, dân văn phòng tìm kiếm nghỉ dưỡng cuối tuần"
          : "Học sinh, sinh viên, khách du lịch tiết kiệm, nhóm trải nghiệm",
    },
    swot: buildSwot(input),
    scenarios: [
      buildScenario("conservative", input, Math.round(avgPrice * 0.8), 0.35),
      buildScenario("balanced", input, avgPrice, 0.55),
      buildScenario("optimistic", input, Math.round(avgPrice * 1.2), 0.75),
    ],
    spaceDesign: buildSpaceDesign(input),
    roadmap: buildRoadmap(input),
    recommendedActivities: buildActivities(input),
  };
}
