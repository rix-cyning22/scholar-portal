import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import NavBar from "../components/navbar";
import ProfileForm from "../components/profile-form";

const DetailsPage = ({ backendPath }) => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const logInStatus = await fetch(`${backendPath}/auth/check-session`, {
          method: "POST",
          credentials: "include",
        });
        const data = await logInStatus.json();
        if (!data) return navigate("/auth/login");
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
    fetchUserDetails();
  }, [backendPath, navigate]);
  return (
    <>
      <NavBar backendPath={backendPath} />
      <div className="container">
        <div className="profile-title">
          <h2>{user.userName}</h2>
        </div>
        <ProfileForm
          label="Google Scholar ID"
          value={user.gscholarId}
          name="gscholarId"
          backendPath={backendPath}
        />
        <ProfileForm
          label="Vidwan ID"
          value={user.vidwanId}
          name="vidwanId"
          backendPath={backendPath}
        />
        <ProfileForm
          label="Orcid ID"
          value={user.orcidId}
          name="orcidId"
          backendPath={backendPath}
        />
      </div>
    </>
  );
};

export default DetailsPage;