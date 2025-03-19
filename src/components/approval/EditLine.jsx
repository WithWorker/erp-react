import React from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { IoIosArrowDown } from 'react-icons/io';
import { updateStatus } from '../../service/approvalLogic'; // API 함수 import
import { useParams } from 'react-router';

const EditLine = ({ approvers, setApprovers }) => {
  const { approvalId } = useParams();
  console.log("받은 approvalId: ", approvalId);

  const approvalIdNumber = Number(approvalId); // 숫자로 변환

  // 상태 업데이트 함수
  const onUpdateStatus = async (index, status) => {
    const approverStatusId = status === '승인' ? 2 : 3;
    const approverId = approvers[index].empId; // empId를 approverId로 사용

    console.log("Approval ID: ", approvalIdNumber);
    console.log("Approver ID: ", approverId); // approverId 확인
    console.log("Approver Status ID: ", approverStatusId);

    const confirmUpdate = window.confirm(`결재를 ${status}하시겠습니까?`);
    if (!confirmUpdate) return;

    try {
      await updateStatus(approvalIdNumber, approverId, approverStatusId);

      // 상태 업데이트 (프론트 반영)
      const updatedApprovers = [...approvers];
      updatedApprovers[index] = { 
        ...updatedApprovers[index], 
        approverStatusName: status 
      };
      setApprovers(updatedApprovers);
    } catch (error) {
      console.error("결재 상태 수정 실패", error);
    }
  };

  if (!approvers || approvers.length === 0) {
    return <div>결재선 정보가 없습니다.</div>; // approvers 배열이 없거나 비어있으면 표시할 메시지
  }

  return (
    <div className="w-full h-full bg-white p-8 rounded-2xl shadow-lg flex flex-col items-center overflow-y-auto">
      <span className="text-lg font-bold text-[#323232] pt-8">결재선</span>
      <div className="mt-20 mb-20 flex flex-col items-center space-y-8 w-full">
        {approvers.map((approver, index) => (
          <div key={index} className="flex flex-col items-center relative w-full">
            <div className="relative">
              <img
                src={approver.imgUrl || '/src/assets/default.jpg'}
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

            {approver.approverStatusName === '대기' && approver.empId === 4 && (
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
        ))}
      </div>
    </div>
  );
};

export default EditLine;
