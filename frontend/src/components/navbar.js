import { useNavigate } from "react-router";
import { useState, useEffect } from "react";

const NavBar = ({ backendPath }) => {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const response = await fetch(`${backendPath}/auth/check-session`, {
          method: "POST",
          credentials: "include",
        });
        const data = await response.json();
        setLoggedIn(data);
      } catch (error) {
        console.error("Error checking login status:", error);
      }
    };

    checkLoggedIn();
  }, [backendPath]);

  const handleLogout = async () => {
    try {
      const response = await fetch(`${backendPath}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) navigate("/auth/login");
      else console.error("Logout failed:", response.status);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="navbar">
      <div className="navbar-title">
        <h1>
          <a href="/">Scholar Portal</a>
        </h1>
      </div>
      <div className="navbar-block">
        <div className="navbar-item">
          <a href="/">View Scholars</a>
        </div>
        {loggedIn ? (
          <>
            <div className="navbar-item">
              <a href="/profile-view">View Profile</a>
            </div>
            <div className="navbar-item">
              <div onClick={handleLogout}>Log out</div>
            </div>
          </>
        ) : (
          <>
            <div className="navbar-item">
              <a href="/auth/login">Login as a Scholar</a>
            </div>
            <div className="navbar-item">
              <a href="/auth/signup">Sign Up as a Scholar</a>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default NavBar;
