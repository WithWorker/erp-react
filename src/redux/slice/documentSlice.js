import { createSlice, createAsyncThunk, createSelector  } from '@reduxjs/toolkit';

export const fetchApprovalList = createAsyncThunk('approval/fetchApprovalList', async (page) => {
  //const response = await axios.get(`/api/approvals?page=${page}`);
  //return response.data;
  // API 호출 대신 더미 데이터 반환 (프론트에서만 확인 목적)
  return {
    data: [
      { id: 1, title: '결재 요청 1', author: '홍길동', department: '영업부', date: '2025-03-14', status: '대기' },
      { id: 2, title: '결재 요청 2', author: '김철수', department: '기술부', date: '2025-03-14', status: '대기' },
      { id: 3, title: '결재 요청 3', author: '나신입', department: '기술부', date: '2025-03-14', status: '대기' }
    ],
    currentPage: page,
    totalPages: 3
  };
});

const initialState = {
  list: [],
  currentPage: 1,
  totalPages: 1,
};

const documentSlice = createSlice({
  name: 'approval',
  initialState,
  reducers: {
    updateApprovalStatus: (state, action) => {
      const { id, status } = action.payload;
      state.list = state.list.map(item =>
        item.id === id ? { ...item, status } : item
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchApprovalList.fulfilled, (state, action) => {
      // action.payload에 데이터가 잘 들어오는지 확인하기 위해 콘솔로 출력
      console.log('받은 데이터:', action.payload);
      // action.payload.data가 올바르게 전달되는지 확인
      if (action.payload) {
        state.list = action.payload.data;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
      }
    });
  },
});

// ✅ 메모이제이션 된 Selector 작성
export const selectApprovalState = (state) => state.approval;

export const selectApprovalList = createSelector(
  [selectApprovalState],
  (approval) => approval.list
);

export const selectCurrentPage = createSelector(
  [selectApprovalState],
  (approval) => approval.currentPage
);

export const selectTotalPages = createSelector(
  [selectApprovalState],
  (approval) => approval.totalPages
);

export const { updateApprovalStatus } = documentSlice.actions;
export default documentSlice.reducer;
