import { getCurrentUser } from "@/lib/getCurrentUser";
import { redirect } from "next/navigation";

export default async function AdminDashboard() {
  const user = await getCurrentUser();

  if (!user || user.role !== "admin") {
    redirect("/dashboard");
  }

  return (
    <>
      <h1 className="text-2xl font-bold">Admin Panel</h1>
      <p>System management and approvals.</p>
    </>
  );
}