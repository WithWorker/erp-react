import { createSlice, createAsyncThunk, createSelector  } from '@reduxjs/toolkit';

//export const fetchApprovalList = async (page) => {
  //const response = await axios.get(`/api/approvals?page=${page}`);
  //return response.data;
  // API 호출 대신 더미 데이터 반환 (프론트에서만 확인 목적)
  const getApprovalList = (page) => {
    return {
      data: [
        { id: 1, title: '결재 요청 1', author: '홍길동', department: '영업부', date: '2025-03-14', describe:'1111111', status: '대기', 
          "attendees": [
            { "author": "최부장", "role": "부장", "department": "디자인부" },
            { "author": "김과장", "role": "과장", "department": "개발부" }] },
        { id: 2, title: '결재 요청 2', author: '김철수', department: '기술부', date: '2025-03-14', describe:'1111111', status: '승인' },
        { id: 3, title: '결재 요청 3', author: '나신입', department: '기술부', date: '2025-03-14', describe:'1111111', status: '대기' }
      ],
      currentPage: page,
      totalPages: 3,
    };
};

const initialState = {
  list: [],
  currentPage: 1,
  totalPages: 1,
};

const documentSlice = createSlice({
  name: 'approval',
  initialState:{
    list: [],
  },
  reducers: {
    updateApprovalStatus: (state, action) => {
      const { id, status } = action.payload;
      const documentIndex = state.list.findIndex((doc) => doc.id === id);
      if (documentIndex >= 0) {
        state.list[documentIndex].attendees = attendees;
      }
      state.list = state.list.map(item =>
        item.id === id ? { ...item, status } : item
      );
    },
    // 결재 문서 삭제
    removeApprovalDocument: (state, action) => {
      state.list = state.list.filter(item => item.id !== action.payload.id);
    },

    // 결재 문서 수정
    updateApprovalDocument: (state, action) => {
      const { id, updatedData } = action.payload;
      state.list = state.list.map(item =>
        item.id === id ? { ...item, ...updatedData } : item
      );
    },

    // 결재 승인
    approveApprovalDocument: (state, action) => {
      const { id } = action.payload;
      state.list = state.list.map(item =>
        item.id === id ? { ...item, status: '승인' } : item
      );
    },

    // 결재 반려
    rejectApprovalDocument: (state, action) => {
      const { id } = action.payload;
      state.list = state.list.map(item =>
        item.id === id ? { ...item, status: '반려' } : item
      );
    },

    // ✅ 결재 목록 갱신 (더미 데이터 적용)
    setApprovalList: (state, action) => {
      state.list = action.payload.data;
      state.currentPage = action.payload.currentPage;
      state.totalPages = action.payload.totalPages;
    },
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


export const {
  updateApprovalStatus,
  removeApprovalDocument,
  updateApprovalDocument,
  approveApprovalDocument,
  rejectApprovalDocument,
  setApprovalList
} = documentSlice.actions;

export default documentSlice.reducer;

// ✅ 데이터 가져오기 함수 (Promise → 동기 처리)
export const fetchApprovalList = (page) => (dispatch) => {
  const data = getApprovalList(page);
  console.log('받은 데이터:', data);
  dispatch(setApprovalList(data));
};