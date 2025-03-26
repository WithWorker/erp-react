import React, { useEffect, useState } from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { IoIosArrowDown } from 'react-icons/io';
import { readApproval, updateStatus } from '../../service/approvalLogic';
import { useParams } from 'react-router';
const EditLine = () => {
  const { approvalId } = useParams();
  const approvalIdNumber = Number(approvalId);
  const [approvers, setApprovers] = useState([]);
  // 최신 결재선 데이터를 불러오는 함수
  const fetchApprovers = async () => {
    try {
      const data = await readApproval(approvalIdNumber); // 백엔드 API 호출
      console.log("서버 응답 데이터:", data);
      if (data && Array.isArray(data.approvers)) {
        setApprovers(data.approvers);
      } else {
        console.error("데이터 형식 오류: approvers 배열이 없음", data);
        setApprovers([]); // 오류 발생 시 빈 배열 설정
      }
    } catch (error) {
      console.error("결재선 데이터를 불러오는 데 실패함", error);
      setApprovers([]); // 오류 발생 시 빈 배열 설정
    }
  };
  useEffect(() => {
    fetchApprovers(); // 컴포넌트 마운트 시 결재선 데이터 불러오기
  }, [approvalIdNumber]);
  const onUpdateStatus = async (index, status) => {
    const approverStatusId = status === '승인' ? 2 : 3;
    const approverId = approvers[index]?.empId; // ? 연산자 추가 (undefined 방지)
    if (!window.confirm(`결재를 ${status}하시겠습니까?`)) return;
    try {
      await updateStatus(approvalIdNumber, approverId, approverStatusId);
      fetchApprovers(); // 업데이트 후 최신 데이터 다시 가져오기
    } catch (error) {
      console.error("결재 상태 수정 실패", error);
    }
  };
  return (
    <div className="w-full h-full bg-white p-8 rounded-2xl shadow-lg flex flex-col items-center overflow-y-auto">
      <span className="text-lg font-bold text-[#323232] pt-8">결재선</span>
      <div className="mt-20 mb-20 flex flex-col items-center space-y-8 w-full">
        {approvers?.length > 0 ? (
          approvers.map((approver, index) => (
            <div key={index} className="flex flex-col items-center relative w-full">
              <div className="relative">
                <img
                  src={`http://localhost:7777/${approver.approverImgUrl}` || `http://localhost:7777/upload/default.jpg`}
                  alt={approver.name}
                  className="w-24 h-24 rounded-full object-cover border-4 border-gray-300"
                />
                {approver.approverStatusName === '승인' && (
                  <FaCheckCircle className="absolute bottom-0 right-0 text-green-500 text-2xl" />
                )}
                {approver.approverStatusName === '반려' && (
                  <FaTimesCircle className="absolute bottom-0 right-0 text-red-500 text-2xl" />
                )}
              </div>
              <div className="text-center mt-3">
                <div className="font-bold text-lg text-[#323232]">{approver.name}</div>
                <div className="text-base text-gray-600">{approver.departmentName} {approver.positionName}</div>
              </div>
              <div
                className={`px-4 py-2 rounded-full text-base font-semibold mt-2 ${
                  approver.approverStatusName === '승인'
                    ? 'bg-green-200 text-green-800'
                    : approver.approverStatusName === '반려'
                    ? 'bg-red-200 text-red-800'
                    : 'bg-yellow-200 text-yellow-800'
                }`}
              >
                {approver.approverStatusName || '대기'}
              </div>
              {approver.approverStatusName === '대기' && approver.empId === Number(localStorage.getItem('empId')) && (
                <div className="flex mt-4 space-x-4">
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded-full"
                    onClick={() => onUpdateStatus(index, '승인')}
                  >
                    승인
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-full"
                    onClick={() => onUpdateStatus(index, '반려')}
                  >
                    반려
                  </button>
                </div>
              )}
              {index < approvers.length - 1 && (
                <IoIosArrowDown className="text-gray-500 text-3xl mt-6" />
              )}
            </div>
          ))
        ) : (
          <div>결재선 정보가 없습니다.</div>
        )}
      </div>
    </div>
  );
};
export default EditLine;