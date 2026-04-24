import { redirect, notFound } from "next/navigation";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import ResultView from "./ResultView";
import type { PlanResult } from "@/lib/planning-engine";

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await getSession();
  if (!user) redirect("/dang-nhap");

  const project = await prisma.project.findFirst({
    where: { id, userId: user.id },
    include: { inputs: true, result: true },
  });
  if (!project) notFound();

  const result: PlanResult | null = project.result ? JSON.parse(project.result.data) : null;
  const isFree = !project.isPaid;

  return <ResultView project={project} result={result} isFree={isFree} />;
}
