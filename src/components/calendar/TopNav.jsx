import React, { useState } from 'react';
import categoryColors from '../../utils/categoryColors';

const TopNav = ({ setViewMode }) => {
  const [active, setActive] = useState(0); // 활성화된 버튼 상태 관리

  const handleButtonClick = (mode, index) => {
    setActive(index); // 클릭된 버튼을 활성화
    setViewMode(mode); // 클릭된 버튼에 맞는 viewMode로 설정
  };

  return (
    <div className='p-3 flex justify-start items-center space-x-6'>
      <div
        className={`flex-1 bg-white shadow-lg rounded-full h-[56px] flex items-center justify-center cursor-pointer transition-all duration-300 ease-in-out 
          ${active === 0 ? `text-[#006D2C] border-2 border-[#006D2C]` : `text-black border-2 border-transparent`} 
          hover:text-[#006D2C] hover:border-2 hover:border-[#006D2C]`}
        style={{ backgroundColor: active === 0 ? categoryColors['all'] : 'transparent' }} // 색상 변경
        onClick={() => handleButtonClick('all', 0)}
      >
        전체보기
      </div>
      <div
        className={`flex-1 bg-white shadow-lg rounded-full h-[56px] flex items-center justify-center cursor-pointer transition-all duration-300 ease-in-out 
          ${active === 1 ? `text-[#006D2C] border-2 border-[#006D2C]` : `text-black border-2 border-transparent`} 
          hover:text-[#006D2C] hover:border-2 hover:border-[#006D2C]`}
        style={{ backgroundColor: active === 1 ? categoryColors['my-schedule'] : 'transparent' }} // 색상 변경
        onClick={() => handleButtonClick('personal', 1)}
      >
        내 일정
      </div>
      <div
        className={`flex-1 bg-white shadow-lg rounded-full h-[56px] flex items-center justify-center cursor-pointer transition-all duration-300 ease-in-out 
          ${active === 2 ? `text-[#006D2C] border-2 border-[#006D2C]` : `text-black border-2 border-transparent`} 
          hover:text-[#006D2C] hover:border-2 hover:border-[#006D2C]`}
        style={{ backgroundColor: active === 2 ? categoryColors['team-members'] : 'transparent' }} // 색상 변경
        onClick={() => handleButtonClick('department', 2)}
      >
        부서 구성원
      </div>
    </div>
  );
};

export default TopNav;
