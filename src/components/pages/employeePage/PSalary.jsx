import React from 'react'
import { ChevronDown } from 'react-bootstrap-icons';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const PSalary = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formData = useSelector(state => state.employee.formData);

  // 닫기 버튼 클릭 시 /employees 페이지로 이동
  const handleClose = () => {
    navigate("/employees");
  };

  const handleYearChange = (e) => {
    dispatch(updateSalary({ ...formData, year: e.target.value }));
  };

  const handleMonthChange = (e) => {
    dispatch(updateSalary({ ...formData, month: e.target.value }));
  };

  const handleDayChange = (e) => {
    dispatch(updateSalary({ ...formData, day: e.target.value }));
  };

  return (
    <div className='w-full h-30 bg-white text-center rounded-3xl p-8 shadow-md'>
      <h1 className='text-lg font-bold mb-10'>사원 기본급 비용</h1>
      <div className='flex flex-row space-x-8 items-center'>
        {/* 년 선택 appearance-none */}
          
        <select 
          className="flex-1 bg-gray-100 rounded-full p-3 pr-6 focus:ring-2 focus:ring-[#323232]"
          value={formData.year}
          onChange={handleYearChange}
          >
          {Array.from({ length: 10 }, (_, i) => (
            <option key={i} value={2025 + i}>
              {2025 + i}년
            </option>
          ))}
        </select>

        {/* 월 선택 */}
        <select 
          className="flex-1 bg-gray-100 rounded-full p-3 focus:ring-2 focus:ring-[#323232]"
          value={formData.month}
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
          className="flex-1 bg-gray-100 rounded-full p-3 focus:ring-2 focus:ring-[#323232]"
          value={formData.day}
          onChange={handleDayChange}
        >
          {Array.from({ length: 31 }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}일
            </option>
          ))}
        </select>
      </div>
      <div className='flex flex-col space-y-2 justify-center pt-4'>
        <p className="border-1 border-dashed border-gray-400 w-full mt-2 mb-4"></p>
        <button
            type="submit" 
            onClick={handleClose}
            className="border-2 border-[#006D2C] text-[#006D2C] py-2 mr-4 rounded-full w-full"
          >
            기본급 수정하기 
        </button>
        <button 
            type="submit" 
            className="bg-[#006D2C] text-white py-2 rounded-full w-full"
          >
            기본급 지급하기 
        </button>
      </div>
    </div>
  )
}

export default PSalary