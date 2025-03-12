import React, { useState } from 'react';
import categoryColors from '../../utils/categoryColors';

const TopNav = () => {
  const [active, setActive] = useState(0); // 활성화된 버튼 상태 관리

  const handleClick = (index) => {
    setActive(index); // 클릭한 버튼의 인덱스에 맞게 활성화 상태 업데이트
  };

  return (
    <div className='p-3 flex justify-start items-center space-x-6'>
      <div
        className={`flex-1 bg-white shadow-lg rounded-full h-[56px] flex items-center justify-center cursor-pointer transition-all duration-300 ease-in-out 
          ${active === 0 ? 'text-[#006D2C] border-2 border-[#006D2C]' : 'text-black border-2 border-transparent'} 
          hover:text-[#006D2C] hover:border-2 hover:border-[#006D2C]`}
        onClick={() => handleClick(0)}
      >
        전체보기
      </div>
      <div
        className={`flex-1 bg-white shadow-lg rounded-full h-[56px] flex items-center justify-center cursor-pointer transition-all duration-300 ease-in-out 
          ${active === 1 ? 'text-[#006D2C] border-2 border-[#006D2C]' : 'text-black border-2 border-transparent'} 
          hover:text-[#006D2C] hover:border-2 hover:border-[#006D2C]`}
        onClick={() => handleClick(1)}
      >
        내 일정
      </div>
      <div
        className={`flex-1 bg-white shadow-lg rounded-full h-[56px] flex items-center justify-center cursor-pointer transition-all duration-300 ease-in-out 
          ${active === 2 ? 'text-[#006D2C] border-2 border-[#006D2C]' : 'text-black border-2 border-transparent'} 
          hover:text-[#006D2C] hover:border-2 hover:border-[#006D2C]`}
        onClick={() => handleClick(2)}
      >
        부서 구성원
      </div>

      <div
        className={`flex-1 bg-white shadow-lg rounded-full h-[56px] flex items-center justify-center cursor-pointer transition-all duration-300 ease-in-out 
          ${active === 3 ? 'text-[#006D2C] border-2 border-[#006D2C]' : 'text-black border-2 border-transparent'} 
          hover:text-[#006D2C] hover:border-2 hover:border-[#006D2C]`}
        onClick={() => handleClick(3)}
      >
        설비 예약
      </div>
    </div>
  );
};

export default TopNav;
