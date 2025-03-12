import React, { useContext, useState } from "react";
import { TaskContext } from "../context/TaskContext.js";
import "./Tasks.css"; // CSS 파일 추가

export default function TaskList() {
  const { tasks, addTask, toggleTask, deleteTask } = useContext(TaskContext);
  const [newTask, setNewTask] = useState("");
  const [taskDate, setTaskDate] = useState("");

  const handleAddTask = () => {
    if (newTask.trim() === "" || taskDate === "") return;
    addTask(newTask, taskDate);
    setNewTask("");
    setTaskDate("");
  };

  return (
    <div className="task-container">
      <h2 className="task-title">📝 할 일 목록</h2>
      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id} className="task-item">
            <button
              onClick={() => toggleTask(task.id)}
              className={`task-checkbox ${task.completed ? "checked" : ""}`}
            >
              {task.completed && <span className="check-mark">✔</span>}
            </button>
            <span className={`task-text ${task.completed ? "completed" : ""}`}>
              {task.text}
            </span>
            <button onClick={() => deleteTask(task.id)} className="task-delete-btn">
              ✖
            </button>
          </li>
        ))}
      </ul>

      <div className="task-input">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="새로운 할 일 입력"
          className="input-text"
        />
        <input
          type="date"
          value={taskDate}
          onChange={(e) => setTaskDate(e.target.value)}
          className="input-date"
        />
        <button onClick={handleAddTask} className="add-btn">+ 추가하기</button>
      </div>
    </div>
  );
}
