import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
//import { fetchEmployees } from '../../service/employeeService';

/* 백엔드 연결시 해제
export const loadEmployees = createAsyncThunk('employee/loadEmployees', async () => {
  const response = await fetchEmployees();
  return response.data;
});
 */
// mockData는 실제 백엔드 API를 통해 데이터를 받아오는 방식으로 수정할 수 있습니다.
const mockData = [
  {
    id: 1,
    employeeId: 'WW001',
    name: '김민수',
    department: '개발팀',
    position: '팀장',
    phone: '010-0011-2233',
    email: 'kimminsoo@withworker.com',
    status: '외근',
  },
  {
    id: 2,
    employeeId: 'WW002',
    name: '나신일',
    department: '개발팀',
    position: '팀원',
    phone: '010-1122-3344',
    email: 'nasinyip@withworker.com',
    status: '출근',
  },
  {
    id: 3,
    employeeId: 'WW003',
    name: '이지은',
    department: '디자인팀',
    position: '팀원',
    phone: '010-3344-5566',
    email: 'leejieun@withworker.com',
    status: '연차',
  },
];


export const loadEmployees = createAsyncThunk('employee/loadEmployees', async () => {
  // 백엔드 연결 없이 mock data 사용
  return mockData;
});

const initialState = {
  employees: [], // 실제 직원 정보만 저장
  status: 'idle',
  searchQuery: '',  // 검색어 상태 추가
  category: 'all',  // 카테고리 상태
  error: null,
};

const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;  // 검색어 상태 업데이트
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;  // 카테고리 상태 업데이트
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadEmployees.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loadEmployees.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.employees = action.payload || [];
      })
      .addCase(loadEmployees.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
}
);

export const { setSearchQuery, setStatus, setCategory } = employeeSlice.actions;

export default employeeSlice.reducer;
