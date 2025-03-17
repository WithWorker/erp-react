import React, { useState } from 'react';

const TopNav = ({ setViewMode }) => {
  const [active, setActive] = useState(0); // 활성화된 탭을 추적

  const handleClick = (index) => {
    setActive(index);
    setViewMode(index); // 클릭 시 부모 컴포넌트로 viewMode 변경
  };

  return (
    <div className="p-3 flex justify-start items-center space-x-6">
      <div
        className={`flex-1 bg-white shadow-md rounded-full h-[56px] flex items-center justify-center cursor-pointer transition-all duration-300 ease-in-out 
          ${active === 0 ? 'text-[#006D2C] border-2 border-[#006D2C]' : 'text-black border-2 border-transparent'} 
          hover:text-[#006D2C] hover:border-2 hover:border-[#006D2C]`}
        onClick={() => handleClick(0)}
      >
        결재 대기 목록
      </div>
      <div
        className={`flex-1 bg-white shadow-md rounded-full h-[56px] flex items-center justify-center cursor-pointer transition-all duration-300 ease-in-out 
          ${active === 1 ? 'text-[#006D2C] border-2 border-[#006D2C] bg-[#E3F9E5]' : 'text-black border-2 border-transparent'} 
          hover:text-[#006D2C] hover:border-2 hover:border-[#006D2C] hover:bg-[#E3F9E5]`}
        onClick={() => handleClick(1)}
      >
        결재 승인 목록
      </div>
      <div
        className={`flex-1 bg-white shadow-md rounded-full h-[56px] flex items-center justify-center cursor-pointer transition-all duration-300 ease-in-out 
          ${active === 2 ? 'text-[#006D2C] border-2 border-[#006D2C]' : 'text-black border-2 border-transparent'} 
          hover:text-[#006D2C] hover:border-2 hover:border-[#006D2C]`}
        onClick={() => handleClick(2)}
      >
        승인 대기 목록
      </div>
    </div>
  );
};

export default TopNav;
