// src/components/TaskList.js
import React, { useContext, useState } from "react";
import { TaskContext } from "../context/TaskContext";

const TaskList = () => {
  const { tasks, addTask, deleteTask, toggleStatus, filter, setFilter } = useContext(TaskContext);
  const [newTask, setNewTask] = useState({ title: "", description: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTask.title.trim() && newTask.description.trim()) {
      addTask(newTask.title, newTask.description);
      setNewTask({ title: "", description: "" });
    }
  };

  const filteredTasks = tasks.filter((task) => (filter === "All" ? true : task.status === filter));

  return (
    <div>
      <h2>Task List</h2>

      <div>
        <button onClick={() => setFilter("All")} disabled={filter === "All"}>All</button>
        <button onClick={() => setFilter("In Progress")} disabled={filter === "In Progress"}>In Progress</button>
        <button onClick={() => setFilter("Completed")} disabled={filter === "Completed"}>Completed</button>
      </div>

      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Task Title" value={newTask.title} onChange={(e) => setNewTask({ ...newTask, title: e.target.value })} required />
        <input type="text" placeholder="Task Description" value={newTask.description} onChange={(e) => setNewTask({ ...newTask, description: e.target.value })} required />
        <button type="submit">Add Task</button>
      </form>

      <ul>
        {filteredTasks.map((task) => (
          <li key={task.id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Status: {task.status}</p>
            <button onClick={() => toggleStatus(task.id)}>{task.status === "In Progress" ? "Complete" : "Undo"}</button>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
