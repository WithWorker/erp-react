import React, { useState } from 'react';
import { BsCheckCircleFill } from 'react-icons/bs';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import { Calendar } from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // react-calendar 기본 스타일 불러오기
import Sidebar from '../include/Sidebar';
import Header from '../include/Header';

const AbsentWritePage = () => {
  const navigate = useNavigate();

  //const [startDate, setStartDate] = useState('');
  //const [endDate, setEndDate] = useState('');
  const [absenceType, setAbsenceType] = useState('');
  const [title, setTitle] = useState('');
  const [dateRange, setDateRange] = useState([null, null]);
  const [selectedDate, setSelectedDate] = useState(null); // 클릭한 날짜 상태
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
    // 날짜 범위 변경 처리
    setDateRange(date);
  };

  const handleTileClick = (date) => {
    setSelectedDate(date); // 클릭한 날짜 저장
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

        {/* 전체 Flexbox 구조 */}
        <div className="flex space-x-4">
          {/* 왼쪽 일정 정보 섹션 */}
          <div className="flex-1 space-y-4">
            <div className="p-6 bg-white rounded-2xl shadow-md w-full">
            {/* 상단 탭 */}
            <div className="flex justify-around mb-4">
              {['일반 기안지', '부재 일정', '비용 청산 신청', '지출 조회서'].map((tab) => (
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
                    <option value="연차">연차</option>
                    <option value="병가">병가</option>
                    <option value="기타">기타</option>
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
                selectRange={true} // ✅ 지원되는 props로 전달
                onChange={handleDateChange}
                value={dateRange}
                className="border border-gray-300 rounded-lg w-full"
                formatMonthYear={(locale, date) => `${date.getFullYear()}년 ${date.getMonth() + 1}월`} // ✅ 올바른 props 전달
                //tileContent={({ date }) => <span>{`${date.getDate()}일`}</span>} // ✅ 올바르게 props로 전달
                tileClassName={({ date }) => {
                  const isToday =
                    date.getDate() === new Date().getDate() &&
                    date.getMonth() === new Date().getMonth() &&
                    date.getFullYear() === new Date().getFullYear();

                  const isSelected =
                    dateRange &&
                    dateRange[0] &&
                    dateRange[1] &&
                    date >= dateRange[0] &&
                    date <= dateRange[1];
                  if (isSelected) {
                    return 'bg-[#006D2C] text-white hover:bg-[#006D2C]'; // 선택된 날짜 스타일
                  }

                  if (selectedDate && selectedDate.toDateString() === date.toDateString()) {
                    return 'bg-[#006D2C] text-white hover:bg-[#006D2C]'; // 클릭한 날짜 스타일
                  }

                  return '';
                }}
                onTileClick={({ date }) => handleTileClick(date)} // 날짜 클릭 시 처리
              />
              <div className="flex justify-between mt-2">
              <p className="text-gray-500 mt-1">
                {dateRange[0] && dateRange[1]
                  ? `시작 날짜: ${dateRange[0].toLocaleDateString()} - 종료 날짜: ${dateRange[1].toLocaleDateString()}`
                  : '날짜를 선택하세요'}
              </p>
              <p className="text-[#006D2C] mt-1">남은 연차: 15일 / 사용 일수: 1일</p>
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
          <div className="flex flex-col justify-start w-64 bg-white p-6 rounded-2xl shadow-lg h-auto">
            <span className="text-sm font-medium text-[#323232]">결재선</span>
              <div className="rounded-lg max-h-auto overflow-y-auto mt-4">
                {attendees.length > 0 ? (
                  attendees.map((attendee, index) => (
                    <div 
                      key={index}
                      className={`flex justify-between items-center mb-2 p-3 rounded-lg ${
                      index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-100'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{attendee.author}, {attendee.role}</span>
                      </div>
                      <div className="flex items-center gap-2">
                      <BsCheckCircleFill
                        className={`${
                          attendee.isApproved ? 'text-[#006D2C]' : 'text-gray-400' // 결재 여부에 따라 색상 변경
                        }`}
                      />
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">결재선이 없습니다.</p>
                )}
              </div>
            {/* 결재선 추가 버튼 */}
            <button
              onClick={handleOpenModal}
              className="mt-4 px-4 py-2 bg-[#006D2C] text-white rounded-full"
            >
              결재선 추가
            </button>
      </div>

      {/* 모달 */}
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
    </div>
        </div>
      </div>
  );
};

export default AbsentWritePage;