import { useState } from "react";
import categoryPosition from "../../utils/categoryPosition"; // category.js에서 import
import { ChevronDown } from "react-bootstrap-icons";

const PositionDropdown = ({ onSelectPosition }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState("전체보기");

  const handlePositionSelect = (position) => {
    setSelectedPosition(position);
    setDropdownOpen(false);
    onSelectPosition(position);
  };

  return (
    <div className="relative w-full"> {/* w-full 추가 */}
      <div
        className="bg-white p-3 pl-6 pr-10 rounded-full shadow-md w-full cursor-pointer flex items-center h-[48px] border border-gray-300"
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        <div
          className="w-4 h-4 rounded-full mr-2"
          style={{
            backgroundColor: categoryPosition.find(
              (cat) => cat.value === selectedPosition
            )?.color,
          }}
        />
        <span className="font-medium">
          {categoryPosition.find((cat) => cat.value === selectedPosition)?.label}
        </span>
        <ChevronDown className="ml-auto text-gray-500" />
      </div>

      {dropdownOpen && (
        <div className="absolute left-0 top-full mt-1 w-full bg-white rounded-xl shadow-lg z-20 border overflow-hidden">
          {categoryPosition.map((cat) => (
            <div
              key={cat.value}
              className="flex items-center p-3 hover:bg-gray-100 cursor-pointer transition"
              onClick={() => handlePositionSelect(cat.value)}
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

export default PositionDropdown;
