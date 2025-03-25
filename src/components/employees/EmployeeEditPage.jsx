import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../include/Sidebar';
import Header from '../include/Header';
import PSalary from './PSalary';
import PBonus from './PBonus';
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

const EmployeeEditPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // 입력 필드 참조
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const addressRef = useRef(null);  
  const residentFirstRef = useRef(null);  
  const residentSecondRef = useRef(null); 
  const accountRef = useRef(null); 

  // 직원 정보 상태
  const [department, setDepartment] = useState("");
  const [departmentId, setDepartmentId] = useState(null);
  const [position, setPosition] = useState("");
  const [positionId, setPositionId] = useState(null);
  const [updatedSalary, setUpdatedSalary] = useState(0);
  const [address, setAddress] = useState(""); 
  const [residentFirst, setResidentFirst] = useState(""); 
  const [residentSecond, setResidentSecond] = useState(""); 
  const [account, setAccount] = useState("");  

  // 직원 정보 불러오기
  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await fetch(`/api/admin/emp/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.ok) {
          const data = await response.json();

          // 기본 데이터 설정
          nameRef.current.value = data.name;
          emailRef.current.value = data.email;
          phoneRef.current.value = data.phone;
          addressRef.current.value = data.address || '';  
          if (data.residentNumber) {
            const [first, second] = data.residentNumber.split('-');
            setResidentFirst(first);  
            setResidentSecond(second); 
          }
          accountRef.current.value = data.accountNumber || '';  

          // 부서 & 직급 설정
          setDepartmentId(data.departmentId);
          setPositionId(data.positionId);
          setUpdatedSalary(data.baseSalary || 0); 
        } else {
          console.error("Failed to fetch employee data");
        }
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };

    fetchEmployeeData();
  }, [id]);

  // department 동기화
  useEffect(() => {
    if (departmentId !== null) {
      const matchedDepartment = Object.keys(departmentMap).find(key => departmentMap[key] === departmentId);
      setDepartment(matchedDepartment || "전체보기");
    }
  }, [departmentId]);

  // position 동기화
  useEffect(() => {
    if (positionId !== null) {
      const matchedPosition = Object.keys(positionMap).find(key => positionMap[key] === positionId);
      setPosition(matchedPosition || "전체보기");
    }
  }, [positionId]);

  // 드롭다운 선택 핸들러
  const handleDepartmentSelect = (selectedDepartment) => {
    setDepartment(selectedDepartment);
    setDepartmentId(departmentMap[selectedDepartment] || null);
  };

  const handlePositionSelect = (selectedPosition) => {
    setPosition(selectedPosition);
    setPositionId(positionMap[selectedPosition] || null);
  };

  // PSalary 기본급 수정
  const handleSalaryChange = (newSalary) => {
    setUpdatedSalary(newSalary); // 기본급을 숫자로 업데이트
  };

  // 수정 요청
  const handleUpdate = async () => {
    const updatedData = {
      empId: id,
      name: nameRef.current.value,
      email: emailRef.current.value,
      phone: phoneRef.current.value,
      address: addressRef.current.value,  
      residentNumber: `${residentFirst}-${residentSecond}`, 
      accountNumber: accountRef.current.value,  
      departmentId,
      positionId,
      baseSalary: updatedSalary, // 기본급을 숫자로 전송
    };

    try {
      const response = await fetch(`/api/admin/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        alert('수정이 완료되었습니다.');
        navigate("/user/employees");
      } else {
        alert('수정 실패');
      }
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar className='fixed' />
      <div className="flex-1 p-6">
        <Header />
        <div className="bg-white p-8 rounded-3xl shadow-md max-w-4xl w-[80%] mx-auto">

          <h1 className='text-[#006D2C] text-lg text-center font-bold mb-4'>직원 수정</h1>

          {/* 부서관리 & 직급관리 */}
          <div className="w-full flex space-x-8 mb-6">
            <div className='flex-1 bg-gray-50 text-center rounded-2xl p-6 shadow-sm'>
              <h1 className='text-md mb-6'>부서변경</h1>
              <DepartmentDropdown 
                onSelectDepartment={handleDepartmentSelect} 
                selectedDepartment={department}
              />
            </div>
            <div className='flex-1 bg-gray-50 text-center rounded-2xl p-6 shadow-sm'>
              <h1 className='text-md mb-6'>직급변경</h1>
              <PositionDropdown 
                onSelectPosition={handlePositionSelect} 
                selectedPosition={position}
              />
            </div>
          </div>

          {/* 개인정보 수정 */}
          <div className='w-full bg-gray-50 text-center rounded-2xl p-6 shadow-sm mb-6'>
            <div className='flex flex-row space-x-8'>
              <div className='flex flex-col items-start flex-1'>
                <label className="block text-sm font-medium mb-2">이름</label>
                <input type="text" ref={nameRef} className="border rounded-md w-full p-2" />
              </div>
              <div className='flex flex-col items-start flex-1'>
                <label className="block text-sm font-medium mb-2">이메일</label>
                <input type="text" ref={emailRef} className="border rounded-md w-full p-2" />
              </div>
              <div className='flex flex-col items-start flex-1'>
                <label className="block text-sm font-medium mb-2">전화번호</label>
                <input type="text" ref={phoneRef} className="border rounded-md w-full p-2" />
              </div>
            </div>
          </div>

          <div className='w-full bg-gray-50 text-center rounded-2xl p-6 shadow-sm mb-6'>
            <div className='flex flex-row space-x-8'>
              <div className='flex flex-col items-start flex-1'>
                <label className="block text-sm font-medium mb-2">주소</label>
                <input type="text" ref={addressRef} className="border rounded-md w-full p-2" />
              </div>
              <div className='flex flex-col items-start flex-1'>
                <label className="block text-sm font-medium mb-2">주민등록번호</label>
                <div className="flex space-x-4">
                  <input
                    type="text"
                    ref={residentFirstRef}
                    value={residentFirst}
                    onChange={(e) => setResidentFirst(e.target.value)}
                    className="border rounded-md p-2 w-1/2"
                    maxLength="6"
                  />
                  <span className="flex items-center">-</span>
                  <input
                    type="text"
                    ref={residentSecondRef}
                    value={residentSecond}
                    onChange={(e) => setResidentSecond(e.target.value)}
                    className="border rounded-md p-2 w-1/2"
                    maxLength="7"
                  />
                </div>
              </div>
              <div className='flex flex-col items-start flex-1'>
                <label className="block text-sm font-medium mb-2">계좌번호</label>
                <input type="text" ref={accountRef} className="border rounded-md w-full p-2" />
              </div>
            </div>
          </div>

          {/* 급여 & 보너스 */}
          <div className="w-full flex space-x-8 mb-6">
            <PSalary onSalaryChange={handleSalaryChange} />
            <PBonus />
          </div>

          {/* 버튼 */}
          <div className='flex justify-end mt-6'>
            <button type="button" onClick={handleUpdate} className="bg-[#006D2C] text-white py-2 mr-4 rounded-full w-40">수정하기</button>
            <button type="button" onClick={() => navigate("/user/employees")} className="border-1 border-[#323232] text-[#323232] py-2 rounded-full w-40">닫기</button>
          </div>

        </div> 
      </div>
    </div>
  );
};

export default EmployeeEditPage;
