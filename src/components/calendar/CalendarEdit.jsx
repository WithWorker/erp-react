import React, { useState, useEffect } from "react";
import Sidebar from "../include/Sidebar";
import Header from "../include/Header";
import { useNavigate, useParams } from "react-router-dom";
import { readCalendar, updateCalendar } from "../../service/calendarLogic";

const CalendarEdit = () => {
  const navigate = useNavigate();
  const { calendarId } = useParams();  // URL에서 calendarId 가져오기

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [applicantId, setApplicantId] = useState(""); 
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState(""); 
  const [applicantName, setApplicantName] = useState("");
  const parsedCalendarId = parseInt(calendarId, 10);  // calendarId를 Integer로 변환
  
  useEffect(() => {

    if (!isNaN(parsedCalendarId)) {
      const fetchEventDetail = async () => {
        try {
          const data = await readCalendar(parsedCalendarId);  // 수정된 calendarId 전달
          setTitle(data.title);
          setContent(data.content);
          setStartDate(data.start_date);
          setEndDate(data.end_date);
          setApplicantId(data.applicant_id); 
          setApplicantName(data.memberDto.name);  
        } catch (error) {
          console.error("일정 상세 조회 오류:", error);
        }
      };
  
      fetchEventDetail();
    } else {
      console.error("잘못된 calendarId:", calendarId);
      navigate("/calendar");  // 잘못된 calendarId가 들어오면 일정 목록으로 리다이렉트
    }
  }, [calendarId, navigate]);

  // 일정 수정
  const handleSubmit = async () => {
    
    if (!startDate || !endDate) {
      alert("시작일과 종료일을 모두 입력해주세요.");
      return;
    }

    if (!title) {
      alert("일정 제목을 입력해주세요.");
      return;
    }

    const calendar = {
      title,
      content,
      start_date: startDate ? new Date(startDate).toISOString().split("T")[0] : "",  // `yyyy-MM-dd` 형식으로 전환
      end_date: endDate ? new Date(endDate).toISOString().split("T")[0] : "",  
      applicantId, 
      name: applicantName
    };

    const confirmUpdate = window.confirm("일정을 수정하시겠습니까?"); 
    if (confirmUpdate) {
      try {
        await updateCalendar(parsedCalendarId, calendar);  // 수정 API 호출
        navigate("/calendar"); 
      } catch (error) {
        console.error("일정 수정 실패", error);
      }
    } else {
      console.log("일정 수정 취소");
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-6">
        <Header />

        <div className="bg-white p-6 rounded-2xl shadow-lg space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="text-sm font-semibold">시작 일자</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-600"
              />
            </div>
            <div>
              <label className="text-sm font-semibold">종료 일자</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-600"
              />
            </div>
            <div>
              <label className="text-sm font-semibold">작성자</label>
              <input
                type="text"
                value={applicantName}
                readOnly
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-600"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold">일정 제목</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-600"
              placeholder="일정 제목을 입력하세요."
            />
          </div>
          <div>
            <label className="text-sm font-semibold">일정 내용</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-600 h-96"
              placeholder="일정 내용을 입력하세요."
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              className="bg-gray-300 text-gray-700 px-6 py-2 rounded-full hover:bg-gray-400 transition"
              onClick={() => navigate("/calendar")}
            >
              취소
            </button>
            <button 
              onClick={handleSubmit}
              className="bg-[#006D2C] text-white px-6 py-2 rounded-full hover:bg-green-800 transition">
              수정
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarEdit;
