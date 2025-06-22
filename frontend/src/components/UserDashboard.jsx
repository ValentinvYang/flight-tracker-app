import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlane, faBell, faCog } from "@fortawesome/free-solid-svg-icons";

export default function UserDashboard() {
  return (
    <div className="mt-10 flex min-h-screen bg-gradient-to-br from-slate-900 via-gray-800 to-gray-900 text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-black/30 backdrop-blur-md border-r border-white/10 px-6 py-8 flex flex-col">
        <h2 className="text-2xl font-bold mb-12">Username</h2>
        <nav className="flex flex-col gap-6">
          <button className="flex items-center gap-3 text-left text-cyan-400 hover:text-white transition">
            <FontAwesomeIcon icon={faPlane} />
            Tracked Flights
          </button>
          <button className="flex items-center gap-3 text-gray-400 hover:text-white transition">
            <FontAwesomeIcon icon={faBell} />
            Email Alerts
          </button>
          <button className="flex items-center gap-3 text-gray-400 hover:text-white transition">
            <FontAwesomeIcon icon={faCog} />
            Settings
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 px-10 py-10">
        <h1 className="text-4xl font-bold mb-10">Tracked Flights</h1>
        <div className="bg-white/10 border border-white/20 rounded-xl p-6 shadow-lg">
          <ul className="divide-y divide-white/10">
            {[
              { route: "New York → Paris", price: "$350" },
              { route: "London → Tokyo", price: "$610" },
              { route: "San Francisco → New Delhi", price: "$920" },
              { route: "Berlin → Los Angeles", price: "$430" },
            ].map((flight, index) => (
              <li
                key={index}
                className="flex justify-between py-4 hover:bg-white/5 px-4 rounded transition"
              >
                <span>{flight.route}</span>
                <span className="text-cyan-400 font-semibold">
                  {flight.price}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}
