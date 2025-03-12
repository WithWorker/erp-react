import React from "react";
import { useNavigate } from "react-router-dom";
import { BsCheckCircleFill } from "react-icons/bs";
import Sidebar from "../include/Sidebar";
import Header from "../include/Header";

const CalendarDetail = () => {
  const navigate = useNavigate();

  // Sample event data for design purposes
  const event = {
    date: "2025-03-15",
    startTime: "10:00 AM",
    writer: "John Doe",
    title: "Meeting with Team",
    content: "This is a detailed description of the event.",
    attendees: [
      { name: "Jane Smith" },
      { name: "Robert Johnson" },
    ],
  };

  return (
    <div className="flex w-full h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 w-screen p-6">
        <Header />

        {/* 전체 Flexbox 구조 */}
        <div className="flex space-x-4">
          {/* 왼쪽 일정 정보 섹션 */}
          <div className="flex-1 space-y-4">
            {/* 일정 일자, 시간, 작성자 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* 일정 일자 */}
              <div className="w-full bg-white p-6 rounded-full shadow-md flex items-center">
                <label className="text-sm font-semibold w-24">일정 일자</label>
                <input
                  type="text"
                  value={event.date}
                  className="w-full border-none text-[#006D2C]"
                  readOnly
                />
              </div>

              {/* 일정 시간 */}
              <div className="w-full bg-white p-6 rounded-full shadow-md flex items-center">
                <label className="text-sm font-semibold w-24">일정 시간</label>
                <input
                  type="text"
                  value={event.startTime}
                  className="w-full border-none text-[#006D2C]"
                  readOnly
                />
              </div>

              {/* 작성자 */}
              <div className="w-full bg-white p-6 rounded-full shadow-md flex items-center">
                <label className="text-sm font-semibold w-24">작성자</label>
                <input
                  type="text"
                  value={event.writer}
                  className="w-full border-none text-[#006D2C]"
                  readOnly
                />
              </div>
            </div>

            {/* 작성 제목 */}
            <div className="w-full bg-white p-6 rounded-full shadow-md flex items-center">
              <label className="text-sm font-semibold w-24">작성 제목</label>
              <input
                type="text"
                value={event.title}
                className="w-full border-none bg-none"
                readOnly
              />
            </div>

            {/* 일정 내용 */}
            <div className="bg-white p-6 rounded-2xl shadow-lg h-[calc(90vh-18rem)] overflow-hidden">
              <span className="text-sm font-semibold text-[#323232]">
                일정 내용
              </span>
              <textarea
                value={event.content}
                className="w-full h-full mt-2 p-2 border-none rounded-lg focus:outline-none resize-none overflow-y-auto"
                readOnly
              />
            </div>

            {/* 버튼 */}
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => navigate("/calendar")}
                className="bg-[#006D2C] text-white px-4 py-2 rounded-lg hover:bg-[#0e5028]"
              >
                수정
              </button>
              <button
                onClick={() => navigate("/calendar")}
                className="bg-[#006D2C] text-white px-4 py-2 rounded-lg hover:bg-[#0e5028]"
              >
                삭제
              </button>
              <button
                onClick={() => navigate("/calendar")}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
              >
                닫기
              </button>
            </div>
          </div>

          {/* 우측 참석자 섹션 */}
          <div className="w-64 bg-white p-6 rounded-2xl shadow-lg h-[calc(88vh-2rem)]">
            <span className="text-sm font-medium text-gray-500">참석자</span>
            <div className="bg-gray-100 p-4 rounded-lg max-h-64 overflow-y-auto mt-2">
              {event.attendees && event.attendees.length > 0 ? (
                event.attendees.map((attendee, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center mb-2 h-2"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{attendee.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BsCheckCircleFill className="text-[#006D2C]" />
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">참석자가 없습니다.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarDetail;
