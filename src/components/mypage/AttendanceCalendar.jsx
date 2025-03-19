import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const AttendanceCalendar = () => {
  const [attendance, setAttendance] = useState({});

  useEffect(() => {
    fetch('/api/attendance')
      .then((response) => response.json())
      .then((data) => {
        setAttendance(data.attendance);
      })
      .catch((error) => console.error("Error fetching attendance data:", error));
  }, []);

  return (
    <div className="w-full flex flex-col items-center">
      <div className="p-8 bg-white rounded-3xl mb-8 shadow">
        <div className='ml-8 mr-8'>
          <div className="flex flex-1 justify-between items-center space-y-4">
            <h4 className="font-bold text-[#323232]">근태정보</h4>
          </div>
        </div>
        <Calendar className={'w-full border-none p-3 text-[#323232]'} />
      </div>
    </div>
  );
};

export default AttendanceCalendar;
