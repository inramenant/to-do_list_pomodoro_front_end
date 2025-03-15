import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";  
import { TaskProvider } from "./context/TaskContext";
import { TimerProvider } from "./context/TimerContext";
import Login from "./pages/Login";
import ThemeContext from "./context/ThemeContext";
import Register from "./pages/Register";
import Home from "./pages/Home";
import "./App.css";

function App() {

  const {theme, toggleTheme} = useContext(ThemeContext);

  return (
    <TaskProvider>
      <TimerProvider>
        <div>
          
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
          <button className="themebutton" onClick={toggleTheme}>
            {theme === "light" ? "🌙" : "💡"}
          </button>
        </div>
      </TimerProvider>
    </TaskProvider>
  );
}

export default App;
