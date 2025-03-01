import React from "react";
import { TaskProvider } from "./context/TaskContext";
import { TimerProvider } from "./context/TimerContext";
import TaskList from "./components/TaskList";
import { ThemeContext } from "./context/ThemeContext";
import Timer from "./components/Timer";

function App() {
  return (
    <TaskProvider>
      <TimerProvider>
        <div>
          <h1>Task Manager with Pomodoro</h1>
          <TaskList />
          <Timer />
        </div>
      </TimerProvider>
    </TaskProvider>
  );
}


export default App;
