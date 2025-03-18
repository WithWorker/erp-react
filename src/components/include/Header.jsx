const Header = () => {

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

  return (
    <div className="flex justify-between items-center p-4">
      <h2 className="text-xl font-bold">{getPageTitle()}</h2> {/* 경로에 맞는 페이지 제목 표시 */}
    </div>
  );
};

export default Header;