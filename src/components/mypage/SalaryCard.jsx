import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'react-bootstrap-icons';

const SalaryCard = () => {
    const [salary, setSalary] = useState({});
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
    const empId = localStorage.getItem("empId"); 

    useEffect(() => {
        // 급여 조회 API 호출
        fetch(`/api/paymentHistory/${empId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                year: currentYear,
                month: currentMonth
            }), 
        })
        .then((response) => response.json())
        .then((data) => {
            const baseSalary = data.find(item => item.type === 'SALARY')?.amount || 0;
            const bonusSalary = data.find(item => item.type === 'BONUS')?.amount || 0;
            setSalary({
                baseSalary,
                bonusSalary,
                totalSalary: baseSalary + bonusSalary, 
            });
        })
        .catch((error) => console.error("Error fetching salary data:", error));
    }, [currentYear, currentMonth, empId]);

    const handlePrevMonth = () => {
        if (currentMonth === 1) {
            setCurrentMonth(12);
            setCurrentYear((prevYear) => prevYear - 1);
        } else {
            setCurrentMonth((prevMonth) => prevMonth - 1);
        }
    };

    const handleNextMonth = () => {
        if (currentMonth === 12) {
            setCurrentMonth(1);
            setCurrentYear((prevYear) => prevYear + 1);
        } else {
            setCurrentMonth((prevMonth) => prevMonth + 1);
        }
    };

    const formatCurrency = (value) => {
        return value !== undefined && value !== null ? value.toLocaleString() : '0';
    };

    return (
        <div className="w-1/3">
            <div className="w-full p-4 bg-white rounded-full mb-4 shadow flex justify-center flex-1 items-center border-2 border-[#006D2C]">
                <h2 className='text-md font-bold'>급여정보</h2>
            </div>
            <div className="p-4 bg-white rounded-3xl shadow">
                <div className="flex justify-between items-center mb-4">
                    <button onClick={handlePrevMonth} className="text-gray-500 hover:text-gray-700">
                        <ArrowLeft />
                    </button>
                    <h2 className="text-lg font-semibold">
                        {currentYear}년 {currentMonth}월
                    </h2>
                    <button onClick={handleNextMonth} className="text-gray-500 hover:text-gray-700">
                        <ArrowRight />
                    </button>
                </div>
                <div className="flex flex-col justify-center flex-1 items-center">
                    <p className='mb-4'>기본급: {formatCurrency(salary.baseSalary)}원</p>
                    {salary.bonusSalary > 0 && <p className='mb-4'>성과급: {formatCurrency(salary.bonusSalary)}원</p>} {/* 성과급이 있을 경우만 표시 */}
                    <p className="font-semibold">총 급여: {formatCurrency(salary.totalSalary)}원</p>
                </div>
            </div>
        </div>
    );
};

export default SalaryCard;
