import React from "react";
import { Routes, Route } from "react-router-dom";  
import { TaskProvider } from "./context/TaskContext";
import { TimerProvider } from "./context/TimerContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import "./App.css";

function App() {
  return (
    <TaskProvider>
      <TimerProvider>
        <div>
          <h1>Task Manager with Pomodoro</h1>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </TimerProvider>
    </TaskProvider>
  );
}

export default App;
