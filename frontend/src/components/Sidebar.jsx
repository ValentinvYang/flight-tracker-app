import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlane, faBell, faCog } from "@fortawesome/free-solid-svg-icons";

export default function Sidebar({ activeTab, setActiveTab }) {
  return (
    <aside className="w-64 bg-black/30 backdrop-blur-md border-r border-white/10 px-6 py-8 flex flex-col">
      <h2 className="text-2xl font-bold mb-12">Your Username</h2>
      <nav className="flex flex-col gap-6">
        <button
          className={`flex items-center gap-3 text-left transition cursor-pointer ${
            activeTab === "flights"
              ? "text-cyan-400"
              : "text-gray-400 hover:text-white"
          }`}
          onClick={() => setActiveTab("flights")}
        >
          <FontAwesomeIcon icon={faPlane} />
          Tracked Flights
        </button>
        <button
          className={`flex items-center gap-3 text-left transition cursor-pointer ${
            activeTab === "alerts"
              ? "text-cyan-400"
              : "text-gray-400 hover:text-white"
          }`}
          onClick={() => setActiveTab("alerts")}
        >
          <FontAwesomeIcon icon={faBell} />
          Email Alerts
        </button>
        <button
          className={`flex items-center gap-3 text-left transition cursor-pointer ${
            activeTab === "settings"
              ? "text-cyan-400"
              : "text-gray-400 hover:text-white"
          }`}
          onClick={() => setActiveTab("settings")}
        >
          <FontAwesomeIcon icon={faCog} />
          Settings
        </button>
      </nav>
    </aside>
  );
}
