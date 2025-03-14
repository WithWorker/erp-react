import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { updateEmployee } from '../../../redux/slice/employeeSlice';
import Sidebar from '../../include/Sidebar';
import Header from '../../include/Header';
import { Pencil, Check } from 'react-bootstrap-icons'; // 부트스트랩 아이콘에서 연필 아이콘 가져오기
import PSalary from './PSalary';
import PBonus from './PBonus';


const EmployeeEditPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const { id } = useParams();
  const employee = useSelector(state => state.employee.employees.find(emp => emp.id === Number(id)));
  const [isDisabled, setIsDisabled] = useState(true); // 이메일 입력 필드의 disabled 상태 관리
  const [formData, setFormData] = useState({
    employeeId: '',
    name: '',
    department: '',
    position: '',
    phone: '',
    email: '',
    status: 'active',
    profileImage: null
  });

  const [isEmailDisabled, setIsEmailDisabled] = useState(true);
  const [isPhoneDisabled, setIsPhoneDisabled] = useState(true);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // :fire: 드롭다운 상태 관리 추가
  const [isDepartmentDropdownOpen, setIsDepartmentDropdownOpen] = useState(false); // 부서 드롭다운 상태 추가
  
  useEffect(() => {
    if (employee) {
      setFormData({ ...employee });
    }
  }, [employee]);

  // 입력값 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // 이메일 저장 핸들러
const handleEmailSubmit = async () => {
  console.log('Updated email:', formData.email);
  alert('수정된 이메일: ' + formData.email);

  const updatedEmployee = {
    id: formData.employeeId,
    email: formData.email
  };

  await dispatch(updateEmployee(updatedEmployee));
  setIsEmailDisabled(true); // 저장 후 비활성화
};

// 전화번호 저장 핸들러
const handlePhoneSubmit = async () => {
  console.log('Updated phone:', formData.phone);
  alert('수정된 전화번호: ' + formData.phone);

  const updatedEmployee = {
    id: formData.employeeId,
    phone: formData.phone
  };

  await dispatch(updateEmployee(updatedEmployee));
  setIsPhoneDisabled(true); // 저장 후 비활성화
};


  // 연필 버튼 클릭 시 email 활성화 및 포커스 설정
  const handleEmailEditClick  = () => {
    setIsEmailDisabled(false); // 클릭 시 disabled 상태 토글
    setTimeout(() => {
      emailRef.current.focus(); // input에 포커스를 자동으로 설정
    }, 0);
  };
  
  // 연필 버튼 클릭 시 phone 활성화 및 포커스 설정
  const handlePhoneEditClick   = () => {
    setIsPhoneDisabled(false); // 클릭 시 disabled 상태 토글
    setTimeout(() => {
      phoneRef.current.focus(); // input에 포커스를 자동으로 설정
    }, 0);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setFormData(prev => ({ ...prev, profileImage: file }));
  };

  // 수정된 정보 저장 (프론트 상태만 업데이트)
  const handleSubmit = async (e) => {
    e.preventDefault();
    // 🔥 수정된 정보 콘솔 출력
    console.log('Updated email:', formData.email);
    console.log('Updated phone:', formData.phone);
    console.log('Updated department:', formData.department);
    console.log('Updated position:', formData.position);
    
    setIsDisabled(true); // 저장 후 비활성화

    const updatedEmployee = {
      ...formData,
      profileImage: formData.profileImage ? URL.createObjectURL(formData.profileImage) : employee.profileImage
    };
    await dispatch(updateEmployee(updatedEmployee));
    
    // 🔥 모든 수정 상태 비활성화
    setIsEmailDisabled(true);
    setIsPhoneDisabled(true);

    alert('수정 완료되었습니다.');

    navigate('/employees');
};

// :fire: 부서 선택 핸들러 추가
const handleDepartmentSelect = (value) => {
  setFormData(prev => ({ ...prev, department: value }));
  setIsDepartmentDropdownOpen(false);
};

// :fire: 직급 선택 핸들러 추가
const handlePositionSelect = (value) => {
setFormData(prev => ({ ...prev, position: value }));
setIsDropdownOpen(false);
};

// 닫기 버튼 클릭 시 /employees 페이지로 이동
const handleClose = () => {
  navigate("/employees");
};

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar className='fixed'/> 
      <div className="flex-1 p-6">
        <Header />
        <div className="flex flex-row md:flex-row items-start justify-between space-y-4 md:space-y-0 md:space-x-4 w-full mb-6">
        <div className="flex flex-col space-y-4 w-1/3 ml-6 mr-8 p-4 bg-white rounded-2xl shadow-lg">
          <label className="block text-md font-medium text-center">프로필 이미지</label>
            {/* 프로필 이미지 미리보기 */}
              <div className="mt-2">
                <img 
                src={formData.profileImage ? URL.createObjectURL(formData.profileImage) : "https://via.placeholder.com/150"} 
                alt="Selected Profile" 
                  className="mt-2 w-full max-h-100 rounded-lg object-cover"
                />
                <div className='flex justify-between items-center ml-5 mr-20 mt-8 mb-2'>
                  <label className="block text-sm font-medium w-40">이름 : {formData.name} </label>
                </div>
                <div className='flex justify-between items-center ml-5 mr-20 mt-8 mb-2'>
                  <label className="block text-sm font-medium w-40">입사일 : {formData.incom} </label>
                </div>
                <div className='flex justify-between items-center ml-5 mr-20 mt-8 mb-2'>
                  <label className="block text-sm font-medium w-40">퇴사일 : {formData.outcom} </label>
                </div>
              </div>
              
          </div>
          <div className="flex flex-col space-x-s space-y-8 items-center">
          <div className="w-full flex space-x-8">
            <PSalary />
            <PBonus />
          </div>
          <div className='w-full h-30 bg-white text-center rounded-3xl p-8 shadow-md'>
            <h1 className='text-lg font-bold mb-4'>개인정보 수정하기</h1>
            <div className='flex flex-row space-x-8 items-center'>
            {/* email */}
            <div className='flex flex-col items-start flex-1'>
              <label className="text-gray-400 block text-sm font-medium mb-2">이메일</label>
              <div className="flex items-center space-x-2 w-full">
                <input 
                  ref={emailRef} // ref 속성으로 input 태그와 연결
                  type="text" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  disabled={isEmailDisabled} 
                  className={`bg-gray-100 border rounded-md w-full mr-2 p-2 ${!isEmailDisabled && "border-2 border-[#006D2C]"}`} // 활성화된 경우 초록색 테두리
                  />
                <button 
                  type="button" 
                  onClick={handleEmailEditClick} 
                  className="text-gray-500 hover:text-gray-800"
                >
                  <Pencil size={16} />
                </button>
                {!isEmailDisabled && (
                <button 
                  type="button"
                  onClick={handleEmailSubmit}
                  className="text-[#006D2C] hover:text-[#10361f] flex items-center justify-center"
                >
                  <Check size={32} />
                </button>
              )}

              </div>
            </div>
            {/* phone */}
            <div className='flex flex-col items-start flex-1'>
              <label className="text-gray-400 block text-sm font-medium mb-2">전화번호</label>
              <div className="flex items-center space-x-2 w-full">
              <input 
                ref={phoneRef}
                type="text" 
                name="phone" 
                value={formData.phone} 
                onChange={handleChange} 
                disabled={isPhoneDisabled}
                className={`bg-gray-100 border rounded-md w-full mr-2 p-2 ${!isPhoneDisabled && "border-2 border-[#006D2C]"}`}
              />
              <button 
                  type="button" 
                  onClick={handlePhoneEditClick} 
                  className="text-gray-500 hover:text-gray-800"
                >
                  <Pencil size={16} />
              </button>
              {!isPhoneDisabled && (
                <button 
                  type="button"
                  onClick={handlePhoneSubmit}
                  className="text-[#006D2C] hover:text-[#10361f] flex items-center justify-center"
                >
                  <Check size={32} />
                </button>
              )}
              </div>
            </div>
            </div>
          </div>
          <div className="flex flex-row space-x-8 items-center">
        
          <div className='w-full h-30 bg-white text-center rounded-3xl p-8 shadow-md'>
            <h1 className='text-lg font-bold mb-6'>부서관리</h1>
            {/* 부서 */}
            <div className='flex flex-row space-x-8 items-center  mt-4'>
              <label className="block text-sm font-medium w-20">현재부서 : </label>
                <input 
                  type="text" 
                  name="department" 
                  value={formData.department} 
                  onChange={handleChange} 
                  disabled
                  className="border-none flex-1 rounded-md p-1 w-40"
                />
              {/* :fire: 부서 변경 버튼 추가 */}
              <div className="flex flex-1 flex-col items-center relative">
                    <button 
                      type="button"
                      onClick={() => setIsDepartmentDropdownOpen(!isDepartmentDropdownOpen)}
                      className="rounded-full bg-[#006D2C] text-white px-3 py-1 shadow-md hover:bg-[#0a4321] w-[120px] h-[42px]"
                      >
                      부서 변경하기
                    </button>
                  {/* :fire: 부서 드롭다운 추가 */}
                  {isDepartmentDropdownOpen && (
                  <div className="absolute inset-x-0 bottom-full mb-2 w-34 bg-white border border-[#006D2C] rounded-2xl shadow-lg z-10">
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
            <h1 className='text-lg font-bold mb-6'>직급관리</h1>
            {/* 직급 */}
            <div className='flex flex-row space-x-8 items-center  mt-4'>
              <label className="block text-sm font-medium w-20">현재직급 : </label>
              <input 
                type="text" 
                name="position" 
                value={formData.position} 
                onChange={handleChange} 
                disabled
                className="border-none flex-1 rounded-md p-1 w-40"
              />
            {/* :fire: 직급 변경 버튼 추가 */}
            <div className="flex flex-1 flex-col items-center relative">
                  <button 
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="rounded-full bg-[#006D2C] text-white px-3 py-1 shadow-md hover:bg-[#0a4321] w-[120px] h-[42px]"
                  >
                    직급 변경하기
                  </button>
                {/* :fire: 드롭다운 메뉴 추가 */}
                {isDropdownOpen && (
                    <div className="absolute inset-x-0 bottom-full mb-2 w-34 bg-white border border-[#006D2C] rounded-2xl shadow-lg z-10">
                    {['사원', '주임', '대리', '과장', '차장', '부장'].map((position) => (
                      <div
                        key={position}
                        onClick={() => handlePositionSelect(position)}
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
        </div>
        </div>

        

        {/* 수정 및 닫기 버튼 */}
        <div className='flex justify-end '>
          <button 
            type="button" 
            onClick={handleClose}
            className="border-1 border-[#323232] text-[#323232] py-2 mr-4 rounded-full w-40"
          >
            닫기
          </button>
          <button 
            type="submit" 
            onClick={handleSubmit}
            className="bg-[#006D2C] text-white py-2 rounded-full w-40"
          >
            수정하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeEditPage;
