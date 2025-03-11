import { createSlice } from '@reduxjs/toolkit';

// localStorage에서 기존 메시지 불러오기
const loadMessages = () => {
  const savedMessages = localStorage.getItem('chatMessages');
  return savedMessages ? JSON.parse(savedMessages) : [];
};

const initialState = {
  /* messages: [], */
  messages: loadMessages(),
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    // 메시지 추가
    addMessage: (state, action) => {
      state.messages.push(action.payload);
      localStorage.setItem('chatMessages', JSON.stringify(state.messages));
    },
    // 메시지 삭제
    deleteMessage: (state, action) => {
      state.messages = state.messages.filter((msg) => msg.id !== action.payload);
      localStorage.setItem('chatMessages', JSON.stringify(state.messages));
    },
    // 전체 메시지 초기화
    clearMessages: (state) => {
      state.messages = [];
      localStorage.removeItem('chatMessages');
    },
  },
});

export const { addMessage, deleteMessage, clearMessages } = chatSlice.actions;

export default chatSlice.reducer;
