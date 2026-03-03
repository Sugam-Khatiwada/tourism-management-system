import { getCurrentUser } from "@/lib/getCurrentUser";
import { redirect } from "next/navigation";

export default async function DashboardEntry() {
  const user = await getCurrentUser();

  if (!user) redirect("/login");

  switch (user.role) {
    case "tourist":
      redirect("/dashboard/tourist");

    case "guide":
      redirect("/dashboard/guide");

    case "hotel_owner":
      redirect("/dashboard/hotel");

    case "bus_owner":
      redirect("/dashboard/bus");

    case "admin":
      redirect("/dashboard/admin");

    default:
      redirect("/");
  }
}