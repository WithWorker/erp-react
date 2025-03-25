import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../include/Sidebar";
import Header from "../include/Header";
import { deleteCalendar, readCalendar } from "../../service/calendarLogic";

const CalendarDetail = () => {
  const navigate = useNavigate();
  const { calendarId } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEventDetail = async () => {
      try {
        const data = await readCalendar(calendarId);
        setEvent(data);
      } catch (error) {
        console.error("일정 상세 조회 오류:", error);
      }
    };

    fetchEventDetail();
  }, [calendarId]);

   // event가 null이면 로딩 화면을 표시
    if (!event) {
    return <div>Loading...</div>;
  }
  
  // 일정 수정 페이지 이동
  const handleEditClick = () => {
    navigate(`/calendar/edit/${calendarId}`)
  }

  // 일정 삭제
  const handleDeleteEvent = async () => {
    const confirmDelete = window.confirm("일정을 삭제하시겠습니까?"); // confirm 창 띄우기
    if (confirmDelete) {
      try {
        await deleteCalendar(calendarId);  // 삭제 API 호출
        navigate("/calendar");  // 삭제 후 캘린더 페이지로 리다이렉트
      } catch (error) {
        console.error("일정 삭제 실패:", error);
      }
    } else {
      console.log("일정 삭제 취소");
    }
  };

  return (
    <div className="flex w-full h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 w-screen p-6">
        <Header />

        <div className="flex space-x-4">
          <div className="flex-1 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="w-full bg-white p-6 rounded-full shadow-md flex items-center">
                <label className="text-sm font-semibold w-24">시작 일자</label>
                <input
                  type="text"
                  value={event.start_date}
                  className="w-full border-none text-[#006D2C]"
                  readOnly
                />
              </div>
              <div className="w-full bg-white p-6 rounded-full shadow-md flex items-center">
                <label className="text-sm font-semibold w-24">종료 일자</label>
                <input
                  type="text"
                  value={event.end_date}
                  className="w-full border-none text-[#006D2C]"
                  readOnly
                />
              </div>
              <div className="w-full bg-white p-6 rounded-full shadow-md flex items-center">
                <label className="text-sm font-semibold w-24">작성자</label>
                <input
                  type="text"
                  value={`${event.memberDto.name} ${event.memberDto.positionName} [${event.memberDto.departmentName}]`}
                  className="w-full border-none text-[#006D2C]"
                  readOnly
                />
              </div>
            </div>
            <div className="w-full bg-white p-6 rounded-full shadow-md flex items-center">
              <label className="text-sm font-semibold w-24">일정 제목</label>
              <input
                type="text"
                value={event.title}
                className="w-full border-none bg-none"
                readOnly
              />
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg h-96 overflow-hidden">
              <span className="text-sm font-semibold text-[#323232]">
                일정 내용
              </span>
              <textarea
                value={event.content}
                className="w-full h-full mt-2 p-2 border-none rounded-lg focus:outline-none resize-none overflow-y-auto"
                readOnly
              />
            </div>

            <div className="flex justify-end gap-2 mt-4">
              {Number(event.memberDto.empId) === Number(localStorage.getItem('empId')) ? (
                <>
                  <button
                    onClick={() => handleEditClick()}
                    className="bg-[#006D2C] text-white px-4 py-2 rounded-lg hover:bg-[#0e5028]"
                  >
                    수정
                  </button>
                  <button
                    onClick={() => handleDeleteEvent()}
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
                </>
              ) : (
                <button
                  onClick={() => navigate("/calendar")}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
                >
                  닫기
                </button>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarDetail;