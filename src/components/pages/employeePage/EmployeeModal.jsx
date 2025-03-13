import { useNavigate } from 'react-router-dom';
import { X } from 'react-bootstrap-icons';  // X 아이콘을 정확히 임포트

const EmployeeModal = ({ employee, onClose }) => {
  const navigate = useNavigate();

  return (
<div className="fixed inset-0 bg-[#323232] bg-opacity-80 flex items-center justify-center">
  <div className="bg-white p-8 rounded-lg shadow-xl relative">      
    <button
        className="absolute top-2 right-2 text-[#323232] bg-white rounded-md"
        onClick={onClose}
      >
        <X size={24} /> {/* 부트스트랩 아이콘의 엑스 모양 */}
      </button>
          <div className="flex flex-col mt-3 gap-2">
            <button
              className="px-14 py-2 border-2 border-[#006D2C] text-[#006D2C] rounded-lg"
              onClick={() => navigate('/employee/add')}
            >
              직원 정보 추가하기
            </button>
            <button
              className="px-14 py-2 border-2 border-[#006D2C] bg-[#006D2C] text-white rounded-lg"
              onClick={() => navigate(`/employee/edit/${employee.id}`)}
            >
              직원 정보 수정하기
            </button>
          </div>
        </div>
      </div>
      );
    };

export default EmployeeModal;


{/* {showModal && (
        <div className="fixed inset-0 bg-[#323232] bg-opacity-80 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-lg font-bold mb-4">직원 관리</h2>
            <div className="flex flex-col gap-2">
              <button 
                className="bg-blue-500 text-white py-2 rounded-md"
                onClick={handleAddEmployee}
              >
                직원정보 추가하기
              </button>
              <button 
                className="bg-green-500 text-white py-2 rounded-md"
                onClick={handleEditEmployee}
              >
                직원정보 수정하기
              </button>
              <button 
                className="text-gray-500 mt-2"
                onClick={closeModal}
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )} */}