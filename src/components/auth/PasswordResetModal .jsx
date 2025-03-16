import React, { useState } from 'react';
import axios from 'axios';

const PasswordResetModal = ({ showModal, closeModal }) => {
const [resetPwdForm, setResetPwdForm] = useState({
    phone: '',
    password: '',
    repassword: ''
});
const [resetPwdMessage, setResetPwdMessage] = useState(null);

const handleInputChange = (event) => {
const { name, value } = event.target;
setResetPwdForm((prev) => ({ ...prev, [name]: value }));
};

const resetPassword = async () => {
const { phone, password, repassword } = resetPwdForm;

try {
    const response = await axios.put('/api/find', { phone, password, repassword });

    if (response.data.success) {
    alert('비밀번호 재설정에 성공했습니다.');
    closeModal();
    } else {
    alert('비밀번호 재설정에 실패했습니다.');
    setResetPwdMessage('비밀번호 재설정에 실패했습니다.');
    }
} catch (err) {
    alert('비밀번호 재설정 중 오류가 발생했습니다.');
}
};

return (
showModal && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div className="bg-white p-7 rounded-lg w-88">
        <h2 className="text-[#323232] text-center text-lg font-semibold">비밀번호 재설정</h2>
        <form
        onSubmit={(e) => {
            e.preventDefault();
            resetPassword();
        }}
        >
        <div className="mb-4">
            <label htmlFor="phone" className="block text-[#323232]">전화번호</label>
            <input
            type="text"
            id="phone"
            name="phone"
            className="w-full p-2 border rounded-lg"
            placeholder="전화번호를 입력하세요"
            value={resetPwdForm.phone}
            onChange={handleInputChange}
            required
            />
        </div>
        <div className="mb-4">
            <label htmlFor="password" className="block text-[#323232]">새로운 비밀번호</label>
            <input
            type="password"
            id="password"
            name="password"
            className="w-full p-2 border rounded-lg"
            placeholder="새로운 비밀번호를 입력하세요"
            value={resetPwdForm.password}
            onChange={handleInputChange}
            required
            />
        </div>
        <div className="mb-4">
            <label htmlFor="repassword" className="block text-[#323232]">비밀번호 재입력</label>
            <input
            type="password"
            id="repassword"
            name="repassword"
            className="w-full p-2 border rounded-lg"
            placeholder="비밀번호를 다시 입력하세요"
            value={resetPwdForm.repassword}
            onChange={handleInputChange}
            required
            />
        </div>
        {resetPwdMessage && (
            <div className="mt-3 text-start text-center">
            <p className="result-box text-danger">{resetPwdMessage}</p>
            </div>
        )}
        <div className="flex justify-between gap-2 mt-4">
            <button
            type="submit"
            className="text-white bg-[#006D2C] p-2 w-32 rounded-lg hover:bg-[#004B1D]"
            >
            확인
            </button>
            <button
            type="button"
            className="text-white bg-gray-400 p-2 w-32 rounded-lg hover:bg-[#323232]"
            onClick={closeModal}
            >
            닫기
            </button>
        </div>
        </form>
    </div>
    </div>
)
);
};

export default PasswordResetModal;
