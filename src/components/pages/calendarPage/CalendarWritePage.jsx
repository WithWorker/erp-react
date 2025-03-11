import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addEvent, setCategory } from "../../../redux/slice/calendarSlice";
import categoryColors from "../../../utils/categoryColors";
import { Trash } from "react-bootstrap-icons";
import Sidebar from "../../include/Sidebar";
import Header from "../../include/Header";
import { ChevronDown } from "react-bootstrap-icons";

const debounce = (func, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
};

const CalendarWritePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [writer, setWriter] = useState("");

  // 시작 시간만 지정
  const [startTime, setStartTime] = useState({
    period: "AM",
    hour: "9",
    minute: "00",
  });

  // 시작 날짜와 종료 날짜 설정
  const [startDate, setStartDate] = useState(
    new Date().toLocaleDateString("en-CA")
  );
  const [endDate, setEndDate] = useState(
    new Date().toLocaleDateString("en-CA")
  ); // 종료 날짜

  const [category, setCategoryState] = useState("all");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [attendeeQuery, setAttendeeQuery] = useState("");
  const [attendeeResults, setAttendeeResults] = useState([]);
  const [selectedAttendees, setSelectedAttendees] = useState([]);

  // 참석자 검색 처리 함수
  const handleAttendeeInput = (event) => {
    const query = event.target.value;
    setAttendeeQuery(query);

    // 여기에 API 요청 또는 로컬 데이터에서 검색을 처리하는 로직 추가
    // 예시: attendeeResults 필드에 필터링된 참석자 리스트를 업데이트
    const filteredResults = allAttendees.filter((attendee) =>
      attendee.name.toLowerCase().includes(query.toLowerCase())
    );
    setAttendeeResults(filteredResults);
  };

  // 참석자 선택 함수
  const selectAttendee = (attendee) => {
    setSelectedAttendees((prevAttendees) => [...prevAttendees, attendee]);
    setAttendeeQuery(""); // 입력값 초기화
    setAttendeeResults([]); // 검색 결과 초기화
  };

  // 참석자 제거 함수
  const removeAttendee = (attendeeId) => {
    setSelectedAttendees((prevAttendees) =>
      prevAttendees.filter((attendee) => attendee.id !== attendeeId)
    );
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const dateFromUrl = params.get("date");
    if (dateFromUrl) setStartDate(dateFromUrl);
  }, []);

  const handleCategorySelect = (value) => {
    setCategoryState(value);
    dispatch(setCategory(value));
    setDropdownOpen(false);
  };

  /* const handleEventAdd = () => {
    // 시작 날짜가 올바르게 입력되었는지 확인
    if (!startDate) {
      alert("시작 날짜를 선택해주세요!");
      return;
    }
  
    const newEvent = {
      id: uuidv4(),  // 고유 ID 생성
      title: '새 일정',
      startDate: startDate,
      endDate: endDate, // 종료 날짜
    };
  
    // Redux로 이벤트 추가
    dispatch(addEvent(newEvent));
  
    // localStorage에 새로운 이벤트 추가
    const currentEvents = JSON.parse(localStorage.getItem('events')) || [];
    currentEvents.push(newEvent);
    localStorage.setItem('events', JSON.stringify(currentEvents));
  
    // 이벤트 상태 업데이트
    setSelectedEvents(prevEvents => [...prevEvents, newEvent]);
  }; */

  const handleSubmit = (event) => {
    event.preventDefault();

    // 제목과 내용이 비어 있는지 확인
    if (!title.trim() || !description.trim()) {
      alert("제목과 내용을 입력해주세요!");
      return;
    }

    // 시작 날짜와 시작 시간을 결합
    const startDateTime = new Date(
      `${startDate}T${String(startTime.hour).padStart(2, "0")}:${String(
        startTime.minute
      ).padStart(2, "0")} ${startTime.period}`
    );

    // 종료 날짜는 그대로 사용 (종료 시간이 없으므로 날짜만)
    const endDateTime = new Date(endDate); // 종료 시간은 필요 없음

    // 유효성 검사
    if (isNaN(startDateTime)) {
      alert("유효하지 않은 시작 시간이 입력되었습니다.");
      return;
    }

    const newEvent = {
      id: new Date().getTime().toString(),
      title,
      content: description,
      writer: writer || "작성자 미지정",
      attendees: selectedAttendees,
      category,
      start: startDateTime.toISOString(), // 시작 날짜와 시간
      end: endDateTime.toISOString(), // 종료 날짜 (시간은 없으므로 날짜만 사용)
    };

    const storedEvents = JSON.parse(localStorage.getItem("events")) || [];
    storedEvents.push(newEvent);
    localStorage.setItem("events", JSON.stringify(storedEvents));

    console.log("New event submitted:", newEvent);
    alert("일정이 성공적으로 등록되었습니다!");

    Promise.all([
      dispatch(addEvent(newEvent)),
      dispatch(setCategory(category)),
    ]).then(() => {
      navigate("/calendar");
    });
  };

  const categories = [
    { value: "all", label: "전체보기", color: categoryColors["all"] },
    {
      value: "my-schedule",
      label: "내 일정",
      color: categoryColors["my-schedule"],
    },
    {
      value: "team-members",
      label: "부서 구성원",
      color: categoryColors["team-members"],
    },
    {
      value: "equipment-reservation",
      label: "설비 예약",
      color: categoryColors["equipment-reservation"],
    },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-6">
        <Header />
        <div className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-4 w-full mb-6">
          {/* 카테고리 선택 영역 */}
          <div className="relative md:w-1/5 w-full">
            <div
              className="bg-white p-3 pl-6 pr-10 rounded-full shadow-md w-full cursor-pointer flex items-center h-[48px] border border-gray-300"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <div
                className="w-4 h-4 rounded-full mr-2"
                style={{ backgroundColor: categoryColors[category] }}
              />
              <span className="font-medium">
                {categories.find((cat) => cat.value === category)?.label}
              </span>
              <ChevronDown className="ml-auto text-gray-500" />
            </div>

            {dropdownOpen && (
              <div className="absolute left-0 top-full mt-1 w-full bg-white rounded-xl shadow-lg z-20 border overflow-hidden">
                {categories.map((cat) => (
                  <div
                    key={cat.value}
                    className="flex items-center p-3 hover:bg-gray-100 cursor-pointer transition"
                    onClick={() => handleCategorySelect(cat.value)}
                  >
                    <div
                      className="w-4 h-4 rounded-full mr-2"
                      style={{ backgroundColor: cat.color }}
                    />
                    <span>{cat.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 참석자 검색 영역 */}
          <div className="relative md:w-4/5 w-full">
            <input
              type="text"
              value={attendeeQuery}
              onChange={handleAttendeeInput}
              placeholder="참석자 이름 검색"
              className="bg-white pl-4 pr-4 text-sm rounded-full shadow-md w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black h-[48px]"
            />
            {attendeeResults.length > 0 && (
              <ul className="absolute w-full border border-gray-300 rounded-md bg-white mt-1 max-h-40 overflow-auto z-20 shadow-lg">
                {attendeeResults.map((attendee) => (
                  <li
                    key={attendee.id}
                    className="p-3 hover:bg-gray-100 cursor-pointer transition"
                    onClick={() => selectAttendee(attendee)}
                  >
                    {attendee.name}
                  </li>
                ))}
              </ul>
            )}

            {/* 선택된 참석자 목록 */}
            <div className="flex flex-wrap mt-2 space-x-2">
              {selectedAttendees.map((attendee) => (
                <div
                  key={attendee.id}
                  className="flex items-center bg-gray-200 rounded-full px-3 py-1 space-x-2 text-sm"
                >
                  <span>{attendee.name}</span>
                  <Trash
                    className="text-red-500 cursor-pointer"
                    onClick={() => removeAttendee(attendee.id)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
            {/* 일정 시작날짜 */}
            <div>
              <label className="text-sm font-semibold">시작 날짜</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full border rounded-md p-2"
              />
            </div>

            {/* 일정 종료날짜 */}
            <div>
              <label className="text-sm font-semibold">종료 날짜</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full border rounded-md p-2"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold">일정 제목</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border rounded-md p-2"
            />
          </div>

          <div>
            <label className="text-sm font-semibold">일정 내용</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border rounded-md p-2"
              rows="4"
            />
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleSubmit}
              //onClick={handleEventAdd}
              className="bg-blue-500 text-white px-6 py-2 rounded-full"
            >
              일정 등록
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarWritePage;
