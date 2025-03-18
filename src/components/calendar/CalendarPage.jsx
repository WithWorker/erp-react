import React, { useState, useRef, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import googleCalendarPlugin from '@fullcalendar/google-calendar';
import { ChevronLeft, ChevronRight } from "react-bootstrap-icons"; // Search 아이콘 추가
import Sidebar from "../include/Sidebar";
import Header from "../include/Header";
import TopNav from "./TopNav";
import { useNavigate } from "react-router-dom";
import '/src/assets/calendar.css';
import { getAllCalendars, getDeptCalendars, getMyCalendars } from "../../service/calendarLogic";
import EventList from "./EventList"; 

const CalendarPage = () => {
  const navigate = useNavigate();
  const calendarRef = useRef(null);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const today = new Date().toISOString().split("T")[0]; // 오늘 날짜를 YYYY-MM-DD 형식으로 저장
  const [selectedDate, setSelectedDate] = useState(today); // 초기값을 today로 설정
  const [events, setEvents] = useState([]); 
  const [viewMode, setViewMode] = useState('all'); // 'all', 'personal', 'department'
  const [selectedEvents, setSelectedEvents] = useState([]); // 선택된 날짜의 일정 목록

  const applicantId = 2; // 특정 사용자의 ID (임시 값)
  const departmentId = 3; // 부서명

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
        console.log("풀캘린더 데이터:", data);

        const calendarEvents = data.map(event => {
          if (!event.start_date || !event.end_date) {
            console.error("start_date 또는 end_date가 없습니다. 이벤트: ", event);
            return null;
          }

          const startDate = new Date(event.start_date);
          const endDate = new Date(event.end_date);

          // 날짜가 유효한지 체크
          if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
            console.error("유효하지 않은 날짜 값: ", event.start_date, event.end_date);
            return null;
          }

          return {
            id: event.calendarId, // id 추가
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

        console.log("일정List 데이터:", calendarEvents);
        setEvents(calendarEvents);

        // 오늘 날짜에 맞는 일정 필터링
        if (selectedDate) {
          filterEventsByDate(selectedDate, calendarEvents);
        }

      } catch (error) {
        console.error("일정을 가져오는 중 오류 발생: ", error);
      }
    };

    fetchCalendars();
  }, [viewMode, selectedDate, currentMonth]);

  // 날짜에 맞는 일정 필터링 함수
  const filterEventsByDate = (date, events) => {
    const eventsOnSelectedDate = events.filter(event => {
      const startDate = new Date(event.start).toLocaleDateString('en-CA'); // UTC 변환 없이 로컬 기준 날짜 추출
      const endDate = new Date(event.end).toLocaleDateString('en-CA');
      return date >= startDate && date <= endDate; // selectedDate가 start와 end 사이에 있는지 확인
    });

    setSelectedEvents(eventsOnSelectedDate); // 선택된 날짜의 이벤트만 필터링
  };
  
  // 일정 클릭 시 상세 페이지로 이동
  const handleEventClick = (info) => {
    const calendarId = info.event.id;
    navigate(`/calendar/${calendarId}`);
  }

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
    calendarApi.gotoDate(today); // 오늘 날짜로 달력 이동
    const todayMonth = new Date().getMonth(); // 현재 월을 오늘 월로 설정
    setCurrentMonth(todayMonth);
    setSelectedDate(today); // 선택된 날짜를 오늘 날짜로 설정

    // 오늘 날짜에 맞는 일정 필터링
    filterEventsByDate(today, events);
  };

  // 날짜 클릭 시 일정 필터링
  const handleDateClick = (arg) => {
    const clickedDate = arg.date.toLocaleDateString('en-CA');
    setSelectedDate(clickedDate); // 'YYYY-MM-DD' 형식으로 변환

    // 해당 날짜에 맞는 이벤트 필터링
    filterEventsByDate(clickedDate, events);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-6">
        <Header />
        
        <div className="flex">
          <div className="flex-1 bg-white p-6 rounded-2xl shadow-lg">
            <TopNav setViewMode={setViewMode} />
            <div className="flex justify-between items-center mb-4">
            <div className="flex-1 flex justify-start">
              <button onClick={handleTodayClick} className="px-4 py-2 bg-[#006D2C] text-white rounded-md">
                오늘
              </button>
            </div>

            <div className="flex justify-center items-center">
              <button onClick={handlePrevMonth} disabled={currentMonth === 0}>
                <ChevronLeft size={24} />
              </button>
              <h2 className="text-lg font-bold mx-2">{currentMonth + 1}월</h2>
              <button
                onClick={handleNextMonth}
                disabled={currentMonth === 11}
              >
                <ChevronRight size={24} />
              </button>
            </div>
            <div className="flex-1"></div> {/* 빈 공간을 추가하여 요소들이 가운데 정렬되게 함 */}
          </div>

          <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin, interactionPlugin, googleCalendarPlugin]}
            initialView="dayGridMonth"
            googleCalendarApiKey={import.meta.env.VITE_GOOGLE_CALENDAR_API_KEY}
            events={events}
            eventSources={[
              {
                googleCalendarId: 'ko.south_korea#holiday@group.v.calendar.google.com',
                className: 'gcal-event', // 구글 캘린더 공휴일을 위한 className
              },
            ]}
            eventContent={(eventInfo) => (
              <div>
                <span>{eventInfo.event.title}</span>
              </div>
            )}
            headerToolbar={false}
            initialDate={today}
            height="auto"
            dateClick={handleDateClick}
            dayCellClassNames={(arg) => {
              const formattedDate = arg.date.toLocaleDateString('en-CA');
              return formattedDate === selectedDate ? "selected-date" : "";
            }}
            eventClick={handleEventClick}
            views={{
              dayGridMonth: {
                dayMaxEventRows: 3, // 하루에 최대 3개의 이벤트 행 표시
              },
            }}
          />
          </div>
          <EventList selectedDate={selectedDate} selectedEvents={selectedEvents} />
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;