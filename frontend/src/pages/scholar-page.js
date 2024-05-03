import React, { useState, useEffect } from "react";
import NavBar from "../components/navbar";
import ScholarCard from "../components/scholar";
import FilterBar from "../components/filter-bar";
import SearchBar from "../components/search-bar";
import SortBar from "../components/sort-bar";

const ScholarPage = ({ backendPath }) => {
  const [scholars, setScholars] = useState([]);
  const [criteria, setCriteria] = useState("alphaAsc");
  const [filteredScholars, setFilteredScholars] = useState([]);
  const [currDept, setCurrDept] = useState({
    id: "1",
    name: "Computer Science and Engineering",
  });
  const [searchToken, setSearchToken] = useState("");

  useEffect(() => {
    const fetchScholars = async () => {
      try {
        const response = await fetch(`${backendPath}/scholar/scholars`, {
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({ deptId: currDept.id }),
          method: "POST",
        });
        const data = await response.json();
        setScholars(data);
        setFilteredScholars(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchScholars();
  }, [backendPath, currDept]);

  useEffect(() => {
    const filtered = scholars.filter((scholar) =>
      scholar.name.toLowerCase().includes(searchToken.toLowerCase())
    );
    setFilteredScholars(filtered);
  }, [scholars, searchToken]);

  useEffect(() => {
    let sortedScholars = [...scholars];
    if (criteria === "alphaAsc")
      sortedScholars.sort((a, b) => a.name.localeCompare(b.name));
    else if (criteria === "alphaDesc")
      sortedScholars.sort((a, b) => b.name.localeCompare(a.name));
    else if (criteria === "insttId") sortedScholars.sort((a, b) => a.id - b.id);
    setFilteredScholars(sortedScholars);
  }, [scholars, searchToken, criteria]);

  return (
    <>
      <NavBar backendPath={backendPath} />
      <div className="scholar-heading">
        <FilterBar
          currDept={currDept}
          setCurrDept={setCurrDept}
          backendPath={backendPath}
        />
        <SortBar criteria={criteria} setCriteria={setCriteria} />
        <SearchBar
          searchToken={searchToken}
          setSearchToken={setSearchToken}
          scholars={scholars}
          setFilteredScholars={setFilteredScholars}
        />
      </div>
      <div className="container">
        <div className="scholar-list">
          {filteredScholars.length > 0 ? (
            filteredScholars.map((scholar, index) => (
              <ScholarCard scholar={scholar} key={index} />
            ))
          ) : (
            <p>
              No scholar found for search term "{searchToken}" in the
              {currDept.name} department.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default ScholarPage;
