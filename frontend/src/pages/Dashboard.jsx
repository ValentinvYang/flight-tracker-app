import { useAuth } from "../context/authContext";
import Footer from "../components/Footer";
import NotLoggedIn from "../components/NotLoggedIn";
import UserDashboard from "../components/UserDashboard";

export default function Dashboard() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <NotLoggedIn />;
  }

  return (
    <>
      <UserDashboard />
      <Footer />
    </>
  );
}
