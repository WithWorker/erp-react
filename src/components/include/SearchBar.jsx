<<<<<<< HEAD
import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState(""); // ✅ `useState`로 상태 추가

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <input
      type="text"
      value={query}
      onChange={handleInputChange}
      placeholder="검색..."
      className="w-full p-2 border rounded"
    />
=======
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchQuery } from '../../redux/slice/employeeSlice';
import { BiSearch } from 'react-icons/bi'; // 부트스트랩 아이콘 라이브러리

const SearchBar = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    dispatch(setSearchQuery(value));  // 리덕스로 검색어 상태 업데이트
  };

  const handleSearch = () => {
    dispatch(setSearchQuery(query));  // 리덕스로 검색어 상태 업데이트
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();  // 엔터키를 누르면 검색 실행
    }
  };

  return (
    <div className="relative md:w-4/5 w-full">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}  // 엔터키 이벤트 추가
        placeholder="이름 또는 사원번호 검색"
        className="bg-white pl-4 pr-4 text-sm rounded-full shadow-md w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black h-[48px]"
      />
      <BiSearch className="cursor-pointer absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-400" 
                size={20}
                onClick={handleSearch}
      />
    </div>
>>>>>>> ea512ccf4ad0f9fdec14815a09e742969db97f74
  );
};

export default SearchBar;
