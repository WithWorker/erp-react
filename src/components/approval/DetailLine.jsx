import React from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa'; // 반려 아이콘 추가
import { IoIosArrowDown } from 'react-icons/io';

const DetailLine = ({ approvers }) => {

  return (
    <div className="w-full h-full bg-white p-8 rounded-2xl shadow-lg flex flex-col items-center overflow-y-auto">
      <span className="text-lg font-bold text-[#323232] pt-8">결재선</span>
      
      <div className="mt-20 mb-20 flex flex-col items-center space-y-8 w-full">
        {approvers.map((approver, index) => (
          <div key={index} className="flex flex-col items-center relative w-full">
            {/* 프로필 이미지 */}
            <div className="relative">
              <img
                src={approver.imgUrl || '/src/assets/default.jpg'}
                alt={approver.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-gray-300"
              />
              {/* 상태에 따른 체크 아이콘 표시 */}
              {approver.approverStatusName === '승인' && (
                <FaCheckCircle className="absolute bottom-0 right-0 text-green-500 text-2xl" />
              )}
              {approver.approverStatusName === '반려' && (
                <FaTimesCircle className="absolute bottom-0 right-0 text-red-500 text-2xl" />
              )}
            </div>
            {/* 이름 및 직책 */}
            <div className="text-center mt-3">
              <div className="font-bold text-lg text-[#323232]">{approver.name}</div>
              <div className="text-base text-gray-600">{approver.departmentName} {approver.positionName}</div>
            </div>
            {/* 상태 표시 */}
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
            {/* 화살표 아이콘 */}
            {index < approvers.length - 1 && (
              <IoIosArrowDown className="text-gray-500 text-3xl mt-6" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetailLine;
