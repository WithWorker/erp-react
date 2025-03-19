import React, { useState, useEffect } from 'react';

const Personal = () => {
    const [employee, setEmployee] = useState({});

    useEffect(() => {
    // 예시 API 호출 (스프링에서 제공하는 API를 호출하도록 수정)
    fetch('/api/employee')
        .then((response) => response.json())
        .then((data) => setEmployee(data))
        .catch((error) => console.error("Error fetching employee data:", error));
    }, []);

    return (
    <div className="w-1/3">
        <div className="w-full p-4 bg-white rounded-full mb-4 shadow flex justify-center flex-1 items-center border-2 border-[#006D2C]">
            <h2 className='text-[#006D2C] text-md font-bold'>개인정보</h2>
        </div>
        <div className="p-4 bg-white rounded-3xl shadow">
            <div className='flex justify-between mt-3 ml-4 mr-4'>
                <div className="flex justify-start items-center space-x-14 mb-4">
                    <h4 className="font-bold text-[#323232]">이름</h4>
                    <span className="text-gray-600">{employee.name || '이름 없음'}</span>
                </div>
            </div>
        <div className='flex justify-between mt-2 ml-4 mr-4'>
            <div className="flex justify-start items-center space-x-10 mb-4">
                <h4 className="font-bold text-[#323232]">이메일</h4>
                <span className='text-gray-600'>{employee.email || '이메일 없음'}</span>
            </div>
        </div>
            <div className='flex justify-between mt-2 ml-4 mr-4'>
                <div className="flex justify-start items-center space-x-7 mb-4">
                    <h4 className="font-bold text-[#323232]">전화번호</h4>
                    <span className='text-gray-600'>{employee.phone || '전화번호 없음'}</span>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Personal