"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface Room {
  roomNumber: string;
  price: number;
  capacity: number;
  isAvailable: boolean;
}

interface Hotel {
  _id: string;
  name: string;
  location: string;
  rooms: Room[];
}

export default function TouristHotelsPage() {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/hotels")
      .then((r) => r.json())
      .then((data) => setHotels(Array.isArray(data) ? data : []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered = hotels.filter(
    (h) =>
      h.name.toLowerCase().includes(search.toLowerCase()) ||
      h.location.toLowerCase().includes(search.toLowerCase())
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
          <h1 className="text-2xl font-bold text-dark">Browse Hotels</h1>
          <p className="text-gray-500 text-sm mt-1">
            Find the perfect accommodation for your next trip
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
          placeholder="Search hotels by name or location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
        />
      </div>

      {/* Hotels Grid */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 p-12 text-center">
          <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          <h3 className="text-lg font-semibold text-gray-500 mb-1">No hotels found</h3>
          <p className="text-gray-400">
            {search ? "Try a different search term." : "No hotels available at the moment."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((hotel) => {
            const availableRooms = hotel.rooms.filter((r) => r.isAvailable);
            const lowestPrice = hotel.rooms.length > 0
              ? Math.min(...hotel.rooms.map((r) => r.price))
              : 0;

            return (
              <div
                key={hotel._id}
                className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1"
              >
                {/* Hotel Header */}
                <div className="bg-linear-to-r from-primary to-primary/80 p-6 text-white">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-3">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold">{hotel.name}</h3>
                  <div className="flex items-center gap-1 text-white/80 text-sm mt-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {hotel.location}
                  </div>
                </div>

                {/* Hotel Details */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-medium">Starting from</p>
                      <p className="text-xl font-bold text-dark">
                        ${lowestPrice.toLocaleString()}
                        <span className="text-sm font-normal text-gray-500">/night</span>
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500 uppercase font-medium">Rooms</p>
                      <p className="text-sm font-semibold">
                        <span className="text-secondary">{availableRooms.length}</span>
                        <span className="text-gray-400"> / {hotel.rooms.length}</span>
                        <span className="text-xs text-gray-500 ml-1">available</span>
                      </p>
                    </div>
                  </div>

                  {/* Room Types */}
                  {hotel.rooms.length > 0 && (
                    <div className="space-y-2 mb-4">
                      {hotel.rooms.slice(0, 3).map((room, i) => (
                        <div
                          key={i}
                          className={`flex items-center justify-between text-sm p-2 rounded-lg ${
                            room.isAvailable ? "bg-green-50" : "bg-gray-50"
                          }`}
                        >
                          <span className="font-medium">
                            Room {room.roomNumber}
                            <span className="text-gray-500 ml-1">({room.capacity} guests)</span>
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">${room.price}</span>
                            {room.isAvailable ? (
                              <span className="text-xs text-green-600">Available</span>
                            ) : (
                              <span className="text-xs text-gray-400">Occupied</span>
                            )}
                          </div>
                        </div>
                      ))}
                      {hotel.rooms.length > 3 && (
                        <p className="text-xs text-gray-400 text-center">
                          +{hotel.rooms.length - 3} more rooms
                        </p>
                      )}
                    </div>
                  )}

                  {availableRooms.length > 0 ? (
                    <div className="text-sm text-center text-secondary font-medium bg-secondary/10 rounded-lg py-2">
                      {availableRooms.length} room{availableRooms.length > 1 ? "s" : ""} available
                    </div>
                  ) : (
                    <div className="text-sm text-center text-gray-400 bg-gray-50 rounded-lg py-2">
                      No rooms available
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
