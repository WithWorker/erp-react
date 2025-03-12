import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SearchBar from "../include/SearchBar";
import Header from "../include/Header";
import CategoryDropdown from "./CategoryDropdown";
import Sidebar from "../include/Sidebar";
import { ThreeDots } from "react-bootstrap-icons";

const departmentMap = {
    all: null,
    dev: 1,
    admin: 2,
    design: 3,
    security: 4,
    sales: 5,
    hr: 6,
};

const EmployeeListPage = () => {
const [query, setQuery] = useState("");
const [employees, setEmployees] = useState([]);
const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage = 8;

useEffect(() => {
    fetchEmployees();
}, []);

const fetchEmployees = async () => {
    try {
        const response = await fetch("api/employees", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        if (!response.ok) throw new Error("직원 목록 조회 실패");

        const data = await response.json();
        setEmployees(data);
        setCurrentPage(1);
    } catch (error) {
        console.error("Error:", error);
    }
};

const fetchEmployeesByDepartment = async (departmentKey) => {
const departmentId = departmentMap[departmentKey];
    if (!departmentId) {
        fetchEmployees();
        return;
    }

    try {
        const response = await fetch(`api/dept/${departmentId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        if (!response.ok) throw new Error("부서별 직원 조회 실패");

        const data = await response.json();
        setEmployees(data);
        setCurrentPage(1);
    } catch (error) {
        console.error("Error:", error);
        setEmployees([]);
    }
};

const handleSearch = async (name) => {
    try {
        const response = await fetch("api/name", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ name }),
        });
        if (!response.ok) throw new Error("검색 실패");

        const data = await response.json();
        setEmployees(Array.isArray(data) ? data : [data]);
        setCurrentPage(1);
    } catch (error) {
        console.error("검색 오류:", error);
        setEmployees([]);
    }
};

const totalPages = Math.ceil(employees.length / itemsPerPage);
const startIndex = (currentPage - 1) * itemsPerPage;
const currentEmployees = employees.slice(startIndex, startIndex + itemsPerPage);

const changePage = (page) => {
if (page >= 1 && page <= totalPages) setCurrentPage(page);
};

return (
<div className="flex h-screen bg-gray-100">
    <Sidebar />
    <div className="flex-1 p-6">
    <Header />
    <div>
        <div className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-4 w-full mb-6">
        <CategoryDropdown onSelectDepartment={fetchEmployeesByDepartment} />
        <SearchBar query={query} setQuery={setQuery} onSearch={handleSearch} />
        </div>
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
                <th className="p-2 text-center font-bold"></th>
            </tr>
            </thead>
            <tbody>
            {currentEmployees.map((employee) => (
                <tr key={employee.empId} className="hover:bg-gray-50 border-b">
                <td className="img-center">
                    <img src={employee.imgUrl || "/default-profile.png"} alt="프로필" className="ml-9 w-10 h-10 rounded-full" />
                </td>
                <td className="p-4 text-center">{employee.empId}</td>
                <td className="p-4 text-center">{employee.name}</td>
                <td className="p-4 text-center">{employee.departmentName}</td>
                <td className="p-4 text-center">{employee.positionName}</td>
                <td className="p-4 text-center">{employee.phone}</td>
                <td className="p-4 text-center">{employee.email}</td>
                <td className="p-4 text-center">
                    <button className="text-gray-500">
                    <ThreeDots size={20} />
                    </button>
                </td>
                </tr>
            ))}
            {currentEmployees.length === 0 && (
                <tr>
                <td colSpan="8" className="border p-2 text-center">
                    검색된 직원이 없습니다.
                </td>
                </tr>
            )}
            </tbody>
        </table>
        </div>

        {/* 페이지네이션 */}
        <div className="flex justify-center mt-4 space-x-2">
        <button onClick={() => changePage(currentPage - 1)} disabled={currentPage === 1} className="p-2 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50">
            <ChevronLeft size={20} />
        </button>

        {[...Array(totalPages)].map((_, index) => {
            const pageNumber = index + 1;
            return (
        <button
            key={pageNumber}
            onClick={() => changePage(pageNumber)}
            className={`px-3 py-1 rounded-lg ${
                currentPage === pageNumber ? "bg-[#006D2C] text-white" : "bg-gray-200 hover:bg-gray-300"
            }`}
        >
            {pageNumber}
        </button>
            );
        })}

        <button onClick={() => changePage(currentPage + 1)} disabled={currentPage === totalPages} className="p-2 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50">
            <ChevronRight size={20} />
        </button>
        </div>
    </div>
    </div>
</div>
);
};

export default EmployeeListPage;
