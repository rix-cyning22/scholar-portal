import React from "react";

const SearchBar = ({
  searchToken,
  setSearchToken,
  scholars,
  setFilteredScholars,
}) => {
  const searchScholar = (event) => {
    const searchTerm = event.target.value.trim().toLowerCase();
    setSearchToken(searchTerm);
    if (searchTerm !== "") {
      const filteredScholars = scholars.filter((scholar) =>
        scholar.name.toLowerCase().includes(searchTerm)
      );
      setFilteredScholars(filteredScholars);
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={searchToken}
        onChange={(event) => searchScholar(event)}
        placeholder="Search"
      />
    </div>
  );
};

export default SearchBar;
