import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashBoardPage from './components/pages/DashBoardPage';
import CalendarPage from './components/calendar/CalendarPage';
import CalendarWrite from './components/calendar/CalendarWrite';
import CalendarDetail from './components/calendar/CalendarDetail';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<DashBoardPage />} />
        <Route path="/mypage" element={<div>마이페이지</div>} />
        <Route path="/calendar" element={<CalendarPage/>} />
        <Route path="/calendar/detail" element={<CalendarDetail/>} />
        <Route path="/calendar/add" element={<CalendarWrite/>} />
      </Routes>
    </Router>
  );
}

export default App;
