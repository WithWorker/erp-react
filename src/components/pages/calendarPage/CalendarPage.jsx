import { useSelector, useDispatch } from "react-redux";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { ChevronLeft, ChevronRight, Search } from "react-bootstrap-icons"; // Search 아이콘 추가
import { useState, useEffect, useRef } from "react";
import Sidebar from "../../include/Sidebar";
import Header from "../../include/Header";
import { removeEvent, loadEvents } from "../../../redux/slice/calendarSlice";
import TopNav from "../../include/TopNav";
import { useNavigate } from "react-router-dom";
import { setCategory } from "../../../redux/slice/calendarSlice";
import { categoryColors } from "../../../utils/categoryColors";

const CalendarPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //const events = useSelector((state) => state.calendar?.events || []);
  const events = useSelector((state) => state.calendar.events);
  const category = useSelector((state) => state.calendar?.category);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [currentDate, setCurrentDate] = useState(
    `${new Date().getFullYear()}-${(new Date().getMonth() + 1)
      .toString()
      .padStart(2, "0")}-01`
  );
  const [todayEvents, setTodayEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const calendarRef = useRef(null);

  const today = new Date().toISOString().split("T")[0]; // 오늘 날짜를 `YYYY-MM-DD` 형식으로 저장

  const filteredEvents = events
    .filter((event) => category === "all" || event.category === category)
    .map((event) => ({
      ...event,
      backgroundColor: categoryColors[event.category] || "#D1D5DB",
    }));

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    const savedEvents = JSON.parse(localStorage.getItem("events")) || [];
    dispatch(loadEvents(savedEvents)); // 로컬 스토리지에서 이벤트 로드
  }, [dispatch]);

  //const events = useSelector(state => state.calendar.events);

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem("events")) || [];
    dispatch(loadEvents(storedEvents)); // Redux로 이벤트 로드
  }, [dispatch]);

  useEffect(() => {
    const filteredTodayEvents = events.filter(
      (event) => event.start && event.start.split("T")[0] === today
    );
    setSelectedEvents(filteredTodayEvents);
  }, [events, today]);

  useEffect(() => {
    const filteredEvents = events.filter((event) => {
      const isSameDate = event.start?.split("T")[0] === selectedDate;
      const matchesSearchQuery = event.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return isSameDate && matchesSearchQuery;
    });
    setSelectedEvents(filteredEvents);
  }, [events, selectedDate, searchQuery]);

  useEffect(() => {
    const firstDateOfMonth = new Date(
      new Date().getFullYear(),
      currentMonth,
      1
    );
    const lastDateOfMonth = new Date(
      new Date().getFullYear(),
      currentMonth + 1,
      0
    );
    const filteredEvents = events.filter((event) => {
      const eventDate = new Date(event.start);
      return eventDate >= firstDateOfMonth && eventDate <= lastDateOfMonth;
    });
    setSelectedEvents(filteredEvents);
  }, [currentMonth, events]);

  useEffect(() => {
    setSelectedDate(
      `${new Date().getFullYear()}-${(currentMonth + 1)
        .toString()
        .padStart(2, "0")}-01`
    );
  }, [currentMonth]);

  useEffect(() => {
    dispatch(setCategory("all"));
  }, [dispatch]);

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
    setSelectedDate(clickedDate);

    const filteredSelectedEvents = events.filter(
      (event) => event.start.split("T")[0] === clickedDate
    );
    setSelectedEvents(filteredSelectedEvents); // 수정된 부분: 클릭한 날짜에 해당하는 일정 필터링
  };

  useEffect(() => {
    const filteredTodayEvents = events.filter(
      (event) => event.start && event.start.split("T")[0] === today
    );
    setTodayEvents(filteredTodayEvents);
  }, [events]);

  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      const filteredEvents = events.filter((event) =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSelectedEvents(filteredEvents); // 수정된 부분: 검색 결과로 필터링된 일정 업데이트
    }
  };

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
                  onKeyDown={handleSearchKeyDown}
                />
                <Search
                  size={24}
                  className="cursor-pointer"
                  onClick={() => handleSearchKeyDown({ key: "Enter" })}
                />
              </div>
            </div>
            <FullCalendar
              ref={calendarRef}
              plugins={[dayGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              headerToolbar={false}
              events={filteredEvents}
              eventClick={handleEventClick}
              dateClick={handleDateClick}
              selectable={true}
              height="auto"
              initialDate={today}
              //dayCellContent={(args) => args.date.getDate()}
              //eventContent={(eventInfo) => (
              //  <div style={{ display: 'flex', alignItems: 'center' }}>
              //    <span>{eventInfo.event.title}</span>
              //  </div>
              //)}
            />
          </div>

          <div className="flex flex-col space-y-4 w-96 ml-6 p-4 bg-white rounded-2xl shadow-lg">
            {selectedDate && (
              <div>
                <h3 className="text-lg font-bold">{selectedDate} 일정</h3>
                {selectedEvents.length > 0 ? (
                  <ul>
                    {selectedEvents.map((event) => (
                      <li
                        key={event.id}
                        className="mt-2 p-2 bg-gray-100 rounded-md"
                      >
                        {event.title}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>등록된 일정이 없습니다.</p>
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
