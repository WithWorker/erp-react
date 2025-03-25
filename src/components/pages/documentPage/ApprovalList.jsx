import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchApprovalList,
  selectApprovalList,
  selectCurrentPage,
  selectTotalPages,
  updateApprovalStatus
} from '../../../redux/slice/documentSlice';
import { CardText, Files, ThreeDots } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';

const ApprovalList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const approvalList = useSelector(selectApprovalList);

  // ✅ 메모이제이션된 selector 사용
  const list = useSelector(selectApprovalList) || [];  // 기본값 [] 설정
  const currentPage = useSelector(selectCurrentPage) || 1;  // 기본값 1 설정
  const totalPages = useSelector(selectTotalPages) || 1;  // 기본값 1 설정

  useEffect(() => {
    console.log('현재 페이지:', currentPage); // 페이지가 변경될 때마다
    // 승인 완료된 문서 리스트를 불러옵니다.
    //dispatch(fetchApprovalList(currentPage));
    dispatch(fetchApprovalList(currentPage)); // ✅ Promise 아님 → 순수 객체 반환 처리됨
  }, [dispatch, currentPage]);

  // 승인 리스트가 제대로 불러와졌는지 확인
  useEffect(() => {
    console.log('현재 승인 문서 리스트:', approvalList); // 데이터를 확인
  }, [approvalList]);

  const handlePageChange = (page) => {
    dispatch(fetchApprovalList(page));
  };

  // ✅ 승인 상태 업데이트 처리 함수 추가
  const handleApprove = (id) => {
    console.log('승인 처리할 문서 id:', id);
    dispatch(updateApprovalStatus({ id, status: '승인' }));
  };

  const detailRedirect = (id) => {
    navigate(`/document/${id}`);
  }

  /* // ApprovalList.js에서 필터링된 데이터 확인
  approvalList.forEach(item => {
    console.log('문서 상태:', item.status); // 상태를 확인
  }); */

  return (
    <div className="p-4 w-full bg-white rounded-3xl shadow-lg">
      {approvalList.length > 0 ? (
        approvalList
        .filter(item => item.status === '승인') // 승인된 문서만 필터링
        .map(item => (
            <div key={item.id} className="rounded-full mb-2 p-3 bg-gray-100">
              <div className="flex justify-between ml-4 mr-4">
                <div className='flex justify-between items-center space-x-4'>
                  <p className="text-xs mb-1 text-gray-500">{item.date}</p>
                  <div className='flex flex-between items-center space-x-4'>
                    <p className="font-bold text-[#323232]">{item.title}</p>
                    <p className="text-xs text-gray-500">{item.author} / {item.department}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-[#006D2C] font-bold">{item.status}</span>
                  
                <div className="p-2 flex items-center">
                  <button onClick={() => detailRedirect(item.id)} className="text-gray-500">
                    <ThreeDots size={20} />
                  </button>
                </div>
                </div>
              </div>
            </div>
        ))
      ) : (
        <p className="text-center text-gray-500">승인된 결재 문서가 없습니다.</p>
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
    </div>
  );
};

export default ApprovalList;
