import { useEffect, useState } from "react";
import NavBar from "./components/navbar";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const backendPath = `http://localhost:8000`;

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const response = await fetch(`${backendPath}/auth/check-session`, {
          method: "POST",
        });
        const data = await response.json();
        setIsLoggedIn(data);
      } catch (error) {
        console.error("Error checking login status:", error);
      }
    };
    checkLoggedIn();
  }, [backendPath]);

  return (
    <>
      <NavBar isLoggedIn={isLoggedIn} />
    </>
  );
};

export default App;
