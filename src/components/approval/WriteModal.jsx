import React from 'react';
import Modal from 'react-modal';

const WriteModal = ({ isModalOpen, handleCloseModal, selectedApprover, setSelectedApprover, approversList, handleAddApprover }) => {
  return (
    <Modal 
      isOpen={isModalOpen}
      onRequestClose={handleCloseModal}
      className="modal-content bg-white p-4 w-[30rem] rounded-3xl shadow-lg"
      overlayClassName="fixed inset-0 bg-[#323232] bg-opacity-80 flex justify-center items-center"      
    >
      <div className="p-3 rounded-2XL">
        <h2 className="font-bold text-lg mb-4">결재선 추가</h2>
        <div className="mb-1">
          <label className="font-bold block text-[#323232] mb-1">승인자 선택</label>
          <select
            value={selectedApprover}
            onChange={(e) => setSelectedApprover(Number(e.target.value))}
            className="text-[#323232] w-full border border-gray-300 rounded-lg px-3 py-2"
          >
            <option value="">승인자를 선택하세요</option>
            {approversList.map((approver) => (
              <option key={approver.id} value={approver.id}>
                {approver.author} / {approver.department} / {approver.role}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-end space-x-4 mt-4">
          <button
            onClick={handleCloseModal}
            className="px-6 py-2 border border-gray-300 rounded-full text-gray-600"
          >
            취소
          </button>
          <button
            onClick={handleAddApprover}
            className="px-6 py-2 bg-[#006D2C] text-white rounded-full"
          >
            추가
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default WriteModal;
