// src/components/Timer.js
import React, { useContext, useEffect, useState } from "react";
import { TimerContext } from "../context/TimerContext";
import { TaskContext } from "../context/TaskContext";

const Timer = () => {
  const { tasks } = useContext(TaskContext);
  const { activeTask, timeLeft, isRunning, mode, startTimer, stopTimer } = useContext(TimerContext);
  const [time, setTime] = useState(timeLeft);

  useEffect(() => {
    let timer;
    if (isRunning && time > 0) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      alert(mode === "Work" ? "Time for a break!" : "Back to work!");
      stopTimer();
    }

    return () => clearInterval(timer);
  }, [isRunning, time, mode, stopTimer]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div>
      <h2>Pomodoro Timer</h2>
      <p>{mode} Mode</p>
      <h3>{formatTime(time)}</h3>

      <select onChange={(e) => startTimer(e.target.value)} disabled={isRunning}>
        <option value="">Select Task</option>
        {tasks.map((task) => (
          <option key={task.id} value={task.id}>
            {task.title}
          </option>
        ))}
      </select>

      {isRunning ? (
        <button onClick={stopTimer}>Stop</button>
      ) : (
        <button onClick={() => startTimer(activeTask)}>Start</button>
      )}
    </div>
  );
};

export default Timer;
