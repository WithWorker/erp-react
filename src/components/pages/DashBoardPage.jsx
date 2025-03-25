import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import Sidebar from "../include/Sidebar";
import Header from "../include/Header";
import WeeklyCalendar from "./WeeklyCalendar";
import { useEffect, useState, useRef, useMemo } from "react";
import { getApplicant } from "../../service/approvalLogic";
import { findById, getAllCalendars } from "../../service/calendarLogic";

const Dashboard = () => {
  const navigate = useNavigate();
  const applicantId = localStorage.getItem("empId");

  const timeRef = useRef(null); // useRef를 사용하여 리렌더링 방지

  const notifications = [
    { id: 1, message: "프로젝트 미팅이 다가오고 있습니다." },
    { id: 2, message: "휴가 신청서가 승인되었습니다." },
    { id: 3, message: "예산안 검토 마감일이 다가옵니다." },
  ];

  const [approvals, setApprovals] = useState([]);
  const [events, setEvents] = useState([]);
  const [name, setName] = useState('');
  const [imgUrl, setImgUrl] = useState('');

  // 로그인한 사원의 부서 데이터 가져오기
    useEffect(() => {
      const fetchUserInfo = async () => {
        try {
          const userInfo = await findById();
          setName(userInfo.name);
          setImgUrl(userInfo.imgUrl);
        } catch (error) {
          console.error("사원 정보 불러오기 오류 발생: ", error);
        }
      };
      fetchUserInfo();
      }, []);


  useEffect(() => {
    const updateClock = () => {
      if (timeRef.current) {
        timeRef.current.innerText = new Date().toLocaleTimeString();
      }
    };

    const intervalId = setInterval(updateClock, 1000);
    updateClock(); // 초기 한 번 실행

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const fetchApprovals = async () => {
      try {
        const response = await getApplicant(applicantId);
        setApprovals(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchCalendars = async () => {
      try {
        const response = await getAllCalendars();

        if (!response || !Array.isArray(response)) {
          console.error("유효하지 않은 일정 데이터:", response);
          return;
        }

        const calendarEvents = response
          .map((event) => {
            if (!event.start_date || !event.end_date) {
              console.error("start_date 또는 end_date가 없습니다. 이벤트: ", event);
              return null;
            }

            const startDate = new Date(event.start_date);
            const endDate = new Date(event.end_date);

            if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
              console.error("유효하지 않은 날짜 값: ", event.start_date, event.end_date);
              return null;
            }

            return {
              id: event.calendarId,
              title: event.title,
              start: startDate.toISOString(),
              end: endDate.toISOString(),
              description: event.content,
              extendedProps: {
                applicant: event.memberDto?.name || "알 수 없음",
                dept: event.memberDto?.dept || "알 수 없음",
              },
            };
          })
          .filter((event) => event !== null);

        console.log("일정List 데이터:", calendarEvents);
        setEvents((prevEvents) => {
          const prevString = JSON.stringify(prevEvents);
          const newString = JSON.stringify(calendarEvents);
          return prevString === newString ? prevEvents : calendarEvents;
        });
      } catch (error) {
        console.error("Error fetching calendar data:", error);
      }
    };

    fetchApprovals();
    fetchCalendars();
  }, []);

  // WeeklyCalendar를 memoize하여 불필요한 리렌더링 방지
  const memoizedWeeklyCalendar = useMemo(() => <WeeklyCalendar events={events} />, [events]);

  const moveWeek = (direction) => {
    // 주간 일정 이동 로직을 여기서 구현하세요
    console.log(direction === "prev" ? "이전 주로 이동" : "다음 주로 이동");
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />
        <main className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col items-center">
          <img
          src={`http://localhost:7777/${imgUrl}`} // imgUrl이 없으면 기본 이미지 경로 사용
          alt="User"
          className="w-35 h-35 rounded-full mb-3"
          />
            <p>{name}</p>
            <p ref={timeRef} className="text-[#006D2C] font-semibold text-lg"></p>
        
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold flex-grow text-center">📝 내 결재함</h2>
            <button className="bg-[#006D2C] text-white p-2 rounded-full shadow-md hover:bg-green-600 transition-all" onClick={() => navigate("/approval")}>
              <Plus size={20} />
            </button>
          </div>
          {approvals.length > 0 ? (
            <ul className="space-y-3">
              {approvals.slice(0, 4).map((approval) => (
                <li
                  key={approval.approvalId}
                  className="p-3 bg-gray-100 rounded-lg cursor-pointer"
                  onClick={() => navigate(`/approval/${approval.approvalId}`)}
                >
                  <span className="px-2 py-1 text-sm rounded-xl bg-gray-500 text-white mr-5">
                    {approval.typeName}
                  </span>
                  <span className="font-medium text-gray-800">{approval.title}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-500 mt-4">결재할 문서가 없습니다.</p>
          )}
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold flex-grow text-center">🔔 알림함</h2>
              <button className="bg-[#006D2C] text-white p-2 rounded-full shadow-md hover:bg-green-600 transition-all" onClick={() => navigate("/notifications")}>
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
          <div className="col-span-1 sm:col-span-2 lg:col-span-3 bg-white p-6 rounded-2xl shadow-md">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center justify-center w-full">
                <h2 className="text-xl font-bold">📅 주간 일정</h2>
              </div>
            </div>
            {memoizedWeeklyCalendar}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard; 