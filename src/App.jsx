import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/auth/LoginPage';
import DashBoardPage from './components/pages/DashBoardPage';
import EmployeeListPage from './components/employees/EmployeeListPage';
import EmployeeAddPage from './components/employees/EmployeeAddPage';
import EmployeeEditPage from './components/employees/EmployeeEditPage';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashBoardPage />} />
        <Route path="/employees" element={<EmployeeListPage />} />
        <Route path="/join" element={<EmployeeAddPage />} />
        <Route path="/update/:id" element={<EmployeeEditPage />} />
        <Route path="/mypage" element={<div>마이페이지</div>} />
      </Routes>
    </Router>
  );
}

export default App;
