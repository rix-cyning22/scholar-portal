import React, { useState, useEffect } from "react";
import NavBar from "../components/navbar";
import ScholarCard from "../components/scholar";
import FilterBar from "../components/filter-bar";
import SearchBar from "../components/search-bar";
import SortBar from "../components/sort-bar";
import Loading from "../components/loading";

const ScholarPage = ({ backendPath }) => {
  const [scholars, setScholars] = useState([]);
  const [loading, setLoading] = useState(true);
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
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchScholars();
    const controller = new AbortController();
    return () => {
      controller.abort();
    };
  }, [backendPath, currDept]);

  useEffect(() => {
    setLoading(true);
    const controller = new AbortController();
    const timeout = setTimeout(() => {
      const filtered = scholars.filter((scholar) =>
        scholar.name.toLowerCase().includes(searchToken.toLowerCase())
      );
      setFilteredScholars(filtered);
      setLoading(false);
    }, 0);
    return () => {
      controller.abort();
      clearTimeout(timeout);
    };
  }, [scholars, searchToken]);

  useEffect(() => {
    setLoading(true);
    let sortedScholars = [...scholars];
    if (criteria === "alphaAsc")
      sortedScholars.sort((a, b) => a.name.localeCompare(b.name));
    else if (criteria === "alphaDesc")
      sortedScholars.sort((a, b) => b.name.localeCompare(a.name));
    else if (criteria === "insttId") sortedScholars.sort((a, b) => a.id - b.id);
    setFilteredScholars(sortedScholars);
    const controller = new AbortController();
    setLoading(false);
    return () => {
      controller.abort();
    };
  }, [scholars, searchToken, criteria]);
  document.title = "Scholar Portal: Scholars";
  return (
    <>
      <NavBar backendPath={backendPath} />
      {!loading ? (
        <>
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
                  <ScholarCard
                    scholar={scholar}
                    key={index}
                    navlink={`/view-info/${scholar.insttId}`}
                    useButton={true}
                    gscholarId={scholar.gscholarId}
                  >
                    <h4>{scholar.name}</h4>
                    <div className="scholar-dept">{scholar.dept}</div>
                  </ScholarCard>
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
      ) : (
        <Loading />
      )}
    </>
  );
};

export default ScholarPage;
