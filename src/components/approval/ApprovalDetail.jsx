import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../include/Sidebar";
import Header from "../include/Header";
import { readApproval } from "../../service/approvalLogic";
import DetailLine from "./DetailLine";

const ApprovalDetail = () => {
  const navigate = useNavigate();
  const { approvalId } = useParams(); // URL 파라미터로 approvalId 가져오기
  const [approval, setApproval] = useState(null); // 결재 데이터를 저장할 상태

  useEffect(() => {
    const fetchApprovalDetail = async () => {
      try {
        const data = await readApproval(approvalId); // API 호출로 결재 상세 데이터 가져오기
        setApproval(data); // 상태에 데이터 저장
      } catch (error) {
        console.error("결재 상세 조회 오류:", error);
      }
    };

    fetchApprovalDetail();
  }, [approvalId]); // approvalId가 바뀔 때마다 데이터 새로 불러오기

  if (!approval) {
    return <div>Loading...</div>; // 데이터를 기다리는 동안 로딩 화면
  }

  // 결재 삭제
  const handleDeleteApproval = async () => {
    const confirmDelete = window.confirm("이 결재를 삭제하시겠습니까?"); // 삭제 확인 창
    if (confirmDelete) {
      try {
        await deleteApproval(approvalId); // 삭제 API 호출
        navigate("/approval"); // 삭제 후 결재 목록 페이지로 리다이렉트
      } catch (error) {
        console.error("결재 삭제 실패:", error);
      }
    } else {
      console.log("결재 삭제 취소");
    }
  };

  return (
    <div className="flex w-full h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 w-screen p-6">
        <Header />

        <div className="flex space-x-4">
          {/* 글 상세보기 영역: 70% */}
          <div className="flex-[0.7] space-y-4"> {/* flex-[0.6]로 60% 설정 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="w-full bg-white p-6 rounded-full shadow-md flex items-center">
                <label className="text-sm font-semibold w-24">유형</label>
                <input
                  type="text"
                  value={approval.typeName}
                  className="w-full border-none text-[#006D2C]"
                  readOnly
                />
              </div>

              <div className="w-full bg-white p-6 rounded-full shadow-md flex items-center">
                <label className="text-sm font-semibold w-24">작성자</label>
                <input
                  type="text"
                  value={`${approval.applicant.name} ${approval.applicant.positionName} [${approval.applicant.departmentName}]`}
                  className="w-full border-none text-[#006D2C]"
                  readOnly
                />
              </div>

              <div className="w-full bg-white p-6 rounded-full shadow-md flex items-center">
                <label className="text-sm font-semibold w-24">상태</label>
                <input
                  type="text"
                  value={approval.statusName}
                  className="w-full border-none text-[#006D2C]"
                  readOnly
                />
              </div>
            </div>

            <div className="w-full bg-white p-6 rounded-full shadow-md flex items-center">
              <label className="text-sm font-semibold w-24">제목</label>
              <input
                type="text"
                value={approval.title}
                className="w-full border-none bg-none"
                readOnly
              />
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg h-[calc(80vh-18rem)] overflow-hidden">
              <span className="text-sm font-semibold text-[#323232]">사유</span>
              <textarea
                value={approval.content}
                className="w-full h-full mt-2 p-2 border-none rounded-lg focus:outline-none resize-none overflow-y-auto"
                readOnly
              />
            </div>
          </div>

          {/* 결재선 영역: 30% */}
          <div className="flex-[0.3] "> {/* flex-[0.4]로 40% 설정 */}
            <DetailLine approvers={approval.approvers} />
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={handleDeleteApproval}
            className="border-2 border-[#006D2C] text-[#006D2C] px-4 py-2 rounded-full hover:border-[#0e5028]"
          >
            삭제
          </button>
          <button
            onClick={() => navigate("/approval")}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-full hover:bg-gray-400"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApprovalDetail;
