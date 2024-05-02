import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import NavBar from "../components/navbar";
import ProfileForm from "../components/profile-form";

const DetailsPage = ({ backendPath }) => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      const logInStatus = await fetch(`${backendPath}/auth/check-session`, {
        method: "POST",
        credentials: "include",
      });
      const data = await logInStatus.json();
      if (!data) return navigate("/auth/login");
      const response = await fetch(`${backendPath}/profile`, {
        method: "POST",
        credentials: "include",
      });
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else navigate("/auth/login");
    };
    fetchUserDetails();
  }, [backendPath, navigate]);
  return (
    <>
      <NavBar backendPath={backendPath} />
      <div className="container">
        <div className="title">
          <img
            src={`https://scholar.googleusercontent.com/citations?view_op=view_photo&user=${user.gscholarId}&citpid=19`}
            alt=""
          />
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
