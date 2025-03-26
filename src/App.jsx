<<<<<<< HEAD
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/auth/LoginPage";
import DashBoardPage from "./components/pages/DashBoardPage";
import ChatPage from "./components/messenger/ChatPage"; 
import AlarmPage from "./components/alarm/AlarmPage";
=======
// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/auth/LoginPage';
import CalendarPage from './components/pages/calendarPage/CalendarPage';
import DashBoardPage from './components/pages/DashBoardPage';
import CalendarWritePage from './components/pages/calendarPage/CalendarWritePage';
import EventDetailPage from './components/pages/calendarPage/EventDetailPage';
import EmployeeListPage from './components/pages/employeePage/EmployeeListPage';
import ChatPage from './components/pages/ChatPage';
import AlarmPage from './components/pages/AlarmPage';

>>>>>>> ea512ccf4ad0f9fdec14815a09e742969db97f74
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashBoardPage />} />
<<<<<<< HEAD
        <Route path="/mypage" element={<div>마이페이지</div>} />
        <Route path="/messenger" element={<ChatPage />} /> 
        <Route path="/alarm" element={<AlarmPage />} />
=======
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/write" element={<CalendarWritePage />} />
        <Route path="/event/:id" element={<EventDetailPage />} />
        <Route path="/vacation" element={<div>휴가 페이지</div>} />
        <Route path="/board" element={<div>게시판 페이지</div>} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/alarm" element={<AlarmPage />} />
        <Route path="/employees" element={<EmployeeListPage />} />
        <Route path="/mypage" element={<div>마이페이지</div>} />
>>>>>>> ea512ccf4ad0f9fdec14815a09e742969db97f74
      </Routes>
    </Router>
  );
}

export default App;
