import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react"; // 플러스 아이콘 추가
import Sidebar from "../include/Sidebar";
import Header from "../include/Header";
import WeeklyCalendar from "./WeeklyCalendar";
import { useEffect, useState } from "react";
import { getApplicant } from "../../service/approvalLogic";

const Dashboard = () => {
  const navigate = useNavigate();

  const applicantId = 1; // 특정 사용자의 ID (임시 값)

  // // 결재 목록 (예제 데이터)
  // const approvals = [
  //   { id: 1, title: "보고서 결재 요청" },
  //   { id: 2, title: "휴가 신청 승인" },
  //   { id: 3, title: "예산안 검토" },
  //   { id: 4, title: "프로젝트 승인 요청" }, // 이 항목은 표시되지 않음
  // ];

  // 알림 목록 (예제 데이터)
  const notifications = [
    { id: 1, message: "프로젝트 미팅이 다가오고 있습니다." },
    { id: 2, message: "휴가 신청서가 승인되었습니다." },
    { id: 3, message: "예산안 검토 마감일이 다가옵니다." },
  ];

   // 실시간 시간을 위한 상태 변수
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  // 결재 목록
  const [approvals, setApprovals] = useState([]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    const fetchapprovals = async () => {
      try {
        const response = await getApplicant(applicantId);
        console.log(response);
        setApprovals(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };   
    fetchapprovals();

     // 컴포넌트가 언마운트 될 때 setInterval을 정리해줌
    return () =>  clearInterval(intervalId);

  }, [applicantId]);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />

      <div className="flex flex-col flex-1">
        <Header />

        <main className="p-6 grid grid-cols-12 gap-6">
          {/* 출퇴근 체크 */}
          <div className="col-span-4 bg-white p-6 rounded-2xl shadow-md flex flex-col items-center">
            <img
              src="/src/assets/default.jpg"
              alt="User"
              className="w-30 h-30 rounded-full mb-3"
            />
            <p className="text-[#006D2C] font-semibold text-lg">{currentTime}</p>
            <button className="mt-3 bg-[#006D2C] text-white px-6 py-3 rounded-lg shadow-md 
                              hover:bg-green-600 transition-all">
              퇴근 체크하기
            </button>
          </div>

          {/* 내 결재함 */}
          <div className="col-span-4 bg-white p-6 rounded-2xl shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-center w-full">📝 내 결재함</h2>
              <button
                className="bg-[#006D2C] text-white p-2 rounded-full shadow-md hover:bg-green-600 transition-all"
                onClick={() => navigate("/approval")}
              >
                <Plus size={20} />
              </button>
            </div>
            <ul className="space-y-3">
              {approvals.slice(0, 4).map((approval) => (
                <li key={approval.approvalId} className="p-3 bg-gray-100 rounded-lg" onClick={() => navigate(`/approval/${approval.approvalId}`)}>
                  <span className="font-medium text-gray-800">{approval.title}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 알림함 */}
          <div className="col-span-4 bg-white p-6 rounded-2xl shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-center w-full">🔔 알림함</h2>
              <button
                className="bg-[#006D2C] text-white p-2 rounded-full shadow-md hover:bg-green-600 transition-all"
                onClick={() => navigate("/notifications")}
              >
                <Plus size={20} />
              </button>
            </div>
            <ul className="space-y-3">
              {notifications.slice(0, 3).map((notification) => (
                <li key={notification.id} className="p-3 bg-gray-100 rounded-lg">
                  <span className="font-medium text-gray-800">{notification.message}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 일주일 일정 캘린더 */}
          <div className="col-span-12 bg-white p-6 rounded-2xl shadow-md">
            <h2 className="text-xl font-bold mb-4 text-center">📅 주간 일정</h2>
            <WeeklyCalendar />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;