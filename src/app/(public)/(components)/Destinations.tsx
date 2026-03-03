import Image from "next/image";

const destinations = [
  {
    name: "Bali, Indonesia",
    tagline: "Island Paradise",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80",
    rating: "4.9",
  },
  {
    name: "Santorini, Greece",
    tagline: "Mediterranean Dream",
    image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800&q=80",
    rating: "4.8",
  },
  {
    name: "Swiss Alps",
    tagline: "Mountain Majesty",
    image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&q=80",
    rating: "4.9",
  },
  {
    name: "Kyoto, Japan",
    tagline: "Ancient Wonders",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80",
    rating: "4.7",
  },
  {
    name: "Maldives",
    tagline: "Crystal Waters",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80",
    rating: "4.9",
  },
  {
    name: "Machu Picchu, Peru",
    tagline: "Lost City",
    image: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=800&q=80",
    rating: "4.8",
  },
];

export default function Destinations() {
  return (
    <section id="destinations" className="py-24 bg-bg">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-accent font-semibold text-sm tracking-widest uppercase">
            Popular Destinations
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-dark mt-3">
            Where Will You Go Next?
          </h2>
          <p className="text-dark/60 mt-4 max-w-2xl mx-auto text-lg">
            Explore trending destinations loved by thousands of travelers worldwide.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((dest, i) => (
            <div
              key={i}
              className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer"
            >
              <div className="relative h-72 overflow-hidden">
                <Image
                  src={dest.image}
                  alt={dest.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-linear-to-t from-dark/80 via-dark/20 to-transparent" />
              </div>

              {/* Rating badge */}
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
                <svg className="w-4 h-4 text-highlight" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-dark text-sm font-bold">{dest.rating}</span>
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="text-highlight text-xs font-semibold tracking-wider uppercase mb-1">
                  {dest.tagline}
                </p>
                <h3 className="text-white text-xl font-bold">{dest.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
