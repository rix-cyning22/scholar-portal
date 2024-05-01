import NavBar from "../components/navbar";
import { useState, useEffect } from "react";

const ScholarPage = ({ backendPath }) => {
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
  const scholars = [
    {
      name: "Prasanta K. Jana",
      deptId: 1,
    },
    {
      name: "VMSR Murthy",
      deptId: 2,
    },
  ];
  const depts = {
    1: "Department of Computer Science and Engineering",
    2: "Department of Mining Engineering",
  };
  return (
    <>
      <NavBar loggedIn={loggedIn} />
      <div className="container">
        <div className="scholar-heading">filter search</div>
        <div className="scholar-list">
          {scholars.map((scholar) => {
            return (
              <div className="scholar-profile">
                <div className="scholar-info">
                  <h4>{scholar.name}</h4>
                  <div className="scholar-dept">{depts[scholar.deptId]}</div>
                </div>
                <div className="view-details">
                  <button className="btn-view">View Details</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ScholarPage;
