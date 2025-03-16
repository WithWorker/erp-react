import { useState, useEffect } from "react";
import { BsBell, BsBellFill, BsEnvelopeFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";



const Header = () => {
  const [isMuted, setIsMuted] = useState(false); // 음소거 상태
  const [isNewEmail, setIsNewEmail] = useState(false); // 새로운 이메일 알림 상태
  const [profileImage, setProfileImage] = useState(""); // 프로필 이미지를 저장할 상태 변수
  const navigate = useNavigate(); // 네비게이션 훅
  const defaultProfileImage = "https://example.com/default-profile.jpg"; // 기본 프로필 이미지 URL

  // 페이지 제목을 경로에 맞게 설정
  const getPageTitle = () => {
    const path = location.pathname;

    // 정규식으로 '/event/:id' 형태의 경로 처리
    const eventMatch = path.match(/^\/event\/\d+/); // 숫자 ID를 가진 '/event/:id' 경로에 매칭

    if (eventMatch) {
      return "일정 상세보기";
    }
    
    if (path.startsWith("/calendar")) {
      return "캘린더";
    }
    
    if (path.startsWith("/approval")) {
      return "휴가";
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
        return "사원 조회";
      case "/mypage":
        return "마이페이지";
      default:
        return "Dashboard"; // 기본 값
    }
  };


  // 음소거 상태 토글
  const handleBellClick = () => {
    setIsMuted(!isMuted);
  };

  // 새로운 이메일 알림 상태 업데이트 (5초마다)
  useEffect(() => {
    const emailInterval = setInterval(() => {
      setIsNewEmail(true);

      // 3초 후 이메일 알림 상태 초기화 (예시)
      setTimeout(() => {
        setIsNewEmail(false);
      }, 3000); // 3초 후 이메일 알림을 다시 초기화
    }, 5000); // 5초마다 새로운 이메일 알림이 오는 것으로 설정

    // 컴포넌트가 언마운트될 때 interval을 클리어
    return () => clearInterval(emailInterval);
  }, []);

  // 이메일 아이콘 클릭 시 이메일 페이지로 이동
  const handleEmailClick = () => {
    navigate("/email"); // 이메일 페이지로 이동
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
            onClick={handleEmailClick} // 이메일 아이콘 클릭 시 이메일 페이지로 이동
          />
          {isNewEmail && (
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span> // 빨간 동그라미
          )}
        </div>

        {/* 벨 아이콘 - 음소거 상태에 따라 아이콘 변경 */}
        {isMuted ? (
          <BsBell size={24} className="cursor-pointer text-[#323232]" onClick={handleBellClick} />
        ) : (
          <BsBellFill size={24} className="cursor-pointer text-[#323232]" onClick={handleBellClick} />
        )}
        
      </div>
    </div>
  );
};

export default Header;