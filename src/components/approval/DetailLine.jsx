import React from 'react';

const DetailLine = ({ approvers }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg">
      <span className="text-sm font-semibold text-[#323232]">결재선</span>
      <div className="mt-4 flex flex-row space-x-4 overflow-x-auto">
        {approvers.map((approver, index) => (
          <div
            key={index}
            className="flex items-center space-x-6 p-4 bg-gray-50 rounded-lg shadow-sm"
          >
            <div className="flex flex-col items-center space-y-2">
              <img
                src={approver.photo || "/default-avatar.png"} // 프로필 사진
                alt={approver.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="font-semibold text-[#323232]">{approver.name}</div>
              <div className="text-sm text-gray-500">{approver.positionName}</div>
              <div className="text-xs text-gray-400">{approver.departmentName}</div>
              <div className="flex items-center">
                <span
                  className={`px-3 py-1 rounded-full ${
                    approver.statusName === "승인"
                      ? "bg-green-100 text-green-800"
                      : approver.statusName === "반려"
                      ? "bg-red-100 text-red-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {approver.statusName || "대기"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetailLine;
