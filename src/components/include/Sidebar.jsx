<<<<<<< HEAD
import { useState, useEffect } from "react";
import { BsGrid, BsCalendar, BsTree, BsFileText, BsChat, BsPerson } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const [isWorking, setIsWorking] = useState(false);
  const [clockMessage, setClockMessage] = useState(""); 
  const [empId, setEmpId] = useState(null); 

  useEffect(() => {
    const storedEmpId = localStorage.getItem("empId");
    if (storedEmpId) {
      setEmpId(storedEmpId);
    }
  }, []);

  // 출근하기 버튼 클릭
  const handleClockIn = async () => {
    if (!empId) {
      alert("로그인이 필요합니다.");
      return;
    }

    try {
      const response = await fetch(`/api/info/attendance/in/${empId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) throw new Error("출근 기록 실패");

      const message = await response.text();
      setClockMessage(message); // 메시지 업데이트
      setIsWorking(true); // 출근 상태로 변경
    } catch (error) {
      console.error("출근 오류:", error);
      alert("출근 기록에 실패했습니다.");
=======
import { useState } from "react";
import { BsGrid, BsCalendar, BsTree, BsFileText, BsChat, BsPerson } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clockIn, clockOut } from '../../redux/slice/attendanceSlice';

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isWorking = useSelector((state) => state.attendance.isWorking);

  // clockInMessage 상태 추가
  const [clockInMessage, setClockInMessage] = useState("");

  /* 
  백엔드 완성되면 이거 풀어서 연결하기

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const handleClockIn = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/clock-in`, { method: "POST" });
      if (response.ok) {
        dispatch(clockIn());
      } else {
        console.error("출근 실패:", response.status);
      }
    } catch (error) {
      console.error("출근 실패:", error);
    }
  };

  const handleClockOut = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/clock-out`, { method: "POST" });
      if (response.ok) {
        dispatch(clockOut());
      }
    } catch (error) {
      console.error("퇴근 실패:", error);
    }
  };
  */

  // Mock 데이터 처리 (백엔드 없이 테스트용)
  // 출근하기 버튼 클릭
  const handleClockIn = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500)); // 0.5초 딜레이
      console.log("출근 성공 (Mock)");
      dispatch(clockIn());
      setClockInMessage("출근 도장 성공!"); // 출근 메시지 설정
    } catch (error) {
      console.error("출근 실패:", error);
>>>>>>> ea512ccf4ad0f9fdec14815a09e742969db97f74
    }
  };

  // 퇴근하기 버튼 클릭
  const handleClockOut = async () => {
<<<<<<< HEAD
    if (!empId) {
      alert("로그인이 필요합니다.");
      return;
    }

    try {
      const response = await fetch(`/api/info/attendance/out/${empId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) throw new Error("퇴근 기록 실패");

      const message = await response.text();
      setClockMessage(message); // 메시지 업데이트
      setIsWorking(false); // 퇴근 상태로 변경
    } catch (error) {
      console.error("퇴근 오류:", error);
      alert("퇴근 기록에 실패했습니다.");
    }
  };

  // 메뉴 목록
  const menuItems = [
    { name: "DashBoard", icon: BsGrid, path: "/dashboard" },
    { name: "캘린더", icon: BsCalendar, path: "/calendar" },
    { name: "휴가", icon: BsTree, path: "/approval" },
    { name: "게시판", icon: BsFileText, path: "/board" },
    { name: "채팅", icon: BsChat, path: "/messenger" },
    { name: "직원조회", icon: BsPerson, path: "/employees" },
=======
    try {
      await new Promise((resolve) => setTimeout(resolve, 500)); // 0.5초 딜레이
      console.log("퇴근 성공 (Mock)");
      dispatch(clockOut());
      setClockInMessage(""); // 퇴근 후 메시지 초기화
    } catch (error) {
      console.error("퇴근 실패:", error);
    }
  };
  
  const menuItems = [
    { name: "DashBoard", icon: BsGrid, path: "/dashboard" },
    { name: "캘린더", icon: BsCalendar, path: "/calendar" },
    { name: "휴가", icon: BsTree, path: "/vacation" },
    { name: "게시판", icon: BsFileText, path: "/board" },
    { name: "채팅", icon: BsChat, path: "/chat" },
    { name: "사원조회", icon: BsPerson, path: "/employees" },
>>>>>>> ea512ccf4ad0f9fdec14815a09e742969db97f74
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
<<<<<<< HEAD
=======
            {/* 아이콘 렌더링 */}
>>>>>>> ea512ccf4ad0f9fdec14815a09e742969db97f74
            <menu.icon className="text-xl" />
            <span>{menu.name}</span>
          </div>
        ))}
      </nav>

<<<<<<< HEAD
      {/* 출퇴근 메시지 & 버튼 */}
      <div className="mt-auto flex flex-col gap-2">
        {clockMessage && <div className="text-center py-2 text-[#006D2C]">{clockMessage}</div>}

        {!isWorking ? (
          <button
            onClick={handleClockIn}
=======
      {/* 출퇴근 버튼 */}
      <div className="mt-auto flex flex-col gap-2">
        {!isWorking && ( // 출근 상태가 아니면 출근 버튼 보이기
          <button
            onClick={handleClockIn} // 출근하기 클릭 시
>>>>>>> ea512ccf4ad0f9fdec14815a09e742969db97f74
            className="flex items-center justify-center gap-2 bg-[#006D2C] text-white py-2 rounded-full"
          >
            <i className="bi bi-box-arrow-in-right"></i> 출근하기
          </button>
<<<<<<< HEAD
        ) : (
          <button
            onClick={handleClockOut}
            className="flex items-center justify-center gap-2 border-2 border-[#006D2C] text-[#006D2C] py-2 rounded-full"
          >
            <i className="bi bi-box-arrow-left"></i> 퇴근하기
          </button>
=======
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
>>>>>>> ea512ccf4ad0f9fdec14815a09e742969db97f74
        )}
      </div>
    </div>
  );
};

<<<<<<< HEAD
export default Sidebar;
=======
export default Sidebar;
>>>>>>> ea512ccf4ad0f9fdec14815a09e742969db97f74
