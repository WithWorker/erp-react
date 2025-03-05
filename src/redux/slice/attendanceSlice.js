import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isWorking: false,
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
  },
});

export const { clockIn, clockOut } = attendanceSlice.actions;
export default attendanceSlice;
