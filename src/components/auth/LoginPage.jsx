import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LockFill, PersonFill } from 'react-bootstrap-icons';
import axios from 'axios';

const LoginPage = () => {
  const navigate = useNavigate();
  const [tempUser, setTempUser] = useState({
    mem_email: '',
    mem_pw: ''
  });

  const [error, setError] = useState('');

  const changeUser = (e) => {
    const id = e.currentTarget.id;
    const value = e.target.value;
    setTempUser({ ...tempUser, [id]: value });
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post("/api/login", {
        email: tempUser.mem_email,  
        password: tempUser.mem_pw
      }, {
        headers: {
          'Content-Type': 'application/json', 
        }
      });

      console.log('로그인 성공:', response.data);
      localStorage.setItem('token', response.data.token);

      navigate('/dashboard');
    } catch (err) {
      setError('아이디 또는 비밀번호가 틀렸습니다.');
    }
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
    </div>
  );
};

export default LoginPage;
