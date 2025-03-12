import React from "react";
import { useNavigate } from "react-router-dom";

const EventList = ({ selectedDate, selectedEvents }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col space-y-4 w-96 ml-6 p-4 bg-white rounded-2xl shadow-lg">
      {selectedDate && (
        <div>
          <h3 className="text-lg font-bold">{selectedDate} 일정</h3>
          {selectedEvents.length === 0 ? (
            <p>등록된 일정이 없습니다.</p>
          ) : (
            <ul>
              {selectedEvents.map((event) => (
                <li key={event.id} className="mt-2 p-2 bg-gray-100 rounded-md">
                  {event.title}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
      <button
        className="w-full p-2 mt-4 bg-[#006D2C] text-white rounded-md"
        onClick={() => navigate(`/calendar/add`)}
      >
        일정 추가
      </button>
    </div>
  );
};

export default EventList;
