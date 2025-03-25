import React from 'react'
import { ThreeDots } from 'react-bootstrap-icons'

const Notice = () => {
  return (
    <div className="w-full h-[330px] bg-white p-8 rounded-3xl shadow-lg">
      <h2 className="text-lg font-bold mb-3">공지사항</h2>
      <p className="text-[#D32F2F] font-semibold p-3 bg-gray-100 flex justify-between items-center">2분기 워크숍 진행합니다. (필독) <ThreeDots /></p>
      <p className='text-[#323232] font-semibold p-3 bg-white flex justify-between items-center'>2분기 워크숍 진행합니다. <ThreeDots /></p>
      <p className='text-[#323232] font-semibold p-3 bg-gray-100 flex justify-between items-center'>2분기 워크숍 진행합니다. <ThreeDots /></p>
      <p className='text-[#323232] font-semibold p-3 bg-white flex justify-between items-center'>2분기 워크숍 진행합니다. <ThreeDots /></p>
    </div>
  )
}

export default Notice