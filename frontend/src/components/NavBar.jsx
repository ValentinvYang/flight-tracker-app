import { useView } from "../context/viewContext";

export default function NavBar() {
  const { setView } = useView();

  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div
          className="text-2xl font-bold cursor-pointer"
          onClick={() => setView("Landing")}
        >
          FlightTracker
        </div>

        {/* Nav Links */}
        <div className="space-x-6 text-sm md:text-base">
          <button
            onClick={() => setView("Landing")}
            className="hover:text-blue-400 transition cursor-pointer"
          >
            Home
          </button>
          <button
            onClick={() => setView("Signup")}
            className="hover:text-blue-400 transition cursor-pointer"
          >
            Sign Up
          </button>
          <button
            onClick={() => setView("User")}
            className="hover:text-blue-400 transition cursor-pointer"
          >
            Dashboard
          </button>
        </div>
      </div>
    </nav>
  );
}
