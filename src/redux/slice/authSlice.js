import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// 초기 상태
const initialState = {
  email: "",
  password: "",
  isAuthenticated: false,
  error: null,
  count: 0, // 추가됨
};

// 로그인 API 호출을 위한 비동기 액션
export const login = createAsyncThunk(
  'api/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/login', { email, password });

      // 서버 응답 예시: { success: true, token: 'JWT_TOKEN', user: { email: 'testUser' }}
      if (response.data.success) {
        return { token: response.data.token, user: response.data.user }; // 로그인 성공 시 토큰과 사용자 정보를 반환
      } else {
        return rejectWithValue(response.data.message || "아이디 또는 비밀번호가 잘못되었습니다.");
      }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "로그인 중 오류 발생");
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: { count: 0 },
  reducers: {
    increment: (state) => { state.count += 1; },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    logout: (state) => {
      state.email = "";
      state.password = "";
      state.isAuthenticated = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.email = action.payload.user.email; // 서버에서 받은 email을 상태에 저장
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.error = action.payload;
      });
  },
});

export const { increment, setEmail, setPassword, logout } = authSlice.actions;
export default authSlice;
