import React, { useState } from 'react';
import Sidebar from '../include/Sidebar';
import Header from '../include/Header';

const EmployeeAddPage = () => {
const [profileImage, setProfileImage] = useState(null); // 사진 업로드 상태 관리
const [isDropdownOpen, setIsDropdownOpen] = useState(false); // 직급 드롭다운 상태
const [isDepartmentDropdownOpen, setIsDepartmentDropdownOpen] = useState(false); // 부서 드롭다운 상태
const [position, setPosition] = useState(''); // 직급 상태
const [department, setDepartment] = useState(''); // 부서 상태

const handleImageUpload = (e) => {
const file = e.target.files[0];
setProfileImage(file);
};

const handleSubmit = (e) => {
e.preventDefault();
console.log('직원 추가:', { profileImage, position, department });
};

const handlePositionSelect = (value) => {
setPosition(value);
setIsDropdownOpen(false); // 드롭다운을 닫는다
};

const handleDepartmentSelect = (value) => {
setDepartment(value);
setIsDepartmentDropdownOpen(false); // 드롭다운을 닫는다
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
            <div className="flex flex-row md:flex-row items-start justify-between space-y-4 md:space-y-0 md:space-x-4 w-full mb-6">
            <form onSubmit={handleSubmit} className="flex flex-col md:flex-row w-full space-y-4 md:space-y-0">
                {/* 프로필 이미지 업로드 */}
                <div className="flex flex-col space-y-4 w-99 ml-6 mr-8 p-4 bg-white rounded-2xl shadow-lg h-[495px]">
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

                <div className="flex-1 space-y-4">
                <div className="w-full h-auto bg-white text-center rounded-3xl p-8 shadow-md mb-8">
                    <h1 className="text-lg font-bold">개인정보 추가</h1>
                    <div className="flex space-x-8 items-center mt-4">
                    <div className="flex flex-col space-y-4 w-1/2">
                        <label className="block text-sm font-medium text-left w-32">이름</label>
                        <input
                        type="text"
                        name="name"
                        className="bg-gray-100 border rounded-md w-full p-2"
                        required
                        />
                    </div>
                    <div className="flex flex-col space-y-4 w-1/2">
                        <label className="block text-sm font-medium text-left w-32">전화번호</label>
                        <input
                        type="text"
                        name="phone"
                        className="bg-gray-100 border rounded-md w-full p-2"
                        />
                    </div>
                    </div>
                    <div className="flex space-x-8 items-center mt-4">
                    <div className="flex flex-col space-y-4 w-1/2">
                        <label className="block text-sm font-medium text-left w-32">이메일</label>
                        <input
                        type="email"
                        name="email"
                        className="bg-gray-100 border rounded-md w-full p-2"
                        />
                    </div>
                    <div className="flex flex-col space-y-4 w-1/2">
                        <label className="block text-sm font-medium text-left w-32">비밀번호</label>
                        <input
                        type="password"
                        name="password"
                        className="bg-gray-100 border rounded-md w-full p-2"
                        />
                    </div>
                    </div>
                </div>

                <div className="flex flex-row space-x-8 items-center">
                    <div className="w-full h-auto bg-white text-center rounded-3xl p-8 shadow-md">
                    <h1 className="text-lg font-bold mb-10">부서관리</h1>
                    {/* 부서 */}
                    <div className="flex flex-row space-x-8 items-center mt-4">
                        <label className="block text-sm font-medium text-left w-20">부서</label>
                        <input
                        type="text"
                        name="department"
                        value={department}
                        disabled
                        className="border-none bg-gray-100 flex-1 rounded-md p-1 w-40"
                        />
                        <div className="flex flex-1 flex-col items-center relative">
                        <button
                            type="button"
                            onClick={() => setIsDepartmentDropdownOpen(!isDepartmentDropdownOpen)}
                            className="rounded-full bg-[#006D2C] text-white px-4 py-1 shadow-md hover:bg-[#0a4321] h-[42px]"
                        >
                            부서 찾기
                        </button>
                        {isDepartmentDropdownOpen && (
                            <div className="absolute inset-x-0 mt-12 w-34 bg-white border border-[#006D2C] rounded-2xl shadow-lg z-10">
                            {['개발', '경영', '디자인', '보안', '영업', '인사'].map((departmentItem) => (
                                <div
                                key={departmentItem}
                                onClick={() => handleDepartmentSelect(departmentItem)}
                                className="px-4 py-2 cursor-pointer hover:bg-gray-100 rounded-2xl"
                                >
                                {departmentItem}
                                </div>
                            ))}
                            </div>
                        )}
                        </div>
                    </div>
                    </div>

                    <div className="w-full h-auto bg-white text-center rounded-3xl p-8 shadow-md">
                    <h1 className="text-lg font-bold mb-10">직급관리</h1>
                    {/* 직급 */}
                    <div className="flex flex-row space-x-8 items-center mt-4">
                        <label className="block text-sm font-medium text-left w-20">직급</label>
                        <input
                        type="text"
                        name="position"
                        value={position}
                        disabled
                        className="border-none bg-gray-100 flex-1 rounded-md p-1 w-40"
                        />
                        <div className="flex flex-1 flex-col items-center relative">
                        <button
                            type="button"
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="rounded-full bg-[#006D2C] text-white px-4 py-1 shadow-md hover:bg-[#0a4321] h-[42px]"
                        >
                            직급 찾기
                        </button>
                        {isDropdownOpen && (
                            <div className="absolute mt-12 w-40 bg-white border border-[#006D2C] rounded-2xl shadow-lg z-10">
                            {['부서장', '사원', '이사', '인턴', '팀장', '회장'].map((positionItem) => (
                                <div
                                key={positionItem}
                                onClick={() => handlePositionSelect(positionItem)}
                                className="px-4 py-2 cursor-pointer hover:bg-gray-100 rounded-2xl"
                                >
                                {positionItem}
                                </div>
                            ))}
                            </div>
                        )}
                        </div>
                    </div>
                    </div>
                </div>

                {/* 등록 버튼 */}
                <div className="flex justify-end pt-4">
                    <button
                    type="button"
                    onClick={handleClose}
                    className="border-1 border-[#323232] text-[#323232] py-2 mr-4 rounded-full w-40"
                    >
                    닫기
                    </button>
                    <button
                    type="submit"
                    className="bg-[#006D2C] text-white py-2 rounded-full w-40"
                    >
                    추가하기
                    </button>
                </div>
                </div>
            </form>
            </div>
        </div>
        </div>
    </div>
    );
};

export default EmployeeAddPage;
