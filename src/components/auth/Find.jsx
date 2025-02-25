import React, { useState } from 'react';

const Find = () => {
  const [resetPwdForm, setResetPwdForm] = useState({
    password: '',
    repassword: ''
  });
  const [resetPwdMessage, setResetPwdMessage] = useState(null);

  const handleInputChange = (event, formSetter) => {
    const { name, value } = event.target;
    formSetter((prev) => ({ ...prev, [name]: value }));
  };

  const resetPassword = async () => {
    const { password, repassword } = resetPwdForm;
    if (password !== repassword) {
      alert('비밀번호가 일치하지 않습니다. 다시 입력해주세요.');
      return;
    }

    const response = await fetch("/api/find", {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pwd: password }),
    });

    const result = await response.json();
    if (response.ok) {
      alert(result.message || '비밀번호 재설정에 성공했습니다.');
      window.location.href = '/login';
    } else {
      alert(result.message || '비밀번호 재설정에 실패했습니다.');
      setResetPwdMessage('비밀번호 재설정에 실패했습니다.');
    }
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center">
      <div className="custom-card text-center">
          <div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                resetPassword();
              }}
            >
              <div className="mb-3">
                <label htmlFor="password" className="d-flex me-3 mb-2">새로운 비밀번호</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="form-control flex-grow-1"
                  placeholder="🔒︎ 새로운 비밀번호를 입력하세요"
                  value={resetPwdForm.password}
                  onChange={(e) => handleInputChange(e, setResetPwdForm)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="repassword" className="d-flex me-3 mb-2">비밀번호 재입력</label>
                <input
                  type="password"
                  id="repassword"
                  name="repassword"
                  className="form-control flex-grow-1"
                  placeholder="🔒︎ 비밀번호를 재입력하세요"
                  value={resetPwdForm.repassword}
                  onChange={(e) => handleInputChange(e, setResetPwdForm)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-dark w-100 mb-2">비밀번호 재설정</button>
            </form>
            {resetPwdMessage && (
              <div className="mt-3 text-start text-center">
                <p className="result-box text-danger">{resetPwdMessage}</p>
              </div>
            )}
          </div>
        </div>
    </div>
  );
};

export default Find;
