// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/auth/LoginPage';
import CalendarPage from './components/pages/calendarPage/CalendarPage';
import DashBoardPage from './components/pages/DashBoardPage';
import CalendarWritePage from './components/pages/calendarPage/CalendarWritePage';
import EventDetailPage from './components/pages/calendarPage/EventDetailPage';
import EmployeeListPage from './components/pages/employeePage/EmployeeListPage';
import ChatPage from './components/pages/ChatPage';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashBoardPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/write" element={<CalendarWritePage />} />
        <Route path="/event/:id" element={<EventDetailPage />} />
        <Route path="/vacation" element={<div>휴가 페이지</div>} />
        <Route path="/board" element={<div>게시판 페이지</div>} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/employees" element={<EmployeeListPage />} />
        <Route path="/mypage" element={<div>마이페이지</div>} />
      </Routes>
    </Router>
  );
}

export default App;
