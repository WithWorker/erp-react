import { useState, useEffect } from "react";
import { BsGrid, BsCalendar, BsTree, BsFileText, BsChat, BsPerson } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { CheckCircle } from "react-bootstrap-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../assets/modal.css";

const Sidebar = () => {
  const navigate = useNavigate();
  const [isWorking, setIsWorking] = useState(false);
  const [empId, setEmpId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  // 관리자 역할 확인
  const isAdmin = localStorage.getItem("role") === "ADMIN";

  useEffect(() => {
    const storedEmpId = localStorage.getItem("empId");
    if (storedEmpId) {
      setEmpId(storedEmpId);
    }

    // 📌 localStorage에서 출근 상태 가져오기
    const workingStatus = localStorage.getItem("isWorking");
    setIsWorking(workingStatus === "true"); // "true" 문자열을 boolean으로 변환
  }, []);

  // 알림 모달 표시 함수
  const showNotificationModal = (message) => {
    setModalMessage(message);
    setShowModal(true);
    setTimeout(() => setShowModal(false), 2000); // 2초 후 자동 닫힘
  };

  // 출근 요청
  const handleClockIn = async () => {
    if (!empId) {
      showNotificationModal("로그인이 필요합니다.");
      return;
    }

    try {
      const response = await fetch(`/api/attendance/in/${empId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) throw new Error("출근 기록 실패");

      const message = await response.text();
      showNotificationModal(message);

      // 📌 출근 상태를 localStorage에 저장
      localStorage.setItem("isWorking", "true");
      setIsWorking(true);

      if (window.location.pathname === "/info") {
        setTimeout(() => window.location.reload(), 2000);
      }
    } catch (error) {
      console.error("출근 오류:", error);
      showNotificationModal("출근 기록에 실패했습니다.");
    }
  };

  // 퇴근 요청
  const handleClockOut = async () => {
    if (!empId) {
      showNotificationModal("로그인이 필요합니다.");
      return;
    }

    try {
      const response = await fetch(`/api/attendance/out/${empId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) throw new Error("퇴근 기록 실패");

      const message = await response.text();
      showNotificationModal(message);

      // 📌 퇴근 상태를 localStorage에 저장
      localStorage.setItem("isWorking", "false");
      setIsWorking(false);

      if (window.location.pathname === "/info") {
        setTimeout(() => window.location.reload(), 2000);
      }
    } catch (error) {
      console.error("퇴근 오류:", error);
      showNotificationModal("퇴근 기록에 실패했습니다.");
    }
  };

    // 메뉴 목록
    const menuItems = [
      { name: "DashBoard", icon: BsGrid, path: "/dashboard" },
      { name: "MyPage", icon: BsPerson, path: "/info" },
      { name: "캘린더", icon: BsCalendar, path: "/calendar" },
      { name: "휴가", icon: BsTree, path: "/approval" },
      { name: "채팅", icon: BsChat, path: "/chat" },
      { name: "직원조회", icon: BsPerson, path: "/employees" },
      ...(isAdmin ? [{ name: "직원등록", icon: BsPerson, path: "/join" }] : []), // 관리자일 때만 "직원등록" 메뉴 추가
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
            <menu.icon
              className={`${menu.name === "직원등록" ? "text-[#006D2C]" : "text-gray-600"}`} // "직원등록" 아이콘만 색상 변경
            />
            <span className={`${menu.name === "직원등록" ? "text-[#006D2C]" : "text-gray-600"}`}>
              {menu.name}
            </span>
          </div>
        ))}
      </nav>

      {/* 출퇴근 버튼 */}
      <div className="mt-auto flex flex-col gap-2">
        {!isWorking ? (
          <button
            onClick={handleClockIn}
            className="flex items-center justify-center gap-2 bg-[#006D2C] text-white py-2 rounded-full shadow-md hover:bg-[#005024] transition"
          >
            <i className="bi bi-box-arrow-in-right"></i> 출근하기
          </button>
        ) : (
          <button
            onClick={handleClockOut}
            className="flex items-center justify-center gap-2 border-2 border-[#006D2C] text-[#006D2C] py-2 rounded-full shadow-md hover:bg-gray-100 transition"
          >
            <i className="bi bi-box-arrow-left"></i> 퇴근하기
          </button>
        )}
      </div>

      {/* 알림 모달 */}
      <Modal
  show={showModal}
  onHide={() => setShowModal(false)}
  centered
  dialogClassName="custom-square-modal"
>
  <Modal.Body className="flex flex-col items-center justify-center">
    <CheckCircle className="text-green-500 text-4xl mb-2" />
    <p className="text-lg font-medium text-center">{modalMessage}</p>
  </Modal.Body>
</Modal>

    </div>
  );
};

export default Sidebar;
