import React, { useState, useEffect } from 'react';

const Personal = () => {
    const [employee, setEmployee] = useState({});
    const empId = localStorage.getItem("empId");

    useEffect(() => {
        fetch('/api/profile', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            body: JSON.stringify({ empId }), 
        })
        .then((response) => response.json())
        .then((data) => setEmployee(data))
        .catch((error) => console.error("Error fetching employee data:", error));
    }, [empId]);

    return (
        <div className="mx-auto bg-white shadow-lg rounded-lg p-6 grid grid-cols-3">
            {/* 프로필 이미지 */}
            <div className="flex flex-col items-center justify-center col-span-1">
                <img
                    src={`http://localhost:7777/${employee.imgUrl}`}
                    alt="Profile"
                    className="w-24 h-24 rounded-full"
                />
            </div>

            {/* 인사정보 */}
            <div className="grid grid-cols-2 col-span-2 gap-4">
                {/* 이름 */}
                <div className="flex items-center gap-2">
                    <label className="flex-1 min-w-[100px] text-gray-700 font-semibold text-right">이름</label>
                    <input type="text" value={employee.name || ''} className="flex-[2] min-w-[150px] p-2 rounded-md text-left text-gray-500" readOnly />
                </div>

                {/* 사번 */}
                <div className="flex items-center gap-2">
                    <label className="flex-1 min-w-[100px] text-gray-700 font-semibold text-right">사번</label>
                    <input type="text" value={employee.empId || ''} className="flex-[2] min-w-[150px] p-2 rounded-md text-left text-gray-500" readOnly />
                </div>

                {/* 전화번호 */}
                <div className="flex items-center gap-2">
                    <label className="flex-1 min-w-[100px] text-gray-700 font-semibold text-right">전화번호</label>
                    <input type="text" value={employee.phone || ''} className="flex-[2] min-w-[150px] p-2 rounded-md text-left text-gray-500" readOnly />
                </div>

                {/* 이메일 */}
                <div className="flex items-center gap-2">
                    <label className="flex-1 min-w-[100px] text-gray-700 font-semibold text-right">이메일</label>
                    <input type="email" value={employee.email || ''} className="flex-[2] min-w-[150px] p-2 rounded-md text-left text-gray-500" readOnly />
                </div>

                {/* 주소 */}
                <div className="flex items-center gap-2">
                    <label className="flex-1 min-w-[100px] text-gray-700 font-semibold text-right">주소</label>
                    <input type="text" value={employee.address || ''} className="flex-[2] min-w-[150px] p-2 rounded-md text-left text-gray-500" readOnly />
                </div>

                {/* 입사일 */}
                <div className="flex items-center gap-2">
                    <label className="flex-1 min-w-[100px] text-gray-700 font-semibold text-right">입사일</label>
                    <input type="text" value={employee.hireDate || ''} className="flex-[2] min-w-[150px] p-2 rounded-md text-left text-gray-500" readOnly />
                </div>

                {/* 주민등록번호 */}
                <div className="flex items-center gap-2">
                    <label className="flex-1 min-w-[100px] text-gray-700 font-semibold text-right">주민등록번호</label>
                    <input type="text" value={employee.residentNumber || ''} className="flex-[2] min-w-[150px] p-2 rounded-md text-left text-gray-500" readOnly />
                </div>

                {/* 부서 */}
                <div className="flex items-center gap-2">
                    <label className="flex-1 min-w-[100px] text-gray-700 font-semibold text-right">부서</label>
                    <input type="text" value={employee.departmentName || ''} className="flex-[2] min-w-[150px] p-2 rounded-md text-left text-gray-500" readOnly />
                </div>

                {/* 계좌번호 */}
                <div className="flex items-center gap-2">
                    <label className="flex-1 min-w-[100px] text-gray-700 font-semibold text-right">계좌번호</label>
                    <input type="text" value={employee.accountNumber || ''} className="flex-[2] min-w-[150px] p-2 rounded-md text-left text-gray-500" readOnly />
                </div>

                {/* 직급 */}
                <div className="flex items-center gap-2">
                    <label className="flex-1 min-w-[100px] text-gray-700 font-semibold text-right">직급</label>
                    <input type="text" value={employee.positionName || ''} className="flex-[2] min-w-[150px] p-2 rounded-md text-left text-gray-500" readOnly />
                </div>
            </div>
        </div>
    );
};

export default Personal;
