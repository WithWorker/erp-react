import React, { useState } from 'react';

const PBonus = () => {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [bonus, setBonus] = useState(""); // 성과급 상태 추가

  const handleYearChange = (e) => setYear(Number(e.target.value));
  const handleBonusChange = (e) => setBonus(e.target.value); // 성과급 입력 처리 함수

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
          className="flex-1 bg-gray-100 rounded-full p-3 focus:ring-2 focus:ring-[#323232] text-gray-400"
          value={3} 
          disabled
        >
          <option value={3}>3월</option>
        </select>

        {/* 일 선택 */}
        <select 
          className="flex-1 bg-gray-100 rounded-full p-3 focus:ring-2 focus:ring-[#323232] text-gray-400"
          value={22} 
          disabled
        >
          <option value={22}>22일</option>
        </select>

      </div>
      <p className="border-1 border-dashed border-gray-400 w-full mt-4 mb-2"></p>
      <div className='flex flex-row space-x-4 justify-center pt-4'>
        <div className="flex flex-row space-x-4 items-center w-full">
          <label className="text-sm font-medium">성과급</label>
          <input type="text" className="bg-gray-100 border rounded-md p-2 w-32" 
            value={bonus} 
            onChange={handleBonusChange} 
          />
          <button type="button" className="border-2 border-[#006D2C] text-[#006D2C] py-2 px-4 rounded-full">
            내역저장
          </button>
        </div>
      </div>
    </div>
  );
};

export default PBonus;
