import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

const PBonus = () => {
  const { id } = useParams();
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [bonus, setBonus] = useState(""); // 성과급 상태 추가

  useEffect(() => {
    // 성과급 조회 요청
    const fetchBonus = async () => {
      try {
        const response = await fetch(`/api/bonus/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        if (response.ok) {
          const data = await response.json();
          setBonus(data);
        } else {
          console.error("성과급 조회 실패");
        }
      } catch (error) {
        console.error("성과급 조회 중 오류 발생:", error);
      }
    };

    fetchBonus();
  }, [id]);

  // 급여 저장 요청
  const handleSavePayment = async () => {
    try {
      const response = await fetch(`/api/savePayment/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          year,
          month: 3,
          type: "BONUS",
        }),
      });

      if (response.ok) {
        alert("급여 내역이 저장되었습니다.");
      } else {
        console.error("급여 내역 저장 실패");
      }
    } catch (error) {
      console.error("급여 내역 저장 중 오류 발생:", error);
    }
  };

  return (
    <div className="w-full h-30 bg-white text-center rounded-3xl p-8 shadow-md">
      <div className="flex flex-row space-x-8 items-center">
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
      <div className="flex flex-row space-x-4 justify-center pt-4">
        <div className="flex flex-row space-x-4 items-center w-full">
          <label className="text-sm font-medium">성과급</label>
          <input type="text" className="bg-gray-100 border rounded-md p-2 w-32" 
            value={bonus} 
            readOnly 
          />
          <button
            type="button"
            className="border-2 border-[#006D2C] text-[#006D2C] py-2 px-4 rounded-full"
            onClick={handleSavePayment}
          >
            내역저장
          </button>
        </div>
      </div>
    </div>
  );
};

export default PBonus;
