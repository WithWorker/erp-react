import { useSelector, useDispatch } from "react-redux";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { ChevronLeft, ChevronRight, Search } from "react-bootstrap-icons"; // Search 아이콘 추가
import { useState, useEffect, useRef } from "react";
import Sidebar from "../../components/include/Sidebar";
import Header from "../../components/include/Header";
import { removeEvent, loadEvents } from "../../redux/slice/calendarSlice";
import TopNav from "../include/TopNav";
import { useNavigate } from 'react-router-dom';
import { setCategory } from '../../redux/slice/calendarSlice';
import { categoryColors } from '../../utils/categoryColors';

const CalendarPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const events = useSelector((state) => state.calendar?.events || []);
  const category = useSelector((state) => state.calendar?.category);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [currentDate, setCurrentDate] = useState(`${new Date().getFullYear()}-${(new Date().getMonth() + 1).toString().padStart(2, '0')}-01`);
  const [todayEvents, setTodayEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const calendarRef = useRef(null);

  const today = new Date().toISOString().split('T')[0];

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };


  useEffect(() => {
    const savedEvents = JSON.parse(localStorage.getItem('events')) || [];
    dispatch(loadEvents(savedEvents));
  }, [dispatch]);

  useEffect(() => {
    const filteredTodayEvents = events.filter(event => event.start?.split('T')[0] === today);
    setTodayEvents(filteredTodayEvents);
  }, [events]);

  useEffect(() => {
      const filteredEvents = events.filter(event => {
      const isSameDate = event.start?.split('T')[0] === selectedDate;
      const matchesSearchQuery = event.title.toLowerCase().includes(searchQuery.toLowerCase());
      return isSameDate && matchesSearchQuery;
    });
    setSelectedEvents(filteredEvents);
  }, [events, selectedDate, searchQuery]);
  

  useEffect(() => {
    const firstDateOfMonth = new Date(new Date().getFullYear(), currentMonth, 1);
    const lastDateOfMonth = new Date(new Date().getFullYear(), currentMonth + 1, 0);
    const filteredEvents = events.filter(event => {
      const eventDate = new Date(event.start);
      return eventDate >= firstDateOfMonth && eventDate <= lastDateOfMonth;
    });
    setSelectedEvents(filteredEvents);
  }, [currentMonth, events]);

  useEffect(() => {
    setSelectedDate(`${new Date().getFullYear()}-${(currentMonth + 1).toString().padStart(2, '0')}-01`);
  }, [currentMonth]);

  useEffect(() => {
    dispatch(setCategory('all'));
  }, [dispatch]);

  const filteredEvents = events
    .filter(event => category === "all" || event.category === category)
    .map(event => ({
      ...event,
      backgroundColor: categoryColors[event.category] || '#D1D5DB',
      borderColor: 'none',
      borderWidth: 0,
      borderStyle: 'none',
    }));

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

  const handleDateClick = (info) => {
    const clickedDate = info.dateStr;
    const calendarApi = calendarRef.current.getApi();
    
    // 오늘 날짜를 클릭했을 경우 선택을 해제
    if (calendarApi.getDate().toISOString().split('T')[0] === today) {
      calendarApi.unselect();
    }
  
    // 다른 날짜를 클릭했을 경우 선택
    if (clickedDate !== today) {
      calendarApi.select(clickedDate);
    } else {
      calendarApi.unselect();
    }
    
    // 선택된 날짜를 업데이트
    setSelectedDate(clickedDate);
    
    // 해당 날짜에 맞는 일정 필터링
    const filteredSelectedEvents = events.filter(event => event.start?.split('T')[0] === clickedDate);
    setSelectedEvents(filteredSelectedEvents);
    
    // 선택된 날짜에 오늘의 일정이 포함되도록 오늘 일정도 필터링
    const filteredTodayEvents = events.filter(event => event.start?.split('T')[0] === today);
    setTodayEvents(filteredTodayEvents);
  };

  useEffect(() => {
    // events가 변경될 때마다 오늘 날짜에 해당하는 일정만 필터링하여 todayEvents로 설정
    const filteredTodayEvents = events.filter(event => event.start?.split('T')[0] === today);
    setTodayEvents(filteredTodayEvents);
  }, [events]);
  
  // 검색 후에 selectedDate가 설정되지 않으면 오늘 날짜로 설정
  const handleSearchKeyDown = (e) => {
  if (e.key === 'Enter') {
    // 검색어로 필터링된 일정들
    const filteredEvents = events.filter(event =>
      event.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSelectedEvents(filteredEvents);

    // 검색 후 selectedDate가 설정되지 않으면 검색된 일정 중 첫 번째 날짜를 selectedDate로 설정
    if (filteredEvents.length > 0) {
      setSelectedDate(filteredEvents[0].start.split('T')[0]); // 첫 번째 일정의 날짜로 설정
    } else {
      setSelectedDate(today); // 검색 결과가 없다면 오늘 날짜로 설정
    }
  }
};

  
  useEffect(() => {
    // events가 변경될 때마다 오늘 날짜에 해당하는 일정만 필터링하여 todayEvents로 설정
    const filteredTodayEvents = events.filter(event =>
      event.start?.split('T')[0] === today
    );
    setTodayEvents(filteredTodayEvents);
  }, [events]);
  
  

  const handleEventClick = (info) => {
    const eventId = info.event.id;
    if (eventId) {
      navigate(`/event/${eventId}`);
    } else {
      alert("잘못된 이벤트입니다.");
    }
  };

  const handleTodayClick = () => {
    const calendarApi = calendarRef.current.getApi();
    calendarApi.gotoDate(today);

    const todayDate = new Date(today);
    const todayMonth = todayDate.getMonth();
    setCurrentMonth(todayMonth);

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
              {/* 왼쪽: 오늘 버튼, 이전/다음 월 버튼 */}
              <div className="flex items-center space-x-2">
                <button onClick={handleTodayClick} className="px-4 py-2 bg-[#006D2C] text-white rounded-md">오늘</button>
                <button onClick={handlePrevMonth} disabled={currentMonth === 0}>
                  <ChevronLeft size={24} />
                </button>
                <h2 className="text-lg font-bold">{currentMonth + 1}월</h2>
                <button onClick={handleNextMonth} disabled={currentMonth === 11}>
                  <ChevronRight size={24} />
                </button>
              </div>

              {/* 오른쪽: 검색창 및 검색 아이콘 */}
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="이벤트 검색"
                  className="w-64 p-2 border rounded-md"
                  onChange={handleSearchChange}
                  onKeyDown={handleSearchKeyDown} // Enter 키 이벤트 추가
                />
                <Search size={24} className="cursor-pointer" onClick={() => handleSearchKeyDown({ key: 'Enter' })} /> {/* 검색 아이콘 */}
              </div>
            </div>

            <FullCalendar
              ref={calendarRef}
              plugins={[dayGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              events={filteredEvents}
              headerToolbar={false}
              height="auto"
              initialDate={currentDate}
              dateClick={handleDateClick}
              eventClick={handleEventClick}
            />
          </div>

          <div className="flex flex-col space-y-4 w-96 ml-6 p-4 bg-white rounded-2xl shadow-lg">
            {selectedDate ? (
              <div>
                <h3 className="text-lg font-bold">{selectedDate} 일정</h3>
                {selectedEvents.length > 0 ? (
                  <ul>
                    {selectedEvents.map((event) => (
                      <li key={event.id} className="mt-2 p-2 bg-gray-100 rounded-md">
                        {event.title}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>등록된 일정이 없습니다.</p>
                )}
              </div>
            ) : (
              <div>
                <h3 className="text-lg font-bold">오늘의 일정</h3>
                {todayEvents.length > 0 ? (
                  <ul>
                    {todayEvents.map((event) => (
                      <li key={event.id} className="mt-2 p-2 bg-gray-100 rounded-md">
                        {event.title}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>오늘의 일정이 없습니다.</p>
                )}
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
