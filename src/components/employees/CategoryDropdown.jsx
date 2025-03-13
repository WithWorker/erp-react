import { useState } from "react";
import categoryDepartment from "../../utils/categoryDepartment";
import { ChevronDown } from "react-bootstrap-icons";

const CategoryDropdown = ({ onSelectDepartment }) => {
const [dropdownOpen, setDropdownOpen] = useState(false);
const [selectedCategory, setSelectedCategory] = useState("전체보기");

const handleCategorySelect = (categoryValue) => {
    setSelectedCategory(categoryValue);
    setDropdownOpen(false);
    onSelectDepartment(categoryValue); 
};

return (
<div className="relative md:w-1/5 w-full">
    <div
    className="bg-white p-3 pl-6 pr-10 rounded-full shadow-md w-full cursor-pointer flex items-center h-[48px] border border-gray-300"
    onClick={() => setDropdownOpen(!dropdownOpen)}
    >
    <div
        className="w-4 h-4 rounded-full mr-2"
        style={{
        backgroundColor: categoryDepartment.find(
            (cat) => cat.value === selectedCategory
        )?.color,
        }}
    />
    <span className="font-medium">
        {categoryDepartment.find((cat) => cat.value === selectedCategory)?.label}
    </span>
    <ChevronDown className="ml-auto text-gray-500" />
    </div>

    {dropdownOpen && (
    <div className="absolute left-0 top-full mt-1 w-full bg-white rounded-xl shadow-lg z-20 border overflow-hidden">
        {categoryDepartment.map((cat) => (
        <div
            key={cat.value}
            className="flex items-center p-3 hover:bg-gray-100 cursor-pointer transition"
            onClick={() => handleCategorySelect(cat.value)}
        >
            <div
            className="w-4 h-4 rounded-full mr-2"
            style={{ backgroundColor: cat.color }}
            />
            <span>{cat.label}</span>
        </div>
        ))}
    </div>
    )}
</div>
);
};

export default CategoryDropdown;
