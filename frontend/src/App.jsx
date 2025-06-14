import Landing from "./components/Landing";
import Signup from "./components/Signup";
import Data from "./components/Data";
import NavBar from "./components/NavBar";

import { useState } from "react";

export default function layout() {
  const [view, setView] = useState("landing");

  return (
    <>
      {view == "landing" && <Landing setView={setView} />}
      {view == "signup" && <Signup setView={setView} />}
      {view == "data" && <Data setView={setView} />}
    </>
  );
}
