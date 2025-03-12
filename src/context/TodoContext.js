// src/context/TodoContext.js
import React, { createContext, useState, useContext } from "react";

// Context 생성
const TodoContext = createContext();

// Context를 사용하는 커스텀 훅
export const useTodo = () => useContext(TodoContext);

// Provider 컴포넌트
export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos([...todos, todo]);
  };

  const deleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  return (
    <TodoContext.Provider value={{ todos, addTodo, deleteTodo }}>
      {children}
    </TodoContext.Provider>
  );
};
