import Navbar from "./(components)/Navbar";
import Hero from "./(components)/Hero";
import Features from "./(components)/Features";
import Destinations from "./(components)/Destinations";
import Testimonials from "./(components)/Testimonials";
import CallToAction from "./(components)/CallToAction";
import Footer from "./(components)/Footer";
import { AuthProvider } from "@/providers/AuthProvider";

export default function HomePage() {
  return (
    <AuthProvider>
      <Navbar />
      <Hero />
      <Features />
      <Destinations />
      <Testimonials />
      <CallToAction />
      <Footer />
    </AuthProvider>
  );
}