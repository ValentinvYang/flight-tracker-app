import { useView } from "../context/viewContext";

export default function NotLoggedIn() {
  const { setView } = useView();

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-900 text-white px-4">
      <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-xl shadow-xl text-center max-w-md">
        <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
        <p className="text-gray-300">
          You must be logged in to view the dashboard.
        </p>
        <p className="text-sm text-center text-gray-300 mt-6">
          Already have an account?{" "}
          <span
            onClick={() => setView("Login")}
            className="text-blue-400 cursor-pointer hover:underline"
          >
            Log in
          </span>
        </p>
      </div>
    </section>
  );
}
