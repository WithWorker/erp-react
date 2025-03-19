import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Sidebar from '../include/Sidebar';
import Header from '../include/Header';
import WriteLine from './WriteLine';
import WriteModal from './WriteModal';

const ApprovalWrite = () => {
  const navigate = useNavigate();

  const [typeId, setTypeId] = useState('');
  const [title, setTitle] = useState('');
  const [dateRange, setDateRange] = useState([null, null]);
  const [content, setContent] = useState('');
  const [selectedApprovers, setSelectedApprovers] = useState([]); // 결재자 상태

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleDateChange = (date) => setDateRange(date);

  // 모달에서 결재자 선택 시 업데이트
  const handleSelectApprovers = (approvers) => {
    setSelectedApprovers(approvers); // 결재자 업데이트
    handleCloseModal();
  };

  return (
    <div className="flex w-full h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 w-screen p-6 overflow-y-auto">
        <Header />
        <div className="flex justify-between space-x-4">
          <div className="flex-1 space-y-4">
            <div className="p-6 bg-white rounded-2xl shadow-md w-full">
              <div className="flex justify-around mb-4 px-4 py-2 border-b-2 border-[#006D2C] text-[#006D2C] font-bold text-lg">
                부재 일정
              </div>
              <div className="mt-10 flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-4 w-full mb-6">
                <div className="mb-4">
                  <label className="font-bold block text-[#323232] mb-1">부재 항목</label>
                  <select
                    value={typeId}
                    onChange={(e) => setTypeId(e.target.value)}
                    className="text-[#323232] w-full border border-gray-300 rounded-lg px-3 py-2"
                  >
                    <option value="">항목을 선택하세요</option>
                    <option value="1">연차</option>
                    <option value="2">출장</option>
                    <option value="3">병가</option>
                  </select>
                </div>
                <div className="mb-4 flex-1">
                  <label className="font-bold block text-[#323232] mb-1">제목</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    placeholder="제목을 입력하세요."
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="font-bold block text-[#323232] mb-1">날짜 선택</label>
                <Calendar selectRange={true} onChange={handleDateChange} value={dateRange} className="border border-gray-300 rounded-lg w-full" />
                <div className="flex justify-between mt-2">
                  <p className="text-gray-500 mt-1">
                    {dateRange[0] && dateRange[1]
                      ? `시작 날짜: ${dateRange[0].toLocaleDateString()} - 종료 날짜: ${dateRange[1].toLocaleDateString()}`
                      : '날짜를 선택하세요'}
                  </p>
                </div>
              </div>
              <div className="mt-10 mb-4">
                <label className="font-bold block text-[#323232] mb-1">사유</label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  rows="4"
                  placeholder="사유를 입력하세요. (선택)"
                ></textarea>
              </div>
              <div className="flex justify-end space-x-4 mt-6">
                <button className="px-6 py-2 border border-gray-300 rounded-full text-gray-600" onClick={() => navigate("/approval")}>
                  취소
                </button>
                <button className="px-6 py-2 bg-[#006D2C] text-white rounded-full">
                  등록
                </button>
              </div>
            </div>
          </div>
          {/* 결재선 */}
          <div className="w-[350px] h-[calc(90vh-9rem)]">
            <WriteLine approvers={selectedApprovers} handleOpenModal={handleOpenModal} />
          </div>
        </div>
        {/* 결재선 모달 */}
        <WriteModal isModalOpen={isModalOpen} handleCloseModal={handleCloseModal} handleSelectApprovers={handleSelectApprovers} />
      </div>
    </div>
  );
};

export default ApprovalWrite;
