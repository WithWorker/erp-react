import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/auth/LoginPage';
import DashBoardPage from './components/pages/DashBoardPage';
import CalendarPage from './components/calendar/CalendarPage';
import CalendarWrite from './components/calendar/CalendarWrite';
import CalendarDetail from './components/calendar/CalendarDetail';
import CalendarEdit from './components/calendar/CalendarEdit';
import ApprovalPage from './components/approval/ApprovalPage';
import ApprovalDetail from './components/approval/ApprovalDetail';
import ApprovalWrite from './components/approval/ApprovalWrite';
import ApprovalEdit from './components/approval/ApprovalEdit';
import EmployeeListPage from './components/employees/EmployeeListPage';
import EmployeeAddPage from './components/employees/EmployeeAddPage';
import EmployeeEditPage from './components/employees/EmployeeEditPage';
import MyPage from './components/mypage/MyPage';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashBoardPage />} />
        <Route path="/user/employees" element={<EmployeeListPage />} />
        <Route path="/admin/join" element={<EmployeeAddPage />} />
        <Route path="/admin/update/:id" element={<EmployeeEditPage />} />
        <Route path="/user/info" element={<MyPage/>} />
        <Route path="/calendar" element={<CalendarPage/>} />
        <Route path="/calendar/:calendarId" element={<CalendarDetail/>} />
        <Route path="/calendar/add" element={<CalendarWrite/>} />
        <Route path="/calendar/edit/:calendarId" element={<CalendarEdit/>} />
        <Route path="/approval" element={<ApprovalPage/>} />
        <Route path="/approval/:approvalId" element={<ApprovalDetail/>} />
        <Route path="/approval/add" element={<ApprovalWrite/>} />
        <Route path="/approval/edit/:approvalId" element={<ApprovalEdit/>} />
      </Routes>
    </Router>
  );
}

export default App;
