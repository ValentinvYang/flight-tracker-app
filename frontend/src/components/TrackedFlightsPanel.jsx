export default function TrackedFlightsPanel() {
  const trackedFlights = [
    { route: "New York → Paris", price: "$350" },
    { route: "London → Tokyo", price: "$610" },
    { route: "San Francisco → New Delhi", price: "$920" },
    { route: "Berlin → Los Angeles", price: "$430" },
  ];

  return (
    <>
      <h2 className="text-xl font-semibold mb-4">Tracked Flights</h2>
      <ul className="divide-y divide-white/10">
        {trackedFlights.map((flight, index) => (
          <li
            key={index}
            className="flex justify-between py-3 px-3 hover:bg-white/5 rounded transition"
          >
            <span>{flight.route}</span>
            <span className="text-cyan-400 font-semibold">{flight.price}</span>
          </li>
        ))}
      </ul>
    </>
  );
}
