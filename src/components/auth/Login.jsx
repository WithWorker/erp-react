import React, { useState } from 'react'
import { DividerDiv, DividerHr, DividerSpan, LoginForm, MyH1, MyInput, MyLabel, MyP, SubmitButton } from '../../styles/FormStyles';
import { Link } from 'react-router';

const Login = () => {
  const [tempUser, setTempUser] = useState({
    mem_email: '',
    mem_pw: ''
  })
  const [submitBtn, setSubmitBtn] = useState({
    disabled: true,
    bgColor: 'rgb(175, 210, 244)',
    hover: false
  })

  const changeUser = (e) => {
    const id = e.currentTarget.id 
    const value = e.target.value 
    setTempUser({...tempUser, [id]:value})
  }

  const toggleHover = () => {
    if(submitBtn.hover){
      setSubmitBtn({...submitBtn, hover: false, bgColor:'rgb(105, 175, 245'})
    }else{
      setSubmitBtn({...submitBtn, hover: true, bgColor:'rgb(58, 129, 200'})
    }
  }

  return (
    <>
        <LoginForm>
          <MyH1>로그인</MyH1>
          <MyLabel htmlFor="email"> 이메일     
              <MyInput type="email" id="mem_email" name="mem_email" placeholder="이메일을 입력해주세요." 
              onChange={(e)=>changeUser(e)}/>   
          </MyLabel>
          <MyLabel htmlFor="password"> 비밀번호
              <MyInput type="password" autoComplete="off" id="mem_pw" name="mem_password" placeholder="비밀번호를 입력해주세요."
              onChange={(e)=>changeUser(e)}/>
          </MyLabel>
          <SubmitButton type="button" style={{backgroundColor:submitBtn.bgColor}}  
              onMouseEnter={toggleHover} onMouseLeave={toggleHover}>
              로그인
          </SubmitButton>
          <DividerDiv>
              <DividerHr />
              <DividerSpan></DividerSpan>
          </DividerDiv>
          <MyP>비밀번호를 잊으셨나요?&nbsp;
          <Link to="/find" style={{color: "blue", background: "none", border: "none", cursor: "pointer"}}>
            비밀번호 변경
          </Link></MyP>
        </LoginForm> 
    </>
  )
}

export default Login
