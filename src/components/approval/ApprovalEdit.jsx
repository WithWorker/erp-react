import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsCheckCircleFill } from "react-icons/bs";
import Sidebar from "../include/Sidebar";
import Header from "../include/Header";

const ApprovalEdit = () => {
  const navigate = useNavigate();
  const [tabIndex, setTabIndex] = useState(1); // tabIndex 상태로 현재 탭 관리
  const [isApprover, setIsApprover] = useState(true); // 승인자 여부 (예시로 true로 설정)

  // 임시 데이터 (실제 데이터를 부모 컴포넌트에서 받거나 API 호출로 받아올 수 있음)
  const document = {
    id: 1,
    category: "회의", // 카테고리 추가
    startDate: "2025-03-10", // 시작일자 추가
    endDate: "2025-03-10", // 종료일자 추가
    author: "홍길동",
    status: "대기",
    title: "2025년 3월 회의 일정",
    describe: "2025년 3월 10일 14:00 회의실 1에서 진행되는 회의에 대한 설명입니다.",
    attendees: [
      { id: 1, author: "김철수", role: "팀장", isApproved: false },
      { id: 2, author: "이영희", role: "사원", isApproved: true },
      { id: 3, author: "박영수", role: "사원", isApproved: false }
    ]
  };

  if (!document) {
    return (
      <div className="p-6 text-center text-gray-500">
        문서를 찾을 수 없습니다.
      </div>
    );
  }

  const handleDelete = () => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      alert("문서가 삭제되었습니다.");
      navigate("/user/documents");
    }
  };

  const handleEdit = () => {
    navigate(`/user/document/${document.id}/edit`);
  };

  const handleApprovalToggle = (attendeeId) => {
    if (isApprover) {
      alert(`승인 상태를 변경: 참석자 ID = ${attendeeId}`);
    }
  };

  const handleApproval = (id, status) => {
    alert(`${status} 처리: ${id}`);
    navigate("/user/documents");
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
                <label className="text-sm font-semibold w-24">카테고리</label>
                <input
                  type="text"
                  value={document.category}
                  className="w-full border-none text-[#006D2C]"
                  readOnly
                />
              </div>

              <div className="w-full bg-white p-6 rounded-full shadow-md flex items-center">
                <label className="text-sm font-semibold w-24">작성자</label>
                <input
                  type="text"
                  value={document.author}
                  className="w-full border-none text-[#006D2C]"
                  readOnly
                />
              </div>

              <div className="w-full bg-white p-6 rounded-full shadow-md flex items-center">
                <label className="text-sm font-semibold w-24">상태</label>
                <input
                  type="text"
                  value={document.status}
                  className="w-full border-none text-[#006D2C]"
                  readOnly
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="w-full bg-white p-6 rounded-full shadow-md flex items-center">
                <label className="text-sm font-semibold w-24">시작일자</label>
                <input
                  type="text"
                  value={document.startDate}
                  className="w-full border-none text-[#006D2C]"
                  readOnly
                />
              </div>

              <div className="w-full bg-white p-6 rounded-full shadow-md flex items-center">
                <label className="text-sm font-semibold w-24">종료일자</label>
                <input
                  type="text"
                  value={document.endDate}
                  className="w-full border-none text-[#006D2C]"
                  readOnly
                />
              </div>
            </div>

            <div className="w-full bg-white p-6 rounded-full shadow-md flex items-center">
              <label className="text-sm font-semibold w-24">작성 제목</label>
              <input
                type="text"
                value={document.title}
                className="w-full border-none bg-none"
                readOnly
              />
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg h-[calc(90vh-18rem)] overflow-hidden">
              <span className="text-sm font-semibold text-[#323232]">
                일정 내용
              </span>
              <textarea
                value={document.describe}
                className="w-full h-full mt-2 p-2 border-none rounded-lg focus:outline-none resize-none overflow-y-auto"
                readOnly
              />
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => navigate("/user/documents")}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-full hover:bg-gray-400"
              >
                닫기
              </button>

              <button
                onClick={handleDelete}
                className="border-2 border-[#006D2C] text-[#006D2C] px-4 py-2 rounded-full hover:border-[#0e5028]"
              >
                삭제
              </button>
              <button
                onClick={handleEdit}
                className="bg-[#006D2C] text-white px-4 py-2 rounded-full hover:bg-[#0e5028]"
              >
                수정
              </button>

              {isApprover && (
                <>
                  <button
                    onClick={() => handleApproval(document.id, "반려")}
                    className="border-2 border-[#006D2C] text-[#006D2C] px-4 py-2 rounded-full"
                  >
                    반려
                  </button>
                  <button
                    onClick={() => handleApproval(document.id, "승인")}
                    className="bg-[#006D2C] text-white px-4 py-2 rounded-full hover:bg-[#0e5028]"
                  >
                    승인
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="w-64 bg-white p-6 rounded-2xl shadow-lg h-[calc(88vh-2rem)]">
            <span className="text-sm font-medium text-[#323232]">결재선</span>
            <div className="rounded-lg max-h-64 overflow-y-auto mt-4">
              {document.attendees && document.attendees.length > 0 ? (
                document.attendees.map((attendee, index) => (
                  <div
                    key={index}
                    className={`flex justify-between items-center mb-2 p-3 rounded-lg ${
                      index % 2 === 0 ? "bg-gray-100" : "bg-gray-100"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{attendee.author} {attendee.role}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <BsCheckCircleFill
                        onClick={() => handleApprovalToggle(attendee.id)}
                        className={`cursor-pointer ${
                          attendee.isApproved ? "text-[#006D2C]" : "text-gray-400"
                        }`}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">결재선이 없습니다.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApprovalEdit;
