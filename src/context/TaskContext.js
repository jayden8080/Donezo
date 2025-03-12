import React, { createContext, useState, useEffect } from "react";

// TaskContext 생성
export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  // 로컬 스토리지에서 저장된 할 일 데이터 불러오기
  const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const [tasks, setTasks] = useState(storedTasks);

  // 할 일이 변경될 때마다 로컬 스토리지에 저장
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  // 새로운 할 일 추가
  const addTask = (text, date) => {
    const newTask = { id: Date.now(), text, date, completed: false };
    setTasks((prevTasks) => [...prevTasks, newTask]);
    console.log("✅ 할 일 추가됨:", newTask);
  };

  // 할 일 완료 상태 토글
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
