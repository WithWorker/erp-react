import React from 'react'
import { PencilSquare } from 'react-bootstrap-icons';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { setEmployee } from '../../../redux/slice/employeeSlice';


const Personal = () => {
  const employee = useSelector(state => state.employee.employee || {}, shallowEqual);
  const dispatch = useDispatch();

  const handleEdit = (key) => {
      const value = prompt(`새로운 ${key} 입력:`);
      if (value) {
        dispatch(setEmployee({ [key]: value }));
      }
    };
  
  return (
    <div className="w-1/3">
      <div className="w-full p-4 bg-white rounded-full mb-4 shadow flex justify-center flex-1 items-center">
        <h2 className='text-md font-bold'>개인정보 상세보기</h2>
      </div>
      <div className="p-4 bg-white rounded-3xl shadow">
        <div className='flex justify-between mt-3 ml-4 mr-4'>
          <div className="flex justify-start items-center space-x-14 mb-4">
            <h4 className="font-bold text-[#323232]">이름</h4>
            <span className="text-gray-600">{employee.name || '이름 없음'}</span>
          </div>
          <PencilSquare onClick={() => handleEdit('name')} className="cursor-pointer" />
        </div>
        <div className='flex justify-between mt-2 ml-4 mr-4'>
          <div className="flex justify-start items-center space-x-10 mb-4">
            <h4 className="font-bold text-[#323232]">이메일</h4>
            <span className='text-gray-600'>{employee.email || '이메일 없음'}</span>
          </div>
          <PencilSquare onClick={() => handleEdit('email')} className="cursor-pointer ml-2" />
        </div>
        <div className='flex justify-between mt-2 ml-4 mr-4'>
          <div className="flex justify-start items-center space-x-7 mb-4">
            <h4 className="font-bold text-[#323232]">전화번호</h4>
            <span className='text-gray-600'>{employee.phone || '전화번호 없음'}</span>
          </div>
          <PencilSquare onClick={() => handleEdit('phone')} className="cursor-pointer ml-2" />
        </div>
      </div>
    </div>
  )
}

export default Personal