// src/components/ProfileCard.jsx
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { setEmployee } from '../../../redux/slice/employeeSlice';

const ProfileCard = () => {
  const employee = useSelector(state => state.employee.employee || {}, shallowEqual);
  const dispatch = useDispatch();

  const handleEdit = (key) => {
    const value = prompt(`새로운 ${key} 입력:`);
    if (value) {
      dispatch(setEmployee({ [key]: value }));
    }
  };

  return (
    <div className="w-1/3 p-4 bg-white rounded-3xl shadow">
      <div className="flex items-center gap-4">
        <img src="/profile.jpg" alt="profile" className="w-24 h-24 rounded-full" />
        
      </div>
    </div>
  );
};

export default ProfileCard;
