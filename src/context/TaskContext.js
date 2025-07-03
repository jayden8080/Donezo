import React, { createContext, useState, useEffect } from "react";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const [tasks, setTasks] = useState(storedTasks);

  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  const addTask = (text, date) => {
    const newTask = { id: Date.now(), text, date, completed: false };
    setTasks((prevTasks) => [...prevTasks, newTask]);
    console.log("✅ 할 일 추가됨:", newTask);
  };

  const toggleTask = (taskId) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      );
      console.log("✅ 토글 후 상태:", updatedTasks);
      return updatedTasks;
    });
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, toggleTask }}>
      {children}
    </TaskContext.Provider>
  );
};
