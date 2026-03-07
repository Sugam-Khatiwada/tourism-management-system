"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface Booking {
  _id: string;
  bookingType: "hotel" | "bus" | "guide";
  amount: number;
  status: "pending" | "confirmed" | "cancelled";
  paymentStatus: "pending" | "paid";
  createdAt: string;
}

type FilterStatus = "all" | "pending" | "confirmed" | "cancelled";

export default function TouristBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<FilterStatus>("all");
  const [cancelling, setCancelling] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/bookings")
      .then((r) => r.json())
      .then((data) => setBookings(Array.isArray(data) ? data : []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  async function handleCancel(id: string) {
    setCancelling(id);
    try {
      const res = await fetch(`/api/bookings/${id}/cancel`, { method: "PUT" });
      if (res.ok) {
        setBookings((prev) =>
          prev.map((b) => (b._id === id ? { ...b, status: "cancelled" as const } : b))
        );
      }
    } catch {
      // silently fail
    } finally {
      setCancelling(null);
    }
  }

  const filtered =
    filter === "all" ? bookings : bookings.filter((b) => b.status === filter);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-dark">My Bookings</h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage and track all your bookings
          </p>
        </div>
        <Link
          href="/dashboard/tourist"
          className="text-sm text-primary hover:underline"
        >
          ← Back to Dashboard
        </Link>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2">
        {(["all", "pending", "confirmed", "cancelled"] as FilterStatus[]).map(
          (status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors capitalize cursor-pointer ${
                filter === status
                  ? "bg-primary text-white"
                  : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
              }`}
            >
              {status} {status !== "all" && `(${bookings.filter((b) => b.status === status).length})`}
              {status === "all" && ` (${bookings.length})`}
            </button>
          )
        )}
      </div>

      {/* Bookings List */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 p-12 text-center">
          <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <h3 className="text-lg font-semibold text-gray-500 mb-1">No bookings found</h3>
          <p className="text-gray-400">
            {filter === "all"
              ? "You haven't made any bookings yet."
              : `No ${filter} bookings.`}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .map((booking) => (
              <div
                key={booking._id}
                className="bg-white rounded-xl border border-gray-100 p-6 flex items-center justify-between hover:shadow-sm transition-shadow"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      booking.bookingType === "hotel"
                        ? "bg-primary/10 text-primary"
                        : booking.bookingType === "bus"
                        ? "bg-secondary/10 text-secondary"
                        : "bg-accent/10 text-accent"
                    }`}
                  >
                    <BookingIcon type={booking.bookingType} />
                  </div>
                  <div>
                    <p className="font-semibold text-dark capitalize">
                      {booking.bookingType} Booking
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(booking.createdAt).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="font-bold text-dark">${booking.amount.toLocaleString()}</p>
                    <div className="flex gap-2 mt-1">
                      <StatusBadge status={booking.status} />
                      <PaymentBadge status={booking.paymentStatus} />
                    </div>
                  </div>

                  {booking.status === "pending" && (
                    <button
                      onClick={() => handleCancel(booking._id)}
                      disabled={cancelling === booking._id}
                      className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors disabled:opacity-50 cursor-pointer"
                    >
                      {cancelling === booking._id ? "Cancelling..." : "Cancel"}
                    </button>
                  )}
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

function BookingIcon({ type }: { type: string }) {
  switch (type) {
    case "hotel":
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      );
    case "bus":
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h8m-8 4h8m-4 4v3m-4 0h8a2 2 0 002-2V6a2 2 0 00-2-2H8a2 2 0 00-2 2v10a2 2 0 002 2zm-2 0a2 2 0 104 0m4 0a2 2 0 104 0" />
        </svg>
      );
    case "guide":
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      );
    default:
      return null;
  }
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    pending: "bg-yellow-50 text-yellow-700 border-yellow-200",
    confirmed: "bg-green-50 text-green-700 border-green-200",
    cancelled: "bg-red-50 text-red-700 border-red-200",
  };
  return (
    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium border ${styles[status] || "bg-gray-50 text-gray-700"}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

function PaymentBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    pending: "bg-orange-50 text-orange-700 border-orange-200",
    paid: "bg-emerald-50 text-emerald-700 border-emerald-200",
  };
  return (
    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium border ${styles[status] || "bg-gray-50 text-gray-700"}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}
