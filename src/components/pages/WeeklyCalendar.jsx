import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import googleCalendarPlugin from "@fullcalendar/google-calendar";

const WeeklyCalendar = ({ events }) => {
  return (
    <div className="p-4 bg-white rounded-xl shadow-md w-full">
      <FullCalendar
        plugins={[dayGridPlugin, googleCalendarPlugin]}
        initialView="dayGridWeek"
        eventSources={[
          {
            googleCalendarId: "ko.south_korea#holiday@group.v.calendar.google.com",
            className: "gcal-event",
            googleCalendarApiKey: import.meta.env.VITE_GOOGLE_CALENDAR_API_KEY, 
          },
          {
            events: events, 
          },
        ]}
        height="250px"
        headerToolbar={{
          left: "prev",
          center: "title",
          right: "next",
        }}
        eventContent={(eventInfo) => (
          <div>
            <span>{eventInfo.event.title}</span>
          </div>
        )}
      />
    </div>
  );
};

export default WeeklyCalendar;
