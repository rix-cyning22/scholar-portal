import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import LoginPage from "./pages/login";
import ScholarPage from "./pages/scholar-page";
import SignupPage from "./pages/signup";

const App = () => {
  const backendPath = `http://localhost:8000`;
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const response = await fetch(`${backendPath}/auth/check-session`, {
          method: "POST",
        });
        const data = await response.json();
        setLoggedIn(data);
      } catch (error) {
        console.error("Error checking login status:", error);
      }
    };
    checkLoggedIn();
  }, [backendPath]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ScholarPage loggedIn={loggedIn} />} />
        <Route path="/auth/login" element={<LoginPage loggedIn={loggedIn} />} />
        <Route
          path="/auth/signup"
          element={<SignupPage loggedIn={loggedIn} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
