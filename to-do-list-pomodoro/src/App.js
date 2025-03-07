import React from "react";
import { TaskProvider } from "./context/TaskContext";
import { TimerProvider } from "./context/TimerContext";
import TaskList from "./components/TaskList";
import "./App.css";



function App() {
  return (
    <TaskProvider>
      <TimerProvider>
        <div>
          <h1>Task Manager with Pomodoro</h1>
          <TaskList />
        </div>
      </TimerProvider>
    </TaskProvider>
  );
}


export default App;
