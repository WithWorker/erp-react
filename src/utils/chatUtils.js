// 메시지 타임스탬프 포맷팅
export const formatTimestamp = (timestamp) => {
     return new Date(timestamp).toLocaleString("ko-KR", { timeZone: "Asia/Seoul" });
     };

   // WebSocket 메시지 변환
export const parseSocketMessage = (msg) => {
     return {
          id: msg.messengerId,
          sender: msg.senderId,
          receiver: msg.receiverId,
          content: msg.content,
          timestamp: formatTimestamp(msg.sendTime),
     };
};
