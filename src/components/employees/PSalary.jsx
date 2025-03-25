import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const PSalary = ({ onSalaryChange }) => {
  const { id } = useParams(); 
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [salary, setSalary] = useState(""); // 기본급 상태

  // 직원 기본급 조회
  useEffect(() => {
    const fetchSalary = async () => {
      try {
        const response = await fetch(`/api/admin/emp/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setSalary(data.baseSalary || ""); 
        } else {
          console.error("Failed to fetch employee salary");
        }
      } catch (error) {
        console.error("Error fetching employee salary:", error);
      }
    };

    fetchSalary();
  }, [id]);

  // 급여 저장 요청
  const handleSaveSalary = async () => {
    const paymentData = {
      year,
      month,
      type: "SALARY",
    };

    try {
      const response = await fetch(`/api/admin/savePayment/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(paymentData),
      });

      if (response.ok) {
        alert("급여 내역이 저장되었습니다.");
      } else {
        alert("급여 저장 실패");
      }
    } catch (error) {
      console.error("Error saving salary:", error);
    }
  };

  const handleSalaryChange = (e) => {
    const value = e.target.value.replace(/,/g, ""); // 콤마 제거
    setSalary(value);
    onSalaryChange(Number(value)); // 부모 컴포넌트에 숫자로 전달
  };

  return (
    <div className='w-full h-30 bg-white text-center rounded-3xl p-8 shadow-md'>
      <div className='flex flex-row space-x-8 items-center'>
        {/* 연 선택 */}
        <select 
          className="flex-1 bg-gray-100 rounded-full p-3 pr-6 focus:ring-2 focus:ring-[#323232]"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
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
          onChange={(e) => setMonth(Number(e.target.value))}
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
          value={25} 
          disabled
        >
          <option value={25}>25일</option>
        </select>
      </div>

      <p className="border-1 border-dashed border-gray-400 w-full mt-4 mb-2"></p>
      <div className='flex flex-row space-x-4 justify-center pt-4'>
        <div className="flex flex-row space-x-4 items-center">
          <label className="text-sm font-medium">기본급</label>
          <input 
            type="text" 
            className="bg-gray-100 border rounded-md w-32 p-2 text-right"
            value={salary ? Number(salary).toLocaleString() : ""} 
            onChange={handleSalaryChange} // 숫자 입력값 처리
          />
          <button 
            type="button" 
            className="border-2 border-[#006D2C] text-[#006D2C] py-2 px-6 rounded-full"
            onClick={handleSaveSalary}
          >
            내역저장
          </button>
        </div>
      </div>
    </div>
  );
};

export default PSalary;
