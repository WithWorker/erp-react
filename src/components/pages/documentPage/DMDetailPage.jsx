import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeApprovalDocument, updateApprovalStatus, fetchApprovalList } from "../../../redux/slice/documentSlice";
import Sidebar from "../../include/Sidebar";
import { BsCheckCircleFill } from "react-icons/bs";
import Header from "../../include/Header";

const DMDetailPage = () => {
  const { id } = useParams(); // 👉id값 문자열 그대로 받기
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [tabIndex, setTabIndex] = useState(1); // tabIndex 상태로 현재 탭 관리
  const [isApprover, setIsApprover] = useState(true); // 승인자 여부 (예시로 true로 설정)

  // 🔥 id를 문자열 그대로 비교하도록 수정
  const document = useSelector((state) =>
    state.approval.list.find((document) => document.id === parseInt(id)) // id가 숫자일 수 있으므로 parseInt 적용
  );
  console.log("Document:", document);

  if (!document) {
    return (
      <div className="p-6 text-center text-gray-500">
        문서를 찾을 수 없습니다.
      </div>
    );
  }

  console.log("Event Participants:", document.attendees); // 참석자 로그 출력

  const handleDelete = () => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      dispatch(removeApprovalDocument({ id: document.id })); // 삭제시 문서 id로 삭제
      alert("문서가 삭제되었습니다.");
      navigate("/user/documents");
    }
  };

  const handleEdit = () => {
    navigate(`/user/document/${document.id}/edit`);
  };

  const handleApprovalToggle = (attendeeId) => {
    if (isApprover) {
      // 기존 attendees 배열을 복사하고 해당 attendee의 isApproved 상태를 토글
      const updatedAttendees = document.attendees.map((attendee) =>
        attendee.id === attendeeId
          ? { ...attendee, isApproved: !attendee.isApproved } // 승인 상태를 반전
          : attendee
      );
  
      // Redux에 업데이트된 attendees 배열을 dispatch로 보냄
      dispatch(updateApprovalStatus({ id: document.id, attendees: updatedAttendees }));
    }
  };

  const handleApproval = (id, status) => {
    // 승인 또는 반려 처리 로직 (예: API 호출 등)
    console.log(`${status} 처리: ${id}`);
    // 승인 처리 후 상태 업데이트 호출
    dispatch(updateApprovalStatus({ id, status }));
    
    // 상태 갱신 후 승인 리스트 새로 불러오기
    dispatch(fetchApprovalList());

    // 승인 후 결제 대기 목록 탭으로 이동
    //setTabIndex(2); // tabIndex를 2로 설정하여 'ApprovalList' 탭으로 이동

    navigate("/user/documents");  // 새로운 경로로 네비게이션
  };

  // 팀장 여부를 체크 (예시로 document.author가 팀장인 경우로 가정)
  const isManager = useSelector((state) => state.auth.isAdmin); // 실제로는 더 구체적인 조건이 필요할 수 있음.

  return (
    <div className="flex w-full h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 w-screen p-6">
        <Header />

        {/* 전체 Flexbox 구조 */}
        <div className="flex space-x-4">
          {/* 왼쪽 일정 정보 섹션 */}
          <div className="flex-1 space-y-4">
            {/* 일정 일자, 시간, 작성자 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* 일정 일자 */}
              <div className="w-full bg-white p-6 rounded-full shadow-md flex items-center">
                <label className="text-sm font-semibold w-24">부서</label>
                <input
                  type="text"
                  value={document.department}
                  className="w-full border-none text-[#006D2C]"
                  readOnly
                />
              </div>

              

              {/* 작성자 */}
              <div className="w-full bg-white p-6 rounded-full shadow-md flex items-center">
                <label className="text-sm font-semibold w-24">작성자</label>
                <input
                  type="text"
                  value={document.author}
                  className="w-full border-none text-[#006D2C]"
                  readOnly
                />
              </div>
              {/* 일정 시간 */}
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


            {/* 작성 제목 */}
            <div className="w-full bg-white p-6 rounded-full shadow-md flex items-center">
              <label className="text-sm font-semibold w-24">작성 제목</label>
              <input
                type="text"
                value={document.title}
                className="w-full border-none bg-none"
                readOnly
              />
            </div>

            {/* 일정 내용 */}
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

            {/* 버튼 */}
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => navigate("/user/documents")}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-full hover:bg-gray-400"
              >
                닫기
              </button>

              {/* 팀장이 아닌 경우 (사원) */}
              {!isManager && (
                <>
                  <button
                    onClick={() => {
                      handleDelete();
                      navigate("/user/documents");
                    }}
                    className="border-2 border-[#006D2C] text-[#006D2C] px-4 py-2 rounded-full hover:border-[#0e5028]"
                  >
                    삭제
                  </button>
                  <button
                    onClick={() => {
                      handleEdit();
                      navigate(`/user/document/${document.id}/edit`);
                    }}
                    className="bg-[#006D2C] text-white px-4 py-2 rounded-full hover:bg-[#0e5028]"
                  >
                    수정
                  </button>
                </>
              )}

              {/* 팀장인 경우 */}
              {isManager && (
                <>
                  <button
                    onClick={() => handleApproval(document.id, '반려')}
                    className="border-2 border-[#006D2C] text-[#006D2C] px-4 py-2 rounded-full"
                  >
                    반려
                  </button>
                  {/*{tabIndex === 2 && (
                  )}*/}
                  <button
                    onClick={() => handleApproval(document.id, '승인')}
                    //onClick={() => setTabIndex(2)}
                    className="bg-[#006D2C] text-white px-4 py-2 rounded-full hover:bg-[#0e5028]"
                  >
                    승인
                  </button>
                  
                </>
              )}
            </div>
          </div>

          {/* 우측 결재선 섹션 
          <div className="w-64  bg-white p-6 rounded-2xl shadow-lg h-[calc(88vh-2rem)]">
            <span className="text-sm font-medium text-gray-500">결재선</span>
            <div className="bg-gray-100 p-4 rounded-lg max-h-64 overflow-y-auto mt-2">
              {document.attendees && document.attendees.length > 0 ? (
                document.attendees.map((attendee, index) => (
                  <div key={index} className="flex justify-between items-center mb-2 p-3 rounded-lg bg-gray-100">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{attendee.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BsCheckCircleFill className={`text-[#006D2C]`} />
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">결재선이 없습니다.</p>
              )}
            </div>
          </div>
          */}
          <div className="w-64  bg-white p-6 rounded-2xl shadow-lg h-[calc(88vh-2rem)]">
          <span className="text-sm font-medium text-[#323232]">결재선</span>
          <div className="rounded-lg max-h-64 overflow-y-auto mt-4">
        {document.attendees && document.attendees.length > 0 ? (
          document.attendees.map((attendee, index) => (
            <div 
              key={index}
              className={`flex justify-between items-center mb-2 p-3 rounded-lg ${
              index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-100'
              }`}
            >              
            <div className="flex items-center gap-2">
            <span className="font-medium">{attendee.author} {attendee.role}</span>
              </div>

              {/* 승인자가 볼 수 있는 체크박스 */}
              <div className="flex items-center gap-2">
              <BsCheckCircleFill
                onClick={() => handleApprovalToggle(attendee.id)} // 각 attendee.id로 토글
                className={`cursor-pointer 
                  ${attendee.isApproved ? 'text-[#006D2C]' : 'text-gray-400'}`} // 초록색/회색 상태 표시
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

export default DMDetailPage;
