import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
//import axios from 'axios';
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
    incom: '2020.03.01',
    outcom: '재직중',
    position: '팀장',
    phone: '010-0011-2233',
    email: 'kimminsoo@withworker.com',
    status: '외근',
    salary: {
      '2025-02': { base: '2,500,000', bonus: '500,000', total: '3,000,000' },
      '2025-03': { base: '2,500,000', bonus: null, total: '2,500,000' }, // 성과급 없음
      '2025-04': { base: '2,500,000', bonus: '700,000', total: '3,200,000' }
    },
    remainingLeave: 15,
    usedLeave: 1.25,
    attendance: {
      '2025-03-01': '출근',
      '2025-03-11': '연차',
      '2025-03-15': '출근',
      '2025-03-18': '조퇴',
      '2025-03-20': '출근'
    }
  },
  {
    id: 2,
    employeeId: 'WW002',
    name: '나신일',
    department: '개발팀',
    incom: '01.02.03',
    outcom: '11.02.04',
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

// 직원 추가
export const addEmployee = createAsyncThunk(
  'employee/addEmployee', 
  async (newEmployee) => {
    //const response = await axios.post('/api/employees', newEmployee);
    return response.data;
});

// 직원 수정
export const updateEmployee = createAsyncThunk('employee/updateEmployee', async (updatedEmployee) => {
  const response = await axios.put(`/api/employee/${updatedEmployee.id}`, updatedEmployee);
  return response.data;
});

export const loadEmployees = createAsyncThunk('employee/loadEmployees', async () => {
  /* const response = await axios.get('/api/employees');
  return response.data; */
  // 백엔드 연결 없이 mock data 사용
  return mockData;
});

const initialState = {
  salaryFormData: {
    year: '',  // 초기값 설정
    month: '',    // 초기값 설정
    day: '',      // 초기값 설정
  },
  bonusFormData: {
    year: '',
    month: '',
    day: '',
  },
  employees: {}, // 실제 직원 정보만 저장
  status: 'idle', // 'idle', 'loading', 'succeeded', 'failed'
  searchQuery: '',  // 검색어 상태 추가
  category: 'all',  // 카테고리 상태
  isAdmin: true, // 관리자 권한 강제 활성화
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
    addEmployee: (state, action) => {
      state.employees.push(action.payload);
    },
    setEmployees: (state, action) => {
      state.employees = action.payload;
    },
    updateSalary: (state, action) => {
      // formData 값 업데이트
      state.salaryFormData = { ...action.payload };
    },
    updateBonus: (state, action) => {
      // formData 값 업데이트
      state.bonusFormData = { ...action.payload };
    },

    // 수정된 부분 ✅
    setEmployee: (state, action) => {
      if (state.employee) {
        state.employee = { ...state.employee, ...action.payload };
      }
    },
    loadEmployees: (state, action) => {
      // 예시로, 데이터를 서버에서 가져오는 것처럼 처리
      // 실제로는 API 호출을 해서 데이터를 가져오거나, store 상태를 업데이트
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addEmployee.fulfilled, (state, action) => {
        // 새로 추가된 직원 정보를 employees 배열에 추가
        state.employees.push(action.payload);
      })
      .addCase(updateEmployee.fulfilled, (state, action) => {
        const index = state.employees.findIndex(e => e.id === action.payload.id);
        state.employees[index] = action.payload;
      })
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
});

export const { setEmployee, setSearchQuery, setStatus, setCategory, updateSalary, updateBonus } = employeeSlice.actions;

export default employeeSlice.reducer;
