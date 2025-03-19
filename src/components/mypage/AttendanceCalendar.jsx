import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const AttendanceCalendar = () => {
  const [attendance, setAttendance] = useState({});
  const [currentMonth, setCurrentMonth] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
  });

  const empId = localStorage.getItem("empId"); // 로컬 스토리지에서 empId 가져오기

  // 📌 월이 변경될 때마다 API 요청을 보내는 함수
  const fetchAttendanceData = (year, month) => {
    if (!empId) return;

    const requestBody = { year, month: String(month).padStart(2, '0') };

    fetch(`/api/attendance/${empId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("API 응답 데이터:", data);

        const formattedData = {};
        data.forEach((entry) => {
          const dateStr = entry.date; // 'YYYY-MM-DD' 형식
          const date = new Date(dateStr);
          const localDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
          const formattedDate = localDate.toISOString().split('T')[0];

          formattedData[formattedDate] = {
            in_time: entry.inTime,
            out_time: entry.outTime,
          };
        });

        setAttendance(formattedData);
      })
      .catch((error) => console.error("Error fetching attendance data:", error));
  };

  // 📌 페이지 첫 렌더링 및 월 변경 시 데이터 가져오기
  useEffect(() => {
    fetchAttendanceData(currentMonth.year, currentMonth.month);
  }, [currentMonth, empId]);

  // 📌 월 변경 시 실행 (이전/다음 달 버튼 클릭 시)
  const handleMonthChange = ({ activeStartDate }) => {
    if (activeStartDate) {
      setCurrentMonth({
        year: activeStartDate.getFullYear(),
        month: activeStartDate.getMonth() + 1, // 0부터 시작하는 JS 월 보정
      });
    }
  };

  // 📌 날짜 셀에 출근 시간과 퇴근 시간을 표시
  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const dateStr = date.toISOString().split('T')[0];
      const attendanceForDate = attendance[dateStr];

      if (attendanceForDate) {
        return (
          <div className="attendance-text">
            <p>출근: {attendanceForDate.in_time || '없음'}</p>
            <p>퇴근: {attendanceForDate.out_time || '없음'}</p>
          </div>
        );
      }
    }
    return null;
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="p-8 bg-white rounded-3xl mb-8 shadow">
        <div className="ml-8 mr-8">
          <div className="flex flex-1 justify-between items-center space-y-4">
            <h4 className="font-bold text-[#323232]">근태정보</h4>
          </div>
        </div>
        <Calendar
          className="w-full border-none p-3 text-[#323232]"
          tileContent={tileContent}
          onActiveStartDateChange={handleMonthChange} // 📌 월 변경 시 데이터 다시 불러오기
        />
      </div>
    </div>
  );
};

export default AttendanceCalendar;
