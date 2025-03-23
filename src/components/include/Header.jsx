import { useState, useEffect } from "react";
import { BsBell, BsEnvelopeFill, BsKeyFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Header = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);

      try {
        const decoded = jwtDecode(token); 
        const expTime = decoded.exp * 1000; 
        const currentTime = Date.now(); 
        const timeLeft = expTime - currentTime; 

        if (timeLeft <= 0) {
          handleLogout(); // 만료 시 로그아웃
        } else {
          // 30분 자동 로그아웃
          setTimeout(handleLogout, timeLeft);
        }
      } catch (error) {
        console.error("Invalid token", error);
        handleLogout(); 
      }
    }
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch("api/logout", {
        method: "GET",
      });

      if (response.ok) {
        localStorage.removeItem("token");
        localStorage.removeItem("empId");
        localStorage.removeItem("role");
        setIsLoggedIn(false);
        navigate("/");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const getPageTitle = () => {
    const path = location.pathname;
    if (path.startsWith("/calendar")) return "캘린더";
    if (path.startsWith("/approval")) return "결재";

    switch (path) {
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
    }
  };

  return (
    <div className="flex justify-between items-center p-4">
      <h2 className="text-xl font-bold">{getPageTitle()}</h2>
      <div className="flex items-center space-x-4">
        <BsEnvelopeFill size={24} className="cursor-pointer text-[#323232]" />
        <BsBell size={24} className="cursor-pointer text-[#323232]" />
        {isLoggedIn && (
          <BsKeyFill
            size={24}
            className="cursor-pointer text-[#323232]"
            onClick={handleLogout}
          />
        )}
      </div>
    </div>
  );
};

export default Header;
