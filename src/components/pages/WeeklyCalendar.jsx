import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

const WeeklyCalendar = () => {
  const [events, setEvents] = useState([
    { title: "프로젝트 미팅", start: "2025-03-25" },
    { title: "주간 회의", start: "2025-03-27" },
  ]);

  return (
    <div className="p-4 bg-white rounded-xl shadow-md w-full">
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridWeek" // 주간 단위만 표시
        events={events}
        height="auto"
        headerToolbar={{
          left: "prev,next",
          center: "title",
          right: "",
        }}
      />
    </div>
  );
};

export default WeeklyCalendar;
