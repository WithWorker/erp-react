import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const AttendanceCalendar = () => {
  const [attendance, setAttendance] = useState({});
  const [currentMonth, setCurrentMonth] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
  });
  const empId = localStorage.getItem("empId"); 

  const fetchAttendanceData = (year, month) => {
    if (!empId) return;
    const requestBody = { year, month: String(month).padStart(2, '0') };

    fetch(`/api/attendance/${empId}`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
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

  // 첫 렌더링 및 월 변경 시 실행
  useEffect(() => {
    fetchAttendanceData(currentMonth.year, currentMonth.month);
  }, [currentMonth, empId]);

  // 월 변경 시 실행
  const handleMonthChange = ({ activeStartDate }) => {
    if (activeStartDate) {
      setCurrentMonth({
        year: activeStartDate.getFullYear(),
        month: activeStartDate.getMonth() + 1, 
      });
    }
  };

  // 날짜 셀에 표시
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
      <div className="p-8 bg-white rounded-lg mb-8 shadow">
        <Calendar
          className="w-full border-none p-3"
          tileContent={tileContent}
          onActiveStartDateChange={handleMonthChange} 
        />
      </div>
    </div>
  );
};

export default AttendanceCalendar;
