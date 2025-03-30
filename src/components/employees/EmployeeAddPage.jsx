import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Sidebar from "../include/Sidebar";
import Header from "../include/Header";
import DepartmentDropdown from "../employees/DepartmentDropdown";
import PositionDropdown from "../employees/PositionDropdown";
import { useNavigate } from "react-router";
import DaumPostcode from "react-daum-postcode"; 

const departmentMap = {
  전체보기: null,
  개발: 1,
  경영: 2,
  디자인: 3,
  보안: 4,
  영업: 5,
  인사: 6,
};

const positionMap = {
  전체보기: null,
  부서장: 1,
  사원: 2,
  이사: 3,
  인턴: 4,
  팀장: 5,
  회장: 6,
};

const EmployeeAddPage = () => {
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState(null);
  const [departmentId, setDepartmentId] = useState("");
  const [positionId, setPositionId] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState(""); 
  const [zipcode, setZipcode] = useState("");
  const [detailAddress, setDetailAddress] = useState(""); 
  const [residentFirst, setResidentFirst] = useState(""); 
  const [residentSecond, setResidentSecond] = useState(""); 
  const [accountNumber, setAccountNumber] = useState(""); 
  const [isPostcodeOpen, setIsPostcodeOpen] = useState(false); 

  const handlePositionSelect = (positionKey) => {
    const positionId = positionMap[positionKey];
    setPositionId(positionId);
  };

  const handleDepartmentSelect = (departmentKey) => {
    const departmentId = departmentMap[departmentKey];
    setDepartmentId(departmentId);
  };

  const handleImageUpload = async () => {
    if (!profileImage) {
      return "upload/default.jpg";
    }

    const formData = new FormData();
    formData.append("file", profileImage);

    const response = await fetch("/api/admin/upload", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error("이미지 업로드 실패");
    }

    return await response.text();
  };

  const handleSubmit = async () => {
    if (!name.trim() || !phone.trim() || !email.trim() || !password.trim() || !address.trim() || !residentFirst.trim() || !residentSecond.trim() || !accountNumber.trim()) {
      alert("입력하지 않은 항목이 존재합니다.");
      return;
    }

    try {
      const fullAddress = `${address} ${detailAddress}`;

      const imgUrl = await handleImageUpload();

      const requestData = {
        name,
        phone,
        email,
        password,
        address: fullAddress, 
        zipcode,
        departmentId,
        positionId,
        imgUrl,
        residentNumber: `${residentFirst}-${residentSecond}`, 
        accountNumber, 
      };

      const response = await fetch("/api/admin/join", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        alert("직원 등록 성공!");
        navigate("/user/employees");
      } else {
        const errorMessage = await response.text();
        alert(`등록 실패: ${errorMessage}`);
      }
    } catch (error) {
      console.error("등록 오류:", error);
      alert("직원 등록 중 오류 발생");
    }
  };

  // 우편번호 API 모달
  const handlePostcode = () => {
    setIsPostcodeOpen(true); 
  };

  // 우편번호 찾기 완료 후 호출
  const handlePostcodeComplete = (data) => {
    setZipcode(data.zonecode);
    setAddress(data.roadAddress); 
    setIsPostcodeOpen(false); 
  };

  return (
    <div className="flex h-screen bg-gray-100 ">
      <Sidebar />
      <div className="flex-1 p-6 overflow-y-auto">
        <Header />
        <div className="flex justify-center">
          <div className="w-full max-w-[800px] bg-white text-center rounded-3xl p-8 shadow-md">
            <h1 className="text-[#006D2C] text-lg font-bold mb-6">직원 등록</h1>

            {/* 프로필 이미지 */}
            <div className="flex flex-row items-start space-x-8">
              <div className="flex flex-col space-y-4 w-[350px] p-4 bg-white rounded-2xl shadow-lg">
                <label className="block text-md font-medium text-center">프로필 이미지</label>
                {profileImage ? (
                  <img
                    src={URL.createObjectURL(profileImage)}
                    alt="Selected Profile"
                    className="mt-2 w-full h-[180px] rounded-lg object-cover"
                  />
                ) : (
                  <div className="mt-4 w-full h-[180px] bg-gray-300 rounded-lg flex items-center justify-center">
                    <p className="text-sm text-gray-500">이미지를 선택하세요</p>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setProfileImage(e.target.files[0])}
                  className="border-2 border-gray-300 border-dotted rounded-md w-full py-2 px-3"
                />
              </div>

              {/* 개인정보 필드 */}
              <div className="flex-1 space-y-6">
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
                {[ 
                  { label: "이름", value: name, setValue: setName },
                  { label: "전화번호", value: phone, setValue: setPhone },
                  { label: "이메일", value: email, setValue: setEmail },
                  { label: "비밀번호", value: password, setValue: setPassword, type: "password" },
                  { label: "계좌번호", value: accountNumber, setValue: setAccountNumber }
                ].map((field, index) => (
                  <div key={index} className="flex flex-col space-y-2 w-full max-w-[400px]">
                    <label className="block text-sm font-medium text-left">{field.label}</label>
                    <input
                      type={field.type || "text"}
                      className="bg-gray-100 border rounded-md w-full p-2"
                      value={field.value}
                      onChange={(e) => field.setValue(e.target.value)}
                    />
                  </div>
                ))}
                  <div className="flex flex-col space-y-2 w-full max-w-[400px]">
                    <label className="block text-sm font-medium text-left">주민등록번호</label>
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        maxLength={6}
                        value={residentFirst}
                        onChange={(e) => setResidentFirst(e.target.value)}
                        className="bg-gray-100 border rounded-md w-1/2 p-2 text-center"
                      />
                      <span className="flex items-center">-</span>
                      <input
                        type="password"
                        maxLength={7}
                        value={residentSecond}
                        onChange={(e) => setResidentSecond(e.target.value)}
                        className="bg-gray-100 border rounded-md w-1/2 p-2 text-center"
                      />
                    </div>
                  </div>
                {/* 주소 필드 */}
                <div className="flex flex-col space-y-2 w-full max-w-[400px]">
                  <label className="block text-sm font-medium text-left">주소</label>
                  <div className="flex space-x-2 text-sm font-medium">
                    <input
                      type="text"
                      className="bg-gray-100 border rounded-md w-full p-2"
                      value={zipcode}
                      readOnly
                    />
                    <button onClick={handlePostcode} className="bg-[#006D2C] text-white px-2 py-1 rounded-md">
                      우편번호 찾기
                    </button>
                  </div>
                  <input
                    type="text"
                    className="bg-gray-100 border rounded-md w-full p-2"
                    value={address}
                    readOnly
                  />
                  <input
                    type="text"
                    className="bg-gray-100 border rounded-md w-full p-2"
                    value={detailAddress}
                    onChange={(e) => setDetailAddress(e.target.value)}
                    placeholder="상세주소"
                  />
                </div>
              </div>
            </div>

            {/* 버튼 */}
            <div className="flex justify-end pt-4 space-x-4">
              <button onClick={handleSubmit} className="bg-[#006D2C] text-white py-2 rounded-full w-40 text-lg">
                등록하기
              </button>
              <button type="button" onClick={() => navigate("/user/employees")} className="border-1 border-[#323232] text-[#323232] py-2 rounded-full w-40">닫기</button>
            </div>
          </div>
        </div>
      </div>

      {/* 우편번호 모달 */}
      {isPostcodeOpen && (
        <div className="fixed inset-0 z-50 bg-gray-700 bg-opacity-50 flex justify-center items-center">
          <div className="relative bg-white p-4 rounded-lg shadow-lg w-[400px] h-[400px] flex justify-center items-center">
            <button
              className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-gray-300 hover:bg-gray-400 text-black p-2 shadow-md"
              onClick={() => setIsPostcodeOpen(false)}
            >
              <AiOutlineClose size={20} />
            </button>
            <DaumPostcode onComplete={handlePostcodeComplete} />
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeAddPage;