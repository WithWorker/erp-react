import React, { useState } from 'react';

const PSalary = () => {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth() + 1); 

  const handleYearChange = (e) => setYear(Number(e.target.value));
  const handleMonthChange = (e) => setMonth(Number(e.target.value));

  return (
    <div className='w-full h-30 bg-white text-center rounded-3xl p-8 shadow-md'>
      <div className='flex flex-row space-x-8 items-center'>

        {/* 연 선택 */}
        <select 
          className="flex-1 bg-gray-100 rounded-full p-3 pr-6 focus:ring-2 focus:ring-[#323232]"
          value={year}
          onChange={handleYearChange}
        >
          {Array.from({ length: 10 }, (_, i) => (
            <option key={i} value={now.getFullYear() - 5 + i}>
              {now.getFullYear() - 5 + i}년
            </option>
          ))}
        </select>

        {/* 월 선택 */}
        <select 
          className="flex-1 bg-gray-100 rounded-full p-3 focus:ring-2 focus:ring-[#323232]"
          value={month}
          onChange={handleMonthChange}
        >
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}월
            </option>
          ))}
        </select>

        {/* 일 선택 */}
        <select 
          className="flex-1 bg-gray-100 rounded-full p-3 focus:ring-2 focus:ring-[#323232] text-gray-400"
          value={1} 
          disabled
        >
          <option value={25}>25일</option>
        </select>

      </div>

      <div className='flex flex-col space-y-2 justify-center pt-4'>
        <p className="border-1 border-dashed border-gray-400 w-full mt-2 mb-4"></p>

        {/* 버튼 */}
        <div className="flex flex-row space-x-4">
          <button type="button" className="flex-1 border-2 border-[#006D2C] text-[#006D2C] py-2 rounded-full">
            기본급 수정 
          </button>
          <button type="button" className="flex-1 border-1 border-[#323232] text-[#323232] py-2 rounded-full">
            기본급 입력 
          </button>
        </div>
      </div>
    </div>
  );
};

export default PSalary;
