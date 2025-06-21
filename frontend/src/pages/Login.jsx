import { useState } from "react";
import { login } from "../api/auth";
import { useView } from "../context/viewContext";
import { useAuth } from "../context/authContext";

export default function Login() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const { setView } = useView();
  const { setIsAuthenticated } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      await login(
        identifier.includes("@")
          ? { email: identifier, password }
          : { username: identifier, password }
      );
      setSuccess(true);
      setIsAuthenticated(true);
      setView("User");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen mt-10 pb-10 flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white px-4">
      <div className="w-full mt-10 max-w-md bg-white/10 backdrop-blur-md rounded-xl p-8 shadow-xl border border-white/20">
        <h2 className="text-3xl font-bold mb-6 text-center">Log In</h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="identifier" className="block text-sm mb-1">
              Email or Username
            </label>
            <input
              type="text"
              id="identifier"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="your@email.com or johndoe"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition cursor-pointer"
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        {error && (
          <p className="text-red-400 text-sm mt-4 text-center">{error}</p>
        )}
        {success && (
          <p className="text-green-400 text-sm mt-4 text-center">
            Login successful!
          </p>
        )}

        <p className="text-sm text-center text-gray-300 mt-6">
          Don't have an account?{" "}
          <span
            className="text-blue-400 cursor-pointer hover:underline"
            onClick={() => setView("Signup")}
          >
            Sign up
          </span>
        </p>
      </div>
    </section>
  );
}
