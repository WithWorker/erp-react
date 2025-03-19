import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../include/Sidebar";
import Header from "../include/Header";
import { readApproval, updateStatus } from "../../service/approvalLogic";
import EditLine from "./EditLine";

const ApprovalEdit = () => {
  const navigate = useNavigate();
  const { approvalId } = useParams(); 
  const [approval, setApproval] = useState(null);

  useEffect(() => {
    const fetchApprovalDetail = async () => {
      try {
        const data = await readApproval(approvalId);
        setApproval(data);
      } catch (error) {
        console.error("결재 상세 조회 오류:", error);
      }
    };

    fetchApprovalDetail();
  }, [approvalId]);

  if (!approval) {
    return <div>Loading...</div>;
  }

  // 결재 상태 변경 (승인 / 반려)
  const handleStatusUpdate = async (index, status) => {
    const updatedApprovers = [...approval.approvers];
    
    // '대기' 상태일 때만 변경 가능
    if (updatedApprovers[index].approverStatusName !== '대기') {
      alert("이미 결재 처리된 항목입니다.");
      return;
    }

    updatedApprovers[index].approverStatusName = status;

    const updatedApproval = { ...approval, approvers: updatedApprovers };

    try {
      await updateStatus(approvalId, updatedApproval);  // DB에 상태 업데이트
      setApproval(updatedApproval); // UI 업데이트
    } catch (error) {
      console.error("결재 상태 업데이트 오류:", error);
      alert("결재 상태 변경에 실패했습니다.");
    }
  };

  return (
    <div className="flex w-full h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 w-screen p-6">
        <Header />

        <div className="flex justify-between space-x-4">
          {/* 결재 정보 */}
          <div className="flex-1 space-y-4">
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
                  value={`${approval.applicant.name} ${approval.applicant.positionName} / ${approval.applicant.departmentName}`}
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

          {/* 결재선 */}
          <div className="w-[350px] h-[calc(90vh-14rem)]">
            <EditLine approvers={approval.approvers} onUpdateStatus={handleStatusUpdate} />
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-4">
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

export default ApprovalEdit;