import React, { useState } from 'react';
import Sidebar from '../include/Sidebar';
import Header from '../include/Header';
import DepartmentDropdown from '../employees/DepartmentDropdown';
import PositionDropdown from '../employees/PositionDropdown';

const EmployeeAddPage = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [departmentId, setDepartmentId] = useState('');
  const [positionId, setPositionId] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 이미지 업로드 핸들러
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
  };

  // 부서 선택 핸들러
  const handleDepartmentSelect = (selectedDept) => {
    setDepartmentId(selectedDept.value); // 부서 ID만 상태에 저장
  };

  // 직급 선택 핸들러
  const handlePositionSelect = (selectedPosition) => {
    setPositionId(selectedPosition.value); // 직급 ID만 상태에 저장
  };

  // 직원 등록 요청
  const handleSubmit = async () => {
    if (!name || !email || !password || !departmentId || !positionId) {
      alert('필수 정보를 입력해주세요.');
      return;
    }

    let imgUrl = '';
    if (profileImage) {
      const reader = new FileReader();
      reader.readAsDataURL(profileImage);
      reader.onloadend = async () => {
        imgUrl = reader.result; // Base64 인코딩된 이미지 데이터

        const requestData = {
          name,
          phone,
          email,
          password,
          departmentId,
          positionId,
          imgUrl,
        };

        try {
          const response = await fetch('api/join', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
          });

          if (response.ok) {
            alert('직원 등록이 완료되었습니다.');
          } else {
            alert('직원 등록 실패');
          }
        } catch (error) {
          console.error('직원 등록 오류:', error);
        }
      };
    } else {
      // 이미지가 없을 경우 바로 요청
      const requestData = {
        name,
        phone,
        email,
        password,
        departmentId,
        positionId,
        imgUrl: null,
      };

      try {
        const response = await fetch('api/join', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData),
        });

        if (response.ok) {
          alert('직원 등록이 완료되었습니다.');
        } else {
          alert('직원 등록 실패');
        }
      } catch (error) {
        console.error('직원 등록 오류:', error);
      }
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-6">
        <Header />
        <div>
          <div className="flex w-full space-x-8">
            <div className="flex flex-col space-y-4 w-[350px] p-4 bg-white rounded-2xl shadow-lg h-[550px]">
              <label className="block text-lg font-bold text-center">프로필 이미지</label>
              {profileImage ? (
                <div className="mt-2">
                  <img
                    src={URL.createObjectURL(profileImage)}
                    alt="Selected Profile"
                    className="mt-2 w-full h-[180px] rounded-lg object-cover"
                  />
                  <p className="mt-2 text-sm text-gray-500">{profileImage.name}</p>
                </div>
              ) : (
                <div className="mt-4 w-full h-[390px] bg-gray-300 rounded-lg flex items-center justify-center">
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
                      <DepartmentDropdown
                        onSelectDepartment={handleDepartmentSelect} // 부서 선택 시 id 전달
                      />
                    </div>
                    <div className="flex flex-col space-y-2 w-1/2">
                      <label className="block text-sm font-medium text-left">직급</label>
                      <PositionDropdown
                        onSelectCategory={handlePositionSelect} // 직급 선택 시 id 전달
                      />
                    </div>
                  </div>

                  <div className="flex flex-col space-y-2 w-full max-w-[400px]">
                    <label className="block text-sm font-medium text-left">이름</label>
                    <input
                      type="text"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-gray-100 border rounded-md w-full p-2"
                      required
                    />
                  </div>

                  <div className="flex flex-col space-y-2 w-full max-w-[400px]">
                    <label className="block text-sm font-medium text-left">전화번호</label>
                    <input
                      type="text"
                      name="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="bg-gray-100 border rounded-md w-full p-2"
                    />
                  </div>

                  <div className="flex flex-col space-y-4 w-full max-w-[400px]">
                    <label className="block text-sm font-medium text-left">이메일</label>
                    <input
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-gray-100 border rounded-md w-full p-2"
                    />
                  </div>

                  <div className="flex flex-col space-y-4 w-full max-w-[400px]">
                    <label className="block text-sm font-medium text-left">비밀번호</label>
                    <input
                      type="password"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-gray-100 border rounded-md w-full p-2"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 버튼 */}
          <div className="flex justify-end pt-4 space-x-4">
            <button
              type="button"
              onClick={handleSubmit}
              className="bg-[#006D2C] text-white py-2 rounded-full w-40 text-lg"
            >
              등록하기
            </button>
            <button
              type="button"
              onClick={() => console.log('닫기 버튼 클릭')}
              className="border-1 border-[#323232] text-[#323232] py-2 mr-4 rounded-full w-40 text-lg"
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeAddPage;
