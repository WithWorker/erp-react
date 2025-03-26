import React, { useState, useEffect } from "react";
import {
  getDepartments,
  getDepartmentEmployees,
  sendMessage,
  sendGroupMessage,
  createMessengerRoom,
  addRoomParticipant,
  getEmpName,
  getMessageList,
  getRoomParticipants,
  getGroupRoomList,
  getMessagesByRoomId,
} from "../../service/messengerLogic";

const ChatList = ({ onSelectChat, currentUserId, updateRoomCounts }) => {
  const [chatRooms, setChatRooms] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [employeesByDept, setEmployeesByDept] = useState({});
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [allChatRooms, setAllChatRooms] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchChatRooms = async () => {
    // 1:1 대화 목록 처리
    const data = await getMessageList(currentUserId);
    let oneToOneRooms = [];
    let totalUnreadCount = 0;

    if (data) {
      const merged = [...(data.sendMsg || []), ...(data.receiveMsg || [])];
      const roomsMap = new Map();
      merged.forEach((msg) => {
        const roomId = msg.room_id || null;
        let roomKey = "";
        if (roomId) {
          roomKey = `group-${roomId}`;
        } else {
          const ids = [
            currentUserId,
            msg.sender_id === currentUserId ? msg.receiver_id : msg.sender_id,
          ];
          ids.sort((a, b) => a - b);
          roomKey = `user-${ids.join("-")}`;
        }
        if (!roomsMap.has(roomKey)) {
          roomsMap.set(roomKey, {
            roomKey,
            roomId,
            participants: new Set(),
            lastMsg: msg.content,
            lastMsgTime: msg.send_time,
            otherUserId: null,
            unread: 0,
          });
        }
        const roomObj = roomsMap.get(roomKey);
        if (new Date(msg.send_time) > new Date(roomObj.lastMsgTime || 0)) {
          roomObj.lastMsg = msg.content;
          roomObj.lastMsgTime = msg.send_time;
        }
        if (roomId) {
          if (msg.sender_name) roomObj.participants.add(msg.sender_name);
          if (msg.receiver_name) roomObj.participants.add(msg.receiver_name);
        } else {
          if (msg.sender_id === currentUserId) {
            roomObj.otherUserId = msg.receiver_id;
          } else {
            roomObj.otherUserId = msg.sender_id;
            if (msg.sender_id !== currentUserId && msg.read_status === 0) {
              roomObj.unread += 1;
              totalUnreadCount++;
            }
          }
        }
      });
      // 1:1 대화만 추출
      oneToOneRooms = Array.from(roomsMap.values()).filter((room) => room.roomId === null);
      oneToOneRooms = oneToOneRooms.map((room) => {
        let displayName = "1:1 대화";
        if (room.otherUserId) {
          const found = merged.find((m) => {
            if (m.room_id) return false;
            const ids = [
              currentUserId,
              m.sender_id === currentUserId ? m.receiver_id : m.sender_id,
            ];
            ids.sort((a, b) => a - b);
            return `user-${ids.join("-")}` === room.roomKey;
          });
          if (found) {
            displayName = found.sender_id === currentUserId ? found.receiver_name : found.sender_name;
          }
        }
        return { ...room, displayName };
      });
    }

    // 그룹 대화방 목록 처리
    const groupRooms = await getGroupRoomList(currentUserId);
    let groupChatRooms = [];

    if (groupRooms && groupRooms.length > 0) {
      groupChatRooms = await Promise.all(
        groupRooms.map(async (room) => {
          const participants = await getRoomParticipants(room.roomId);
          const names = participants
            .filter((p) => p.emp_id !== currentUserId && p.empId !== currentUserId)
            .map((p) => p.emp_name || p.empName || "")
            .filter((name) => name.trim() !== "")
            .join(", ");
          
          // 그룹 대화방의 최근 메시지 불러오기
          let lastMsg = "";
          let groupMsgs = [];
          try {
            groupMsgs = await getMessagesByRoomId(room.roomId);
            if (groupMsgs && groupMsgs.length > 0) {
              const sorted = groupMsgs.sort((a, b) => new Date(b.send_time) - new Date(a.send_time));
              lastMsg = sorted[0].content || "";
            }
          } catch (e) {
            console.error("단체방 최근 메시지 불러오기 실패:", e);
          }
          
          // unread 메시지 개수를 정확히 계산
          const unreadInGroup = groupMsgs.filter(
            (msg) => msg.receiver_id === currentUserId && msg.read_status === 0
          ).length;
          totalUnreadCount += unreadInGroup;
  
          return {
            roomKey: `group-${room.roomId}`,
            roomId: room.roomId,
            displayName: names || "단체 대화방",
            lastMsg: lastMsg,
            participantIds: participants.map((p) => p.emp_id || p.empId),
            unread: unreadInGroup,
            lastMsgTime:
              groupMsgs && groupMsgs.length > 0
                ? groupMsgs.sort((a, b) => new Date(b.send_time) - new Date(a.send_time))[0].send_time
                : null,
          };
        })
      );
    }

    // 1:1와 그룹 대화방 합치고, 마지막 메시지 전송 시각 기준 내림차순 정렬
    const allRooms = [...oneToOneRooms, ...groupChatRooms].sort(
      (a, b) => new Date(b.lastMsgTime) - new Date(a.lastMsgTime)
    );
    setAllChatRooms(allRooms);
    setUnreadCount(totalUnreadCount);

    if (searchText === "") {
      setChatRooms(allRooms);
    }
  };

  useEffect(() => {
    fetchChatRooms();
    getDepartments().then((deptList) => {
      setDepartments(deptList);
      deptList.forEach((dept) => {
        getDepartmentEmployees(dept.deptId).then((emps) => {
          const filtered = emps.filter((emp) => emp.empId !== currentUserId);
          setEmployeesByDept((prev) => ({ ...prev, [dept.deptId]: filtered }));
        });
      });
    });
  }, [currentUserId]);

  useEffect(() => {
    if (searchText) return;
    const interval = setInterval(() => {
      fetchChatRooms();
    }, 3000);
    return () => clearInterval(interval);
  }, [currentUserId, searchText, unreadCount]);

  const handleEmployeeSelect = (empId) => {
    setSelectedEmployees((prev) =>
      prev.includes(empId) ? prev.filter((id) => id !== empId) : [...prev, empId]
    );
  };

  const handleCreateChatRoom = async () => {
    if (selectedEmployees.length === 0) {
      alert("직원을 선택하세요.");
      return;
    }
    try {
      if (selectedEmployees.length === 1) {
        const singleData = {
          senderId: currentUserId,
          receiverId: selectedEmployees[0],
          roomId: null,
          filePath: "",
          content: "새로운 1:1 대화",
        };
        const response = await sendMessage(singleData);
        if (response && !response.error) {
          alert("1:1 대화방 생성 완료");
          setShowModal(false);
          setSelectedEmployees([]);
          await fetchChatRooms();
          updateRoomCounts && updateRoomCounts();
        } else {
          alert("1:1 대화 생성에 실패했습니다.");
        }
      } else {
        const groupData = {
          senderId: currentUserId,
          receiverIds: selectedEmployees,
          content: "새로운 단체 대화",
          filePath: "",
          roomId: null,
        };
        const response = await sendGroupMessage(groupData);
        if (response && !response.error) {
          const roomId = response.roomId || response;
          const participants = await getRoomParticipants(roomId);
          const names = participants
            .filter((p) => p.emp_id !== currentUserId)
            .map((p) => p.emp_name || p.empName || "")
            .filter((n) => n.trim() !== "")
            .join(", ");
  
          alert("단체 대화방 생성 완료");
          setShowModal(false);
          setSelectedEmployees([]);
          await fetchChatRooms();
          updateRoomCounts && updateRoomCounts();
  
          onSelectChat({
            roomKey: `group-${roomId}`,
            roomId: roomId,
            displayName: names || "단체 대화방",
            participantIds: [currentUserId, ...selectedEmployees],
            participants: participants.map((p) => p.emp_name || p.empName),
          });
        } else {
          alert("단체 대화 생성 실패");
        }
      }
    } catch (e) {
      console.error(e);
      alert("단체 대화방 생성 중 오류 발생");
    }
  };

  const handleDeleteRoom = async (room) => {
    if (!window.confirm("해당 대화방을 삭제하시겠습니까?")) return;
  
    let url = room.roomId
      ? `/api/messenger/room/delete?roomId=${room.roomId}`
      : `/api/messenger/message/delete?roomId=0&empId=${currentUserId}&otherEmpId=${room.otherUserId}`;
  
    const res = await fetch(url, { method: "DELETE" });
    if (res.ok) {
      alert("대화방이 삭제되었습니다.");
      await fetchChatRooms();
      updateRoomCounts && updateRoomCounts();
      onSelectChat(null);
    } else {
      alert("대화방 삭제에 실패했습니다.");
    }
  };

  const handleSearch = () => {
    if (!searchText) {
      setChatRooms(allChatRooms);
      return;
    }
    const filtered = chatRooms.filter((room) =>
      room.displayName.toLowerCase().includes(searchText.toLowerCase())
    );
    setChatRooms(filtered);
  };

  return (
    <div className="w-1/4 bg-white rounded-2xl shadow-md p-4 flex flex-col h-[calc(100vh-5rem)]">
      <h2 className="text-lg font-bold mb-4">대화방 목록</h2>
      <div className="flex justify-between mb-2">
        <span>전체 대화방: {allChatRooms.length}</span>
        <span className="text-red-500">안 읽은 메시지: {unreadCount}</span>
      </div>
      <button
        className="w-full p-2 bg-green-500 text-white rounded mb-2"
        onClick={() => setShowModal(true)}
      >
        + 대화방 추가
      </button>
      <div className="mb-4 flex">
        <input
          type="text"
          placeholder="대화방 검색..."
          className="flex-1 p-2 border rounded-l"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={(e) => {
              if (e.key === "Enter") {
                 handleSearch();
              }
          }}
        />
        <button className="p-2 bg-blue-500 text-white rounded-r">검색</button>
      </div>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-2xl shadow-lg w-[350px] max-h-[80vh] overflow-y-auto">
            <h2 className="text-lg font-bold mb-4">대화방 추가</h2>
            {departments.map((dept) => (
              <div key={dept.deptId} className="mb-4">
                <div className="flex items-center mb-1">
                  <input type="checkbox" readOnly />
                  <span className="ml-2 font-bold">{dept.deptName}</span>
                </div>
                <div className="ml-6">
                  {(employeesByDept[dept.deptId] || []).map((emp) => (
                    <div key={emp.empId} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedEmployees.includes(emp.empId)}
                        onChange={() => handleEmployeeSelect(emp.empId)}
                      />
                      <span className="ml-2">{emp.empName}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <div className="flex justify-between mt-4">
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded"
                onClick={handleCreateChatRoom}
              >
                시작
              </button>
              <button
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={() => setShowModal(false)}
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="flex-1 overflow-y-auto">
        <ul>
          {chatRooms.length > 0 ? (
            chatRooms.map((room) => (
              <li
                key={room.roomKey}
                className={`flex items-center justify-between p-2 border-b hover:bg-gray-200 cursor-pointer ${
                  room.unread > 0 ? "bg-gray-100" : "bg-white"
                }`}
                onClick={() => onSelectChat(room)}
              >
                <div className={`text-sm ${room.unread > 0 ? "text-red-500" : "text-black"}`}>
                  {room.displayName} <br />
                  <span className="text-sm text-gray-600">{room.lastMsg}</span>
                </div>
                <button
                  className="text-red-500"
                  onClick={() => {
                    // 클릭 이벤트 전파 방지
                    event.stopPropagation();
                    handleDeleteRoom(room);
                  }}
                >
                  삭제
                </button>
              </li>
            ))
          ) : (
            <p className="text-gray-500">대화방이 없습니다.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ChatList;