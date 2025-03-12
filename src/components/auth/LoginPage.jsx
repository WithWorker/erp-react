import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LockFill, PersonFill } from 'react-bootstrap-icons';
import axios from 'axios';
import PasswordResetModal from './PasswordResetModal ';

const LoginPage = () => {
  const navigate = useNavigate();
  const [tempUser, setTempUser] = useState({
    mem_email: '',
    mem_pw: '',
    mem_phone: '', 
  });

  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);

  const changeUser = (e) => {
    const id = e.currentTarget.id;
    const value = e.target.value;
    setTempUser({ ...tempUser, [id]: value });
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "/api/login",
        {
          email: tempUser.mem_email,
          password: tempUser.mem_pw,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      // JWT 토큰 추출
      const token = response.headers["authorization"]?.split(" ")[1];
      if (token) {
        const payload = JSON.parse(atob(token.split(".")[1])); 
        const empId = payload.empId; 
  
        localStorage.setItem("token", token);
        localStorage.setItem("empId", empId); 
  
        navigate("/dashboard");
      } else {
        setError("토큰이 없습니다.");
      }
    } catch (err) {
      console.error("로그인 오류:", err);
      setError("아이디 또는 비밀번호가 틀렸습니다.");
    }
  };
  

  const handleForgotPassword = () => {
    setShowModal(true); 
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="flex flex-col h-screen items-center justify-center bg-gray-100">
      <div className="text-center mb-10">
        <h1 className="text-[#006D2C] text-4xl font-bold">WW</h1>
        <p className="text-[#323232]">함께 성장하는 단 하나의 시스템</p>
      </div>
      <div className="bg-white p-12 rounded-[2rem] shadow-lg w-[32rem] h-[22rem]">
        <div className="mb-4">
          <label className="block text-[#323232]">이메일</label>
          <div className="relative">
            <PersonFill className="absolute left-3 top-3 text-gray-400" />
            <input
              type="email"
              id="mem_email"
              className="w-full !pl-10 p-2 border rounded-lg"
              placeholder="이메일을 입력하세요."
              onChange={changeUser}
              value={tempUser.mem_email}
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-[#323232]">비밀번호</label>
          <div className="relative">
            <LockFill className="absolute left-3 top-3 text-gray-400" />
            <input
              type="password"
              id="mem_pw"
              className="w-full !pl-10 p-2 border rounded-lg"
              placeholder="비밀번호를 입력하세요."
              onChange={changeUser}
              value={tempUser.mem_pw}
            />
          </div>
        </div>
        <div className="flex items-center justify-between mb-6">
          <button
            className="text-sm text-[#006D2C] hover:text-[#004B1D]"
            onClick={handleForgotPassword}
          >
            비밀번호 찾기
          </button>
        </div>

        <button
          className="w-full bg-[#006D2C] text-white p-2 rounded-lg hover:bg-[#004B1D]"
          onClick={handleLogin}
        >
          로그인
        </button>

        {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
      </div>

      {/* 비밀번호 재설정 모달 */}
      <PasswordResetModal showModal={showModal} closeModal={closeModal} />
    </div>
  );
};

export default LoginPage;
