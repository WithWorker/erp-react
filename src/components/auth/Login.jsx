import React, { useState } from 'react';
import axios from 'axios';
import { DividerDiv, DividerHr, DividerSpan, LoginForm, MyH1, MyInput, MyLabel, MyP, SubmitButton } from '../../styles/FormStyles';
import { Link } from 'react-router';

const Login = () => {
  const [tempUser, setTempUser] = useState({
    mem_email: '',
    mem_pw: ''
  });

  const [submitBtn, setSubmitBtn] = useState({
    disabled: true,
    bgColor: 'rgb(175, 210, 244)',
    hover: false
  });

  const [error, setError] = useState(''); // 로그인 에러 메시지 상태 추가

  const changeUser = (e) => {
    const id = e.currentTarget.id;
    const value = e.target.value;
    setTempUser({ ...tempUser, [id]: value });
  };

  const toggleHover = () => {
    if (submitBtn.hover) {
      setSubmitBtn({ ...submitBtn, hover: false, bgColor: 'rgb(105, 175, 245)' });
    } else {
      setSubmitBtn({ ...submitBtn, hover: true, bgColor: 'rgb(58, 129, 200)' });
    }
  };

  const handleSubmit = async () => {
    try {
      // 서버로 로그인 정보 보내기 (axios POST 요청)
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/login`, {
        username: tempUser.mem_email,
        password: tempUser.mem_pw
      });

      // 로그인 성공 시 처리 (예: 토큰 저장, 리디렉션 등)
      console.log('로그인 성공:', response.data);
      // 예를 들어, 토큰을 로컬스토리지에 저장
      localStorage.setItem('token', response.data.token);

      // 로그인 성공 후 다른 페이지로 이동
      window.location.href = '/home'; // 또는 리액트 라우터를 사용할 수 있습니다.

    } catch (err) {
      // 로그인 실패 시 에러 처리
      setError('아이디 또는 비밀번호가 틀렸습니다.');
    }
  };

  return (
    <>
      <LoginForm>
        <MyH1>로그인</MyH1>
        <MyLabel htmlFor="email">
          이메일
          <MyInput
            type="email"
            id="mem_email"
            name="mem_email"
            placeholder="이메일을 입력해주세요."
            onChange={(e) => changeUser(e)}
            value={tempUser.mem_email}
          />
        </MyLabel>
        <MyLabel htmlFor="password">
          비밀번호
          <MyInput
            type="password"
            autoComplete="off"
            id="mem_pw"
            name="mem_pw"
            placeholder="비밀번호를 입력해주세요."
            onChange={(e) => changeUser(e)}
            value={tempUser.mem_pw}
          />
        </MyLabel>
        <SubmitButton
          type="button"
          style={{ backgroundColor: submitBtn.bgColor }}
          onMouseEnter={toggleHover}
          onMouseLeave={toggleHover}
          onClick={handleSubmit}
        >
          로그인
        </SubmitButton>
        {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>} {/* 에러 메시지 출력 */}

        <DividerDiv>
          <DividerHr />
          <DividerSpan></DividerSpan>
        </DividerDiv>
        <MyP>
          비밀번호를 잊으셨나요?&nbsp;
          <Link
            to="/find"
            style={{ color: 'blue', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            비밀번호 변경
          </Link>
        </MyP>
      </LoginForm>
    </>
  );
};

export default Login;
