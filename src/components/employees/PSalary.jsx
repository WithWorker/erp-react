import React, { useState } from 'react';

const PSalary = () => {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [salary, setSalary] = useState(""); // 기본급 상태 추가

  const handleYearChange = (e) => setYear(Number(e.target.value));
  const handleMonthChange = (e) => setMonth(Number(e.target.value));
  const handleSalaryChange = (e) => setSalary(e.target.value); // 기본급 입력 처리 함수

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
      <p className="border-1 border-dashed border-gray-400 w-full mt-4 mb-2"></p>
      <div className='flex flex-row space-x-4 justify-center pt-4'>
        <div className="flex flex-row space-x-4 items-center">
          <label className="text-sm font-medium">기본급</label>
          <input type="text" className="bg-gray-100 border rounded-md w-32 p-2"
            value={salary} 
            onChange={handleSalaryChange} 
          />
          <button type="button" className="border-2 border-[#006D2C] text-[#006D2C] py-2 px-6 rounded-full">
            내역저장
          </button>

        </div>
      </div>
    </div>
  );
};

export default PSalary;
