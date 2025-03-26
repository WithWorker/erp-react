import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/auth/LoginPage";
import DashBoardPage from "./components/pages/DashBoardPage";
import ChatPage from "./components/messenger/ChatPage"; 
import AlarmPage from "./components/alarm/AlarmPage";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashBoardPage />} />
        <Route path="/mypage" element={<div>마이페이지</div>} />
        <Route path="/messenger" element={<ChatPage />} /> 
        <Route path="/alarm" element={<AlarmPage />} />
      </Routes>
    </Router>
  );
}

export default App;
