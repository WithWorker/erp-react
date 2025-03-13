import React, { useState } from 'react';
import Sidebar from '../include/Sidebar';
import Header from '../include/Header';

const AlarmPage = () => {
  // 알림 목록 상태 (테스트용)
  const [notifications, setNotifications] = useState([
    { id: 1, text: "새로운 일정이 추가되었습니다.", read: false, timestamp: "10:30 AM" },
    { id: 2, text: "긴급 공지 확인하세요!", read: false, timestamp: "09:15 AM" },
    { id: 3, text: "회의 일정이 변경되었습니다.", read: true, timestamp: "08:45 AM" },
  ]);

  // 알림 읽음 처리 함수
  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  return (
     <div className="flex h-screen bg-gray-100">
     <Sidebar />
     <div className="flex-1 p-6">
       <Header />
       <div className="flex h-[calc(109vh-14rem)]">
      
      {/* ✅ 왼쪽 - 알림 리스트 */}
      <div className="w-1/4 bg-white rounded-2xl shadow-md p-4 mr-4">
        <h2 className="text-lg font-bold mb-4">알림 리스트</h2>
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-2 border-b cursor-pointer hover:bg-gray-200 ${
              notification.read ? "text-gray-400" : "font-bold"
            }`}
            onClick={() => markAsRead(notification.id)}
          >
            {notification.text}
          </div>
        ))}
      </div>

      {/* ✅ 가운데 - 알림 상세 (안 읽은 알림 & 읽은 알림) */}
      <div className="flex-1 bg-white rounded-2xl shadow-lg p-4 relative">
        <h2 className="text-lg font-bold mb-4">알림</h2>

        <div className="flex space-x-4">
          {/* 안 읽은 알림 */}
          <div className="w-1/2 p-4 bg-gray-100 rounded-lg">
            <h3 className="font-bold mb-2">📩 안 읽은 알림</h3>
            {notifications.filter((n) => !n.read).length === 0 ? (
              <p className="text-gray-500">모든 알림을 확인했습니다.</p>
            ) : (
              notifications
                .filter((n) => !n.read)
                .map((n) => (
                  <div
                    key={n.id}
                    className="p-2 bg-white shadow-sm rounded-lg mb-2 cursor-pointer"
                    onClick={() => markAsRead(n.id)}
                  >
                    {n.text}
                    <span className="block text-xs text-gray-500">{n.timestamp}</span>
                  </div>
                ))
            )}
          </div>

          {/* 읽은 알림 */}
          <div className="w-1/2 p-4 bg-gray-100 rounded-lg">
            <h3 className="font-bold mb-2">📨 읽은 알림</h3>
            {notifications.filter((n) => n.read).length === 0 ? (
              <p className="text-gray-500">아직 읽은 알림이 없습니다.</p>
            ) : (
              notifications
                .filter((n) => n.read)
                .map((n) => (
                  <div key={n.id} className="p-2 bg-gray-300 shadow-sm rounded-lg mb-2">
                    {n.text}
                    <span className="block text-xs text-gray-600">{n.timestamp}</span>
                  </div>
                ))
            )}
          </div>
        </div>
      </div>

      {/* ✅ 오른쪽 - 중요 내용 저장 (기존 그대로 유지) */}
      <div className="w-1/4 bg-white rounded-2xl shadow-md p-4 ml-4">
        <h2 className="text-lg font-bold mb-4">중요 내용 저장하기</h2>
        {/* 기존 중요 내용 UI 유지 */}
      </div>
    </div>
    </div>
    </div>
  );
};

export default AlarmPage;
