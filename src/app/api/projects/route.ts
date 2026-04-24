import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { generatePlanResult } from "@/lib/planning-engine";

export async function POST(req: Request) {
  try {
    const user = await getSession();
    if (!user) return NextResponse.json({ error: "Chưa đăng nhập" }, { status: 401 });

    const body = await req.json();
    const { name, ...inputs } = body;

    // Check freemium: first time free
    const projectCount = await prisma.project.count({ where: { userId: user.id } });
    const isFree = projectCount === 0;

    const project = await prisma.project.create({
      data: {
        userId: user.id,
        name: name || "Dự án chưa đặt tên",
        isPaid: !isFree,
        inputs: {
          create: {
            province: inputs.province,
            area: parseFloat(inputs.area),
            tourismType: inputs.tourismType,
            terrain: inputs.terrain,
            budget: parseFloat(inputs.budget),
            fundingSource: inputs.fundingSource,
            targetPayback: parseInt(inputs.targetPayback),
            targetRevenue: parseFloat(inputs.targetRevenue),
            climate: inputs.climate,
            waterSource: inputs.waterSource,
            existingCrops: inputs.existingCrops || null,
            infrastructure: inputs.infrastructure || null,
            landscape: inputs.landscape || null,
            targetGuests: inputs.targetGuests,
            roomCount: parseInt(inputs.roomCount),
            serviceLevel: inputs.serviceLevel,
            activities: JSON.stringify(inputs.activities || []),
          },
        },
      },
    });

    // Generate analysis
    const result = generatePlanResult({ ...inputs, activities: inputs.activities || [] }, project.id);

    await prisma.planResult.create({
      data: {
        projectId: project.id,
        data: JSON.stringify(result),
      },
    });

    await prisma.project.update({
      where: { id: project.id },
      data: { status: "completed" },
    });

    return NextResponse.json({ id: project.id, isFree });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Lỗi server" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const user = await getSession();
    if (!user) return NextResponse.json({ error: "Chưa đăng nhập" }, { status: 401 });
    const projects = await prisma.project.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
      include: { inputs: true },
    });
    return NextResponse.json(projects);
  } catch {
    return NextResponse.json({ error: "Lỗi server" }, { status: 500 });
  }
}
