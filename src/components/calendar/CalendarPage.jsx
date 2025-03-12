import { useState, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { ChevronLeft, ChevronRight, Search } from "react-bootstrap-icons"; // Search 아이콘 추가
import Sidebar from "../include/Sidebar";
import Header from "../include/Header";
import TopNav from "../include/TopNav";
import { useNavigate } from "react-router-dom";

const CalendarPage = () => {
  const navigate = useNavigate();
  const calendarRef = useRef(null);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [selectedDate, setSelectedDate] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const today = new Date().toISOString().split("T")[0]; // 오늘 날짜를 `YYYY-MM-DD` 형식으로 저장

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handlePrevMonth = () => {
    if (currentMonth > 0) {
      const newMonth = currentMonth - 1;
      setCurrentMonth(newMonth);
      moveCalendarToMonth(newMonth);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth < 11) {
      const newMonth = currentMonth + 1;
      setCurrentMonth(newMonth);
      moveCalendarToMonth(newMonth);
    }
  };

  const moveCalendarToMonth = (month) => {
    const year = new Date().getFullYear();
    const newDate = new Date(year, month, 1);
    if (calendarRef.current) {
      calendarRef.current.getApi().gotoDate(newDate);
    }
  };

  const handleTodayClick = () => {
    const calendarApi = calendarRef.current.getApi();
    calendarApi.gotoDate(today);
    setSelectedDate(today);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-6">
        <Header />
        <TopNav />
        <div className="flex">
          <div className="flex-1 bg-white p-6 rounded-2xl shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleTodayClick}
                  className="px-4 py-2 bg-[#006D2C] text-white rounded-md"
                >
                  오늘
                </button>
                <button onClick={handlePrevMonth} disabled={currentMonth === 0}>
                  <ChevronLeft size={24} />
                </button>
                <h2 className="text-lg font-bold">{currentMonth + 1}월</h2>
                <button
                  onClick={handleNextMonth}
                  disabled={currentMonth === 11}
                >
                  <ChevronRight size={24} />
                </button>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="이벤트 검색"
                  className="w-64 p-2 border rounded-md"
                  onChange={handleSearchChange}
                />
                <Search
                  size={24}
                  className="cursor-pointer"
                  onClick={() => {}}
                />
              </div>
            </div>
            <FullCalendar
              ref={calendarRef}
              plugins={[dayGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              headerToolbar={false}
              initialDate={today}
              height="auto"
            />
          </div>

          <div className="flex flex-col space-y-4 w-96 ml-6 p-4 bg-white rounded-2xl shadow-lg">
            {selectedDate && (
              <div>
                <h3 className="text-lg font-bold">{selectedDate} 일정</h3>
                <p>등록된 일정이 없습니다.</p>
              </div>
            )}
            <button
              className="w-full p-2 mt-4 bg-[#006D2C] text-white rounded-md"
              onClick={() => navigate(`/write?date=${selectedDate || today}`)}
            >
              일정 추가
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
