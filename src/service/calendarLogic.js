import axios from 'axios';
// 로그인한 회원 정보 불러오기
export const findById = async() => {
  try {
    const empId = localStorage.getItem("empId");
    const token = localStorage.getItem("token");
    console.log("Sending Token:", token); // 여기서도 확인
    if (!token) {
        throw new Error("토큰이 없습니다. 로그인 후 다시 시도하세요.");
    }
    if(!empId) throw new Error("로그인이 필요합니다.");
    const response = await axios.get(`/api/user/emp/${empId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log('로그인한 회원 정보 불러오기:', response.data);
    return response.data;
  } catch (error) {
    console.error("로그인한 회원 정보 불러오기 오류 발생: ", error);
    console.log("empId:"+localStorage.getItem("empId"));
    console.log("token:"+localStorage.getItem("token"));
    throw error;
  }
}
// 사원 전체 일정 목록
export const getAllCalendars = async () => {
  try {
    const response = await axios.get('/api/user/calendar/all',{
      headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },});
    console.log('사원 전체 일정 목록:', response.data);
    return response.data;
  } catch (error) {
    console.error("사원 전체 일정 목록 오류 발생: ", error);
    throw error;
  }
};
// 개인 일정 목록
export const getMyCalendars = async (applicantId) => {
  try {
    const response = await axios.get(`/api/user/calendar/my/${applicantId}`,{
      headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },});
    console.log('개인 일정 목록:', response.data);
    return response.data;
  } catch (error) {
    console.error("개인 일정 목록 오류 발생: ", error);
    throw error;
  }
};
// 부서 일정 목록
export const getDeptCalendars = async (departmentId) => {
  try {
    const response = await axios.get(`/api/user/calendar/dept/${departmentId}`,{
      headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },});
    console.log('부서 일정 목록:', response.data);
    return response.data;
  } catch (error) {
    console.error("부서 일정 목록 오류 발생: ", error);
    throw error;
  }
}
// 오늘 일정 전체 목록
export const getTodayCalendars = async () => {
  try {
    const response = await axios.get('/api/usercalendar/today',{
      headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },});
    console.log('오늘 일정 전체 목록:', response.data);
    return response.data;
  } catch (error) {
    console.error("오늘 일정 전체 목록 오류 발생: ", error);
    throw error;
  }
}
// 오늘 일정 목록 (개인)
export const getMyTodayCalendars = async (applicantId) => {
  try {
    const response = await axios.get(`/api/user/calendar/mytoday/${applicantId}`,{
      headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },});
    console.log('오늘 일정 목록 (개인):', response.data);
    return response.data;
  } catch (error) {
    console.error("오늘 일정 목록 (개인): ", error);
    throw error;
  }
};
// 오늘 일정 목록 (부서)
export const getDeptTodayCalendars = async (departmentId) => {
  try {
    const response = await axios.get(`/api/user/calendar/depttoday/${departmentId}`,{
      headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },});
    console.log('오늘 일정 목록 (부서):', response.data);
    return response.data;
  } catch (error) {
    console.error("오늘 일정 목록 (부서) 오류 발생: ", error);
    throw error;
  }
}
// 일정 상세 조회
export const readCalendar = async (calendarId) => {
  try {
    const response = await axios.get(`/api/user/calendar/${calendarId}`,{
      headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },});
    console.log('일정 상세 조회:', response.data);
    return response.data;
  } catch (error) {
    console.error("일정 상세 조회 오류 발생: ", error);
    throw error;
  }
}
// 일정 등록하기
export const addCalendar = async (calendar) => {
  try {
    const response = await axios.post(`/api/user/calendar/add`, calendar,{
      headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },});
    return response.data;
  } catch (error) {
    console.error("일정 등록 오류 발생: ", error);
    throw error;
  }
}
// 일정 수정하기
export const updateCalendar = async (calendarId, calendar) => {
  try {
    const response = await axios.put(`/api/user/calendar/edit/${calendarId}`, calendar,{
      headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },});
    return response.data;
  } catch (error) {
    console.error("일정 수정 오류 발생: ", error);
    throw error;
  }
}
// 일정 삭제하기
export const deleteCalendar = async (calendarId) => {
  try {
    console.log("삭제할 calendarId:", calendarId);
    const response = await axios.delete(`/api/user/calendar/${calendarId}`,{
      headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },});
    if (response.status === 200) {
      console.log("일정 삭제 성공");
      return response.data;
    }
  } catch (error) {
    console.error("일정 삭제 오류 발생: ", error);
    throw error;
  }
}