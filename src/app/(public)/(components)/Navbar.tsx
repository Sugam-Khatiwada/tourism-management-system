import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-6 shadow bg-white">
      <h1 className="text-xl font-bold text-dark">TourismMS</h1>

      <div className="flex gap-6 items-center">
        <Link href="/search" className="text-dark hover:text-primary transition">Explore</Link>
        <Link href="/login" className="text-dark hover:text-primary transition">Login</Link>
        <Link href="/register" className="bg-primary text-white px-4 py-2 rounded hover:bg-dark transition">
          Sign Up
        </Link>
      </div>
    </nav>
  );
}