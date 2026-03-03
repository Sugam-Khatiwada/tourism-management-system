import Image from "next/image";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Adventure Traveler",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80",
    quote: "TourismMS made my Bali trip absolutely seamless. The local guide was incredible and the hotel was exactly as described. Best travel platform I've used!",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Family Traveler",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
    quote: "Booking for our family of 5 was effortless. The bus service was punctual and comfortable. We'll definitely use TourismMS for our next vacation.",
    rating: 5,
  },
  {
    name: "Emma Rodriguez",
    role: "Solo Explorer",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80",
    quote: "As a solo traveler, safety and reliability matter most. TourismMS connected me with verified guides and quality stays. Absolutely recommend!",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-secondary font-semibold text-sm tracking-widest uppercase">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-dark mt-3">
            Loved by Travelers Worldwide
          </h2>
          <p className="text-dark/60 mt-4 max-w-2xl mx-auto text-lg">
            Don&apos;t just take our word for it — hear from adventurers who explored with us.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-bg rounded-2xl p-8 border border-neutral/20 hover:shadow-lg transition-all duration-300"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <svg key={j} className="w-5 h-5 text-highlight" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <p className="text-dark/80 leading-relaxed mb-6 text-sm italic">
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="flex items-center gap-3">
                <div className="relative w-11 h-11 rounded-full overflow-hidden">
                  <Image src={t.avatar} alt={t.name} fill className="object-cover" />
                </div>
                <div>
                  <p className="text-dark font-semibold text-sm">{t.name}</p>
                  <p className="text-dark/50 text-xs">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
