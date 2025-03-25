import React, { forwardRef, useState, useEffect } from 'react';

const SalarySlip = forwardRef(({ salary, year, month }, ref) => {
    const [employee, setEmployee] = useState({});
    const empId = localStorage.getItem("empId"); 

    useEffect(() => {
        fetch('/api/user/profile', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`, 
            },
            body: JSON.stringify({ empId }), 
        })
        .then((response) => response.json()) 
        .then((data) => setEmployee(data)) 
        .catch((error) => console.error("직원 데이터 가져오기 오류:", error));
    }, [empId]);

    // 금액 포맷 함수
    const formatCurrency = (value) => {
        return value !== undefined && value !== null ? value.toLocaleString() : '0';
    };

    return (
        <div ref={ref} className="max-w-3xl mx-auto mt-10 p-4 border rounded-xl shadow-md bg-white text-sm">
            <h2 className="text-xl font-bold text-center mb-4">급여 명세서</h2>
            {/* 직원 정보 */}
            <div className="grid grid-cols-4 gap-2 border border-gray-300">
                <div className="col-span-1 border-b border-r p-2 font-medium">사원번호</div>
                <div className="col-span-1 border-b p-2">{employee.empId || 'N/A'}</div>  
                
                <div className="col-span-1 border-b border-r p-2 font-medium">성명</div>
                <div className="col-span-1 border-b p-2">{employee.name || 'N/A'}</div>  
                
                <div className="col-span-1 border-b border-r p-2 font-medium">부서</div>
                <div className="col-span-1 border-b p-2">{employee.departmentName || 'N/A'}</div>  
                
                <div className="col-span-1 border-b border-r p-2 font-medium">직급</div>
                <div className="col-span-1 border-b p-2">{employee.positionName || 'N/A'}</div>  
                
                <div className="col-span-1 border-r p-2 font-medium">입사일</div>
                <div className="col-span-1 p-2">{employee.hireDate || 'N/A'}</div>  
                
                <div className="col-span-1 border-r p-2 font-medium">지급일자</div>
                <div className="col-span-1 p-2">{year}년 {month}월</div> 
            </div>
            {/* 공제항목 */}
            <div className="mt-4 border border-gray-300 text-center">
                <div className="grid grid-cols-2 bg-gray-100 font-medium border-b">
                    <div className="p-2 border-r">공제항목명</div>
                    <div className="p-2">금액</div>
                </div>
                {[
                    { name: "소득세", amount: 24660 },
                    { name: "지방소득세", amount: 2460 },
                    { name: "국민연금", amount: 82450 },
                    { name: "건강보험", amount: 100500 },
                    { name: "고용보험", amount: 15200 },
                    { name: "장기요양보험", amount: 10200 }
                ].map((deduction, index) => (
                    <div key={index} className="grid grid-cols-2 border-b">
                        <div className="p-2 border-r">{deduction.name}</div>
                        <div className="p-2">{formatCurrency(deduction.amount)}</div>
                    </div>
                ))}
                <div className="grid grid-cols-2 font-bold bg-gray-100">
                    <div className="p-2 border-r">합계</div>
                    <div className="p-2">{formatCurrency(235470)}</div>
                </div>
            </div>
            {/* 급여 정보 */}
            <div className="grid grid-cols-6 gap-2 mt-4 border border-gray-300 text-center font-medium">
                <div className="col-span-2 border-r p-2 bg-gray-100">지급총액</div>
                <div className="col-span-1 border-r p-2">{formatCurrency(salary.totalSalary)}</div>
                <div className="col-span-2 border-r p-2 bg-gray-100">공제총액</div>
                <div className="col-span-1 p-2">{formatCurrency(235470)}</div>
                <div className="col-span-3 border-t p-2 bg-gray-100">실지급액</div>
                <div className="col-span-3 border-t p-2">{formatCurrency(salary.totalSalary - 235470)}</div>
            </div>
        </div>
    );
});

export default SalarySlip;
