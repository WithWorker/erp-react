// src/components/WorkStatusCalendar.jsx
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { shallowEqual, useSelector } from 'react-redux';

const WorkStatusCalendar = () => {
  const { attendance = {}, remainingLeave = 0, usedLeave = 0 } = useSelector(
    //state => state.employee.employee || {},
    state => state.attendance, // 수정: employee가 아닌 attendance 상태에서 가져오기
    shallowEqual
  );

  /* const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const day = date.toISOString().split('T')[0];
      if (attendance[day]) {
        return <span className="text-green-500">{attendance[day]}</span>;
      }
    }
  }; */

  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const day = date.toISOString().split('T')[0]; // YYYY-MM-DD 형태로 날짜 추출
      const attendanceData = attendance[day];

      if (attendanceData) {
        let label = ''; // 표시할 텍스트 초기화

        // 출퇴근한 날은 시간:분:초 순으로 표시
        if (attendanceData.type === 'work') {
          label = `${attendanceData.time}`; // 출근 시간:퇴근 시간
        }
        // 휴가일 경우
        else if (attendanceData.type === 'vacation') {
          label = '휴가';
        }
        // 반반차일 경우
        else if (attendanceData.type === 'half-vacation') {
          label = '반반차';
        }

        return (
          <div className="flex flex-col items-center mt-2">
            <span className="text-[#006D2C]">{label}</span>
          </div>
        );
      }
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="p-8 bg-white rounded-3xl mb-8 shadow">
        <div className='ml-8 mr-8'>
          <div className="flex flex-1 justify-between items-center space-y-4">
            <h4 className="font-bold text-[#323232]">근태관리</h4>
              <div className='flex flex-1 justify-end items-center space-x-4'>
              <span className='font-semibold text-[#006D2C]'>남은 연차: {remainingLeave}일</span>
              <span className='font-semibold text-[#323232]'>사용 연차: {usedLeave}일</span>
            </div>
          </div>
        </div>
        <Calendar 
          className={'w-full border-none p-3 text-[#323232]'}
          tileContent={tileContent} 
        />
      </div>
    </div>
  );
};

export default WorkStatusCalendar;
