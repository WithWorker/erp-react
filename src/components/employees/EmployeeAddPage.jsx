import React, { useState } from 'react';
import Sidebar from '../include/Sidebar';
import Header from '../include/Header';
import DepartmentDropdown from '../employees/DepartmentDropdown';
import PositionDropdown from '../employees/PositionDropdown';

const departmentMap = {
  '전체보기': null,
  '개발': 1,
  '경영': 2,
  '디자인': 3,
  '보안': 4,
  '영업': 5,
  '인사': 6,
};

const positionMap = {
  '전체보기': null,
  '부서장': 1,
  '사원': 2,
  '이사': 3,
  '인턴': 4,
  '팀장': 5,
  '회장': 6,
};

const EmployeeAddPage = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [departmentId, setDepartmentId] = useState('');
  const [positionId, setPositionId] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handlePositionSelect = (positionKey) => {
    const positionId = positionMap[positionKey];
    setPositionId(positionId);
    console.log(positionId);
  };

  const handleDepartmentSelect = (departmentKey) => {
    const departmentId = departmentMap[departmentKey];
    setDepartmentId(departmentId);
    console.log(departmentId);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
  };

  const handleSubmit = async () => {
    try {
      // 이미지 업로드가 필요하다면 여기에 호출
      // const imgUrl = await uploadImage(); // 이미지 업로드 후 URL 받기 (아직 구현 안됨)

      const requestData = {
        name,
        phone,
        email,
        password,
        departmentId,
        positionId,
        // imgUrl, // 이미지 업로드 후 받은 경로 저장
      };

      const response = await fetch('/api/join', {  
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("token")}`, 
        },
        body: JSON.stringify(requestData), 
      });

      if (response.ok) {
        alert('직원 등록 성공!');
      } else {
        const errorMessage = await response.text();
        alert(`등록 실패: ${errorMessage}`);
      }
    } catch (error) {
      console.error('등록 오류:', error);
      alert('직원 등록 중 오류 발생');
    }
  };

  const handleClose = () => {
    console.log('닫기 버튼 클릭');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-6">
        <Header />
        <div className="flex w-full space-x-8">
          <div className="flex flex-col space-y-4 w-[350px] p-4 bg-white rounded-2xl shadow-lg h-[550px]">
            <label className="block text-md font-medium text-center">프로필 이미지</label>
            {profileImage ? (
              <img
                src={URL.createObjectURL(profileImage)}
                alt="Selected Profile"
                className="mt-2 w-full h-[180px] rounded-lg object-cover"
              />
            ) : (
              <div className="mt-4 w-full h-[340px] bg-gray-300 rounded-lg flex items-center justify-center">
                <p className="text-sm text-gray-500">이미지를 선택하세요</p>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="border-2 border-gray-300 border-dotted rounded-md w-full py-2 px-3"
            />
          </div>

          <div className="flex-1 space-y-8">
            <div className="w-full h-auto bg-white text-center rounded-3xl p-8 shadow-md mb-8">
              <h1 className="text-lg font-bold">개인정보 추가</h1>
              <div className="flex flex-col space-y-4 items-center mt-4">
                <div className="flex flex-row space-x-4 w-full max-w-[400px]">
                  <div className="flex flex-col space-y-2 w-1/2">
                    <label className="block text-sm font-medium text-left">부서</label>
                    <DepartmentDropdown onSelectDepartment={handleDepartmentSelect} />
                  </div>
                  <div className="flex flex-col space-y-2 w-1/2">
                    <label className="block text-sm font-medium text-left">직급</label>
                    <PositionDropdown onSelectPosition={handlePositionSelect} />
                  </div>
                </div>

                <div className="flex flex-col space-y-2 w-full max-w-[400px]">
                  <label className="block text-sm font-medium text-left">이름</label>
                  <input
                    type="text"
                    className="bg-gray-100 border rounded-md w-full p-2"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="flex flex-col space-y-2 w-full max-w-[400px]">
                  <label className="block text-sm font-medium text-left">전화번호</label>
                  <input
                    type="text"
                    className="bg-gray-100 border rounded-md w-full p-2"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                <div className="flex flex-col space-y-4 w-full max-w-[400px]">
                  <label className="block text-sm font-medium text-left">이메일</label>
                  <input
                    type="email"
                    className="bg-gray-100 border rounded-md w-full p-2"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="flex flex-col space-y-4 w-full max-w-[400px]">
                  <label className="block text-sm font-medium text-left">비밀번호</label>
                  <input
                    type="password"
                    className="bg-gray-100 border rounded-md w-full p-2"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4 space-x-4">
          <button
            onClick={handleSubmit} 
            className="bg-[#006D2C] text-white py-2 rounded-full w-40 text-lg"
          >
            등록하기
          </button>
          <button
            type="button"
            onClick={handleClose}
            className="border-1 border-[#323232] text-[#323232] py-2 mr-4 rounded-full w-40 text-lg"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeAddPage;
