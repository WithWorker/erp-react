import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // useSelector 추가
import { setCategory } from '../../redux/slice/calendarSlice'; // setCategory 액션 가져오기
import categoryColors from '../../utils/categoryColors';

const DocumentTopNav = ({ setTabIndex }) => {
  const [active, setActive] = useState(0);
  const dispatch = useDispatch(); // dispatch 함수 선언
  const category = useSelector((state) => state.calendar.category); // 카테고리 값 가져오기
  const isAdmin = useSelector((state) => state.auth.isAdmin);  // authSlice에서 가져오기
  //const isManager = document.author === "팀장";
  const handleClick = (index, category) => {
    setActive(index);
    dispatch(setCategory(category)); // dispatch를 사용해 category 상태 업데이트
    setTabIndex(index); // 탭 인덱스를 상위 컴포넌트로 전달
  };

  const categoryBorderColor = categoryColors[category] || '#D1D5DB';  // 카테고리에 맞는 보더 색상 설정

  return (
    <div className='p-3 flex justify-start items-center space-x-6'>
      <div
        className={`flex-1 bg-white shadow-md rounded-full h-[56px] flex items-center justify-center cursor-pointer transition-all duration-300 ease-in-out 
          ${active === 0 ? 'text-[#006D2C] border-2 border-[#006D2C]' : 'text-black border-2 border-transparent'} 
          hover:text-[#006D2C] hover:border-2 hover:border-[#006D2C]`}
        onClick={() => handleClick(0, 'all')}
      >
        결재 대기 목록
      </div>
      {isAdmin && (
      <div
        className={`flex-1 bg-white shadow-md rounded-full h-[56px] flex items-center justify-center cursor-pointer transition-all duration-300 ease-in-out 
          ${active === 1 ? 'text-[#006D2C] border-2 border-[#006D2C] bg-[#E3F9E5]' : 'text-black border-2 border-transparent'} 
          hover:text-[#006D2C] hover:border-2 hover:border-[#006D2C] hover:bg-[#E3F9E5]`} // 버튼과 텍스트 모두에 적용
        onClick={() => handleClick(1, 'my-schedule')}
      >
        승인 대기 목록
      </div>
      )}
      <div
        className={`flex-1 bg-white shadow-md rounded-full h-[56px] flex items-center justify-center cursor-pointer transition-all duration-300 ease-in-out 
          ${active === 2 ? 'text-[#006D2C] border-2 border-[#006D2C]' : 'text-black border-2 border-transparent'} 
          hover:text-[#006D2C] hover:border-2 hover:border-[#006D2C]`}
        onClick={() => handleClick(2, 'team-members')}
      >
        결재 완료 목록
      </div>
    </div>
  );
};

export default DocumentTopNav;
