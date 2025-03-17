import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchApprovalList, updateApprovalStatus, selectApprovalList, selectCurrentPage, selectTotalPages } from '../../../redux/slice/documentSlice';
import { Files, ThreeDots } from 'react-bootstrap-icons';

const APList = ({ setTabIndex }) => {
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

  const detailRedirect = (id) => {
    navigate(`/document/${id}`);
  }
  const handleApproval = async (id, status) => {
    try {
      // axios.put 대신, 더미 데이터 처리
      console.log('승인 처리:', id, status);
      dispatch(updateApprovalStatus({ id, status }));
      if (status === '승인') { // ❤️ 승인 시 상태 변경 후 탭 인덱스를 2로 설정
        console.log('승인 후 탭 변경: ', 2);
        setTabIndex(2); // ❤️ 승인 완료 목록 탭으로 이동
      }
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
            <div key={item.id} className="rounded-full mb-2 p-1 bg-gray-100">
              <div className="flex justify-between ml-6 mr-4">
                <div className='flex justify-between items-center space-x-4'>
                  <p className="text-xs mb-1 text-gray-500">{item.date}</p>
                  <div className='flex flex-between items-center space-x-4'>
                    <p className="font-bold text-[#323232]">{item.title}</p>
                    <p className="text-xs text-gray-500">{item.author} / {item.department}</p>
                  </div>
                </div>
                <div className='flex justify-between items-center'>
                  {item.status === '대기' ? (
                    <div className="flex gap-2">
                      <div className="border-2 border-[#006D2C] text-[#006D2C] px-4 py-2 rounded-full"
                      >
                        승인 대기
                      </div>
                    </div>
                  ) : (
                    <span className={`text-${item.status === '승인' ? 'green' : 'red'}-500`}>
                      {item.status}
                    </span>
                  )}
                    <div className="p-4 text-center">
                      <button onClick={() => detailRedirect(item.id)} className="flex items-center text-gray-500">
                        <ThreeDots size={20} />
                      </button>
                    </div>
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
    </div>
  );
};

export default APList;