import { getCurrentUser } from "@/lib/getCurrentUser";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) redirect("/login");

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-dark text-white p-6">
        <h2 className="text-xl font-bold mb-6">Dashboard</h2>
        <p>{user.name}</p>
        <p className="text-sm text-primary">{user.role}</p>
      </aside>

      <main className="flex-1 p-10">{children}</main>
    </div>
  );
}