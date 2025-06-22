import HeroSectionMap2 from "../assets/HeroSectionMap2.png";

export default function HeroSection({ setView }) {
  return (
    <section
      className="w-full min-h-screen bg-cover bg-center relative flex items-center justify-center text-white"
      style={{ backgroundImage: `url(${HeroSectionMap2})` }}
    >
      {/* Modal-style text box */}
      <div className="bg-white/10 backdrop-blur-md border-none rounded-xl p-10 text-center max-w-xl shadow-xl">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
          Track Flight Prices with Precision
        </h1>
        <p className="text-lg md:text-xl text-white/90 mb-6">
          Weekly insights powered by real-time data from the Amadeus API.
        </p>
        <button className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl transition cursor-pointer">
          Get Started
        </button>
      </div>
    </section>
  );
}
