import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import PlanningForm from "./PlanningForm";

export default async function MoiPage() {
  const user = await getSession();
  if (!user) redirect("/dang-nhap");
  return <PlanningForm />;
}
