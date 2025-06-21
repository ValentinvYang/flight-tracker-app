import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ViewProvider } from "./context/viewContext.jsx";
import { AuthProvider } from "./context/authContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <ViewProvider>
        <App />
      </ViewProvider>
    </AuthProvider>
  </StrictMode>
);
