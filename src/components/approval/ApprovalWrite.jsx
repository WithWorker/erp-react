import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Sidebar from '../include/Sidebar';
import Header from '../include/Header';
import WriteLine from './WriteLine';
import WriteModal from './WriteModal';
import { addApproval } from '../../service/approvalLogic';

const ApprovalWrite = () => {
  const navigate = useNavigate();

  const [applicantId, setApplicantId] = useState("");
  const [typeId, setTypeId] = useState('');
  const [title, setTitle] = useState('');
  const [dateRange, setDateRange] = useState([null, null]);
  const [content, setContent] = useState('');
  const [selectedApprovers, setSelectedApprovers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleDateChange = (date) => setDateRange(date);
  
  const handleSelectApprovers = (approvers) => {
    setSelectedApprovers(approvers);
    console.log("approvers:"+approvers);
    handleCloseModal();
  };

  const handleSubmit = async () => {
    if (!typeId || !title) {
      alert("결재 유형과 제목을 모두 입력해주세요.");
      return;
    }

    const approval = {
      typeId,
      title,
      content,
      start_date: dateRange[0] ? dateRange[0].toISOString().split("T")[0] : null,
      end_date: dateRange[1] ? dateRange[1].toISOString().split("T")[0] : null,
      applicantId,
      approvers: selectedApprovers.map((approver) => ({ empId: approver.empId })), // 객체 배열 변환
    };

    const confirmAdd = window.confirm("결재를 등록하시겠습니까?");
    if (confirmAdd) {
      try {
        await addApproval(approval);
        console.log("등록 성공한 approval Data : ",approval);
        navigate("/approval");
      } catch (error) {
        console.error("결재 등록 실패", error);
        console.log("Approval Data:", approval);
      }
    } else {
      console.log("결재 등록 취소");
    }
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
                <div>
                  <label className="text-sm font-semibold">사번(db테스트용 삭제 예정)</label>
                  <input
                    type="text"
                    value={applicantId}
                    onChange={(e) => setApplicantId(parseInt(e.target.value))}
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-600"
                    placeholder="사번 applicantId"
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
                <button 
                  onClick={handleSubmit}
                  className="px-6 py-2 bg-[#006D2C] text-white rounded-full">
                  등록
                </button>
              </div>
            </div>
          </div>
          <div className="w-[350px] h-[calc(90vh-9rem)]">
            <WriteLine approvers={selectedApprovers} handleOpenModal={handleOpenModal} />
          </div>
        </div>
        <WriteModal isModalOpen={isModalOpen} handleCloseModal={handleCloseModal} handleSelectApprovers={handleSelectApprovers} />
      </div>
    </div>
  );
};

export default ApprovalWrite;