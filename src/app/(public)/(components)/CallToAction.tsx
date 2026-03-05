"use client";

import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/providers/AuthProvider";

export default function CallToAction() {
  const { isLoggedIn } = useAuth();
  return (
    <section className="relative py-28 overflow-hidden">
      <Image
        src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1920&q=80"
        alt="Travel adventure"
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-dark/60" />

      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
          Ready for Your Next
          <span className="text-highlight"> Adventure?</span>
        </h2>
        <p className="text-white/80 text-lg mb-10 max-w-xl mx-auto">
          Join thousands of travelers who plan, book, and explore with confidence.
          Your dream trip is just a click away.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {isLoggedIn ? (
            <Link
              href="/dashboard"
              className="bg-accent hover:bg-accent/85 text-white font-semibold px-10 py-4 rounded-full text-lg transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Go to Dashboard
            </Link>
          ) : (
            <>
              <Link
                href="/register"
                className="bg-accent hover:bg-accent/85 text-white font-semibold px-10 py-4 rounded-full text-lg transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                Create Free Account
              </Link>
              <Link
                href="/login"
                className="bg-white/10 backdrop-blur-sm border border-white/30 text-white font-semibold px-10 py-4 rounded-full text-lg hover:bg-white/20 transition-all"
              >
                Sign In
              </Link>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
