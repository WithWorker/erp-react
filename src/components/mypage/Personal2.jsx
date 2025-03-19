import React, { useState, useEffect } from 'react';

const Personal2 = () => {
    const [employee, setEmployee] = useState({});
    const empId = localStorage.getItem("empId"); 

    useEffect(() => {
        fetch('/api/profile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ empId: empId }), 
        })
        .then((response) => response.json())
        .then((data) => setEmployee(data))
        .catch((error) => console.error("Error fetching employee data:", error));
    }, [empId]); 

    return (
        <div className="w-full">
            <div className="p-8 bg-white rounded-full mb-8 shadow border-2 border-[#006D2C]">
                <div className='flex justify-between ml-8 mr-8'>
                    <div className="flex justify-start items-center space-x-14">
                        <h4 className="font-bold text-[#323232]">입사일</h4>
                        <span className="text-gray-600">{employee.hireDate || '입사일 없음'}</span>
                    </div>
                    <div className="flex justify-start items-center space-x-14">
                        <h4 className="font-bold text-[#323232]">부서명</h4>
                        <span className="text-gray-600">{employee.departmentName || '부서 없음'}</span>
                    </div>
                    <div className="flex justify-start items-center space-x-14">
                        <h4 className="font-bold text-[#323232]">직급명</h4>
                        <span className="text-gray-600">{employee.positionName || '직급 없음'}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Personal2;
