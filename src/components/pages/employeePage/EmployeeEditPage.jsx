import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { updateEmployee } from '../../../redux/slice/employeeSlice';

const EmployeeEditPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const employee = useSelector(state => state.employee.employees.find(emp => emp.id === Number(id)));

  const [formData, setFormData] = useState({
    employeeId: '',
    name: '',
    department: '',
    position: '',
    phone: '',
    email: '',
    status: 'active',
    profileImage: null
  });

  useEffect(() => {
    if (employee) {
      setFormData({ ...employee });
    }
  }, [employee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setFormData(prev => ({ ...prev, profileImage: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedEmployee = {
      ...formData,
      profileImage: formData.profileImage ? URL.createObjectURL(formData.profileImage) : employee.profileImage
    };
    await dispatch(updateEmployee(updatedEmployee));
    navigate('/employee');
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4">직원 정보 수정</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* 프로필 업로드 */}
        <div>
          <label className="block text-sm font-medium">프로필 이미지</label>
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleImageUpload} 
            className="border-gray-300 border rounded-md w-full"
          />
        </div>

        {/* 나머지 입력값은 위와 동일 */}
        {Object.keys(formData).map((key) => (
          key !== 'profileImage' && (
            <div key={key}>
              <label className="block text-sm font-medium">{key}</label>
              <input 
                type="text" 
                name={key} 
                value={formData[key]} 
                onChange={handleChange} 
                className="border-gray-300 border rounded-md w-full"
              />
            </div>
          )
        ))}

        <div>
          <button type="submit" className="bg-green-500 text-white py-2 rounded-md w-full">
            수정하기
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeEditPage;
