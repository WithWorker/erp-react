import React, { useState } from 'react';

const TopNav = ({ setTabIndex }) => {
    const [active, setActive] = useState(0);

  const handleClick = (index) => {
    setActive(index);
    setTabIndex(index); // 탭 인덱스를 상위 컴포넌트로 전달
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
        승인 대기 목록
      </div>
      <div
        className={`flex-1 bg-white shadow-md rounded-full h-[56px] flex items-center justify-center cursor-pointer transition-all duration-300 ease-in-out 
          ${active === 2 ? 'text-[#006D2C] border-2 border-[#006D2C]' : 'text-black border-2 border-transparent'} 
          hover:text-[#006D2C] hover:border-2 hover:border-[#006D2C]`}
        onClick={() => handleClick(2)}
      >
        결재 완료 목록
      </div>
    </div>
  );
};

export default TopNav;
