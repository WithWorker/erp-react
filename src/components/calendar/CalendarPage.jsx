import React, { useState, useRef, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import googleCalendarPlugin from '@fullcalendar/google-calendar';
import { ChevronLeft, ChevronRight } from "react-bootstrap-icons"; // Search 아이콘 추가
import Sidebar from "../include/Sidebar";
import Header from "../include/Header";
import TopNav from "../include/TopNav";
import { useNavigate } from "react-router-dom";
import '/src/assets/calendar.css';
import { getAllCalendars, getDeptCalendars, getMyCalendars } from "../../service/calendarLogic";
import EventList from "./EventList"; // EventList 컴포넌트 import

const CalendarPage = () => {
  const navigate = useNavigate();
  const calendarRef = useRef(null);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [selectedDate, setSelectedDate] = useState(null);
  const today = new Date().toISOString().split("T")[0]; // 오늘 날짜를 `YYYY-MM-DD` 형식으로 저장
  const [events, setEvents] = useState([]); // 전체 일정
  const [viewMode, setViewMode] = useState('all'); // 'all', 'personal', 'department'
  const [selectedEvents, setSelectedEvents] = useState([]); // 선택된 날짜의 일정 목록

  const applicantId = 2; // 특정 사용자의 ID (임시 값)
  const departmentId = 2; // 부서명

  // 이전 달 버튼 클릭
  const handlePrevMonth = () => {
    if (currentMonth > 0) {
      const newMonth = currentMonth - 1;
      setCurrentMonth(newMonth);
      moveCalendarToMonth(newMonth);
    }
  };

  // 다음 달 버튼 클릭
  const handleNextMonth = () => {
    if (currentMonth < 11) {
      const newMonth = currentMonth + 1;
      setCurrentMonth(newMonth);
      moveCalendarToMonth(newMonth);
    }
  };

  // 달력을 특정 월로 이동
  const moveCalendarToMonth = (month) => {
    const year = new Date().getFullYear();
    const newDate = new Date(year, month, 1);
    if (calendarRef.current) {
      calendarRef.current.getApi().gotoDate(newDate);
    }
  };

  // 오늘 날짜로 달력 이동
  const handleTodayClick = () => {
    const calendarApi = calendarRef.current.getApi();
    calendarApi.gotoDate(today); //오늘 날짜로 달력 이동
    const todayMonth = new Date().getMonth(); // 현재 월을 오늘 월로 설정
    setCurrentMonth(todayMonth);
    setSelectedDate(today); // 선택된 날짜를 오늘 날짜로 설정
  };

  // 날짜 클릭 시 일정 필터링
  const handleDateClick = (arg) => {
    const clickedDate = arg.dateStr;
    setSelectedDate(clickedDate);
    
    // 해당 날짜에 맞는 이벤트 필터링
    const eventsOnSelectedDate = events.filter(event => {
      const eventDate = new Date(event.start).toISOString().split("T")[0];  // 'YYYY-MM-DD' 형식으로만 비교
      return eventDate === clickedDate;
    });

    setSelectedEvents(eventsOnSelectedDate); // 선택된 날짜의 이벤트만 필터링
  };

  // 일정 데이터 불러오기
  useEffect(() => {
    const fetchCalendars = async () => {
      try {
        let data;
        if (viewMode === 'personal') {
          data = await getMyCalendars(applicantId);
        } else if (viewMode === 'department') {
          data = await getDeptCalendars(departmentId);
        } else {
          data = await getAllCalendars();
        }
        console.log("응답 받은 데이터:", data);

        const calendarEvents = data.map(event => {
          if (!event.start_date || !event.end_date) {
            console.error("start_date 또는 end_date가 없습니다. 이벤트: ", event);
            return null;
          }

          const startDate = new Date(event.start_date);
          const endDate = new Date(event.end_date);

          // UTC 시간으로 변환된 날짜를 로컬 시간대로 변환하여 날짜 비교
          const localStartDate = startDate.toLocaleDateString('en-CA'); // 'YYYY-MM-DD' 형식
          const localEndDate = endDate.toLocaleDateString('en-CA'); // 'YYYY-MM-DD' 형식

          // 날짜가 유효한지 체크
          if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
            console.error("유효하지 않은 날짜 값: ", event.start_date, event.end_date);
            return null;
          }

          return {
            id: event.id, // id 추가
            title: event.title,
            start: startDate.toISOString(),
            end: endDate.toISOString(),
            description: event.content,
            extendedProps: {
              applicant: event.memberDto.name,
              dept: event.memberDto.dept,
            }
          };
        }).filter(event => event !== null);

        console.log("변환된 일정 데이터:", calendarEvents);
        setEvents(calendarEvents);
      } catch (error) {
        console.error("일정을 가져오는 중 오류 발생: ", error);
      }
    };

    fetchCalendars();
  }, [viewMode, selectedDate, currentMonth]);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-6">
        <Header />
        
        <div className="flex">
          <div className="flex-1 bg-white p-6 rounded-2xl shadow-lg">
            <TopNav setViewMode={setViewMode} />
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
            </div>
            <FullCalendar
              ref={calendarRef}
              plugins={[dayGridPlugin, interactionPlugin, googleCalendarPlugin]}
              initialView="dayGridMonth"
              googleCalendarApiKey="AIzaSyDfwgsofWdf7-7m9Odn9G4T6jXN9vKLvCE"
              events={events}
              eventSources={[{
                googleCalendarId: 'ko.south_korea#holiday@group.v.calendar.google.com',
                className: 'gcal-event',
              }]}
              eventContent={(eventInfo) => (
                <div>
                  <span>{eventInfo.event.title}</span>
                </div>
              )}
              headerToolbar={false}
              initialDate={today}
              height="auto"
              dateClick={handleDateClick} // 날짜 클릭 시 처리
            />
          </div>

          {/* EventList 컴포넌트 사용 */}
          <EventList selectedDate={selectedDate} selectedEvents={selectedEvents} />
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
