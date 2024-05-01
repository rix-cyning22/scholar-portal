import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import NavBar from "../components/navbar";

const DetailsPage = ({ backendPath }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const response = await fetch(`${backendPath}/auth/check-session`, {
          method: "POST",
          credentials: "include",
        });
        const data = await response.json();
        setLoggedIn(data);
        if (!data) navigate("/auth/login");
      } catch (error) {
        console.error("Error checking login status:", error);
      }
    };

    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`${backendPath}/scholar/profile`, {
          method: "POST",
          credentials: "include",
        });
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else navigate("/auth/login");
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    checkLoggedIn();
    fetchUserDetails();
  }, [backendPath, navigate]);
  return (
    <>
      <NavBar loggedIn={loggedIn} />
      <div className="container">{user.userName}</div>
    </>
  );
};

export default DetailsPage;
