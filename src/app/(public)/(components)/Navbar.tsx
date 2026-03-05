"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    fetch("/api/auth/profile")
      .then((res) => {
        if (res.ok) setIsLoggedIn(true);
      })
      .catch(() => {});
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-8 py-4 bg-white/90 backdrop-blur-md shadow-sm">
      <Link href="/" className="flex items-center gap-2">
        <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <span className="text-xl font-bold text-dark tracking-tight">Tourism<span className="text-primary">MS</span></span>
      </Link>

      <div className="hidden md:flex items-center gap-8">
        <Link href="#destinations" className="text-dark/70 hover:text-primary transition-colors text-sm font-medium">
          Destinations
        </Link>
        <Link href="#features" className="text-dark/70 hover:text-primary transition-colors text-sm font-medium">
          Services
        </Link>
        <Link href="#testimonials" className="text-dark/70 hover:text-primary transition-colors text-sm font-medium">
          Reviews
        </Link>
      </div>

      <div className="flex items-center gap-3">
        {isLoggedIn ? (
          <Link
            href="/dashboard"
            className="bg-primary text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-dark transition-all shadow-md hover:shadow-lg"
          >
            Dashboard
          </Link>
        ) : (
          <>
            <Link
              href="/login"
              className="text-dark font-medium text-sm hover:text-primary transition-colors px-4 py-2"
            >
              Log In
            </Link>
            <Link
              href="/register"
              className="bg-primary text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-dark transition-all shadow-md hover:shadow-lg"
            >
              Get Started
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}