import { getCurrentUser } from "@/lib/getCurrentUser";
import { redirect } from "next/navigation";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) redirect("/login");

  return (
    <div className="flex min-h-screen bg-bg">
      <DashboardSidebar
        userName={user.name}
        userRole={user.role}
        userEmail={user.email}
      />
      <main className="flex-1 ml-64 p-8">{children}</main>
    </div>
  );
}