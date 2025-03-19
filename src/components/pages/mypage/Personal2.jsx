import React from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

const Personal2 = () => {
    const employee = useSelector(state => state.employee.employee || {}, shallowEqual);
  
    
  return (
    <div className="w-full">
      <div className="p-8 bg-white rounded-full mb-8 shadow">
        <div className='flex justify-between ml-8 mr-8'>
          <div className="flex justify-start items-center space-x-14">
            <h4 className="font-bold text-[#323232]">입사날짜</h4>
            <span className="text-gray-600">{employee.incom || '입사일 없음'}</span>
          </div>
          <div className="flex justify-start items-center space-x-14">
            <h4 className="font-bold text-[#323232]">부서명</h4>
            <span className="text-gray-600">{employee.department || '부서 없음'}</span>
          </div>
          <div className="flex justify-start items-center space-x-14">
            <h4 className="font-bold text-[#323232]">직급명</h4>
            <span className="text-gray-600">{employee.position || '직급 없음'}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Personal2