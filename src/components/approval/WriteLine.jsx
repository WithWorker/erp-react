import React, { useState } from 'react';
import { BsCheckCircleFill, BsSearch } from 'react-icons/bs';

const WriteLine = ({ attendees, handleOpenModal }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredAttendees, setFilteredAttendees] = useState(attendees);

  // 검색 실행
  const handleSearch = () => {
    const result = attendees.filter(attendee =>
      `${attendee.author} ${attendee.role}`.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredAttendees(result);
  };

  return (
    <div className="flex flex-col justify-start w-64 bg-white p-6 rounded-2xl shadow-lg h-auto">
      <span className="text-lg font-bold text-[#323232] pt-8 text-center">결재선</span>
      {/* 검색 입력 필드 */}
      <div className="relative mb-3 mt-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="승인자 검색"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-10 pl-3" // 오른쪽 여백 추가
        />
        <BsSearch 
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
          size={20} // 아이콘 크기 설정
        />
      </div>

      <div className="rounded-lg max-h-auto overflow-y-auto mt-4">
        {filteredAttendees.length > 0 ? (
          filteredAttendees.map((attendee, index) => (
            <div 
              key={attendee.id || index}
              className={`flex justify-between items-center mb-2 p-3 rounded-lg ${index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-100'}`}
            >
              <div className="flex items-center gap-2">
                <span className="font-medium">{attendee.author}, {attendee.role}</span>
              </div>
              <div className="flex items-center gap-2">
                <BsCheckCircleFill className={`${
                  attendee.isApproved ? 'text-[#006D2C]' : 'text-gray-400'
                }`} />
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500">결재선이 없습니다.</p>
        )}
      </div>
      
      <button
        onClick={handleOpenModal}
        className="mt-4 px-4 py-2 bg-[#006D2C] text-white rounded-full"
      >
        결재선 추가
      </button>
    </div>
  );
};

export default WriteLine;
