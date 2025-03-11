import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/auth/LoginPage';
import DashBoardPage from './components/pages/DashBoardPage';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashBoardPage />} />
        <Route path="/users" element={<div>사원 조회 페이지</div>} />
        <Route path="/info" element={<div>마이페이지</div>} />
      </Routes>
    </Router>
  );
}

export default App;
