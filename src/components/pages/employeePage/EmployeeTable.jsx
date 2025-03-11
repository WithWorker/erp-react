import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { loadEmployees } from '../../../redux/slice/employeeSlice';
import { ThreeDots } from 'react-bootstrap-icons'; // 점 3개 아이콘
import InfoModal from './InfoModal';  // 모달 컴포넌트를 추가해야 합니다.
import categoryEmployee from '../../../utils/categoryEmployee';

const EmployeeTable = () => {
  const dispatch = useDispatch();
  const { employees = [], status, searchQuery, category  } = useSelector((state) => state.employee || {});
  
  const [selectedEmployee, setSelectedEmployee] = useState(null);  // 선택된 직원
  const [isModalOpen, setIsModalOpen] = useState(false);  // 모달 상태

  useEffect(() => {
    dispatch(loadEmployees());  // 직원 목록 로드
  }, [dispatch]);

  // 검색어가 있으면 필터링
  const filteredEmployees = employees.filter((employee) => {
    const searchLower = searchQuery.toLowerCase();
    const matchesSearchQuery = employee.name.toLowerCase().includes(searchLower) || 
    employee.employeeId.toString().includes(searchLower);
    const matchesCategory = category === 'all' || employee.department === categoryEmployee.find(cat => cat.value === category)?.label;

    return matchesSearchQuery && matchesCategory;
    });
    
    /* return (
      employee.name.toLowerCase().includes(searchLower) || 
      employee.employeeId.toString().includes(searchLower)
    );
  }); */

  if (status === 'loading') return <p>로딩 중...</p>;
  if (status === 'failed') return <p>데이터를 불러오는 데 실패했습니다.</p>;

  // 점 3개 아이콘 클릭 시 모달 열기
  const handleInfoClick = (employee) => {
    setSelectedEmployee(employee);  // 선택된 직원 설정
    setIsModalOpen(true);  // 모달 열기
  };

  // 모달 닫기
  const closeModal = () => {
    setIsModalOpen(false);  // 모달 닫기
    setSelectedEmployee(null);  // 선택된 직원 초기화
  };

  return (
    <div className="overflow-x-auto bg-white shadow-lg rounded-3xl p-4 w-full border-none">
      <table className="w-full table-auto border-none border-spacing-0 items-center">
        <thead>
          <tr className="text-[#323232] text-sm">
            <th className="p-2 text-center font-bold">프로필</th>
            <th className="p-2 text-center font-bold">사원번호</th>
            <th className="p-2 text-center font-bold">이름</th>
            <th className="p-2 text-center font-bold">부서</th>
            <th className="p-2 text-center font-bold">직급</th>
            <th className="p-2 text-center font-bold">전화번호</th>
            <th className="p-2 text-center font-bold">이메일</th>
            <th className="p-2 text-center font-bold">상태</th>
            <th className="p-2 text-center font-bold">    </th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((employee) => (
            <tr key={employee.id} className="hover:bg-gray-50 border-b">
              <td className="img-center">
                <img 
                  src={employee.profileImage} 
                  alt="프로필" 
                  className="ml-9 w-10 h-10 rounded-full" />
              </td>
              <td className="p-4 text-center">{employee.employeeId}</td>
              <td className="p-4 text-center">{employee.name}</td>
              <td className="p-4 text-center">{employee.department}</td>
              <td className="p-4 text-center">{employee.position}</td>
              <td className="p-4 text-center">{employee.phone}</td>
              <td className="p-4 text-center">{employee.email}</td>
              <td className="p-4 text-center">
                <span
                  className={`px-3 py-2 text-center text-sm rounded-full ${getStatusClass(employee.status)
                    /* employee.status === '출근' ? 'bg-green-400' :
                    employee.status === '연차' ? 'bg-orange-400' :
                    employee.status === '외근' ? 'bg-yellow-400' : 'bg-gray-400' */
                  }`}
                >
                  {employee.status}
                </span>
              </td>
              <td className="p-4 text-center">
                <button onClick={() => handleInfoClick(employee)} className="text-gray-500">
                  <ThreeDots size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* 모달 열기 조건 */}
      {isModalOpen && selectedEmployee && (
        <InfoModal
          employee={selectedEmployee} 
          closeModal={closeModal} 
        />
      )}
    </div>
  );
};

// 상태에 맞는 클래스를 반환하는 함수
const getStatusClass = (status) => {
  switch (status) {
    case '출근':
      return 'bg-[#006D2C] text-white';
    case '연차':
      return 'bg-[#FB8500]';
    case '외근':
      return 'bg-[#A1D99B]';
    case '반차':
      return 'bg-[#A1D99B]';
    default:
      return 'bg-[#FFB703]';
  }
};

export default EmployeeTable;
