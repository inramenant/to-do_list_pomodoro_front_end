import React, { useState, useEffect } from "react";

const Timer = ({ taskId, isRunning, onToggle, taskStatus }) => {
  const WORK_TIME = 25; // 25 * 60 (for testing, use 5 sec)
  const BREAK_TIME = 5; // 5 * 60 (for testing, use 3 sec)

  const [timeLeft, setTimeLeft] = useState(WORK_TIME);
  const [isWorkSession, setIsWorkSession] = useState(true); // Track Work vs Break

  useEffect(() => {
    let timer;
    
    // **STOP TIMER IF TASK IS COMPLETED**
    if (taskStatus === "Completed") {
      setTimeLeft(WORK_TIME);
      onToggle(false); // Stop the timer
      return;
    }

    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (isRunning && timeLeft === 0) {
      clearInterval(timer);

      if (isWorkSession) {
        if (window.confirm("Work session completed! Start break?")) {
          setIsWorkSession(false);
          setTimeLeft(BREAK_TIME);
        } else {
          onToggle(false); // Stop the timer
        }
      } else {
        alert("Break is over! Back to work.");
        setIsWorkSession(true);
        setTimeLeft(WORK_TIME);
      }
    }

    return () => clearInterval(timer);
  }, [isRunning, timeLeft, taskStatus]);

  // Format time (MM:SS)
  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  };

  return (
    <div>
      <h3>{isWorkSession ? "Work Time" : "Break Time"}</h3>
      <p className="countdown">{formatTime(timeLeft)}</p>
      <button onClick={() => onToggle(!isRunning)} disabled={taskStatus === "Completed"}>
        {isRunning ? "Pause" : "Start"}
      </button>
    </div>
  );
};

export default Timer;
