import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../include/Sidebar";
import Header from "../include/Header";
import { deleteapproval, readApproval } from "../../service/approvalLogic";
import DetailLine from "./DetailLine";

const ApprovalDetail = () => {
  const navigate = useNavigate();
  const { approvalId } = useParams(); 
  const [approval, setApproval] = useState(null); // 결재 데이터를 저장할 상태

  useEffect(() => {
    const fetchApprovalDetail = async () => {
      try {
        const data = await readApproval(approvalId); // 결재 상세 조회 api 호출
        setApproval(data); // 상태에 데이터 저장
      } catch (error) {
        console.error("결재 상세 조회 오류:", error);
      }
    };

    fetchApprovalDetail();
  }, [approvalId]); 

  if (!approval) {
    return <div>Loading...</div>; // 데이터를 기다리는 동안 로딩 화면
  }

  // 결재 삭제 
  const handleDeleteApproval = async () => {

    // 모든 approver의 상태가 모두 '대기'인지 확인 
    const isAllPending = approval.approvers.every(
      (approver) => approver.approverStatusName === '대기'
    );
    if (!isAllPending) {
      alert('이미 결재중입니다.');
      return;
    }

    const confirmDelete = window.confirm("이 결재를 삭제하시겠습니까?"); 
    if (confirmDelete) {
      try {
        await deleteapproval(approvalId); 
        navigate("/approval"); 
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
