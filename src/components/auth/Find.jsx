import React, { useState } from 'react';

const Find = () => {
  const [activeTab, setActiveTab] = useState('findId');
  const [findIdForm, setFindIdForm] = useState({ name: '', phone: '' });
  const [resetPwdForm, setResetPwdForm] = useState({
    email: '',
    name: '',
    phone: '',
    password: '',
    repassword: ''
  });
  const [resetPwdMessage, setResetPwdMessage] = useState(null);

  const handleTabChange = (tab) => setActiveTab(tab);

  const handleInputChange = (event, formSetter) => {
    const { name, value } = event.target;
    formSetter((prev) => ({ ...prev, [name]: value }));
  };

  const resetPassword = async () => {
    const { email, name, phone, password, repassword } = resetPwdForm;
    if (password !== repassword) {
      alert('비밀번호가 일치하지 않습니다. 다시 입력해주세요.');
      return;
    }

    const response = await fetch(`${import.meta.env.VITE_API_URL}/find`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, pwd: password, name, phone }),
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
      <h1 className="h4 mb-4">계정 찾기</h1>
      <div className="custom-card text-center">
        <ul className="nav nav-tabs justify-content-center mb-4" role="tablist">
          <li className="nav-item" role="presentation">
            <button
              className={`nav-link ${activeTab === 'resetPwd' ? 'active' : ''}`}
              onClick={() => handleTabChange('resetPwd')}
            >
              비밀번호 재설정
            </button>
          </li>
        </ul>

        <div className="tab-content">
          {activeTab === 'findId' && (
            <div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  findEmail();
                }}
              >
                <div className="mb-3">
                  <label htmlFor="name" className="d-flex me-3 mb-2">이름</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-control flex-grow-1"
                    placeholder="👤 이름을 입력하세요"
                    value={findIdForm.name}
                    onChange={(e) => handleInputChange(e, setFindIdForm)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="phone" className="d-flex me-3 mb-2">전화번호</label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    className="form-control flex-grow-1"
                    placeholder="☎ 전화번호를 입력하세요"
                    value={findIdForm.phone}
                    onChange={(e) => handleInputChange(e, setFindIdForm)}
                    required
                  />
                </div>
              </form>
            </div>
          )}

          {activeTab === 'resetPwd' && (
            <div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  resetPassword();
                }}
              >
                <div className="mb-3">
                  <label htmlFor="reEmail" className="d-flex me-3 mb-2">이메일</label>
                  <input
                    type="text"
                    id="reEmail"
                    name="email"
                    className="form-control flex-grow-1"
                    placeholder="✉ 이메일을 입력하세요"
                    value={resetPwdForm.email}
                    onChange={(e) => handleInputChange(e, setResetPwdForm)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="reName" className="d-flex me-3 mb-2">이름</label>
                  <input
                    type="text"
                    id="reName"
                    name="name"
                    className="form-control flex-grow-1"
                    placeholder="👤 이름을 입력하세요"
                    value={resetPwdForm.name}
                    onChange={(e) => handleInputChange(e, setResetPwdForm)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="rePhone" className="d-flex me-3 mb-2">전화번호</label>
                  <input
                    type="text"
                    id="rePhone"
                    name="phone"
                    className="form-control flex-grow-1"
                    placeholder="☎ 전화번호를 입력하세요"
                    value={resetPwdForm.phone}
                    onChange={(e) => handleInputChange(e, setResetPwdForm)}
                    required
                  />
                </div>
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
          )}
        </div>
      </div>
    </div>
  );
};

export default Find;
