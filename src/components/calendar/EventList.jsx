import React from "react";
import { useNavigate } from "react-router-dom";

const EventList = ({ selectedDate, selectedEvents }) => {
  const navigate = useNavigate();

  // selectedDate 포맷팅
  const formattedDate = new Date(selectedDate).toLocaleDateString("ko-KR", {
    month: "long", // 월 이름 
    day: "2-digit", // 2자리 일 
  });

  return (
    <div className="flex flex-col space-y-4 w-96 ml-6 p-4 bg-white rounded-2xl shadow-lg">
      {selectedDate && (
        <div>
          <h3 className="text-xl font-bold text-center m-4">
            {formattedDate} 
          </h3>
          {selectedEvents.length === 0 ? (
            <p>등록된 일정이 없습니다.</p>
          ) : (
            <ul className="space-y-4">
              {selectedEvents.map((event) => (
                <li
                  key={event.id || `${event.title}-${event.start}`}
                  className="p-3 bg-gray-100 rounded-md cursor-pointer"
                  onClick={() => navigate(`/calendar/${event.id}`)}
                >
                  <p className="font-semibold ml-2">{event.title}</p>
                  <div className="mt-3 ml-4">
                    {event.description
                      ? event.description.split("\n").map((line, index) => (
                          <p key={index} className="text-gray-700">
                            • {line}
                          </p>
                        ))
                      : <p className="text-gray-700">등록된 내용이 없습니다.</p>}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
      <button
        className="w-full p-2 mt-4 bg-[#006D2C] text-white rounded-md text-lg"
        onClick={() => navigate("/calendar/add")}
      >
        일정 추가
      </button>
    </div>
  );
};

export default EventList;
