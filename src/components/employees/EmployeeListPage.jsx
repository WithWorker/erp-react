import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { ThreeDots } from "react-bootstrap-icons";
import Sidebar from "../include/Sidebar";
import Header from "../include/Header";
import SearchBar from "../include/SearchBar";
import DepartmentDropdown from "./DepartmentDropdown";
import Pagination from "./Pagination";
import AdminModal from "./AdminModal";  

const departmentMap = {
  '전체보기': null,
  '개발': 1,
  '경영': 2,
  '디자인': 3,
  '보안': 4,
  '영업': 5,
  '인사': 6,
};

const EmployeeListPage = () => {
  const navigate = useNavigate();
  
  const [query, setQuery] = useState("");
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageGroup, setPageGroup] = useState(0);
  const itemsPerPage = 8;
  const [department, setDepartment] = useState("전체보기");
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const isAdmin = localStorage.getItem("role") === "ROLE_ADMIN";

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await fetch("/api/user/employees", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
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
    setDepartment(departmentKey);
    const departmentId = departmentMap[departmentKey];
    if (!departmentId) {
      fetchEmployees();
      return;
    }

    try {
      const response = await fetch(`/api/user/dept/${departmentId}`, {
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
      const response = await fetch("/api/user/name", {
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

  const handleEditClick = (empId) => {
    setSelectedEmployeeId(empId); 
    setIsModalOpen(true);
  };

  const handleEditConfirm = () => {
    navigate(`/admin/update/${selectedEmployeeId}`); 
    setIsModalOpen(false); 
  };

  const handleModalClose = () => {
    setIsModalOpen(false); 
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-6">
        <Header />
        <div>
          <div className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-4 w-full mb-6">
            <div className="flex items-center space-x-4 w-full">
              <div className="flex-none w-[200px]">
                <DepartmentDropdown onSelectDepartment={fetchEmployeesByDepartment} />
              </div>
              <div className="flex-none w-[400px]">
                <SearchBar query={query} setQuery={setQuery} onSearch={handleSearch} />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto bg-white shadow-lg rounded-3xl p-4 w-full border-none">
            <table className="w-full table-auto border-none border-spacing-0 items-center">
              <thead>
                <tr className="text-[#323232] text-sm">
                  <th className="p-2 text-center font-bold">프로필</th>
                  <th className="p-2 text-center font-bold">이름</th>
                  <th className="p-2 text-center font-bold">부서</th>
                  <th className="p-2 text-center font-bold">직급</th>
                  <th className="p-2 text-center font-bold">전화번호</th>
                  <th className="p-2 text-center font-bold">이메일</th>
                  <th className="p-2 text-center font-bold">입사일</th>
                  <th className="p-2 text-center font-bold">상태</th>
                  <th className="p-2 text-center font-bold"></th>
                </tr>
              </thead>
              <tbody>
                {currentEmployees.map((employee) => (
                  <tr key={employee.empId} className="hover:bg-gray-50 border-b">
                    <td className="img-center">
                      <img
                        src={`http://localhost:7777/${employee.imgUrl}`}
                        alt="프로필"
                        className="ml-9 w-10 h-10 rounded-full"
                      />
                    </td>
                    <td className="p-4 text-center">{employee.name}</td>
                    <td className="p-4 text-center">{employee.departmentName}</td>
                    <td className="p-4 text-center">{employee.positionName}</td>
                    <td className="p-4 text-center">{employee.phone}</td>
                    <td className="p-4 text-center">{employee.email}</td>
                    <td className="p-4 text-center">{employee.hireDate}</td>
                    <td className="p-4 text-center">
                      <span
                        className={`px-2 py-1 text-sm rounded-full ${employee.memberRole === "USER"? "border-2 border-green-500 text-green-500 bg-white"
                            : employee.memberRole === "SUSPENDED"? "border-2 border-yellow-500 text-yellow-500 bg-white"
                            : "border-2 border-[#006D2C] text-[#006D2C] bg-white"}`}>
                      {employee.memberRole === "USER" ? "재직" : employee.memberRole === "SUSPENDED" ? "퇴사" : "-"}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                    {isAdmin && (
                      <button
                        onClick={() => handleEditClick(employee.empId)}
                        className="text-gray-500"
                      >
                        <ThreeDots size={20} />
                      </button>
                    )}
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
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            pageGroup={pageGroup}
            setCurrentPage={setCurrentPage}
            setPageGroup={setPageGroup}
          />
        </div>
      </div>

    {/* 모달 */}
    {isModalOpen && (
      <AdminModal
        onClose={handleModalClose}
        onEditConfirm={handleEditConfirm}
        employeeId={selectedEmployeeId}
        fetchEmployees={fetchEmployees} 
      />
    )}
    </div>
  );
};

export default EmployeeListPage;
