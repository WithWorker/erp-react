import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { removeEvent } from '../../redux/slice/calendarSlice';
import Sidebar from '../include/Sidebar';
import Header from '../include/Header';

const EventDetailPage = () => {
  const { id } = useParams();  // URL에서 이벤트 id 가져오기
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const event = useSelector(state => 
    state.calendar.events.find(event => event.id === id)
  );

  if (!event) {
    return <p>이 이벤트를 찾을 수 없습니다.</p>;
  }

  const handleDelete = () => {
    if (window.confirm("이 이벤트를 삭제하시겠습니까?")) {
      dispatch(removeEvent(id));
      navigate('/calendar');  // 삭제 후 캘린더 페이지로 이동
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-6">
        <Header />
      <h1 className="text-xl font-bold">{event.title}</h1>
      <p>날짜: {event.start}</p>
      <p>카테고리: {event.category}</p>

      <button
        onClick={handleDelete}
        className="mt-4 p-2 bg-red-500 text-white rounded"
      >
        삭제하기
      </button>
      <button
        onClick={() => navigate('/calendar')}
        className="mt-4 ml-2 p-2 bg-gray-500 text-white rounded"
      >
        돌아가기
      </button>
    </div>
    </div>
  );
};

export default EventDetailPage;
