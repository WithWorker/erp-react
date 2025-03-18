import { useState } from "react";
import { BsGrid, BsCalendar, BsTree, BsFileText, BsChat, BsPerson } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const [isWorking, setIsWorking] = useState(false); // 출근 상태
  const [clockInMessage, setClockInMessage] = useState(""); // 출근 메시지 상태

  // 출근하기 버튼 클릭
  const handleClockIn = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500)); // 0.5초 딜레이
      console.log("출근 성공 (Mock)");
      setIsWorking(true); // 출근 상태로 변경
      setClockInMessage("출근 도장 성공!"); // 출근 메시지 설정
    } catch (error) {
      console.error("출근 실패:", error);
    }
  };

  // 퇴근하기 버튼 클릭
  const handleClockOut = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500)); // 0.5초 딜레이
      console.log("퇴근 성공 (Mock)");
      setIsWorking(false); // 퇴근 상태로 변경
      setClockInMessage(""); // 퇴근 후 메시지 초기화
    } catch (error) {
      console.error("퇴근 실패:", error);
    }
  };

  const menuItems = [
    { name: "DashBoard", icon: BsGrid, path: "/dashboard" },
    { name: "캘린더", icon: BsCalendar, path: "/calendar" },
    { name: "휴가", icon: BsTree, path: "/approval" },
    { name: "게시판", icon: BsFileText, path: "/board" },
    { name: "채팅", icon: BsChat, path: "/chat" },
    { name: "사원조회", icon: BsPerson, path: "/employees" },
  ];

  return (
    <div className="w-64 h-screen bg-white shadow-lg flex flex-col p-4">
      {/* 로고 */}
      <div className="text-start p-2 mb-3">
        <h1 className="text-[#006D2C] text-2xl font-bold">with worker</h1>
      </div>

      {/* 메뉴 목록 */}
      <nav className="flex-1">
        {menuItems.map((menu) => (
          <div
            key={menu.name}
            onClick={() => navigate(menu.path)}
            className="flex items-center gap-2 mb-2 hover:bg-gray-100 rounded-lg cursor-pointer p-2"
          >
            {/* 아이콘 렌더링 */}
            <menu.icon className="text-xl" />
            <span>{menu.name}</span>
          </div>
        ))}
      </nav>

      {/* 출퇴근 버튼 */}
      <div className="mt-auto flex flex-col gap-2">
        {!isWorking && ( // 출근 상태가 아니면 출근 버튼 보이기
          <button
            onClick={handleClockIn} // 출근하기 클릭 시
            className="flex items-center justify-center gap-2 bg-[#006D2C] text-white py-2 rounded-full"
          >
            <i className="bi bi-box-arrow-in-right"></i> 출근하기
          </button>
        )}

        {isWorking && (
          <>
            {/* 출근 도장 메시지 */}
            {clockInMessage && <div className="text-[#006D2C] text-center py-2">{clockInMessage}</div>}
            <button
              onClick={handleClockOut} // 퇴근하기 클릭 시
              className="flex items-center justify-center gap-2 border-2 border-[#006D2C] text-[#006D2C] py-2 rounded-full"
            >
              <i className="bi bi-box-arrow-left"></i> 퇴근하기
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
