import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchApprovalList, updateApprovalStatus, selectApprovalList, selectCurrentPage, selectTotalPages } from '../../../redux/slice/documentSlice';
import { CardText, Files, Plus } from 'react-bootstrap-icons';

const PendingList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ✅ 메모이제이션된 selector 사용
  const list = useSelector(selectApprovalList) || [];  // 기본값 [] 설정
  const currentPage = useSelector(selectCurrentPage) || 1;  // 기본값 1 설정
  const totalPages = useSelector(selectTotalPages) || 1;  // 기본값 1 설정

  useEffect(() => {
    console.log('현재 페이지:', currentPage); // 페이지가 변경될 때마다 찍어봐요.
    // 페이지가 변경될 때마다 approval 리스트를 새로 불러옵니다.
    dispatch(fetchApprovalList(currentPage));
  }, [dispatch, currentPage]);


  const handleApproval = async (id, status) => {
    try {
      // axios.put 대신, 더미 데이터 처리
      console.log('승인 처리:', id, status);
      dispatch(updateApprovalStatus({ id, status }));
    } catch (error) {
      console.error('Approval update failed:', error);
    }
  };

  const handlePageChange = (page) => {
    dispatch(fetchApprovalList(page));
  };

  return (
    <div>
      <div className="p-4 w-full bg-white rounded-2xl shadow-lg">
        {list.length > 0 ? (
          list.map(item => (
            <div key={item.id} className="rounded-full mb-2 p-3 bg-gray-100">
              <div className="flex justify-between ml-4 mr-4">
                <div className='flex justify-between items-center space-x-4'>
                  <p className="text-xs mb-1 text-gray-500">{item.date}</p>
                  <div className='flex flex-between items-center space-x-4'>
                    <p className="font-bold text-[#323232]">{item.title}</p>
                    <p className="text-xs text-gray-500">{item.author} / {item.department}</p>
                  </div>
                </div>
                <div>
                  {item.status === '대기' ? (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleApproval(item.id, '승인')}
                        className="border-2 border-[#006D2C] text-[#006D2C] px-4 py-2 rounded-full"
                      >
                        승인 대기
                      </button>
                      {/* <button
                        onClick={() => handleApproval(item.id, '반려')}
                        className="border-2 border-[#006D2C] text-[#006D2C] px-4 py-2 rounded-full"
                      >
                        반려
                      </button> */}
                    </div>
                  ) : (
                    <span className={`text-${item.status === '승인' ? 'green' : 'red'}-500`}>
                      {item.status}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">등록된 결재 문서가 없습니다.</p>
        )}

        {/* 페이지네이션 */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-4">
            {[...Array(totalPages).keys()].map(i => (
              <button
                key={i}
                onClick={() => handlePageChange(i + 1)}
                className={`px-2 py-2 rounded-lg ${currentPage === i + 1 ? ' text-[#006D2C]' : ''}`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}

      </div>
        {/* 기안문 작성 버튼 */}
        <div className="flex justify-end mt-4">
          <button
            onClick={() => navigate('/create')}
            className="bg-[#006D2C] text-white px-4 py-3 rounded-full shadow-lg flex items-center"
          >
            <Files size={20} className='mr-2'/> 기안지 작성
          </button>
        </div>
    </div>
  );
};

export default PendingList;
