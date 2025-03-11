import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slice/authSlice.js';  

const store = configureStore({
  reducer: {
    auth: authSlice.reducer
  },
});

// ✅ 로컬 스토리지에서 이벤트 불러오기 (오류 방지)
const loadEventsFromLocalStorage = () => {
  try {
    const savedEvents = localStorage.getItem('events');
    
    // ✅ null, undefined 또는 빈 문자열인 경우 기본값([]) 반환
    if (!savedEvents || savedEvents === "undefined") {
      return [];
    }

    return JSON.parse(savedEvents); // ✅ 정상적인 JSON 데이터라면 파싱
  } catch (error) {
    console.error("❌ 로컬 스토리지 데이터 파싱 오류:", error);
    return []; // ✅ JSON 파싱 실패 시 빈 배열 반환
  }
};

// ✅ Redux 스토어에 초기 상태 적용
const initialState = {
  events: loadEventsFromLocalStorage(),
};


// ✅ 상태 변경 후 로컬 스토리지에 저장
store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem('events', JSON.stringify(state.calendar.events || [])); // ✅ `undefined` 방지
});

export default store;
