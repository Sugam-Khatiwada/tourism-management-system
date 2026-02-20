export default function Hero() {
  return (
    <section className="text-center py-24 bg-gray-100">
      <h2 className="text-4xl font-bold mb-4">
        Plan Your Perfect Trip
      </h2>
      <p className="text-gray-600 mb-6">
        Hotels, Guides, Buses & Group Planning — All in One Place
      </p>

      <div className="flex justify-center gap-4">
        <input
          type="text"
          placeholder="Search destination..."
          suppressHydrationWarning
          className="border px-4 py-2 rounded w-80"
        />
        <button className="bg-blue-600 text-white px-6 py-2 rounded">
          Search
        </button>
      </div>
    </section>
  );
}