import React, { forwardRef } from 'react';

const SalarySlip = forwardRef(({ salary, year, month }, ref) => {
    const formatCurrency = (value) => {
        return value !== undefined && value !== null ? value.toLocaleString() : '0';
    };

    return (
        <div ref={ref} className="p-6 w-full max-w-md mx-auto bg-white border rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-center mb-4">급여 명세서</h2>
            <p className="text-center text-lg">{year}년 {month}월</p>
            <div className="mt-4 border-t pt-4">
                <p className="mb-2"><strong>기본급:</strong> {formatCurrency(salary.baseSalary)}원</p>
                {salary.bonusSalary > 0 && <p className="mb-2"><strong>성과급:</strong> {formatCurrency(salary.bonusSalary)}원</p>}
                <p className="font-semibold"><strong>총 지급액:</strong> {formatCurrency(salary.totalSalary)}원</p>
            </div>
        </div>
    );
});

export default SalarySlip;
