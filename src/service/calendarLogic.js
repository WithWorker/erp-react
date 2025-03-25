import axios from 'axios';

// 로그인한 회원 정보 불러오기
export const findById = async(empId) => {
  try {
    const empId = localStorage.getItem("empId");
    if(!empId) throw new Error("로그인이 필요합니다.");

    const response = await axios.get(`/api/emp/${empId}`);  // Vite의 프록시를 사용하여 '/api' 경로로 요청
    console.log('로그인한 회원 정보 불러오기:', response.data); // 여기서 데이터를 확인
    return response.data;  // 반환된 데이터
  } catch (error) {
    console.error("로그인한 회원 정보 불러오기 오류 발생: ", error);
    throw error;  // 오류 처리
  } 
}

// 사원 전체 일정 목록 
export const getAllCalendars = async () => {
  try {
    const response = await axios.get('/api/calendar/all');  // Vite의 프록시를 사용하여 '/api' 경로로 요청
    console.log('사원 전체 일정 목록:', response.data); // 여기서 데이터를 확인
    return response.data;  // 반환된 데이터
  } catch (error) {
    console.error("사원 전체 일정 목록 오류 발생: ", error);
    throw error;  // 오류 처리
  }
};

// 개인 일정 목록
export const getMyCalendars = async (applicantId) => {
  try {
    const response = await axios.get(`/api/calendar/my/${applicantId}`);
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
    const response = await axios.get(`/api/calendar/dept/${departmentId}`);
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
    const response = await axios.get('/api/calendar/today');  
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
    const response = await axios.get(`/api/calendar/mytoday/${applicantId}`);
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
    const response = await axios.get(`/api/calendar/depttoday/${departmentId}`);
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
    const response = await axios.get(`/api/calendar/${calendarId}`);
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
    const response = await axios.post(`/api/calendar/add`, calendar);
    return response.data;  
  } catch (error) {
    console.error("일정 등록 오류 발생: ", error);
    throw error;  
  }
}

// 일정 수정하기
export const updateCalendar = async (calendarId, calendar) => {
  try {
    const response = await axios.put(`/api/calendar/edit/${calendarId}`, calendar);
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
    const response = await axios.delete(`/api/calendar/${calendarId}`);
    if (response.status === 200) {
      console.log("일정 삭제 성공");
      return response.data;
    }
  } catch (error) {
    console.error("일정 삭제 오류 발생: ", error);
    throw error;  
  }
}