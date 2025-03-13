import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // useSelector 추가
import { setCategory } from '../../redux/slice/calendarSlice'; // setCategory 액션 가져오기
import categoryColors from '../../utils/categoryColors';

const TopNav = () => {
  const [active, setActive] = useState(0);
  const dispatch = useDispatch(); // dispatch 함수 선언
  const category = useSelector((state) => state.calendar.category); // 카테고리 값 가져오기

  const handleClick = (index, category) => {
    setActive(index);
    dispatch(setCategory(category)); // dispatch를 사용해 category 상태 업데이트
  };

  const categoryBorderColor = categoryColors[category] || '#D1D5DB';  // 카테고리에 맞는 보더 색상 설정

  return (
    <div className='p-3 flex justify-start items-center space-x-6'>
      <div
        className={`flex-1 bg-white shadow-lg rounded-full h-[56px] flex items-center justify-center cursor-pointer transition-all duration-300 ease-in-out 
          ${active === 0 ? 'text-[#006D2C] border-2 border-[#006D2C]' : 'text-black border-2 border-transparent'} 
          hover:text-[#006D2C] hover:border-2 hover:border-[#006D2C]`}
        onClick={() => handleClick(0, 'all')}
      >
        전체보기
      </div>
      <div
        className={`flex-1 bg-white shadow-lg rounded-full h-[56px] flex items-center justify-center cursor-pointer transition-all duration-300 ease-in-out 
          ${active === 1 ? 'text-[#006D2C] border-2 border-[#006D2C]' : 'text-black border-2 border-transparent'} 
          hover:text-[#006D2C] hover:border-2 hover:border-[#006D2C]`}
        onClick={() => handleClick(1, 'my-schedule')}
      >
        내 일정
      </div>
      <div
        className={`flex-1 bg-white shadow-lg rounded-full h-[56px] flex items-center justify-center cursor-pointer transition-all duration-300 ease-in-out 
          ${active === 2 ? 'text-[#006D2C] border-2 border-[#006D2C]' : 'text-black border-2 border-transparent'} 
          hover:text-[#006D2C] hover:border-2 hover:border-[#006D2C]`}
        onClick={() => handleClick(2, 'team-members')}
      >
        부서 구성원
      </div>


      <div
        className={`flex-1 bg-white shadow-lg rounded-full h-[56px] flex items-center justify-center cursor-pointer transition-all duration-300 ease-in-out 
          ${active === 3 ? 'text-[#006D2C] border-2 border-[#006D2C]' : 'text-black border-2 border-transparent'} 
          hover:text-[#006D2C] hover:border-2 hover:border-[#006D2C]`}
        onClick={() => handleClick(3, 'equipment-reservation')}
      >
        설비 예약
      </div>
    </div>
  );
};

export default TopNav;
