import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await getSession();
  if (!user) return NextResponse.json({ error: "Chưa đăng nhập" }, { status: 401 });

  const project = await prisma.project.findFirst({
    where: { id, userId: user.id },
    include: { inputs: true, result: true },
  });
  if (!project) return NextResponse.json({ error: "Không tìm thấy" }, { status: 404 });

  return NextResponse.json({
    ...project,
    result: project.result ? JSON.parse(project.result.data) : null,
  });
}
