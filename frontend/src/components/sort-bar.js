import React from "react";

const SortBar = ({ criteria, setCriteria }) => {
  return (
    <div className="bar-container">
      <select
        className="bar-select"
        onChange={(event) => setCriteria(event.target.value)}
        value={criteria}
      >
        <option className="bar-option" value="alphaAsc">
          Sort A-Z
        </option>
        <option className="bar-option" value="alphaDesc">
          Sort Z-A
        </option>
        <option className="bar-option" value="insttId">
          Sort By Institute ID
        </option>
      </select>
    </div>
  );
};

export default SortBar;
