"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

type RegisterForm = {
  name: string;
  email: string;
  password: string;
  role: string;
};

const ROLES = [
  {
    value: "tourist",
    label: "Tourist",
    description: "Explore destinations and book trips",
    icon: "🌍",
  },
  {
    value: "guide",
    label: "Tour Guide",
    description: "Lead tours and share expertise",
    icon: "🧭",
  },
  {
    value: "hotel_owner",
    label: "Hotel Owner",
    description: "List and manage hotel properties",
    icon: "🏨",
  },
  {
    value: "bus_owner",
    label: "Bus Owner",
    description: "Provide transportation services",
    icon: "🚌",
  },
];

const ADMIN_ROLE = {
  value: "admin",
  label: "Admin",
  description: "Full system administration access",
  icon: "🛡️",
};

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState<RegisterForm>({
    name: "",
    email: "",
    password: "",
    role: "tourist",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // Check if current user is admin (for admin-creating-admin flow)
  useEffect(() => {
    async function checkAdmin() {
      try {
        const res = await fetch("/api/auth/profile");
        if (res.ok) {
          const user = await res.json();
          if (user.role === "admin") {
            setIsAdmin(true);
          }
        }
      } catch {
        // Not logged in or error — ignore
      }
    }
    checkAdmin();
  }, []);

  const availableRoles = isAdmin ? [...ROLES, ADMIN_ROLE] : ROLES;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify(form),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || data.message || "Registration failed");
        return;
      }

      router.push("/login");
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
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80"
          alt="Beautiful tropical beach destination"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-t from-dark/80 via-dark/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <h2 className="text-3xl font-bold mb-2">Start Your Journey</h2>
          <p className="text-white/80 text-sm leading-relaxed">
            Join thousands of travelers exploring the world&apos;s most
            beautiful destinations. Create your account and begin your adventure
            today.
          </p>
        </div>
      </div>

      {/* Right side — Form */}
      <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col justify-center">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-dark">Create Account</h2>
          <p className="text-gray-500 text-sm mt-1">
            Fill in your details to get started
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name <span className="text-accent">*</span>
            </label>
            <input
              placeholder="John Doe"
              required
              value={form.name}
              className="w-full border border-gray-300 px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

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
              placeholder="Min. 6 characters"
              type="password"
              required
              minLength={6}
              value={form.password}
              className="w-full border border-gray-300 px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>

          {/* Role Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Register as <span className="text-accent">*</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              {availableRoles.map((role) => (
                <button
                  key={role.value}
                  type="button"
                  onClick={() => setForm({ ...form, role: role.value })}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border-2 text-left transition-all text-sm ${
                    form.role === role.value
                      ? "border-primary bg-primary/5 text-dark"
                      : "border-gray-200 hover:border-gray-300 text-gray-600"
                  }`}
                >
                  <span className="text-lg">{role.icon}</span>
                  <div>
                    <p className="font-medium leading-tight">{role.label}</p>
                    <p className="text-[11px] text-gray-400 leading-tight">
                      {role.description}
                    </p>
                  </div>
                </button>
              ))}
            </div>
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
                Creating Account...
              </span>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        <p className="text-sm text-center mt-6 text-gray-500">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-primary hover:underline font-medium"
          >
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}