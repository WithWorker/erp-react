// calendarSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  events: JSON.parse(localStorage.getItem('events')) || [], // 로컬 스토리지에서 초기값 가져오기,
  category: 'all', // 카테고리 상태 (필터링용)
};

const calendarSlice = createSlice({
  name: 'calendar',
  initialState, // initialState 바로 사용

  reducers: {
    setEvents: (state, action) => {
      state.events = action.payload;
    },

    setCategory(state, action) {
      state.category = action.payload; // 카테고리 업데이트
    },
    addEvent(state, action) {
      console.log("Current State:", state); // ✅ 상태 출력해서 확인
      console.log("Current Events:", state.events); // ✅ events가 undefined인지 체크

      //if (!state.events) {
      //  state.events = []; // ✅ events가 undefined이면 빈 배열로 초기화
      //}

      state.events.push(action.payload); // ✅ 이제 안전하게 추가 가능
      localStorage.setItem('events', JSON.stringify(state.events)); // 이벤트 추가 후 로컬 스토리지에 저장
    },
    removeEvent(state, action) {
      state.events = state.events.filter(event => event.id !== action.payload);
      localStorage.setItem('events', JSON.stringify(state.events)); // 이벤트 삭제 후 로컬 스토리지에 저장
    },
    loadEvents(state, action) {
      state.events = action.payload;
    },
    // 참석자 추가 액션
    addAttendee: (state, action) => {
      const event = state.events.find(event => event.id === action.payload.eventId);
      if (event) {
        event.participants.push(action.payload.participant);
      }
    },
  }
});

// ✅ 액션과 리듀서 내보내기
export const { setEvents, setCategory, addEvent, removeEvent, loadEvents, addAttendee } = calendarSlice.actions;
export default calendarSlice.reducer; // ✅ 올바른 내보내기
