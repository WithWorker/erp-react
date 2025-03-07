import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setEmail, setPassword, login } from '../../redux/slice/authSlice';
import { LockFill, PersonFill } from 'react-bootstrap-icons';
import axios from 'axios';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 상태가 undefined일 때 빈 문자열로 초기화
  const email = useSelector((state) => state.auth.email || '');
  const password = useSelector((state) => state.auth.password || '');
  const [rememberMe, setRememberMe] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleEmailChange = (e) => {
    dispatch(setEmail(e.target.value));
  };

  const handlePasswordChange = (e) => {
    dispatch(setPassword(e.target.value));
  };

  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
    if (e.target.checked) {
      localStorage.setItem('email', email);
      localStorage.setItem('password', password);
    } else {
      localStorage.removeItem('email');
      localStorage.removeItem('password');
    }
  };

  // 로그인 함수
  const handleLogin = async () => {
    try {
      const response = await dispatch(login({ email, password })).unwrap();
      if (response.token) {
        // 로그인 성공 시 JWT 토큰을 localStorage에 저장
        localStorage.setItem('authToken', response.token);

        // axios 기본 헤더에 Authorization 추가
        axios.defaults.headers['Authorization'] = `Bearer ${response.token}`;

        alert('로그인 성공');
        navigate('/dashboard'); // 대시보드 페이지로 이동
      }
    } catch (err) {
      alert('아이디 또는 비밀번호가 잘못되었습니다.');
    }
  };

  const handleForgotPassword = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    const savedEmail = localStorage.getItem('email');
    if (savedEmail) {
      dispatch(setEmail(savedEmail));
    }
  }, [dispatch]);

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
              type="text"
              className="w-full !pl-10 p-2 border rounded-lg"
              placeholder="이메일을 입력하세요."
              value={email}
              onChange={handleEmailChange}
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-[#323232]">비밀번호</label>
          <div className="relative">
            <LockFill className="absolute left-3 top-3 text-gray-400" />
            <input
              type="password"
              className="w-full !pl-10 p-2 border rounded-lg"
              placeholder="비밀번호를 입력하세요."
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
        </div>
        <div className="flex items-center justify-between mb-6">
          <label className="text-[#323232] flex items-center text-sm">
            <input
              type="checkbox"
              className="mr-2"
              checked={rememberMe}
              onChange={handleRememberMeChange}
            />
            ID 기억하기
          </label>
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
      </div>

      {/* 비밀번호 찾기 모달 */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-7 rounded-lg w-88">
            <h2 className="text-[#323232] text-center text-lg font-semibold">비밀번호 찾기</h2>
            <p className="mb-3 text-gray-400 text-center text-sm">비밀번호를 재설정하려면 이메일을 입력해주세요.</p>
            <input
              type="email"
              className="w-full p-2 border rounded-lg mb-3"
              placeholder="이메일을 입력하세요."
            />
            <div className="flex justify-between gap-2">
              <button
                className="text-white bg-gray-400 p-2 w-32 rounded-lg hover:bg-[#323232]"
                onClick={closeModal}
              >
                닫기
              </button>
              <button
                className="text-white bg-[#006D2C] p-2 w-32 rounded-lg hover:bg-[#004B1D]"
                onClick={closeModal}
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
