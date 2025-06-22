import Landing from "./pages/Landing";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import NavBar from "./components/NavBar";
import { useView } from "./context/viewContext";
import Login from "./pages/Login";

export default function App() {
  const { view } = useView();

  return (
    <>
      <NavBar />
      {view === "Landing" && <Landing />};{view === "Signup" && <Signup />};
      {view === "Dashboard" && <Dashboard />};{view === "Login" && <Login />}
    </>
  );
}
