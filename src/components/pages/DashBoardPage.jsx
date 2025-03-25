import Header from "../include/Header";
import Sidebar from "../include/Sidebar";
import { useSelector } from "react-redux";
import Notice from "./notice/Notice";
import ApprovalList from "../pages/documentPage/ApprovalList";
import SalesAnalysis from "./SalesAnalysis";
import React, { useEffect, useState } from "react";
import { Calendar } from 'react-calendar';
import "react-calendar/dist/Calendar.css"; // 스타일을 불러오기 위해 필요
//import { Calendar } from "react-bootstrap-icons";

const DashboardPage = () => {
  const clockInTime = useSelector((state) => state.attendance.clockInTime);
  const clockOutTime = useSelector((state) => state.attendance.clockOutTime);
  const isWorking = useSelector((state) => state.attendance.isWorking);
  const [selectedMessages, setSelectedMessages] = useState([]); // 중요 메시지 상태

  const [date, setDate] = useState(new Date()); // 달력에서 선택된 날짜 상태

  // 날짜 변경 시 호출되는 함수
  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  // ✅ localStorage에서 저장된 중요 메시지 불러오기
  useEffect(() => {
    const savedMessages = localStorage.getItem('selectedMessages');
    if (savedMessages) {
      setSelectedMessages(JSON.parse(savedMessages));
    }
  }, []);

  // ✅ 중요 메시지 상태를 localStorage에 저장
  useEffect(() => {
    localStorage.setItem('selectedMessages', JSON.stringify(selectedMessages));
  }, [selectedMessages]);

  // 중요 메시지 삭제
  const handleDeleteMessage = (id) => {
    setSelectedMessages((prev) =>
      prev.filter((msg) => msg.id !== id) // 삭제 후 상태 업데이트
    );
  };

  // 시간 포맷 설정 함수 (시간:분:초)
  const formatTime = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    return date.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar className='fixed'/> 
      <div className="flex-1 p-6 overflow-y-auto">
        <Header />
        <div className="flex flex-row items-start justify-start space-x-8 mb-6 ml-4">
          <div className="w-full h-[330px] bg-white rounded-3xl shadow-lg flex flex-col items-center p-4 space-y-6">
            <div className="space-x-s space-y-8 w-full">
              <div className="w-full flex-col flex p-2">
                <img src="/profile.jpg" alt="profile" className="w-24 h-24 rounded-full" />
                {/* 상태 및 메시지 표시 */}
                <div className="text-center flex flex-col items-center space-y-2">
                  <p className="text-lg font-semibold">
                    {isWorking ? "근무 중" : "퇴근"}
                  </p>
                  {/* 출퇴근 시간 표시 */}
                  <div className="w-full mt-3 flex items-center justify-center bg-[#006D2C] p-3 rounded-full">
                    {clockInTime ? (
                      <p className="text-white">
                        출근 : {formatTime(clockInTime)}
                      </p>
                    ) : (
                      <p className="text-white">출근 도장을 찍어주세요</p> // 출근 시간이 없을 경우 텍스트 표시
                    )}
                  </div>
                  <div className="w-full mt-2 flex items-center justify-center border-2 border-[#006D2C] p-3 rounded-full">
                    {clockOutTime ? (
                      <p className="text-[#006D2C]">
                        퇴근 : {formatTime(clockOutTime)}
                      </p>
                    ) : (
                      <p className="text-[#006D2C]">퇴근 도장을 찍어주세요</p> // 퇴근 시간이 없을 경우 텍스트 표시
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Notice />
          {/* 중요 메시지 표시 패널 */}
          <div className="w-full p-8 bg-white rounded-3xl shadow-lg  max-h-[330px]">
              <h2 className="text-lg font-bold mb-4">중요한 채팅 내역 표시</h2>
              <div className="space-y-2 overflow-y-auto h-[300px]">
                {selectedMessages.map((msg) => (
                  <div key={msg.id} className="flex items-center space-x-2 border-b pb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500">{msg.timestamp}</span>
                      <span className="text-sm truncate">{msg.text}</span>
                    </div>
                    {/* 삭제 버튼 */}
                    <button
                      onClick={() => handleDeleteMessage(msg.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          
        </div>
        {/* 
        <EventList selectedDate={new Date()} selectedEvents={[]} />
        */}
        <div className="w-[1570px] ml-4 mt-8">
          <div className="flex flex-row space-x-8 mb-8">
            <ApprovalList className='max-h-[330px]' />
          </div>
          <SalesAnalysis />
          <div className="w-full p-8 bg-white rounded-3xl shadow-lg mt-8">
            <h2 className="text-lg font-bold mb-4">일정 달력</h2>
            <div className="overflow-y-auto">
              {/* react-calendar 컴포넌트를 추가 */}
              <Calendar
                onChange={handleDateChange} // 날짜 변경 핸들러
                value={date} // 현재 선택된 날짜
                className="react-calendar w-full border-none" // Tailwind로 크기 설정
              />
            </div>
          </div>
      </div>
    </div>
    </div>
  );
};

export default DashboardPage;
