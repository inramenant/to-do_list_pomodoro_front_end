// src/context/TimerContext.js
import React, { createContext, useState, useEffect } from "react";

export const TimerContext = createContext();

export const TimerProvider = ({ children }) => {
  const [activeTask, setActiveTask] = useState(() => localStorage.getItem("activeTask") || null);
  const [timeLeft, setTimeLeft] = useState(() => parseInt(localStorage.getItem("timeLeft")) || 1500);
  const [mode, setMode] = useState(() => localStorage.getItem("mode") || "Work");
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    localStorage.setItem("activeTask", activeTask);
    localStorage.setItem("timeLeft", timeLeft);
    localStorage.setItem("mode", mode);
  }, [activeTask, timeLeft, mode]);

  const startTimer = (taskId) => {
    setActiveTask(taskId);
    setIsRunning(true);
  };

  const stopTimer = () => {
    setActiveTask(null);
    setIsRunning(false);
    setTimeLeft(1500);
    setMode("Work");
  };

  return (
    <TimerContext.Provider value={{ activeTask, timeLeft, isRunning, mode, startTimer, stopTimer }}>
      {children}
    </TimerContext.Provider>
  );
};
