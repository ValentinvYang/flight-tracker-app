import { useInView } from "react-intersection-observer";

export default function Features() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3, // trigger when 30% is visible
  });

  return (
    <section
      ref={ref}
      className={`w-full py-16 px-4 md:px-16 bg-gray-50 transition-all duration-1000 ${
        inView ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
      }`}
    >
      {" "}
      <h2 className="text-2xl font-semibold text-center mb-12">Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-6 bg-white rounded-xl shadow-md">
          <h3 className="text-xl font-bold mb-2">Real-Time Prices</h3>
          <p>Get up-to-date flight data from the Amadeus API every week.</p>
        </div>
        <div className="p-6 bg-white rounded-xl shadow-md">
          <h3 className="text-xl font-bold mb-2">Custom Alerts</h3>
          <p>Set your departure and destination and receive email alerts.</p>
        </div>
        <div className="p-6 bg-white rounded-xl shadow-md">
          <h3 className="text-xl font-bold mb-2">Simple Dashboard</h3>
          <p>View flight trends in an intuitive UI built with React.</p>
        </div>
      </div>
    </section>
  );
}
