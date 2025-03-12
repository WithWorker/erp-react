import { BiSearch } from "react-icons/bi"; 

const SearchBar = ({ query, setQuery, onSearch }) => {
const handleInputChange = (e) => {
setQuery(e.target.value);
};

const handleSearch = () => {
if (query.trim() !== "") {
    onSearch(query); 
}
};

const handleKeyPress = (e) => {
if (e.key === "Enter") {
    handleSearch();
}
};

return (
<div className="relative md:w-4/5 w-full">
    <input
    type="text"
    value={query}
    onChange={handleInputChange}
    onKeyDown={handleKeyPress}
    placeholder="이름 검색"
    className="bg-white pl-4 pr-4 text-sm rounded-full shadow-md w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black h-[48px]"
    />
    <BiSearch
    className="cursor-pointer absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-400"
    size={20}
    onClick={handleSearch}
    />
</div>
);
};

export default SearchBar;
