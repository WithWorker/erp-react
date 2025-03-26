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
import ChatPage from './components/messenger/ChatPage'; 
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
        <Route path="/user/calendar" element={<CalendarPage/>} />
        <Route path="/user/calendar/:calendarId" element={<CalendarDetail/>} />
        <Route path="/user/calendar/add" element={<CalendarWrite/>} />
        <Route path="/user/calendar/edit/:calendarId" element={<CalendarEdit/>} />
        <Route path="/user/approval" element={<ApprovalPage/>} />
        <Route path="/user/approval/:approvalId" element={<ApprovalDetail/>} />
        <Route path="/user/approval/add" element={<ApprovalWrite/>} />
        <Route path="/user/approval/edit/:approvalId" element={<ApprovalEdit/>} />
        <Route path="/user/messenger" element={<ChatPage />} />
      </Routes>
    </Router>
  );
}

export default App;
