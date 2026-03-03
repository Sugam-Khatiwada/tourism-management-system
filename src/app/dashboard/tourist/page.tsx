import { getCurrentUser } from "@/lib/getCurrentUser";

export default async function TouristDashboard() {
  const user = await getCurrentUser();

  return (
    <>
      <h1 className="text-2xl font-bold">Tourist Dashboard</h1>
      <p>Welcome back, {user?.name}</p>
      <p>Your bookings will appear here.</p>
    </>
  );
}