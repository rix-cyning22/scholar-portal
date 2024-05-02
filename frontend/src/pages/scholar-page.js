import NavBar from "../components/navbar";
import { useState, useEffect } from "react";
import ScholarCard from "../components/scholar";

const ScholarPage = ({ backendPath }) => {
  const [scholars, setScholars] = useState([]);
  useEffect(() => {
    const fetchScholars = async () => {
      try {
        const scholars = await fetch(`${backendPath}/scholar/all-scholars`);
        const scholarsData = await scholars.json();
        setScholars(scholarsData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchScholars();
  }, [backendPath]);
  return (
    <>
      <NavBar backendPath={backendPath} />
      <div className="container">
        <div className="scholar-heading">filter search</div>
        <div className="scholar-list">
          {scholars.map((scholar, index) => {
            return <ScholarCard scholar={scholar} key={index} />;
          })}
        </div>
      </div>
    </>
  );
};

export default ScholarPage;
