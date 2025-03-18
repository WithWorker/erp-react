import { useState, useEffect } from "react";
import { BsBell, BsBellFill, BsEnvelopeFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate(); // 네비게이션 훅

  // 페이지 제목을 경로에 맞게 설정
  const getPageTitle = () => {
    const path = location.pathname;

    // 정규식으로 '/event/:id' 형태의 경로 처리
    const eventMatch = path.match(/^\/event\/\d+/); // 숫자 ID를 가진 '/event/:id' 경로에 매칭

    if (path.startsWith("/calendar")) {
      return "캘린더";
    }
    
    if (path.startsWith("/approval")) {
      return "결재";
    }
    
    switch (path) {
      case "/calendar":
        return "캘린더";
      case "/write":
        return "일정등록";
      case "/vacation":
        return "휴가";
      case "/board":
        return "게시판";
      case "/chat":
        return "채팅";
      case "/employees":
        return "직원 조회";
      case "/mypage":
        return "마이페이지";
    }
  };

  return (
    <div className="flex justify-between items-center p-4">
      <h2 className="text-xl font-bold">{getPageTitle()}</h2> {/* 경로에 맞는 페이지 제목 표시 */}
      <div className="flex items-center space-x-4">
        {/* 이메일 아이콘 */}
        <div className="relative">
          <BsEnvelopeFill 
            size={24} 
            className="cursor-pointer text-[#323232]" 
          />
        </div>
        {/* 벨 아이콘 - 음소거 상태에 따라 아이콘 변경 */}
          <BsBell size={24} className="cursor-pointer text-[#323232]"/>
      </div>
    </div>
  );
};

export default Header;