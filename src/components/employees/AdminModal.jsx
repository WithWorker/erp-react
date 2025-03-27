import { useState } from "react";
import { X } from "react-bootstrap-icons";
import { BsPencil, BsTrash, BsFillPersonXFill } from "react-icons/bs";

const AdminModal = ({ onClose, onEditConfirm, employeeId, fetchEmployees }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 직원 삭제
  const handleDeleteEmployee = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/admin/delete/${employeeId}`, {
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

  // 퇴사 처리
  const handleResignEmployee = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/admin/resign/${employeeId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
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

        <div className="text-center mb-4 text-lg font-bold text-[#006D2C]">
          관리자 권한
        </div>

        {error && (
          <div className="text-red-500 text-center mb-4">{error}</div>
        )}

        <div className="flex flex-col mt-3 gap-2">
          <button
            className="px-14 py-2 border-2 border-[#323232] rounded-lg flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#006D2C] hover:text-white hover:border-[#006D2C] focus:outline-none focus:ring-2 focus:ring-[#006D2C] focus:ring-opacity-50"
            onClick={onEditConfirm}
          >
            <BsPencil size={20} className="mr-2" />
            직원수정
          </button>
          <button
            className="px-14 py-2 border-2 border-[#323232] rounded-lg flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#006D2C] hover:text-white hover:border-[#006D2C] focus:outline-none focus:ring-2 focus:ring-[#006D2C] focus:ring-opacity-50"
            onClick={handleDeleteEmployee}
            disabled={loading}
          >
            <BsTrash size={20} className="mr-2" />
            직원삭제
          </button>
          <button
            className="px-14 py-2 border-2 border-[#323232] rounded-lg flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#006D2C] hover:text-white hover:border-[#006D2C] focus:outline-none focus:ring-2 focus:ring-[#006D2C] focus:ring-opacity-50"
            onClick={handleResignEmployee}
            disabled={loading}
          >
            <BsFillPersonXFill size={20} className="mr-2" />
            퇴사처리
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminModal;
