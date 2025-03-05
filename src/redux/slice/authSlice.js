// src/redux/slice/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
/* 
const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
const username = useSelector((state) => state.auth.username);
const error = useSelector((state) => state.auth.error);

*/


// 초기 상태
const initialState = {
  username: "",
  password: "",
  isAuthenticated: false,
  error: null,
  count: 0, // 추가됨
};

// 로그인 API 호출을 위한 비동기 액션
export const login = createAsyncThunk(
  'auth/login',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      // Mock 데이터로 로그인 확인
      const mockData = {
        user_no: 1,
        username: "testUser", // 임시 유저명
        password: "1234", // 임시 비밀번호
      };

      if (username === mockData.username && password === mockData.password) {
        return mockData; // 성공 시 반환값
      } else {
        return rejectWithValue("아이디 또는 비밀번호가 잘못되었습니다.");
      }
    } catch (error) {
      return rejectWithValue(error.message || "로그인 중 오류 발생");
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: { count: 0 },
  reducers: {
    increment: (state) => { state.count += 1; },
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    logout: (state) => {
      state.username = "";
      state.password = "";
      state.isAuthenticated = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.error = action.payload;
      });
  },
});

export const { increment, setUsername, setPassword, logout } = authSlice.actions;
export default authSlice;
