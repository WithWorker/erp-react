import axios from 'axios';
// 결재 신청 목록 (신청자)
export const getApplicant = async (applicantId) => {
  try {
    const response = await axios.get(`/api/user/approval/applicant/${applicantId}`,{
      headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },});
    console.log('결재 신청 목록 (신청자):', response.data);
    return response.data;  
  } catch (error) {
    console.error("결재 신청 목록 (신청자) 오류 발생: ", error);
    throw error;  
  }
};
// 결재 신청 목록 (신청자)
export const getApplicantPending = async (applicantId) => {
  try {
    const response = await axios.get(`/api/user/approval/applicantPending/${applicantId}`,{
      headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },});
    console.log('결재 대기 목록 (신청자):', response.data);
    return response.data;  
  } catch (error) {
    console.error("결재 대기 목록 (신청자) 오류 발생: ", error);
    throw error;  
  }
};
// 결재 승인, 반려 목록 (신청자)
export const getApplicantApproved = async (applicantId) => {
  try {
    const response = await axios.get(`/api/user/approval/applicantApproved/${applicantId}`,{
      headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },});
    console.log('결재 승인,반려 목록 (신청자):', response.data);
    return response.data;  
  } catch (error) {
    console.error("결재 승인,반려 목록 (신청자) 오류 발생: ", error);
    throw error;  
  }
};
// 결재 확인 목록 (승인자)
export const getApprover = async (approverId) => {
  try {
    const response = await axios.get(`/api/user/approval/approver/${approverId}`,{
      headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },});
    console.log('결재 확인 목록 (승인자):', response.data);
    return response.data;  
  } catch (error) {
    console.error("결재 확인 목록 (승인자) 오류 발생: ", error);
    throw error;  
  }
};
// 결재 상태 목록
export const getApprovedList = async (statusId) => {
  try {
    const response = await axios.get(`/api/user/approval/approved/${statusId}`,{
      headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },});
    console.log('결재 상태 목록:', response.data);
    return response.data;  
  } catch (error) {
    console.error("결재 상태 목록 오류 발생: ", error);
    throw error;  
  }
};
// 결재 상세 조회
export const readApproval = async (approvalId) => {
  try {
    const response = await axios.get(`/api/user/approval/${approvalId}`,{
      headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },});
    console.log('결재 상세 조회:', response.data);
    return response.data;  
  } catch (error) {
    console.error("결재 상세 조회 오류 발생: ", error);
    throw error; 
  }
}
// 승인자 검색
export const searchApprover = async (keyword) => {
  try {
    const response = await axios.get(`/api/user/approval/search/${keyword}`,{
      headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },});
    console.log('검색결재 목록:', response.data);
    return response.data;  
  } catch (error) {
    console.error("검색결재 목록 오류 발생: ", error);
    throw error; 
  }
}
// 승인자 조직도
export const getOrganization = async () => {
  try{
    const response = await axios.get('/api/user/approval/organization',{
      headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },});
    console.log('승인자 조직도 목록:', response.data);
    return response.data;  
  } catch (error) {
    console.error("승인자 조직도 목록 오류 발생: ", error);
    throw error;
  }
}
// 결재 등록하기 (신청자)
export const addApproval = async (approval) => {
  try {
    const response = await axios.post(`/api/user/approval/add`, approval,{
      headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },});
    return response.data;  
  } catch (error) {
    console.error("결재 등록 오류 발생: ", error);
    throw error;  
  }
}
// 결재 수정(status) : 승인자 각각 상태 변경
export const updateStatus = async (approvalId, approverId, approverStatusId) => {
  try {
    const response = await axios.put(`/api/user/approval/edit/${Number(approvalId)}`, {
      approverId, 
      approverStatusId
    },{
      headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },});
    return response.data;
  } catch (error) {
    console.error("결재 상태 수정 오류 발생: ", error);
    throw error;
  }
};
// 결재 삭제하기
export const deleteapproval = async (approvalId) => {
  try {
    console.log("삭제할 approvalId:", approvalId);
    const response = await axios.delete(`/api/user/approval/${approvalId}`,{
      headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },});
    if (response.status === 200) {
      console.log("결재 삭제 성공");
      return response.data;
    }
  } catch (error) {
    console.error("결재 삭제 오류 발생: ", error);
    throw error;  
  }
}