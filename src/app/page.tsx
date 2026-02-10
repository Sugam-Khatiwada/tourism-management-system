import { dbConnect } from "@/lib/db";

export default async function Home() {
  await dbConnect();

  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold">
        Tourism Management System 🚀
      </h1>
    </main>
  );
}
