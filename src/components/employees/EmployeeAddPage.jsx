import React, { useState } from 'react';
import Sidebar from '../include/Sidebar';
import Header from '../include/Header';
import DepartmentDropdown from '../employees/DepartmentDropdown';
import PositionDropdown from '../employees/PositionDropdown';
import categoryDepartment from '../../utils/categoryDepartment';
import categoryPosition from '../../utils/categoryPosition';

const EmployeeAddPage = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [departmentId, setDepartmentId] = useState('');
  const [positionId, setPositionId] = useState('');

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      profileImage,
      departmentId,
      positionId,
    };
    console.log('직원 추가:', data);
  };

  const handlePositionSelect = (value, id) => {
    setPositionId(id);
  };

  const handleDepartmentSelect = (value, id) => {
    setDepartmentId(id);
  };

  const handleClose = () => {
    console.log('닫기 버튼 클릭');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-6">
        <Header />
        <div>
          <form onSubmit={handleSubmit} className="flex w-full space-x-8">
            <div className="flex flex-col space-y-4 w-[350px] p-4 bg-white rounded-2xl shadow-lg h-[550px]">
              <label className="block text-md font-medium text-center">프로필 이미지</label>
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
                      <DepartmentDropdown
                        items={categoryDepartment}
                        onSelectCategory={handleDepartmentSelect}
                      />
                    </div>
                    <div className="flex flex-col space-y-2 w-1/2">
                      <label className="block text-sm font-medium text-left">직급</label>
                      <PositionDropdown
                        items={categoryPosition}
                        onSelectCategory={handlePositionSelect}
                      />
                    </div>
                  </div>
                  <div className="flex flex-row space-x-4 w-full max-w-[400px]">
                    <div className="flex flex-col space-y-2 w-full">
                      <label className="block text-sm font-medium text-left">이름</label>
                      <input
                        type="text"
                        name="name"
                        className="bg-gray-100 border rounded-md w-full p-2"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex flex-row space-x-4 w-full max-w-[400px]">
                    <div className="flex flex-col space-y-2 w-full">
                      <label className="block text-sm font-medium text-left">전화번호</label>
                      <input
                        type="text"
                        name="phone"
                        className="bg-gray-100 border rounded-md w-full p-2"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col space-y-4 w-full max-w-[400px]">
                    <label className="block text-sm font-medium text-left">이메일</label>
                    <input
                      type="email"
                      name="email"
                      className="bg-gray-100 border rounded-md w-full p-2"
                    />
                  </div>

                  <div className="flex flex-col space-y-4 w-full max-w-[400px]">
                    <label className="block text-sm font-medium text-left">비밀번호</label>
                    <input
                      type="password"
                      name="password"
                      className="bg-gray-100 border rounded-md w-full p-2"
                    />
                  </div>
                </div>
              </div>
            </div>
          </form>

          <div className="flex justify-end pt-4 space-x-4">
            <button
              type="submit"
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
    </div>
  );
};

export default EmployeeAddPage;
