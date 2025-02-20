import React, { useState } from 'react'
import { DividerDiv, DividerHr, DividerSpan, LoginForm, MyH1, MyInput, MyLabel, MyP, PwEye, SubmitButton } from '../../styles/FormStyles';
import { Link, useNavigate } from 'react-router';

const LoginPage = () => {
  const navigate = useNavigate()

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

  const [passwordType, setPasswordType] = useState({
    type: "password",
    visible: false
  })

  const passwordView = (e) => {
    const id = e.currentTarget.id
    if(id === "password"){
      if(!passwordType.visible){
        setPasswordType({...passwordType, type:'text', visible: true})
      }else{
        setPasswordType({...passwordType, type:'password', visible: false})
      }
    }
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
          <MyInput type="email" id="mem_email" name="mem_email" placeholder="이메일를 입력해주세요." 
          onChange={(e)=>changeUser(e)}/>   
      </MyLabel>
      <MyLabel htmlFor="password"> 비밀번호
          <MyInput type={passwordType.type} autoComplete="off" id="mem_pw" name="mem_password" placeholder="비밀번호를 입력해주세요."
          onChange={(e)=>changeUser(e)}/>
          <div id="password" onClick={(e)=> {passwordView(e)}} style={{color: `${passwordType.visible?"gray":"lightgray"}`}}>
          <PwEye className="fa fa-eye fa-lg"></PwEye>
          </div>
      </MyLabel>
      <SubmitButton type="button" style={{backgroundColor:submitBtn.bgColor}}  
          onMouseEnter={toggleHover} onMouseLeave={toggleHover}>
          로그인
      </SubmitButton>
      <DividerDiv>
          <DividerHr />
          <DividerSpan>또는</DividerSpan>
      </DividerDiv>
      <MyP>비밀번호를 잊으셨나요?&nbsp;
      <Link to={`${import.meta.env.VITE_SPRING_IP}find`} className="text-decoration-none" style={{color: "blue"}}>비밀번호 변경</Link></MyP>
      </LoginForm>       
    </>
  )
}

export default LoginPage