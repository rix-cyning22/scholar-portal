import { useState, useEffect } from "react";

const FilterBar = ({ currDept, setCurrDept, backendPath }) => {
  const [depts, setDepts] = useState([]);
  const [showDepts, setShowDepts] = useState(false);

  useEffect(() => {
    const fetchDepts = async () => {
      const deptsAvl = await fetch(`${backendPath}/scholar/depts`);
      const deptData = await deptsAvl.json();
      deptData.push({ id: 0, name: "All" });
      setDepts(deptData);
    };
    fetchDepts();
    const controller = new AbortController();
    return () => {
      controller.abort();
    };
  }, [backendPath]);

  const dropdown = () => {
    setShowDepts(!showDepts);
  };

  const changeDept = (event) => {
    const selectedDept = depts.find(
      (dept) => dept.id.toString() === event.target.value
    );
    setCurrDept(selectedDept);
    setShowDepts(false);
  };

  return (
    <div className="bar-container">
      <select
        className="bar-select"
        value={currDept.id}
        onChange={changeDept}
        onClick={() => dropdown()}
      >
        {depts.map((dept, index) => (
          <option className="bar-option" value={dept.id} key={index}>
            {dept.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterBar;
