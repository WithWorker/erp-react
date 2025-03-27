import React, { useRef, useState, useEffect } from "react";
import { Send, Paperclip } from "react-bootstrap-icons";
import {
  addFile,
  readAllMessages,
  sendMessage,
  sendGroupMessage,
} from "../../service/messengerLogic";
import axios from "axios";

const ChatRoom = ({
  currentChatRoom,
  messages = [],
  setMessages,
  input,
  setInput,
  currentUserId,
  loadingMessages,
  loadMessages,
}) => {
  const inputRef = useRef(null);
  const scrollRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedFilePath, setUploadedFilePath] = useState("");
  const [inactiveMessage, setInactiveMessage] = useState(false);
  const inactivityTimer = useRef(null);

  // 일정 시간 움직임이 없으면 채팅방을 다시 선택하라고 알림으로 나오게 설정
  useEffect(() => {
    const resetInactivityTimer = () => {
      if (inactivityTimer.current) {
        clearTimeout(inactivityTimer.current);
      }
      setInactiveMessage(false);
      inactivityTimer.current = setTimeout(() => {
        setInactiveMessage(true);
      }, 60000); // 1분
    };

    const activityEvents = ["keydown", "mousemove", "mousedown", "touchstart"];
    activityEvents.forEach((event) =>
      window.addEventListener(event, resetInactivityTimer)
    );

    resetInactivityTimer();

    return () => {
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
      activityEvents.forEach((event) =>
        window.removeEventListener(event, resetInactivityTimer)
      );
    };
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // 📥 다운로드 요청 함수
  const handleDownload = async (filename) => {
    console.log("🚀 다운로드 함수 진입!", filename);
    const token = localStorage.getItem("token"); // ✅ 토큰 가져오기
  
    try {
      const res = await axios.get(
        `/api/user/messenger/file/download?filename=${encodeURIComponent(filename)}`,
        {
          responseType: "blob", // ✅ blob 설정은 그대로 유지
          headers: {
            ...(token && { Authorization: `Bearer ${token}` }), // ✅ 토큰 포함
          },
        }
      );
  
      const blob = new Blob([res.data]);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("파일 다운로드 실패:", err);
      alert("파일 다운로드에 실패했습니다.");
    }
  };

  // 📤 파일 선택 → 업로드
  const handleFileChange = async (e) => {
    const token = localStorage.getItem("token");
    const files = Array.from(e.target.files); // 여러 파일 배열
    const MAX_FILE_SIZE_MB = 100;
  
    for (const file of files) {
      if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        alert(`⚠️ ${file.name}은(는) 최대 100MB까지 업로드 가능합니다.`);
        continue;
      }
  
      const formData = new FormData();
      formData.append("file", file);
  
      try {
        const res = await axios.post("/api/user/messenger/file/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            ...(token && { Authorization: `Bearer ${token}` }),// 여러 개의 파일 전송 (합쳐서 100mb 이하)
          },
        });
  
        console.log("📎 업로드 성공:", res.data);
  
        const filePath = res.data;
  
        // 현재 채팅방이 그룹이면
        if (currentChatRoom?.roomId) {
          const participants = currentChatRoom.participantIds || [];
          await sendGroupMessage({
            senderId: currentUserId,
            receiverIds: participants,
            content: "📎 첨부파일이 전송되었습니다.", // 파일만 보낼 경우
            filePath,
            roomId: currentChatRoom.roomId,
          });
        } else {
          await sendMessage({
            senderId: currentUserId,
            receiverId: currentChatRoom.otherUserId,
            content: "📎 첨부파일이 전송되었습니다.",
            filePath,
            roomId: null,
          });
        }
  
        // 파일 DB 등록 (선택)
        if (messages.length > 0) {
          const fileData = {
            messengerId: messages[messages.length - 1].messenger_id,
            filePath,
            fileSize: file.size,
            fileType: file.type,
            fileName: file.name,
          };
          await addFile(fileData);
        }
  
      } catch (err) {
        console.error("파일 업로드 실패:", err);
        alert(`${file.name} 업로드에 실패했습니다.`);
      }
    }
  
    // 초기화
    setSelectedFile(null);
    setUploadedFilePath("");
    setInput("");
    loadMessages && loadMessages(currentChatRoom);
  };

  // ✅ 메시지 전송 (파일 포함)
  const handleSend = async () => {
    if (!input.trim() && !uploadedFilePath) return;

    try {
      let messengerId = null;
  
      if (currentChatRoom?.roomId) {
        // ✅ 단체 메시지 전송
        const participants = currentChatRoom.participantIds || [];
        const res = await sendGroupMessage({
          senderId: currentUserId,
          receiverIds: participants,
          content: input.trim() || "",
          filePath: uploadedFilePath,
          roomId: currentChatRoom.roomId,
        });
  
        messengerId = res?.messengerId;
  
        // ✅ 파일도 등록
        if (uploadedFilePath && messengerId) {
          await addFile({
            messengerId,
            filePath: uploadedFilePath,
            fileSize: selectedFile?.size || 0,
            fileType: selectedFile?.type || "",
            fileName: selectedFile?.name || uploadedFilePath.split("/").pop(),
          });
        }
      } else {
        await sendMessage({
          senderId: currentUserId,
          receiverId: currentChatRoom.otherUserId,
          content: input.trim() || "",
          filePath: uploadedFilePath,
          roomId: null,
        });
      }

      setInput("");
      setSelectedFile(null);
      setUploadedFilePath("");
      loadMessages && loadMessages(currentChatRoom);
    } catch (err) {
      console.error("메시지 전송 오류:", err);
    }
  };

  useEffect(() => {
    if (currentChatRoom && currentUserId) {
      // 현재 채팅방이 선택된 경우에만 읽음 처리
      // 단, 여기서 호출하지 않고, onSelectChat에서 markMessagesAsRead를 호출하도록 처리하는 것이 좋습니다.
      // readAllMessages(currentUserId).catch(console.error);
    }
  }, [currentChatRoom, currentUserId]);

  return (
    <div className="flex-1 bg-white rounded-2xl shadow-lg p-4 relative h-[calc(100vh-5rem)] flex flex-col">
      {currentChatRoom ? (
        <>
          {/* 단체방이면 참여자 목록 표시 */}
          {currentChatRoom.roomId && currentChatRoom.participants && (
            <div className="mb-4 p-2 bg-gray-100 rounded">
              <strong>참여자: </strong> {currentChatRoom.participants.join(", ")}
            </div>
          )}
  
          {/* 메시지 목록 */}
          {loadingMessages ? (
            <div className="text-center my-4">메시지를 불러오는 중...</div>
          ) : (
            <div
              ref={scrollRef}
              className="flex-1 space-y-4 overflow-y-auto pr-2"
            >
              {messages.length > 0 ? (
                messages.map((msg, index) => {
                  const isSentByUser = msg.sender_id === currentUserId;
                  const fileName =
                    msg.fileName || msg.filePath?.split("/").pop();
  
                  return (
                    <div
                      key={msg.messenger_id || index}
                      className={`flex flex-col ${
                        isSentByUser ? "items-end" : "items-start"
                      }`}
                    >
                      {/* 보낸 사람이 내가 아니면 이름 표시 */}
                      {!isSentByUser && (
                        <div className="text-xs text-gray-500">
                          {msg.sender_name}
                        </div>
                      )}
  
                      {/* 첨부파일만 있는 경우 */}
                      {msg.filePath && !msg.content?.trim() ? (
                        <div
                          className={`px-4 py-2 rounded-2xl max-w-[40ch] cursor-pointer transition ${
                            isSentByUser
                              ? "bg-blue-500 text-white hover:bg-blue-600"
                              : "bg-gray-200 hover:bg-gray-300"
                          }`}
                          onClick={() => {
                            const filename = msg.filePath.split("/").pop();
                            handleDownload(filename);
                          }}
                        >
                          📎 {fileName}
                        </div>
                      ) : (
                        // 일반 메시지 (텍스트 또는 텍스트+파일)
                        <div
                          className={`px-4 py-2 rounded-2xl max-w-[40ch] break-words ${
                            isSentByUser
                              ? "bg-blue-500 text-white"
                              : "bg-gray-200"
                          }`}
                          style={{ whiteSpace: "pre-wrap" }}
                        >
                          {msg.content}
                          {msg.filePath && (
                            <div
                              className="mt-2 text-sm underline cursor-pointer text-yellow-200 hover:text-yellow-300"
                              onClick={() => {
                                const filename = msg.filePath.split("/").pop();
                                handleDownload(filename);
                              }}
                            >
                              📎 {fileName}
                            </div>
                          )}
                        </div>
                      )}  
                      {/* 전송 시각 */}
                      <span className="text-xs text-gray-600 mt-1">
                        {(() => {
                          const dt = new Date(msg.send_time);
                          const datePart = dt.toLocaleDateString();    // 예: 2025. 3. 26.
                          const timePart = dt.toLocaleTimeString();    // 예: 오전 11:38:21
                          return (
                            <>
                              {datePart}
                              <br />
                              {timePart}
                            </>
                          );
                        })()}
                    </span>
                    </div>
                  );
                })
              ) : (
                <p className="text-gray-500 text-center mt-4">
                  메시지가 없습니다.
                </p>
              )}
            </div>
          )}
  
          {/* 입력창 + 첨부 버튼 */}
          <div className="mt-2 flex items-center space-x-2">
            <label className="p-2 bg-white rounded-full shadow-md cursor-pointer">
              <Paperclip />
              <input
                type="file"
                multiple
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.repeat) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="메시지를 입력하세요..."
              className="flex-1 px-4 py-2 bg-white border rounded-full shadow-md focus:outline-none"
            />
            <button
              onClick={handleSend}
              className="p-2 bg-white rounded-full shadow-md"
            >
              <Send />
            </button>
          </div>
        </>
      ) : (
        <div className="h-full flex items-center justify-center text-gray-500">
          대화방을 선택하세요.
        </div>
      )}
      {inactiveMessage && (
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-yellow-200 text-black rounded shadow-md z-50 text-sm text-center">
        ⏱ 일정 시간 동안 활동이 없어 대화방이 비활성화되었습니다.<br />
        👉 다시 대화방을 선택해주세요.
      </div>
    )}
    </div>
  );  
};  

export default ChatRoom;