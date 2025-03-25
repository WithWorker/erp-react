import React from "react";

const Modal = ({ isOpen, onClose, event }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">상세 일정</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            X
          </button>
        </div>
        <div>
          <p className="font-semibold">제목:</p>
          <p>{event.title}</p>
        </div>
        <div className="mt-4">
          <p className="font-semibold">상세 내용:</p>
          <p>{event.description}</p>
        </div>
        <div className="mt-4">
          <p className="font-semibold">기간:</p>
          <p>{new Date(event.start).toLocaleString()} - {new Date(event.end).toLocaleString()}</p>
        </div>
        <div className="mt-6 text-right">
          <button
            onClick={onClose}
            className="bg-[#006D2C] text-white px-4 py-2 rounded-lg hover:bg-green-600"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
