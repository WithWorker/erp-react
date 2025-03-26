import React, { useState, useEffect, useCallback } from "react";
import Sidebar from "../include/Sidebar";
import Header from "../include/Header";
import ChatList from "./ChatList";
import ChatRoom from "./ChatRoom";
import {
  getMessageList,
  getRoomCount,
  getUnreadMsg,
  sendMessage,
  sendGroupMessage,
  getRoomParticipants,
  getMessagesByRoomId,
  markMessagesAsRead,
  readAllMessages,
} from "../../service/messengerLogic";

const ChatPage = () => {
  const currentUserId = 5; // 임의로 지정된 로그인 사용자 ID

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [roomCount, setRoomCount] = useState(0);
  const [unreadCount, setUnreadCount] = useState(0);
  const [currentChatRoom, setCurrentChatRoom] = useState(null);
  const [loadingMessages, setLoadingMessages] = useState(false);

  // 전체 대화방 수와 안 읽은 메시지 수 업데이트
  const updateRoomCounts = async () => {
    try {
      const count = await getRoomCount(currentUserId);
      const unread = await getUnreadMsg(currentUserId);
      setRoomCount(count);
      setUnreadCount(unread);
    } catch (error) {
      console.error("Error updating room counts:", error);
    }
  };

  // 컴포넌트 초기 로딩 시 대화방/메시지 초기화
  useEffect(() => {
    setCurrentChatRoom(null);
    setMessages([]);
    updateRoomCounts();
  }, [currentUserId]);

  // 채팅방 선택 시 실행되는 함수
  const handleSelectChat = async (room) => {
    if (room === null) {
      // 대화방 선택 해제
      setMessages([]);
      setLoadingMessages(false);
      setCurrentChatRoom(null);
      return;
    }

    setMessages([]);
    setLoadingMessages(true);

    if (room.roomId) {
      // [단체방] 클릭 시
      if (room.unread > 0) {
        await markMessagesAsRead(currentUserId, room.roomId);
        updateRoomCounts();
      }
      const participants = await getRoomParticipants(room.roomId);
      setCurrentChatRoom({
        ...room,
        participants: participants.map((p) => p.emp_name || p.empName),
        participantIds: participants.map((p) => p.emp_id || p.empId),
      });
    } else {
      // [1:1 대화방] 클릭 시 -> 전체 메시지 읽음 처리
      await readAllMessages(currentUserId);
      updateRoomCounts();
      setCurrentChatRoom({
        roomKey: room.roomKey,
        otherUserId: room.otherUserId,
        displayName: room.displayName,
      });
    }

    // 선택한 대화방 메시지 불러오기
    await loadMessages(room);
    setLoadingMessages(false);
  };

  // 메시지 목록 불러오기
  const loadMessages = useCallback(
    async (room) => {
      if (!room) return;
      setLoadingMessages(true);

      try {
        let filtered = [];

        if (room.roomId) {
          // 단체 대화방
          const groupMessages = await getMessagesByRoomId(room.roomId);
          filtered = Array.isArray(groupMessages) ? groupMessages : [];
        } else if (room.otherUserId) {
          // 1:1 대화
          const data = await getMessageList(currentUserId);
          if (!data) return;
          const merged = [...(data.sendMsg || []), ...(data.receiveMsg || [])];
          filtered = merged.filter(
            (msg) =>
              (msg.sender_id === room.otherUserId && msg.receiver_id === currentUserId) ||
              (msg.sender_id === currentUserId && msg.receiver_id === room.otherUserId)
          );
        }

        // 시간순 정렬
        filtered.sort((a, b) => new Date(a.send_time) - new Date(b.send_time));
        setMessages(filtered);
      } catch (err) {
        console.error("❌ 메시지 불러오기 오류:", err);
      } finally {
        setLoadingMessages(false);
      }
    },
    [currentUserId]
  );

  // 메시지 전송
  const handleSend = async () => {
    if (!currentChatRoom) {
      alert("대화방을 선택하세요.");
      return;
    }
    if (input.trim() === "") return;

    try {
      if (currentChatRoom.roomId) {
        // 단체 대화
        const participants = await getRoomParticipants(currentChatRoom.roomId);
        const receiverIds = participants.map((p) => p.emp_id);
        const payload = {
          senderId: currentUserId,
          receiverIds,
          content: input,
          filePath: "",
          roomId: currentChatRoom.roomId,
        };
        const result = await sendGroupMessage(payload);
        if (result && !result.error) {
          await loadMessages(currentChatRoom);
        } else {
          alert("그룹 메시지 전송 중 오류 발생");
        }
      } else {
        // 1:1 대화
        const payload = {
          senderId: currentUserId,
          receiverId: currentChatRoom.otherUserId,
          content: input,
          roomId: null,
        };
        const result = await sendMessage(payload);
        if (result && !result.error) {
          await loadMessages(currentChatRoom);
        } else {
          alert("1:1 메시지 전송 중 오류 발생");
        }
      }
    } catch (err) {
      console.error("메시지 전송 중 오류:", err);
      alert("메시지 전송 실패. 관리자에게 문의하세요.");
    }

    setInput("");
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex flex-col flex-1 p-6">
          {/* 왼쪽 ChatList, 오른쪽 ChatRoom */}
          <div className="flex h-[calc(100vh-10rem)]">
            <ChatList
              onSelectChat={handleSelectChat}
              currentUserId={currentUserId}
              updateRoomCounts={updateRoomCounts}
            />
            <ChatRoom
              currentChatRoom={currentChatRoom}
              messages={messages}
              setMessages={setMessages}
              input={input}
              setInput={setInput}
              handleSend={handleSend}
              currentUserId={currentUserId}
              loadMessages={loadMessages}
              loadingMessages={loadingMessages}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;