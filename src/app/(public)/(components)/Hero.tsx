export default function Hero() {
  return (
    <section className="text-center py-24 bg-neutral/30">
      <h2 className="text-4xl font-bold mb-4 text-dark">
        Plan Your Perfect Trip
      </h2>
      <p className="text-dark/70 mb-6">
        Hotels, Guides, Buses & Group Planning — All in One Place
      </p>

      <div className="flex justify-center gap-4">
        <input
          type="text"
          placeholder="Search destination..."
          suppressHydrationWarning
          className="border border-neutral px-4 py-2 rounded w-80 focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button className="bg-accent text-white px-6 py-2 rounded hover:bg-accent/85 transition">
          Search
        </button>
      </div>
    </section>
  );
}