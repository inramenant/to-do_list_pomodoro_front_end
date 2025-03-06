// src/context/TaskContext.js
import React, { createContext, useState, useEffect } from "react";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [filter, setFilter] = useState(() => localStorage.getItem("filter") || "All");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("filter", filter);
  }, [filter]);

  const addTask = (title, description, deadline) => {
    setTasks([...tasks, { id: Date.now(), title, description, deadline: deadline || "No deadline", status: "In Progress" }]);
  };  

  const updateTask = (taskId, newTitle, newDescription, newDeadline) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, title: newTitle, description: newDescription, deadline: newDeadline } : task
      )
    );
  };

  const deleteTask = (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      setTasks(tasks.filter((task) => task.id !== id));
    }
  };

  const toggleStatus = (id) => {
    setTasks(tasks.map((task) =>
      task.id === id ? { ...task, status: task.status === "In Progress" ? "Completed" : "In Progress" } : task
    ));
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask, toggleStatus, filter, setFilter }}>
      {children}
    </TaskContext.Provider>
  );
};
