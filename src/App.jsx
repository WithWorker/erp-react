// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/auth/LoginPage';
import CalendarPage from './components/pages/CalendarPage';
import DashBoardPage from './components/pages/DashBoardPage';
import CalendarWritePage from './components/pages/CalendarWritePage';
import EventDetailPage from './components/pages/EventDetailPage';

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
        <Route path="/chat" element={<div>채팅 페이지</div>} />
        <Route path="/employees" element={<div>사원 조회 페이지</div>} />
        <Route path="/mypage" element={<div>마이페이지</div>} />
      </Routes>
    </Router>
  );
}

export default App;
