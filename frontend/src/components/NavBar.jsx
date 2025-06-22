import { useView } from "../context/viewContext";
import { useAuth } from "../context/authContext";

export default function NavBar() {
  const { setView } = useView();
  const { isAuthenticated, setIsAuthenticated } = useAuth();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
    setView("Landing");
  };

  return (
    <>
      {/* Logo Button (Left) */}
      <div
        onClick={() => setView("Landing")}
        className="fixed top-6 left-6 z-50 bg-white/10 backdrop-blur-md text-white px-5 py-2 rounded-md shadow-md border border-white/20 cursor-pointer hover:bg-white/20 transition"
      >
        <span className="font-bold text-lg">FlightTracker</span>
      </div>

      {/* Navigation Buttons (Right) */}
      <div className="fixed top-6 right-6 z-50 bg-white/10 backdrop-blur-md text-white px-5 py-2 shadow-md border border-white/20 flex space-x-4 items-center rounded-md">
        <button
          onClick={() => setView("Landing")}
          className="hover:text-blue-400 transition cursor-pointer"
        >
          Home
        </button>

        {!isAuthenticated ? (
          <button
            onClick={() => setView("Login")}
            className="hover:text-blue-400 transition cursor-pointer"
          >
            Login
          </button>
        ) : (
          <button
            onClick={handleLogout}
            className="hover:text-red-400 transition cursor-pointer"
          >
            Logout
          </button>
        )}

        <button
          onClick={() => setView("Dashboard")}
          className="hover:text-blue-400 transition cursor-pointer"
        >
          Dashboard
        </button>
      </div>
    </>
  );
}
