import React, { useState } from "react";
import { ChevronDown } from "react-bootstrap-icons";
import Sidebar from "../include/Sidebar";
import Header from "../include/Header";
import categoryColors from "../../utils/categoryColors";
import { useNavigate } from "react-router-dom";
import { addCalendar } from "../../service/calendarLogic";

const CalendarWrite = () => {

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [applicantId, setApplicantId] = useState(""); // 사원번호 추가

  const [startDate, setStartDate] = useState(
    new Date().toLocaleDateString("en-CA")
  );
  const [endDate, setEndDate] = useState(
    new Date().toLocaleDateString("en-CA")
  ); 

  // 일정 등록
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
    };

    const confirmAdd = window.confirm("일정을 등록하시겠습니까?"); 
    if (confirmAdd) {
      try {
        await addCalendar(calendar);  // 등록 API 호출
        navigate("/calendar"); 
      } catch (error) {
        console.error("일정 등록 실패");
        console.log("Title:", title);
        console.log("Content:", content);
        console.log("Start Date:", startDate);
        console.log("End Date:", endDate);
        console.log("Applicant ID:", applicantId);
      }
    } else {
      console.log("일정 등록 취소");
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-6">
        <Header />
        
        {/* 카테고리 디자인만 남겨두기 */}
        <div className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-4 w-full mb-6">
          <div className="relative md:w-1/5 w-full">
            <div
              className="bg-white p-3 pl-6 pr-10 rounded-full shadow-md w-full cursor-pointer flex items-center h-[48px] border border-gray-300"
            >
              <div
                className="w-4 h-4 rounded-full mr-2"
                style={{ backgroundColor: categoryColors["all"] }}
              />
              <span className="font-medium">전체보기</span>
              <ChevronDown className="ml-auto text-gray-500" />
            </div>
          </div>
           {/* 참석자 검색 영역 */}
            <div className="relative md:w-4/5 w-full">
            <input
              type="text"
              placeholder="참석자 이름 검색"
              className="bg-white pl-4 pr-4 text-sm rounded-full shadow-md w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black h-[48px]"
            />
          </div>
        </div>

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
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-600"
                placeholder="로그인 정보에서 불러온 작성자 이름"
              />
            </div>
          </div>

          {/* (db테스트용 로그인 연결 시 삭제 예정) */}
          <div>
              <label className="text-sm font-semibold">사번(db테스트용 삭제 예정)</label>
              <input
                type="text"
                value={applicantId}
                onChange={(e) => setApplicantId(parseInt(e.target.value))}
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-600"
                placeholder="사번 applicantId"
              />
          </div>
          {/* (db테스트용 삭제 예정) */}

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
          {/* 버튼 영역 */}
          <div className="flex justify-end space-x-3">
            <button
              className="bg-gray-300 text-gray-700 px-6 py-2 rounded-full hover:bg-gray-400 transition"
              onClick={() => navigate("/calendar")}
            >
              취소
            </button>
            <button 
              onClick={() => handleSubmit()}
              className="bg-[#006D2C] text-white px-6 py-2 rounded-full hover:bg-green-800 transition">
              등록
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarWrite;