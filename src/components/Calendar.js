import React, { useEffect, useState, useContext } from "react";
import { gapi } from "gapi-script";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { TaskContext } from "../context/TaskContext.js";
import "./CalendarPage.css";

// .env에서 CLIENT_ID와 API_KEY 불러오기
const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

export default function CalendarPage() {
  const { tasks, toggleTask, addTask } = useContext(TaskContext);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    function initGoogleAuth() {
      gapi.load("client:auth2", () => {
        gapi.auth2
          .init({
            apiKey: API_KEY,
            client_id: CLIENT_ID,
            scope: "https://www.googleapis.com/auth/calendar.events",
          })
          .then(() => {
            const authInstance = gapi.auth2.getAuthInstance();
            setIsSignedIn(authInstance.isSignedIn.get());
          })
          .catch((error) => console.error("Google Auth 초기화 실패:", error));
      });
    }

    initGoogleAuth();
  }, []);

  useEffect(() => {
    setEvents(
      tasks.map((task) => ({
        id: task.id.toString(),
        title: task.completed ? `✅ ${task.text}` : `⬜ ${task.text}`,
        start: new Date(task.date),
        allDay: true,
        backgroundColor: task.completed ? "#666" : "#555",
        borderColor: "#555",
      }))
    );
  }, [tasks]);

  const handleDateClick = (info) => {
    setSelectedDate(info.dateStr);
  };

  const handleEventClick = (clickInfo) => {
    const taskId = Number(clickInfo.event.id);
    toggleTask(taskId);

    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === taskId
          ? {
              ...event,
              title: event.title.includes("✅") ? `⬜ ${event.title.slice(2)}` : `✅ ${event.title.slice(2)}`,
              backgroundColor: event.title.includes("✅") ? "#555" : "#666",
            }
          : event
      )
    );
  };

  return (
    <div className="calendar-container">
      <div className="calendar-content">
        <h2 className="calendar-title">📅 Google Calendar</h2>
        {isSignedIn ? (
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            events={events}
            dateClick={handleDateClick}
            eventClick={handleEventClick}
          />
        ) : (
          <p>Google 계정으로 로그인하면 캘린더를 사용할 수 있습니다.</p>
        )}
      </div>

      {selectedDate && (
        <div className="task-list">
          <h3>{selectedDate} 할 일</h3>
          <ul>
            {tasks
              .filter((task) => task.date === selectedDate)
              .map((task) => (
                <li key={task.id} className="task-item">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => {
                      toggleTask(task.id);
                      setEvents((prevEvents) =>
                        prevEvents.map((event) =>
                          event.id === task.id
                            ? {
                                ...event,
                                title: !task.completed ? `✅ ${task.text}` : `⬜ ${task.text}`,
                                backgroundColor: !task.completed ? "#666" : "#555",
                              }
                            : event
                        )
                      );
                    }}
                    className="task-checkbox"
                  />
                  {task.text}
                </li>
              ))}
          </ul>
          <button
            onClick={() => {
              const taskText = prompt("새 할 일을 입력하세요:");
              if (taskText) {
                addTask(taskText, selectedDate);
              }
            }}
            className="add-task-button"
          >
            + 할 일 추가
          </button>
        </div>
      )}
    </div>
  );
}
