import { redirect, notFound } from "next/navigation";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import ReportView from "./ReportView";
import type { PlanResult } from "@/lib/planning-engine";

export default async function BaoCaoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await getSession();
  if (!user) redirect("/dang-nhap");

  const project = await prisma.project.findFirst({
    where: { id, userId: user.id },
    include: { inputs: true, result: true },
  });
  if (!project || !project.isPaid) redirect(`/hoach-dinh/${id}`);
  if (!project.result) notFound();

  const result: PlanResult = JSON.parse(project.result.data);
  return <ReportView project={project} result={result} />;
}
