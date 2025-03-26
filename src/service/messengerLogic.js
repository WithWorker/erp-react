// 인증 헤더 생성 함수
function getAuthHeaders() {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token && { "Authorization": `Bearer ${token}` }),
  };
}

// 부서 목록 조회
export const getDepartments = async () => {
  try {
    const response = await fetch(`/api/user/messenger/dept`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error("Failed to fetch departments");
    return await response.json();
  } catch (error) {
    console.error("Error fetching departments:", error);
    return [];
  }
};

// 특정 부서 내 직원 조회
export const getDepartmentEmployees = async (deptId) => {
  try {
    const response = await fetch(`/api/user/messenger/dept/person?deptId=${deptId}`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error("Failed to fetch employees");
    return await response.json();
  } catch (error) {
    console.error("Error fetching employees:", error);
    return [];
  }
};

// 선택 직원 조회
export const getChosenEmp = async (empId) => {
  try {
    const response = await fetch(`/api/user/messenger/dept/person/chosen?empId=${empId}`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error("Failed to fetch chosen employee");
    return await response.json();
  } catch (error) {
    console.error("Error fetching chosen employee:", error);
    return [];
  }
};

// 1:1 메시지 전송
export const sendMessage = async (data) => {
  try {
    const res = await fetch(`/api/user/messenger/message/send`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to send message");
    return await res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

// 단체 메시지 전송
export const sendGroupMessage = async (groupData) => {
  try {
    const res = await fetch(`/api/user/messenger/message/sendGroup`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(groupData),
    });
    if (!res.ok) throw new Error("Failed to send group message");
    return await res.json();
  } catch (error) {
    console.error("sendGroupMessage error:", error);
    return { error: error.message };
  }
};

// 메시지 목록 조회
export const getMessageList = async (empId) => {
  try {
    const res = await fetch(`/api/user/messenger/message/list?empId=${empId}`, {
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error("Failed to fetch message list");
    return await res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

// 메시지 전달
export const deliverMessage = async (msgId, senderId, receiverId) => {
  try {
    const response = await fetch(`/api/user/messenger/message/deliver`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({ msgId, senderId, receiverId }),
    });
    if (!response.ok) throw new Error("Failed to deliver message");
    return await response.json();
  } catch (error) {
    console.error("Error delivering message:", error);
    return null;
  }
};

// 보낸 메시지 내용 조회
export const getMsgContent = async (msgId, senderId) => {
  try {
    const response = await fetch(
      `/api/user/messenger/message/content/send?msgId=${msgId}&senderId=${senderId}`,
      { headers: getAuthHeaders() }
    );
    if (!response.ok) throw new Error("Failed to fetch sent message content");
    return await response.json();
  } catch (error) {
    console.error("Error fetching sent message content:", error);
    return null;
  }
};

// 받은 메시지 내용 조회
export const getMsgContent2 = async (msgId, receiverId) => {
  try {
    const response = await fetch(
      `/api/user/messenger/message/content/receive?msgId=${msgId}&receiverId=${receiverId}`,
      { headers: getAuthHeaders() }
    );
    if (!response.ok) throw new Error("Failed to fetch received message content");
    return await response.json();
  } catch (error) {
    console.error("Error fetching received message content:", error);
    return null;
  }
};

// 메시지 읽음 처리
export const readAllMessages = async (empId) => {
  try {
    const response = await fetch(`/api/user/messenger/message/read?empId=${empId}`, {
      method: "POST",
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error("Failed to mark messages as read");
    return await response.json();
  } catch (error) {
    console.error("Error marking messages as read:", error);
    return null;
  }
};

// 첨부파일 추가
export const addFile = async (fileData) => {
  try {
    const response = await fetch(`/api/user/messenger/file/add`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(fileData),
    });
    if (!response.ok) throw new Error("Failed to add file");
    return await response.json();
  } catch (error) {
    console.error("Error adding file:", error);
    return null;
  }
};

// 첨부파일 조회
export const getMsgFiles = async (msgId) => {
  try {
    const response = await fetch(`/api/user/messenger/file/list?msgId=${msgId}`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error("Failed to fetch message files");
    return await response.json();
  } catch (error) {
    console.error("Error fetching message files:", error);
    return [];
  }
};

// 전체 메신저 방 개수 조회
export const getRoomCount = async (empId) => {
  try {
    const response = await fetch(`/api/user/messenger/room/count?empId=${empId}`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error("Failed to fetch room count");
    const data = await response.json();
    return data.roomCount || 0;
  } catch (error) {
    console.error("Error fetching room count:", error);
    return 0;
  }
};

// 이름 검색
export const getEmpName = async (receiverId) => {
  try {
    const response = await fetch(`/api/user/messenger/send/name?receiverId=${receiverId}`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error("Failed to fetch employee name");
    return await response.json();
  } catch (error) {
    console.error("Error fetching employee name:", error);
    return null;
  }
};

// 안 읽은 메시지 개수 조회
export const getUnreadMsg = async (empId) => {
  try {
    const response = await fetch(`/api/user/messenger/message/unread/count?empId=${empId}`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error("Failed to fetch unread messages");
    const data = await response.json();
    return data.unreadCount || 0;
  } catch (error) {
    console.error("Error fetching unread messages:", error);
    return 0;
  }
};

// 메시지 삭제 (대화방 삭제)
export const deleteMessage = async (params) => {
  const queryParams = new URLSearchParams(params).toString();
  try {
    const response = await fetch(`/api/user/messenger/message/delete?${queryParams}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error("Failed to delete message/room");
    return await response.json();
  } catch (error) {
    console.error("Error deleting message/room:", error);
    return null;
  }
};

// 방 참여자 조회
export const getRoomParticipants = async (roomId) => {
  try {
    const res = await fetch(`/api/user/messenger/room/participants?roomId=${roomId}`, {
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error("Failed to fetch participants");
    return await res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

// 대화방 생성
export const createMessengerRoom = async (data) => {
  try {
    const response = await fetch(`/api/user/messenger/room/create`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to create messenger room");
    return await response.json();
  } catch (error) {
    console.error("createMessengerRoom error:", error);
    return { error: error.message };
  }
};

// 대화방 참여자 추가
export const addRoomParticipant = async (param) => {
  try {
    const response = await fetch(`/api/user/messenger/room/participant/add`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(param),
    });
    if (!response.ok) throw new Error("Failed to add room participant");
    return await response.json();
  } catch (error) {
    console.error("addRoomParticipant error:", error);
    return { error: error.message };
  }
};

// 그룹 대화방 목록 조회
export const getGroupRoomList = async (empId) => {
  try {
    const response = await fetch(`/api/user/messenger/room/list?empId=${empId}`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error("Failed to fetch group rooms");
    return await response.json();
  } catch (error) {
    console.error("Error fetching group rooms:", error);
    return [];
  }
};

// 단체 방 내용 조회
export const getMessagesByRoomId = async (roomId) => {
  try {
    const res = await fetch(`/api/user/messenger/room/messages?roomId=${roomId}`, {
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error("메시지 조회 실패");
    return await res.json();
  } catch (e) {
    console.error("getMessagesByRoomId error:", e);
    return [];
  }
};

// 메시지 읽음 상태 업데이트 API 호출
export const markMessagesAsRead = async (userId, roomId) => {
  try {
    await fetch(`/api/user/messenger/message/markAsRead?roomId=${roomId}&userId=${userId}`, {
      method: "PUT",
      headers: getAuthHeaders(),
    });
  } catch (error) {
    console.error("읽지 않은 메시지 처리 실패", error);
  }
};
