import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashBoardPage from './components/pages/DashBoardPage';
import CalendarPage from './components/calendar/CalendarPage';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<DashBoardPage />} />
        <Route path="/mypage" element={<div>마이페이지</div>} />
        <Route path="/calendar" element={<CalendarPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
