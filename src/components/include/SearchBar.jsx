import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState(""); // ✅ `useState`로 상태 추가

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <input
      type="text"
      value={query}
      onChange={handleInputChange}
      placeholder="검색..."
      className="w-full p-2 border rounded"
    />
  );
};

export default SearchBar;
