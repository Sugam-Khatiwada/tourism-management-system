"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface Guide {
  _id: string;
  user: {
    _id: string;
    name: string;
    email: string;
  } | string;
  bio: string;
  languages: string[];
  pricePerDay: number;
  availableDates: string[];
  rating: number;
}

export default function TouristGuidesPage() {
  const [guides, setGuides] = useState<Guide[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/guides")
      .then((r) => r.json())
      .then((data) => setGuides(Array.isArray(data) ? data : []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered = guides.filter((g) => {
    const name = typeof g.user === "object" ? g.user.name : "";
    return (
      name.toLowerCase().includes(search.toLowerCase()) ||
      g.bio?.toLowerCase().includes(search.toLowerCase()) ||
      g.languages?.some((l) => l.toLowerCase().includes(search.toLowerCase()))
    );
  });

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
          <h1 className="text-2xl font-bold text-dark">Find Guides</h1>
          <p className="text-gray-500 text-sm mt-1">
            Connect with experienced local guides for an authentic experience
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
          placeholder="Search by guide name, language, or specialty..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
        />
      </div>

      {/* Guides Grid */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 p-12 text-center">
          <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <h3 className="text-lg font-semibold text-gray-500 mb-1">No guides found</h3>
          <p className="text-gray-400">
            {search ? "Try a different search term." : "No guides available at the moment."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((guide) => {
            const guideName =
              typeof guide.user === "object" ? guide.user.name : "Guide";
            const futureAvailable = guide.availableDates?.filter(
              (d) => new Date(d) >= new Date()
            ).length || 0;

            return (
              <div
                key={guide._id}
                className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1"
              >
                {/* Guide Header */}
                <div className="bg-linear-to-r from-accent to-accent/80 p-6 text-white">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center text-xl font-bold">
                      {guideName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">{guideName}</h3>
                      <div className="flex items-center gap-1 mt-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg
                            key={star}
                            className={`w-4 h-4 ${
                              star <= Math.round(guide.rating)
                                ? "text-highlight fill-highlight"
                                : "text-white/30"
                            }`}
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                        ))}
                        <span className="text-sm text-white/80 ml-1">
                          ({guide.rating.toFixed(1)})
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Guide Details */}
                <div className="p-6">
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {guide.bio || "Experienced local guide ready to show you around."}
                  </p>

                  {/* Languages */}
                  {guide.languages && guide.languages.length > 0 && (
                    <div className="mb-4">
                      <p className="text-xs text-gray-500 uppercase font-medium mb-2">Languages</p>
                      <div className="flex flex-wrap gap-1.5">
                        {guide.languages.map((lang) => (
                          <span
                            key={lang}
                            className="px-2.5 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full"
                          >
                            {lang}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Price & Availability */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-medium">Per Day</p>
                      <p className="text-xl font-bold text-accent">
                        ${guide.pricePerDay}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500 uppercase font-medium">Available</p>
                      <p className="text-sm font-semibold text-secondary">
                        {futureAvailable} day{futureAvailable !== 1 ? "s" : ""}
                      </p>
                    </div>
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
