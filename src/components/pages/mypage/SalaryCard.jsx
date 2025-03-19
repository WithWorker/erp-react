import { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'react-bootstrap-icons';
import { shallowEqual, useSelector } from 'react-redux';

const SalaryCard = () => {
  // 기본 값 설정으로 오류 방지
  //const { salary = {} } = useSelector(state => JSON.parse(JSON.stringify(state.employee.employee || {})));
  // 기본 값 설정 및 shallowEqual로 리렌더링 방지
  // 오늘 날짜 기준으로 현재 연도와 월 설정
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth() + 1); // 1월이 0이기 때문에 +1 처리
  
  const { salary = {} } = useSelector(
    state => state.employee.employee || {},
    shallowEqual
  );

  // 현재 월의 급여 데이터 가져오기
  const selectedSalary = salary[`${currentYear}-${String(currentMonth).padStart(2, '0')}`] || {
    base: 0,
    bonus: 0,
    total: 0
  };

  // 이전 달로 이동
  const handlePrevMonth = () => {
    if (currentMonth === 1) {
      setCurrentMonth(12);
      setCurrentYear(prevYear => prevYear - 1);
    } else {
      setCurrentMonth(prevMonth => prevMonth - 1);
    }
  };

  // 다음 달로 이동
  const handleNextMonth = () => {
    if (currentMonth === 12) {
      setCurrentMonth(1);
      setCurrentYear(prevYear => prevYear + 1);
    } else {
      setCurrentMonth(prevMonth => prevMonth + 1);
    }
  };

  return (
    <div className="w-1/3">
      <div className="w-full p-4 bg-white rounded-full mb-4 shadow flex justify-center flex-1 items-center">
        <h2 className='text-md font-bold'>급여 총액</h2>
      </div>
        {/* 월 네비게이션 */}
        <div className="p-4 bg-white rounded-3xl shadow">
          <div className="flex justify-between items-center mb-4">
            <button onClick={handlePrevMonth} className="text-gray-500 hover:text-gray-700">
              <ArrowLeft />
            </button>
            <h2 className="text-lg font-semibold">
              {currentYear}년 {currentMonth}월
            </h2>
            <button onClick={handleNextMonth} className="text-gray-500 hover:text-gray-700">
              <ArrowRight />
            </button>
          </div>

        <div className="flex flex-col justify-center flex-1 items-center">
          {/* 급여 정보 */}
          <p className='mb-4'>기본급: {selectedSalary.base || 0}원</p>
          {/* 성과급이 있는 경우만 표시 */}
          <p className='mb-4'>성과급: {selectedSalary.bonus !== null ? selectedSalary.bonus : 0}원</p>
          <p className="text-[#006D2C] font-semibold">총 급여: {selectedSalary.total || 0}원</p>
        </div>
      </div>
    </div>
  );
};

export default SalaryCard;
