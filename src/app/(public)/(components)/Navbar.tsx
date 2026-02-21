import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-6 shadow">
      <h1 className="text-xl font-bold">TourismMS</h1>

      <div className="flex gap-6">
        <Link href="/search">Explore</Link>
        <Link href="/login">Login</Link>
        <Link href="/register" className="bg-black text-white px-4 py-2 rounded">
          Sign Up
        </Link>
      </div>
    </nav>
  );
}