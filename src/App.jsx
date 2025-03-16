import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashBoardPage from './components/pages/DashBoardPage';
import CalendarPage from './components/calendar/CalendarPage';
import CalendarWrite from './components/calendar/CalendarWrite';
import CalendarDetail from './components/calendar/CalendarDetail';
import CalendarEdit from './components/calendar/CalendarEdit';
import ApprovalPage from './components/approval/ApprovalPage';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<DashBoardPage />} />
        <Route path="/mypage" element={<div>마이페이지</div>} />
        <Route path="/calendar" element={<CalendarPage/>} />
        <Route path="/calendar/:calendarId" element={<CalendarDetail/>} />
        <Route path="/calendar/add" element={<CalendarWrite/>} />
        <Route path="/calendar/edit/:calendarId" element={<CalendarEdit/>} />
        <Route path="/approval" element={<ApprovalPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
