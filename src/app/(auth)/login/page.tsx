"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

type LoginForm = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState<LoginForm>({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(form),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || data.message || "Login failed");
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row">
      {/* Left side — Image */}
      <div className="relative hidden md:block md:w-1/2">
        <Image
          src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=80"
          alt="Scenic mountain lake with turquoise water"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-t from-dark/80 via-dark/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
          <p className="text-white/80 text-sm leading-relaxed">
            Sign in to access your bookings, manage trips, and continue
            exploring the world&apos;s most amazing destinations.
          </p>
        </div>
      </div>

      {/* Right side — Form */}
      <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col justify-center">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-dark">Sign In</h2>
          <p className="text-gray-500 text-sm mt-1">
            Enter your credentials to access your account
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address <span className="text-accent">*</span>
            </label>
            <input
              placeholder="you@example.com"
              type="email"
              required
              value={form.email}
              className="w-full border border-gray-300 px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password <span className="text-accent">*</span>
            </label>
            <input
              placeholder="Enter your password"
              type="password"
              required
              value={form.password}
              className="w-full border border-gray-300 px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-dark transition disabled:opacity-50 disabled:cursor-not-allowed mt-2"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                Signing in...
              </span>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <p className="text-sm text-center mt-6 text-gray-500">
          Don&apos;t have an account?{" "}
          <a
            href="/register"
            className="text-primary hover:underline font-medium"
          >
            Create one
          </a>
        </p>
      </div>
    </div>
  );
}