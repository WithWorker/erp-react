import React from 'react';
import { BsCheckCircleFill } from 'react-icons/bs';

const WriteLine = ({ approvers, handleOpenModal }) => {
  return (
    <div className="flex flex-col justify-start w-full bg-white p-6 rounded-2xl shadow-lg h-full">
      <span className="text-lg font-bold text-[#323232] pt-3 text-center">결재선</span>
      <div className="rounded-lg max-h-auto overflow-y-auto mt-4">
        {approvers.length > 0 ? (
          approvers.map((approver, index) => (
            <div key={index} className="flex justify-between items-center mb-2 p-3 rounded-lg bg-gray-100">
              <div className="flex items-center gap-2">
                <span className="font-medium">{approver}</span>
              </div>
              <div className="flex items-center gap-2">
                <BsCheckCircleFill className="text-[#006D2C]" />
              </div>
            </div>
          ))
        ) : (
          <div className="text-gray-500">결재자를 선택하세요.</div>
        )}
      </div>
      
      <button
        onClick={handleOpenModal}
        className="mt-4 px-4 py-2 bg-[#006D2C] text-white rounded-full"
      >
        결재선 추가
      </button>
    </div>
  );
};

export default WriteLine;
