import React, { useState, useEffect } from 'react';
import { getApplicantPending, getApplicantApproved, getApprover } from '../../service/approvalLogic'; // 적절한 경로로 수정해주세요
import { ThreeDots, Files } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';

const ApprovalList = ({ viewMode }) => {
  const [approvalList, setApprovalList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
  const totalPages = 3; // 예시로 총 3페이지로 설정 (실제 데이터에 따라 동적으로 설정 가능)
  const applicantId = 1; // 임의로 설정된 applicant_id
  const approverId = 4; // 임의로 설정된 approver_id
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
      } catch (error) {
        console.error("결재 목록 불러오기 오류:", error);
      }
    };
    fetchApprovalList();
  }, [viewMode, applicantId, approverId]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const detailRedirect = (approvalId) => {
    if (viewMode === 2) {
      // viewMode가 2일 때는 상태 수정 페이지로 이동
      navigate(`/approval/edit/${approvalId}`);
    } else {
      // 상세보기 페이지로 이동
      navigate(`/approval/${approvalId}`);
    }
  };

  return (
    <div className="p-4 w-full bg-white rounded-2xl shadow-lg">
      {approvalList.length > 0 ? (
        approvalList.map(item => (
          <div key={item.approvalId} className="rounded-full mb-2 p-1 bg-gray-100">
            <div className="flex justify-between ml-6 mr-4">
              <div className='flex justify-between items-center space-x-4'>
                <p className="text-xs mb-1 text-gray-500">{item.start_date}</p>
                <div className='flex flex-between items-center space-x-3'>
                  <p className={"px-2 py-1 text-sm rounded-xl bg-[#323232] text-white"}>
                  {item.typeName}
                  </p>
                  <p className="font-bold text-[#323232]">{item.title}</p>
                  {/* <p className={"px-2 py-1 text-sm rounded-xl bg-[#323232] text-white"}>
                  {item.typeName}
                  </p> */}
                  <p className="text-xs text-gray-500">{item.applicant.name} {item.applicant.positionName} / {item.applicant.departmentName}</p>
                </div>
              </div>
              <div className='flex justify-between items-center'>
                {/* 승인 대기 목록일 때만 approverStatusName 출력 */}
                {viewMode === 2 ? (
                  item.approvers?.map((approver, index) => (
                    <div key={index} 
                        className={`px-4 py-2 rounded-full ${approver.approverStatusName === '승인' ? 'bg-green-500  text-white' : approver.approverStatusName === '반려' ? 'bg-red-500  text-white' : 'border-2 border-[#006D2C] text-[#006D2C]'}`}>
                      {approver.approverStatusName}
                    </div>
                  ))
                ) : (
                  <div 
                        className={`px-4 py-2 rounded-full  ${item.statusName === '승인' ? 'bg-green-500 text-white' : item.statusName === '반려' ? 'bg-red-500 text-white' : 'border-2 border-[#006D2C] text-[#006D2C]'}`}>
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
