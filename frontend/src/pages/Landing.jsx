import HeroSection from "../components/HeroSection";
import Features from "../components/Features";
import Footer from "../components/Footer";

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 text-gray-800">
      <HeroSection />
      <Features />
      <Footer />
    </div>
  );
}
