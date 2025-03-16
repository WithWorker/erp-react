import React, { useState } from 'react';
import { Files } from 'react-bootstrap-icons';

const PendingList = () => {
  // 상태 관리: 현재 페이지와 총 페이지 수
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 3; // 예시로 총 3페이지로 설정, 실제 데이터에 따라 동적으로 설정 가능

  const list = [
    { id: 1, date: "2025-03-16", title: "결재 제목 1", author: "홍길동", department: "개발팀", status: "대기" },
    { id: 2, date: "2025-03-17", title: "결재 제목 2", author: "김철수", department: "인사팀", status: "승인" },
    { id: 3, date: "2025-03-18", title: "결재 제목 3", author: "이영희", department: "마케팅팀", status: "대기" },
    // 더 많은 데이터를 추가할 수 있습니다.
  ];

  // 현재 페이지에 맞는 데이터만 필터링 (간단한 예시)
  const getCurrentPageData = () => {
    const itemsPerPage = 1; // 페이지당 항목 수 (예시로 1개 항목만 표시)
    const startIndex = (currentPage - 1) * itemsPerPage;
    return list.slice(startIndex, startIndex + itemsPerPage);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <div className="p-4 w-full bg-white rounded-2xl shadow-lg">
        {/* 결재 목록 */}
        {getCurrentPageData().length > 0 ? (
          getCurrentPageData().map(item => (
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
                      <button className="border-2 border-[#006D2C] text-[#006D2C] px-4 py-2 rounded-full">
                        승인 대기
                      </button>
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
                className={`px-2 py-2 rounded-lg ${currentPage === i + 1 ? 'text-[#006D2C]' : ''}`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 기안문 작성 버튼 */}
      <div className="flex justify-end mt-4">
        <button className="bg-[#006D2C] text-white px-4 py-3 rounded-full shadow-lg flex items-center">
          <Files size={20} className='mr-2' /> 기안지 작성
        </button>
      </div>
    </div>
  );
};

export default PendingList;
