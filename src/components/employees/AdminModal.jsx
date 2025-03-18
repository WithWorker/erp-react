import { useState } from "react";
import { X } from "react-bootstrap-icons";

const AdminModal = ({ onClose, onEditConfirm, onAddEmployee, employeeId, fetchEmployees }) => {
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);

//직원 삭제
const handleDeleteEmployee = async () => {
    setLoading(true);
    try {
        const response = await fetch(`/api/delete/${employeeId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
    if (!response.ok) throw new Error("직원 삭제 실패");
        alert("직원 삭제가 완료되었습니다.");
        onClose(); 
        fetchEmployees();
    } catch (error) {
        setError("직원 삭제 중 오류가 발생했습니다.");
        console.error("Error:", error);
    } finally {
        setLoading(false);
    }
};

//퇴사 처리
const handleResignEmployee = async () => {
    setLoading(true);
    try {
        const response = await fetch(`/api/resign/${employeeId}`, {
            method: "PUT",  
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
    if (!response.ok) throw new Error("퇴사 처리 실패");
        alert("퇴사 처리가 완료되었습니다.");
        onClose(); 
        fetchEmployees();
    } catch (error) {
        setError("퇴사 처리 중 오류가 발생했습니다.");
        console.error("Error:", error);
    } finally {
        setLoading(false);
    }
};

return (
    <div className="fixed inset-0 bg-[#323232] bg-opacity-80 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-xl relative">
        <button
            className="absolute top-2 right-2 text-[#323232] bg-white rounded-md"
            onClick={onClose}
        >
            <X size={24} />
        </button>

        <div className="text-center mb-4 text-lg font-bold">
            관리자 권한
        </div>

        {error && (
            <div className="text-red-500 text-center mb-4">{error}</div>
        )}

        <div className="flex flex-col mt-3 gap-2">
            <button
            className="px-14 py-2 border-2 border-[#006D2C] text-[#006D2C] rounded-lg" 
            onClick={onAddEmployee}
            >
            직원 등록
            </button>
            <button
            className="px-14 py-2 border-2 border-[#006D2C] text-[#006D2C] rounded-lg"
            onClick={onEditConfirm}
            >
            직원 수정
            </button>
            <button
            className="px-14 py-2 border-2 border-[#006D2C] text-[#006D2C] rounded-lg"
            onClick={handleDeleteEmployee}  
            disabled={loading}  
            >
            직원 삭제
            </button>
            <button
            className="px-14 py-2 border-2 border-[#006D2C] text-[#006D2C] rounded-lg"
            onClick={handleResignEmployee}  
            disabled={loading}  
            >
            퇴사 처리
            </button>
        </div>
        </div>
    </div>
    );
};

export default AdminModal;
