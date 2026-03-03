import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <Image
        src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80"
        alt="Beautiful tropical beach"
        fill
        className="object-cover"
        priority
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-dark/50" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto animate-fade-in">
        <span className="inline-block bg-highlight/90 text-dark text-sm font-bold px-4 py-1.5 rounded-full mb-6 tracking-wide uppercase">
          Explore the World
        </span>
        <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight tracking-tight">
          Your Next Adventure
          <br />
          <span className="text-highlight">Starts Here</span>
        </h1>
        <p className="text-white/85 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
          Discover breathtaking destinations, expert local guides, premium hotels,
          and seamless travel — all in one place.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/register"
            className="bg-accent hover:bg-accent/85 text-white font-semibold px-8 py-4 rounded-full text-lg transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            Start Exploring
          </Link>
          <Link
            href="#destinations"
            className="bg-white/15 backdrop-blur-sm border border-white/30 text-white font-semibold px-8 py-4 rounded-full text-lg hover:bg-white/25 transition-all"
          >
            View Destinations
          </Link>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
          <div>
            <p className="text-3xl font-bold text-highlight">500+</p>
            <p className="text-white/70 text-sm mt-1">Destinations</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-highlight">10k+</p>
            <p className="text-white/70 text-sm mt-1">Happy Tourists</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-highlight">200+</p>
            <p className="text-white/70 text-sm mt-1">Expert Guides</p>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}