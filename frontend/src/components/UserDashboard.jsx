import { useState } from "react";
import Sidebar from "./Sidebar";
import TrackedFlightsMap from "./TrackedFlightsMap";
import TrackedFlightsPanel from "./TrackedFlightsPanel";
import EmailAlertsPanel from "./EmailAlertsPanel";
import SettingsPanel from "./SettingsPanel";

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState("flights");

  return (
    <div className="mt-10 flex min-h-screen bg-gradient-to-br from-slate-900 via-gray-800 to-gray-900 text-white relative">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      <main className="relative flex-1 px-4 py-0 overflow-hidden">
        {/* Map and Floating Panel for Tracked Flights (lg+) */}
        {activeTab === "flights" && (
          <>
            <div className="hidden lg:block">
              <TrackedFlightsMap />
            </div>
            <div className="hidden lg:block absolute top-10 right-10 w-80 bg-white/10 backdrop-blur-md border border-white/10 rounded-xl shadow-xl p-6 z-10">
              <TrackedFlightsPanel />
            </div>
          </>
        )}

        {/* Mobile View */}
        {activeTab === "flights" && (
          <div className="block lg:hidden mt-10 px-2">
            <TrackedFlightsPanel />
          </div>
        )}

        {activeTab === "alerts" && (
          <div className="p-10">
            <EmailAlertsPanel />
          </div>
        )}

        {activeTab === "settings" && (
          <div className="p-10">
            <SettingsPanel />
          </div>
        )}
      </main>
    </div>
  );
}
