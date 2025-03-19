import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const AttendanceCalendar = () => {
  const [attendance, setAttendance] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date());
  const empId = localStorage.getItem("empId"); // 로컬 스토리지에서 empId 가져오기

  useEffect(() => {
    // 선택된 날짜를 로컬 시간대 기준으로 설정
    const dateStr = selectedDate.toLocaleDateString('en-CA'); // 'YYYY-MM-DD' 형식으로 변환
    
    // 근태 조회 API 호출
    fetch(`/api/attendance/${empId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dateStr), // 날짜만 전송
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("API 응답 데이터:", data); // 응답 데이터 확인
  
        // 서버에서 반환된 날짜가 로컬 타임존과 다를 수 있으므로 날짜를 UTC로 변환 후 로컬 시간대로 처리
        const date = new Date(dateStr); // 날짜 객체 생성
        const localDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000); // 로컬 타임존으로 변환
        const formattedDate = localDate.toISOString().split('T')[0]; // 'YYYY-MM-DD' 형식으로 변환
  
        const formattedData = {
          [formattedDate]: {
            in_time: data.inTime,
            out_time: data.outTime,
          },
        };
  
        setAttendance((prevState) => ({
          ...prevState,
          ...formattedData, // 기존 데이터와 새로운 데이터를 합침
        })); // 날짜별로 데이터를 저장
      })
      .catch((error) => console.error("Error fetching attendance data:", error));
  }, [empId, selectedDate]); // selectedDate가 변경될 때마다 실행

  useEffect(() => {
    // 첫 번째 렌더링 시 기본 날짜에 대해 근태 데이터를 가져옴
    const dateStr = selectedDate.toLocaleDateString('en-CA'); // 'YYYY-MM-DD' 형식으로 변환
    fetch(`/api/attendance/${empId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dateStr), // 날짜만 전송
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("첫 렌더링 시 API 응답 데이터:", data); // 응답 데이터 확인
  
        const date = new Date(dateStr); // 날짜 객체 생성
        const localDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000); // 로컬 타임존으로 변환
        const formattedDate = localDate.toISOString().split('T')[0]; // 'YYYY-MM-DD' 형식으로 변환
  
        const formattedData = {
          [formattedDate]: {
            in_time: data.inTime,
            out_time: data.outTime,
          },
        };
  
        setAttendance((prevState) => ({
          ...prevState,
          ...formattedData, // 기존 데이터와 새로운 데이터를 합침
        })); // 날짜별로 데이터를 저장
      })
      .catch((error) => console.error("Error fetching attendance data:", error));
  }, []); // 빈 배열을 사용하여 첫 렌더링 시 한 번만 실행

  const handleDateChange = (date) => {
    setSelectedDate(date); // 날짜가 변경되면 selectedDate 업데이트
  };

  // 날짜 셀에 출근 시간과 퇴근 시간을 표시
  const tileContent = ({ date, view }) => {
    if (view === 'month') { // 월 뷰에서만 날짜 셀을 커스터마이즈
      const dateStr = date.toISOString().split('T')[0]; // 날짜를 YYYY-MM-DD 형식으로 변환
      const attendanceForDate = attendance[dateStr]; // 해당 날짜의 근태 데이터 조회

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
        <div className='ml-8 mr-8'>
          <div className="flex flex-1 justify-between items-center space-y-4">
            <h4 className="font-bold text-[#323232]">근태정보</h4>
          </div>
        </div>
        <Calendar
          value={selectedDate}
          onChange={handleDateChange} // 날짜가 변경되면 handleDateChange 호출
          className={'w-full border-none p-3 text-[#323232]'}
          tileContent={tileContent} // 날짜 셀에 커스터마이징된 내용 표시
        />
      </div>
    </div>
  );
};

export default AttendanceCalendar;
