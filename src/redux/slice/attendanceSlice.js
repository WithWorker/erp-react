import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isWorking: false,
  attendance: {
    // 날짜별 출퇴근 시간, 휴가, 반반차 정보
    "2025-03-19": {
      type: "work", // 출근
      time: "09:00:00 - 18:00:00", // 출근시간:퇴근시간
    },
    "2025-03-20": {
      type: "vacation", // 휴가
    },
    "2025-03-21": {
      type: "half-vacation", // 반반차
    },
    // 여기에 날짜별로 다른 정보들을 추가할 수 있음
  },
};

const attendanceSlice = createSlice({
  name: "attendance",
  initialState,
  reducers: {
    clockIn: (state) => {
      state.isWorking = true;
    },
    clockOut: (state) => {
      state.isWorking = false;
    },
    addAttendance: (state, action) => {
      const { date, type, time } = action.payload;
      state.attendance[date] = { type, time };
    },
  },
});

export const { clockIn, clockOut, addAttendance } = attendanceSlice.actions;
export default attendanceSlice;
