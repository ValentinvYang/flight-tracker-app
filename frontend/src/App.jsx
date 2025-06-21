import Landing from "./pages/Landing";
import Signup from "./pages/Signup";
import User from "./pages/User";
import NavBar from "./components/NavBar";
import { useView } from "./context/viewContext";
import Login from "./pages/Login";

export default function App() {
  const { view } = useView();

  return (
    <>
      <NavBar />
      {view === "Landing" && <Landing />};{view === "Signup" && <Signup />};
      {view === "User" && <User />};{view === "Login" && <Login />}
    </>
  );
}
