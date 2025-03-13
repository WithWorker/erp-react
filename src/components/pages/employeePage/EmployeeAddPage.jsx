import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loadEmployees } from '../../../redux/slice/employeeSlice';
import { addEmployee } from '../../../redux/slice/employeeSlice';
import Sidebar from '../../include/Sidebar';
import Header from '../../include/Header';

const EmployeeAddPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ✅ 로컬스토리지에서 값 불러오기 추가  
  const [formData, setFormData] = useState(() => {  
    const savedData = localStorage.getItem('formData');  
    return savedData  
      ? JSON.parse(savedData)  
      : {  
          employeeId: '',  
          name: '',  
          department: '',  
          position: '',  
          phone: '',  
          email: '',  
          status: 'active',  
          profileImage: null  
        };  
  });  

  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // 🔥 드롭다운 상태 관리 추가
  const [isDepartmentDropdownOpen, setIsDepartmentDropdownOpen] = useState(false); // 부서 드롭다운 상태 추가

  // ✅ 상태 변경 시 localStorage에 저장  
  useEffect(() => {  
    localStorage.setItem('formData', JSON.stringify(formData));  
  }, [formData]);  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setFormData(prev => ({ ...prev, profileImage: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newEmployee = {
      ...formData,
      profileImage: formData.profileImage ? URL.createObjectURL(formData.profileImage) : null
    };

    /* await dispatch(addEmployee(newEmployee)); // 직원 추가
    dispatch(loadEmployees()); // 직원 목록 갱신
    navigate('/employees'); // 목록으로 이동 */
    
    try {
      await dispatch(addEmployee(newEmployee)).unwrap(); // 완료 후 상태 갱신
      await dispatch(loadEmployees()); // ✅ 추가 완료 후 상태 갱신 보장
      navigate('/employees'); // 목록으로 이동
    } catch (error) {
      console.error('직원 추가 실패:', error);
    }

    // ✅ 등록 후 로컬스토리지 삭제  
    localStorage.removeItem('formData');  
    };


  // 🔥 직급 선택 핸들러 추가
  const handlePositionSelect = (value) => {
    setFormData(prev => ({ ...prev, position: value }));
    setIsDropdownOpen(false);
  };

  // 🔥 부서 선택 핸들러 추가
  const handleDepartmentSelect = (value) => {
    setFormData(prev => ({ ...prev, department: value }));
    setIsDepartmentDropdownOpen(false);
  };

  const handleSelect = (value) => { // 🔥 드롭다운 값 선택 핸들러 추가
    setFormData(prev => ({ ...prev, position: value }));
    setIsDropdownOpen(false);
  };

  // 닫기 버튼 클릭 시 /employees 페이지로 이동
  const handleClose = () => {
    navigate("/employees");  // /employees로 이동
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
        <div className="flex flex-col space-y-4 w-99 ml-6 mr-8 p-4 bg-white rounded-2xl shadow-lg">
        <label className="block text-md font-medium text-center">프로필 이미지</label>
        {/* 선택된 이미지 미리보기 (선택된 이미지가 있을 경우) */}
        {formData.profileImage ? (
          <div className="mt-2">
            <img 
              src={URL.createObjectURL(formData.profileImage)} 
              alt="Selected Profile" 
              className="mt-2 w-full h-100 rounded-lg object-cover"
            />
            {/* 선택된 이미지 파일명 표시 */}
            <p className="mt-2 text-sm text-gray-500">{formData.profileImage.name}</p>
          </div>
        ) : (
          <div className="mt-4 w-full h-100 bg-gray-300 rounded-lg flex items-center justify-center">
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
          <div className='h-30 bg-white text-center rounded-3xl p-8 shadow-md mb-8'>
            <h1 className='text-lg font-bold'>개인정보 추가</h1>
            {/* 이름 */}
            <div className='flex justify-between items-center ml-5 mr-20 mt-8'>
              <label className="block text-sm font-medium w-40">이름</label>
              <input 
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                className="bg-gray-100 border rounded-md w-full p-2"
                required 
              />
            </div>

        {/* 이메일 */}
        <div className='flex justify-between items-center ml-5 mr-20 mt-8'>
        <label className="block text-sm font-medium w-40">이메일</label>
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            className="bg-gray-100 border rounded-md w-full p-2"
          />
        </div>

        {/* 전화번호 */}
        <div className='flex justify-between items-center ml-5 mr-20 mt-8 mb-2'>
          <label className="block text-sm font-medium w-40">전화번호</label>
          <input 
            type="text" 
            name="phone" 
            value={formData.phone} 
            onChange={handleChange} 
            className="bg-gray-100 border rounded-md w-full p-2"
          />
        </div>
        </div>

        <div className="flex flex-row space-x-8 items-center">
          <div className='w-full h-30 bg-white text-center rounded-3xl p-8 shadow-md'>
            <h1 className='text-lg font-bold mb-10'>부서관리</h1>
            {/* 부서 */}
            <div className='flex flex-row space-x-8 items-center  mt-4'>
              <label className="block text-sm font-medium w-20">현재부서 : </label>
                <input 
                  type="text" 
                  name="department" 
                  value={formData.department} 
                  onChange={handleChange} 
                  disabled
                  className="border-none bg-gray-100 flex-1 rounded-md p-1 w-40"
                />
              {/* 🔥 부서 변경 버튼 추가 */}
              <div className="flex flex-1 flex-col items-center relative">
                    <button 
                      type="button"
                      onClick={() => setIsDepartmentDropdownOpen(!isDepartmentDropdownOpen)}
                      className="rounded-full bg-[#006D2C] text-white px-4 py-1 shadow-md hover:bg-[#0a4321] h-[42px]"
                      >
                      부서 변경하기
                    </button>
                  {/* 🔥 부서 드롭다운 추가 */}
                  {isDepartmentDropdownOpen && (
                  <div div className="absolute inset-x-0 mt-12 w-34 bg-white border border-[#006D2C] rounded-2xl shadow-lg z-10">  
                    {['개발팀', '디자인팀', '경영지원팀', '마케팅팀', '사업기획팀', 'R&D팀'].map((department) => (
                        <div
                          key={department}
                          onClick={() => handleDepartmentSelect(department)}
                          className="px-4 py-2 cursor-pointer hover:bg-gray-100 rounded-2xl"
                        >
                          {department}
                        </div>
                      ))}
                    </div>
                  )}
                  </div>

              </div>
            </div>
            <div className='w-full h-30 bg-white text-center rounded-3xl p-8 shadow-md'>
            <h1 className='text-lg font-bold mb-10'>직급관리</h1>
            {/* 직급 */}
            <div className='flex flex-row space-x-8 items-center  mt-4'>
              <label className="block text-sm font-medium w-20">현재직급 : </label>
              <input 
                type="text" 
                name="position" 
                value={formData.position} 
                onChange={handleChange} 
                disabled
                className="border-none bg-gray-100 flex-1 rounded-md p-1 w-40"
              />
            {/* 🔥 직급 변경 버튼 추가 */}
            <div className="flex flex-1 flex-col items-center relative">
                  <button 
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="rounded-full bg-[#006D2C] text-white px-4 py-1 shadow-md hover:bg-[#0a4321] h-[42px]"
                  >
                    직급 변경하기
                  </button>
                {/* 🔥 드롭다운 메뉴 추가 */}
                {isDropdownOpen && (
                    <div className="absolute mt-12 w-40 bg-white border border-[#006D2C] rounded-2xl shadow-lg z-10">
                    {['사원', '주임', '대리', '과장', '차장', '부장'].map((position) => (
                      <div
                        key={position}
                        onClick={() => handleSelect(position)}
                        className="px-4 py-2 cursor-pointer hover:bg-gray-100 rounded-2xl"
                      >
                        {position}
                      </div>
                    ))}
                  </div>
                )}
                </div>

            </div>
            </div>
        </div>


        
        {/* 등록 버튼 */}
        <div className='flex justify-end pt-4'>
          <button 
            type="submit" 
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
