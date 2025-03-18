import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar } from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // react-calendar 기본 스타일 불러오기
import Sidebar from '../include/Sidebar';
import Header from '../include/Header';
import WriteLine from './WriteLine'; // 결재선 표시 컴포넌트
import WriteModal from './WriteModal'; // 결재선 추가 모달

const ApprovalWrite = () => {
  const navigate = useNavigate();

  const [absenceType, setAbsenceType] = useState('');
  const [title, setTitle] = useState('');
  const [dateRange, setDateRange] = useState([null, null]);
  const [reason, setReason] = useState('');
  const [file, setFile] = useState(null);

  const [attendees, setAttendees] = useState([]); // 결재선에 추가된 사람들
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태
  const [selectedApprover, setSelectedApprover] = useState(''); // 선택된 승인자
  const [approversList, setApproversList] = useState([
    { id: 1, author: '홍길동', department: '영업부', role: '팀장' },
    { id: 2, author: '최부장', department: '디자인부', role: '부장' },
    { id: 3, author: '김과장', department: '개발부', role: '과장' },
    { id: 4, author: '나신입', department: '기술부', role: '사원' },
  ]); // 예시 승인자 목록

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddApprover = () => {
    if (selectedApprover) {
      const approver = approversList.find(approver => approver.id === selectedApprover);
      setAttendees([...attendees, approver]);
      setIsModalOpen(false);
    }
  };

  const handleDateChange = (date) => {
    setDateRange(date);
  };

  const handleSubmit = () => {
    console.log({
      absenceType,
      title,
      startDate: dateRange[0],
      endDate: dateRange[1],
      reason,
      file,
    });
    alert('작성 완료되었습니다.');
    navigate('/user/documents');
  };

  const handleCancel = () => {
    navigate('/approval'); 
  };

  return (
    <div className="flex w-full h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 w-screen p-6 overflow-y-auto">
        <Header />

        <div className="flex space-x-4">
          <div className="flex-1 space-y-4">
            <div className="p-6 bg-white rounded-2xl shadow-md w-full">
              {/* 상단 탭 */}
              <div className="flex justify-around mb-4">
                {['부재 일정', ' ', ' ', ' ','','','',''].map((tab) => (
                  <div
                    key={tab}
                    className={`px-4 py-2 cursor-pointer ${tab === '부재 일정' ? 'border-b-2 border-[#006D2C] text-[#006D2C] font-bold' : 'text-gray-500'}`}
                  >
                    {tab}
                  </div>
                ))}
              </div>

              <div className="mt-10 flex flex-col md:flex-row items-start mr-2 space-y-4 md:space-y-0 md:space-x-4 w-full mb-6">
                {/* 부재 항목 */}
                <div className="mb-4">
                  <label className="font-bold block text-[#323232] mb-1">부재 항목</label>
                  <select
                    value={absenceType}
                    onChange={(e) => setAbsenceType(e.target.value)}
                    className="text-[#323232] w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#323232]"
                  >
                    <option value="">항목을 선택하세요</option>
                    <option value="1">연차</option>
                    <option value="2">출장</option>
                    <option value="3">병가</option>
                  </select>
                </div>

                {/* 제목 입력 */}
                <div className="mb-4 flex-1">
                  <label className="font-bold block text-[#323232] mb-1">제목</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#323232]"
                    placeholder="제목을 입력하세요."
                  />
                </div>
              </div>

              {/* 날짜 선택 */}
              <div className="mb-4">
                <label className="font-bold block text-[#323232] mb-1">날짜 선택</label>
                <Calendar
                  selectRange={true}
                  onChange={handleDateChange}
                  value={dateRange}
                  className="border border-gray-300 rounded-lg w-full"
                />
                <div className="flex justify-between mt-2">
                  <p className="text-gray-500 mt-1">
                    {dateRange[0] && dateRange[1]
                      ? `시작 날짜: ${dateRange[0].toLocaleDateString()} - 종료 날짜: ${dateRange[1].toLocaleDateString()}`
                      : '날짜를 선택하세요'}
                  </p>
                </div>
              </div>

              {/* 사유 입력 */}
              <div className="mt-10 mb-4">
                <label className="font-bold block text-[#323232] mb-1">사유</label>
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#323232]"
                  rows="4"
                  placeholder="사유를 입력하세요. (선택)"
                ></textarea>
              </div>

              {/* 하단 버튼 */}
              <div className="flex justify-end space-x-4 mt-6">
                <button
                  onClick={handleCancel}
                  className="px-6 py-2 border border-gray-300 rounded-full text-gray-600"
                >
                  취소
                </button>
                <button
                  onClick={handleSubmit}
                  className="px-6 py-2 bg-[#006D2C] text-white rounded-full"
                >
                  작성 완료
                </button>
              </div>
            </div>
          </div>

          {/* 우측 결재선 섹션 */}
          <WriteLine attendees={attendees} handleOpenModal={handleOpenModal} />

        </div>

        {/* 결재선 모달 */}
        <WriteModal 
          isModalOpen={isModalOpen}
          handleCloseModal={handleCloseModal}
          selectedApprover={selectedApprover}
          setSelectedApprover={setSelectedApprover}
          approversList={approversList}
          handleAddApprover={handleAddApprover}
        />
      </div>
    </div>
  );
};

export default ApprovalWrite;
