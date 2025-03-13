import React, { useState, useEffect } from "react";
import { ChevronDown, Trash } from "react-bootstrap-icons";
import Sidebar from "../include/Sidebar";
import Header from "../include/Header";
import categoryColors from "../../utils/categoryColors";
import { useNavigate } from "react-router-dom";

const CalendarWrite = () => {

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [applicantId, setapplicantId] = useState(""); // 사원번호 상태 추가

  const [startDate, setStartDate] = useState(
    new Date().toLocaleDateString("en-CA")
  );
  const [endDate, setEndDate] = useState(
    new Date().toLocaleDateString("en-CA")
  ); 

  const [category, setCategoryState] = useState("all");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [attendeeQuery, setAttendeeQuery] = useState("");
  const [attendeeResults, setAttendeeResults] = useState([]);
  const [selectedAttendees, setSelectedAttendees] = useState([]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const dateFromUrl = params.get("date");
    if (dateFromUrl) setStartDate(dateFromUrl);
  }, []);

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

  const handleCategorySelect = (value) => {
    setCategoryState(value);
    setDropdownOpen(false);
  };

  const handleAttendeeInput = (event) => {
    const query = event.target.value;
    setAttendeeQuery(query);
  };

  const selectAttendee = (attendee) => {
    setSelectedAttendees((prevAttendees) => [...prevAttendees, attendee]);
    setAttendeeQuery("");
    setAttendeeResults([]);
  };

  const removeAttendee = (attendeeId) => {
    setSelectedAttendees((prevAttendees) =>
      prevAttendees.filter((attendee) => attendee.id !== attendeeId)
    );
  };

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

            {/* 사원번호 */}
            <div>
              <label className="text-sm font-semibold">사원번호</label>
              <input
                type="text"
                value={applicantId}
                onChange={(e) => setapplicantId(e.target.value)}
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
            <button className="bg-gray-300 text-gray-700 px-6 py-2 rounded-full mr-2"
            onClick={() => navigate("/calendar")}
            >
              닫기
            </button>
            <button className="bg-[#006D2C] text-white px-6 py-2 rounded-full">
              일정 등록
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarWrite; 