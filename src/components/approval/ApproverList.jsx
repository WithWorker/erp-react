import React, { useState, useEffect } from 'react';
import { getApprover } from '../../service/approvalLogic'; // 적절한 경로로 수정해주세요

const ApprovalList = () => {
  const [approvalList, setApprovalList] = useState([]);
  const approverId = 4; // 임의로 설정된 approver_id

  useEffect(() => {
    // 결재 확인 목록 불러오기
    const fetchApprovalList = async () => {
      try {
        const data = await getApprover(approverId);
        setApprovalList(data);
      } catch (error) {
        console.error("결재 승인 목록 불러오기 오류:", error);
      }
    };
    fetchApprovalList();
  }, [approverId]);

  return (
    <div>
      {approvalList.length > 0 ? (
        approvalList.map(item => (
          <div key={item.approvalId}>
            <p>{item.title} - {item.statusName}</p>
            {/* 다른 항목들 추가 */}
          </div>
        ))
      ) : (
        <p>결재 승인 목록이 없습니다.</p>
      )}
    </div>
  );
};

export default ApprovalList;
