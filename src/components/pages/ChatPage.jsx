import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addMessage, deleteMessage } from '../../redux/slice/chatSlice';
import { Plus, Send, Trash, Paperclip } from 'react-bootstrap-icons';
import Sidebar from '../include/Sidebar';
import Header from '../include/Header';
import { v4 as uuidv4 } from 'uuid';

const ChatPage = () => {
  const [input, setInput] = useState('');
  const [selectedMessages, setSelectedMessages] = useState([]); // 스택 상태 추가
  const messages = useSelector((state) => state.chat.messages);
  const dispatch = useDispatch();
  const inputRef = useRef(null); // 입력창 참조
  const messagesEndRef = useRef(null); // 메시지 목록 끝을 참조할 ref 추가

  // ✅ 📎 첨부파일 추가 기능 (25.03.12 경훈)
  const [file, setFile] = useState(null);
  // ✅ 🗂️ 채팅 리스트 & 👥 대화방 추가 기능 (25.03.12 경훈)
  const [chats, setChats] = useState([]);
  const [employees, setEmployees] = useState([]); // 직원 목록 상태 추가
  const [currentChat, setCurrentChat] = useState(null); // 최근 채팅
  const [dept, setDept] = useState([]); // 부서
  const [selectedEmployees, setSelectedEmployees] = useState([]); // 부서 직원 선택
  const [showEmployeeList, setShowEmployeeList] = useState(false);

  // ✅ localStorage에서 저장된 중요 메시지 불러오기
  useEffect(() => {
    const savedMessages = localStorage.getItem('selectedMessages');
    if (savedMessages) {
      setSelectedMessages(JSON.parse(savedMessages));
    }
  }, []);

  // ✅ 중요 메시지 상태를 localStorage에 저장
  useEffect(() => {
    localStorage.setItem('selectedMessages', JSON.stringify(selectedMessages));
  }, [selectedMessages]);

  // 최근 메시지로 스크롤 이동
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]); // messages가 변경될 때마다 실행

  // ✅ 채팅 목록 가져오기
  useEffect(() => {
    fetch('/api/chatrooms')
      .then((res) => res.json())
      .then((data) => setChats(data));
  }, []);

  const handleSend = () => {
    if (input.trim() || file) {
      dispatch(
        addMessage({
          id: uuidv4(), // 고유 UUID 생성
          text: input,
          sender: 'user',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          file: file ? file.name : null,
        })
      );
      setInput('');
      setFile(null);
      inputRef.current.focus(); // 메시지 전송 후 입력창에 포커스 설정
    }
  };

  // 메시지 클릭 시 스택에 추가
  const handleSelectMessage = (msg) => {
    //setSelectedMessages((prev) => [...prev, msg]);
    setSelectedMessages((prev) => {
      // ✅ 이미 추가된 메시지는 제외
      if (prev.some((m) => m.id === msg.id)) return prev;
      return [...prev, msg];
    });
  };

  // 중요 메시지 삭제
    const handleDeleteMessage = (id) => {
    setSelectedMessages((prev) =>
      prev.filter((msg) => msg.id !== id) // 삭제 후 상태 업데이트
    );
  };

  // 엔터 키로 메시지 전송
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // 기본 엔터 키 동작 방지 (줄바꿈 방지)
      handleSend();
    }
  };

  // 📎 첨부파일 기능 (25.03.12 경훈)
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  // 📎 파일 선택 창 열기 (기본 `D:\`에서 시작) (25.03.12 경훈)
  const handleOpenFileDialog = () => {
    const inputElement = document.createElement('input');
    inputElement.type = 'file';
    inputElement.style.display = 'none';
    document.body.appendChild(inputElement);
    inputElement.setAttribute("nwworkingdir", "D:");

    inputElement.addEventListener("change", (e) => {
      handleFileChange(e);
      document.body.removeChild(inputElement);
    });

    inputElement.click();
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-6">
        <Header />
        <div className="flex h-[calc(109vh-14rem)]">
          
          {/* ✅ 채팅 리스트 (25.03.12 경훈)*/} 
          <div className="w-1/4 bg-white rounded-2xl shadow-md p-4 mr-4">
            <h2 className="text-lg font-bold mb-4">채팅 리스트</h2>
            <button 
              className="w-full p-2 bg-green-500 text-white rounded mb-2"
              onClick={() => {setShowEmployeeList(!showEmployeeList)
              console.log("showEmployeeList: ", !showEmployeeList);
              }}
            >
              + 대화방 추가
            </button>
            {chats.map((chat) => (
              <div 
                key={chat.id} 
                className="p-2 border-b cursor-pointer hover:bg-gray-200"
                onClick={() => setCurrentChat(chat)}
              >
                {chat.name}
              </div>
            ))}
          </div>
          {/* 25.03.13 경훈 대화방 추가 기능 */}
          {/* ✅ 대화방 추가 모달 */}
          {showEmployeeList && (
            <div className = "fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className = "bg-white p-6 rounded-2xl shadow-lg w-[350px]">
                <h2 className = "text-lg font-bold mb-4"> 대화방 추가 </h2>
                {/* 부서 선택 */}
                <label className = "block text-sm font-medium mb-1"> 부서 선택 </label>
                <select
                  className = "w-full p-2 border rounded mb-4"
                  onChange = {(e) => {
                    setDept(e.target.value); // 선택한 부서의 직원 목록 정렬
                    const selectedDept = dept.find(d => d.name === e.target.value);
                    selectedEmployees(
                      employees
                        .filter(emp => emp.dept === selectedDept)
                        .sort((a, b) => a.name.localCompare(b.name))
                    );
                  }}
                  >
                  <option value="">부서를 선택하세요</option>
                    {dept.map((d) => (
                      <option key={d.id} value={d.name}>{d.name}</option>
                    ))}
                </select>
                {/* 직원 선택 */}
                <label className = "block text-sm font-medium mb-1"> 직원 선택 </label>
                <select className = "w-full p-2 border rounded mb-4">
                  <option value = ""> 직원을 선택하세요 </option>
                    {selectedEmployees.map((emp) => (
                      <option key = {emp.id} value = {emp.id}> {emp.name} </option>
                    ))}
                </select>
                {/* 버튼 영역 */}
                <div className = "flex justify-between">
                  <button
                    className = "px-4 py-2 bg-blue-500 text-white rounded"
                    onClick = {() => {
                      // 채팅방 생성 로직
                      if(!selectedEmployees.length) return;
                      const newChat = {id: Date.now(), name: selectedEmployees[0].name};
                      setChats([...chats, newChat]);
                      setShowEmployeeList(false);
                    }}>
                      생성
                    </button>
                    <button
                      className = "px-4 py-2 bg-gray-300 rounded"
                      onClick = {() => setShowEmployeeList(false)}>
                      닫기
                    </button>
                </div>
              </div>
            </div>
          )}  
          {/* 채팅 영역 */}
          <div className="flex-1 bg-white rounded-2xl shadow-lg p-4 relative">
            <div className="space-y-4 overflow-y-auto h-[90%]">
              {messages.map((msg, index) => {
                // 타임 스탬프가 일치하는지 체크
                const isLastMessage = index === messages.length - 1;
                const prevMessage = messages[index - 1]; // 이전 메시지
                const showTimestamp = 
                  !prevMessage || prevMessage.timestamp !== msg.timestamp; // 이전 메시지와 타임 스탬프가 다르면 표시
  
                return (
                  <div 
                    key={msg.id} // ✅ 중복 방지
                    className={`flex items-center 
                      ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {msg.sender !== 'user' && (
                      <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                    )}
                    <div className={`ml-2 flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                      <div 
                        className={`ml-2 flex flex-col px-4 py-2 rounded-2xl max-w-[40ch] whitespace-normal break-words 
                        ${msg.sender === 'user' 
                          ? 'bg-[#006D2C] text-white' 
                          : 'bg-gray-200'
                        }`}
                        onClick = {() => handleSelectMessage(msg)} // 클릭 시 처리
                      >
                        <span>{msg.text}</span>
                        {msg.file && (
                          <a href={`/uploads/${msg.file}`} className="text-blue-500 mt-1">
                            📎 {msg.file}
                          </a>
                        )}
                      </div>
                      {/* 타임스탬프 표시 */}
                      {showTimestamp && (
                        <span
                        className={`text-xs text-gray-500 mt-1 ${
                          msg.sender === 'user' ? 'ml-2' : 'mr-2'
                        }mt-1`}
                      >
                        {msg.timestamp}
                      </span>
                      )}
                    </div>
                  </div>
                );
              })}
              {/* 메시지 목록 끝 */}
              <div ref={messagesEndRef} />
            </div>
  
            {/* 입력창 */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center space-x-2">
              {/* 📎 파일 첨부 버튼 */}
              <button onClick={handleOpenFileDialog} className="p-2 bg-white rounded-full shadow-md">
                <Paperclip />
              </button>
  
              <input
                ref={inputRef} // 입력창에 ref 설정
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()} // 엔터 키 기능 추가
                placeholder="메시지를 입력하세요..."
                className="flex-1 px-4 py-2 bg-white border rounded-full shadow-md focus:outline-none"
              />
  
              <button onClick={handleSend} 
              className="p-2 bg-white rounded-full shadow-md">
                <Send />
              </button>
            </div>
          </div>
  
          {/* ✅ 우측 패널 - 중요 내용 저장 */}
          <div className="w-1/4 bg-white rounded-2xl shadow-md p-4 ml-4">
            <h2 className="text-lg font-bold mb-4">중요 내용 저장하기</h2>
            <div className="space-y-2 overflow-y-auto h-[300px]">
              {selectedMessages.map((msg) => (
                <div key={msg.id} className="flex items-center space-x-2 border-b pb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">{msg.timestamp}</span>
                    <span className="text-sm truncate">{msg.text}</span>
                  </div>
                  {/* 삭제 버튼 */}
                  <button
                    onClick={() => handleDeleteMessage(msg.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash />
                  </button>
                </div>
              ))}
            </div>
          </div>
  
        </div>
      </div>
    </div>
  );
}
  
export default ChatPage;