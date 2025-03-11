import React from 'react';

const InfoModal = ({ employee, closeModal }) => {
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-1/2">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">직원 정보</h2>
          <button onClick={closeModal} className="text-gray-500 hover:text-black">
            X
          </button>
        </div>
        <div className="mt-4">
          <div>
            <strong>이름: </strong>{employee.name}
          </div>
          <div>
            <strong>사원번호: </strong>{employee.employeeId}
          </div>
          <div>
            <strong>부서: </strong>{employee.department}
          </div>
          <div>
            <strong>직급: </strong>{employee.position}
          </div>
          <div>
            <strong>전화번호: </strong>{employee.phone}
          </div>
          <div>
            <strong>이메일: </strong>{employee.email}
          </div>
          <div>
            <strong>상태: </strong>{employee.status}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
