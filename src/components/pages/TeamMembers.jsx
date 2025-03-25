import React, { useEffect } from 'react'
import { loadEmployees  } from '../../redux/slice/employeeSlice';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

const TeamMembers = () => {
  const dispatch = useDispatch();
  // Redux에서 직원 데이터 가져오기 (직원 리스트)
  const employees = useSelector(state => state.employee.employees, shallowEqual);
  const defaultProfileImage = "https://example.com/default-profile.jpg"; // 기본 프로필 이미지 URL

  // 직원 데이터를 불러오는 액션 dispatch
  useEffect(() => {
    dispatch(loadEmployees());
  }, [dispatch]);

  return (
    <div className="w-full h-[330px] bg-white p-8 rounded-3xl shadow-lg">
      <h2 className="font-bold mb-4 text-[#323232]">팀원</h2>
      <div className="flex space-x-4 flex-row">
        {/* employees가 배열일 경우만 map 실행 */}
        {Array.isArray(employees) && employees.length > 0 ? (
          employees.map((employee) => (
          <div key={employee.id} className="ml-2 flex flex-col items-center justify-center">
            {/* 프로필 사진이 있는 경우, 해당 사진을 표시 */}
            <img
              src={employee.profilePicture || defaultProfileImage} 
              alt={`${employee.name} 프로필`}
              className="w-16 h-16 rounded-full object-cover"
              />
              <p className="mr-2 text-[#323232]">{employee.name}</p>
            </div>
          ))
        ) : (
          <p>직원이 없습니다.</p>
        )}
      </div>
    </div>
  )
}

export default TeamMembers