import React, { useState, useEffect } from 'react';
import { getApplicantPending, getApplicantApproved, getApprover } from '../../service/approvalLogic';
import { ThreeDots, Files } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';

const ApprovalList = ({ viewMode }) => {
  const [approvalList, setApprovalList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
  const [totalPages, setTotalPages] = useState(0); // 총 페이지 수 상태
  const itemsPerPage = 8; 
  const applicantId = localStorage.getItem('empId'); 
  const approverId = localStorage.getItem('empId')
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApprovalList = async () => {
      try {
        let data;
        if (viewMode === 0) {
          data = await getApplicantPending(applicantId);
        } else if (viewMode === 1) {
          data = await getApplicantApproved(applicantId);
        } else if (viewMode === 2) {
          data = await getApprover(approverId);
        }
        setApprovalList(data);

        // 총 페이지 수 계산 (itemsPerPage 기준)
        setTotalPages(Math.ceil(data.length / itemsPerPage));
      } catch (error) {
        console.error("결재 목록 불러오기 오류:", error);
      }
    };
    fetchApprovalList();
  }, [viewMode, applicantId, approverId]);

  // 현재 페이지에 해당하는 결재 목록만 추출
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentApprovals = approvalList.slice(startIndex, startIndex + itemsPerPage);

  // 페이지 변경 시 처리
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const detailRedirect = (approvalId) => {
    if (viewMode === 2) {
      navigate(`/approval/edit/${approvalId}`);
    } else {
      navigate(`/approval/${approvalId}`);
    }
  };

  return (
    <div className="p-4 w-full bg-white rounded-2xl shadow-lg">
      {currentApprovals.length > 0 ? (
        currentApprovals.map(item => (
          <div key={item.approvalId} className="rounded-full mb-2 p-1 bg-gray-100">
            <div className="flex justify-between ml-6 mr-4">
              <div className='flex justify-between items-center space-x-4'>
                <p className="text-xs mb-1 text-gray-500">{item.start_date}</p>
                <div className='flex flex-between items-center space-x-3'>
                  <p className={"px-2 py-1 text-sm rounded-xl bg-gray-500 text-white"}>
                    {item.typeName}
                  </p>
                  <p className="font-bold text-[#323232]">{item.title}</p>
                  <p className="text-xs text-gray-500">{item.applicant.name} {item.applicant.positionName} / {item.applicant.departmentName}</p>
                </div>
              </div>
              <div className='flex justify-between items-center'>
                {viewMode === 2 ? (
                  item.approvers?.map((approver, index) => (
                    <div key={index} 
                        className={`px-4 py-2 rounded-full ${approver.approverStatusName === '승인' ? 'bg-green-500 text-white' : approver.approverStatusName === '반려' ? 'bg-red-500 text-white' : 'border-2 border-[#006D2C] text-[#006D2C]'}`}>
                      {approver.approverStatusName}
                    </div>
                  ))
                ) : (
                  <div className={`px-4 py-2 rounded-full ${item.statusName === '승인' ? 'bg-green-500 text-white' : item.statusName === '반려' ? 'bg-red-500 text-white' : 'border-2 border-[#006D2C] text-[#006D2C]'}`}>
                    {item.statusName}
                  </div>
                )}
                <div className="p-4 text-center">
                  <button onClick={() => detailRedirect(item.approvalId)} className="flex items-center text-gray-500">
                    <ThreeDots size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500 mt-10">결재 목록이 없습니다.</p>
      )}

      {/* 페이지네이션 */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {[...Array(totalPages).keys()].map(i => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`px-2 py-2 rounded-lg ${currentPage === i + 1 ? 'text-[#006D2C]' : ''}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

      <div className="flex justify-end mt-4">
        <button className="bg-[#006D2C] text-white px-4 py-3 rounded-full shadow-lg flex items-center"
                onClick={() => navigate("/approval/add")}>
          <Files size={20} className='mr-2' /> 기안지 작성
        </button>
      </div>
    </div>
  );
};

export default ApprovalList;
