import React, { useState, useEffect } from "react";
import '../styles/Timer.css';
import alarmWav from "../assets/alarm.wav";

const alarmSound = new Audio(alarmWav); // Replace with the path to your audio file

const Timer = ({ taskId, isRunning, onToggle, taskStatus }) => {
  const WORK_TIME = 5; // Change to 5 * 60 for real usage
  const BREAK_TIME = 3; // Change to 5 * 60 for real usage

  const [timeLeft, setTimeLeft] = useState(WORK_TIME);
  const [isWorkSession, setIsWorkSession] = useState(true);

  useEffect(() => {
    let timer;

    if (taskStatus === "Completed") {
      setTimeLeft(WORK_TIME);
      onToggle(false); // Stop timer if task is completed
      return;
    }

    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (isRunning && timeLeft === 0) {
      // Play sound when the timer hits 0
      alarmSound.play();

      setTimeout(() => {
        if (isWorkSession) {
          if (window.confirm("Work session completed! Start break?")) {
            setIsWorkSession(false);
            alarmSound.pause();
            setTimeLeft(BREAK_TIME);
          } else {
            onToggle(false); 
            
            // Stop the timer
          }
        } else {
          alert("Break over! Time to work.");
          alarmSound.pause();
          setIsWorkSession(true);
          setTimeLeft(WORK_TIME);
        }
      }, 500);
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
    <div id={`timer-${taskId}`} className="timer-container">
      <h3>{isWorkSession ? "Work Time" : "Break Time"}</h3>
      <p className="countdown">{formatTime(timeLeft)}</p>
      <button onClick={() => onToggle(!isRunning)} disabled={taskStatus === "Completed"}>
        {isRunning ? "Pause" : "Start"}
      </button>
    </div>
  );
};

export default Timer;
