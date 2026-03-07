"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface Bus {
  _id: string;
  busName: string;
  routeFrom: string;
  routeTo: string;
  departureTime: string;
  seats: number;
  price: number;
}

export default function TouristBusesPage() {
  const [buses, setBuses] = useState<Bus[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/buses")
      .then((r) => r.json())
      .then((data) => setBuses(Array.isArray(data) ? data : []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered = buses.filter(
    (b) =>
      b.busName?.toLowerCase().includes(search.toLowerCase()) ||
      b.routeFrom?.toLowerCase().includes(search.toLowerCase()) ||
      b.routeTo?.toLowerCase().includes(search.toLowerCase())
  );

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
          <h1 className="text-2xl font-bold text-dark">Browse Buses</h1>
          <p className="text-gray-500 text-sm mt-1">
            Find comfortable rides to your destination
          </p>
        </div>
        <Link
          href="/dashboard/tourist"
          className="text-sm text-primary hover:underline"
        >
          ← Back to Dashboard
        </Link>
      </div>

      {/* Search */}
      <div className="relative">
        <svg
          className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          placeholder="Search by bus name, route, or destination..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
        />
      </div>

      {/* Buses List */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 p-12 text-center">
          <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h8m-8 4h8m-4 4v3m-4 0h8a2 2 0 002-2V6a2 2 0 00-2-2H8a2 2 0 00-2 2v10a2 2 0 002 2zm-2 0a2 2 0 104 0m4 0a2 2 0 104 0" />
          </svg>
          <h3 className="text-lg font-semibold text-gray-500 mb-1">No buses found</h3>
          <p className="text-gray-400">
            {search ? "Try a different search term." : "No bus routes available at the moment."}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((bus) => {
            const departure = new Date(bus.departureTime);
            const isPast = departure < new Date();

            return (
              <div
                key={bus._id}
                className={`bg-white rounded-xl border border-gray-100 p-6 hover:shadow-md transition-all ${
                  isPast ? "opacity-60" : ""
                }`}
              >
                <div className="flex items-center justify-between">
                  {/* Route Info */}
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 bg-secondary/10 text-secondary rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h8m-8 4h8m-4 4v3m-4 0h8a2 2 0 002-2V6a2 2 0 00-2-2H8a2 2 0 00-2 2v10a2 2 0 002 2zm-2 0a2 2 0 104 0m4 0a2 2 0 104 0" />
                      </svg>
                    </div>

                    <div>
                      <h3 className="font-bold text-dark text-lg">{bus.busName}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm font-medium text-dark">{bus.routeFrom}</span>
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                        <span className="text-sm font-medium text-dark">{bus.routeTo}</span>
                      </div>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="flex items-center gap-8">
                    <div className="text-center">
                      <p className="text-xs text-gray-500 uppercase font-medium">Departure</p>
                      <p className="text-sm font-semibold text-dark">
                        {departure.toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                      <p className="text-xs text-gray-500">
                        {departure.toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>

                    <div className="text-center">
                      <p className="text-xs text-gray-500 uppercase font-medium">Seats</p>
                      <p className="text-sm font-semibold text-dark">{bus.seats}</p>
                    </div>

                    <div className="text-center">
                      <p className="text-xs text-gray-500 uppercase font-medium">Price</p>
                      <p className="text-xl font-bold text-secondary">${bus.price}</p>
                    </div>

                    {isPast ? (
                      <span className="px-4 py-2 text-sm font-medium text-gray-400 bg-gray-100 rounded-lg">
                        Departed
                      </span>
                    ) : (
                      <span className="px-4 py-2 text-sm font-medium text-secondary bg-secondary/10 rounded-lg">
                        Available
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
