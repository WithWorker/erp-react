import { useState, useEffect } from "react";
import categoryPosition from "../../utils/categoryPosition"; 
import { ChevronDown } from "react-bootstrap-icons";

const PositionDropdown = ({ onSelectPosition, selectedPosition }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [currentPosition, setCurrentPosition] = useState("전체보기");

  useEffect(() => {
    if (selectedPosition) {
      setCurrentPosition(selectedPosition);
    }
  }, [selectedPosition]);

  const handlePositionSelect = (position) => {
    setCurrentPosition(position);
    setDropdownOpen(false);
    onSelectPosition(position);
  };

  return (
    <div className="relative w-full"> 
      <div
        className="bg-white p-3 pl-6 pr-10 rounded-full shadow-md w-full cursor-pointer flex items-center h-[48px] border border-gray-300"
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        <div
          className="w-4 h-4 rounded-full mr-2"
          style={{
            backgroundColor: categoryPosition.find(
              (cat) => cat.value === currentPosition
            )?.color,
          }}
        />
        <span className="font-medium">
          {categoryPosition.find((cat) => cat.value === currentPosition)?.label}
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
