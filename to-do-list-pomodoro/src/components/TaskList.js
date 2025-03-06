// src/components/TaskList.js
import React, { useContext, useState } from "react";
import { TaskContext } from "../context/TaskContext";
import Timer from "./Timer";

const TaskList = () => {
  const { tasks, addTask, updateTask, deleteTask, toggleStatus, filter, setFilter } = useContext(TaskContext);
  const [newTask, setNewTask] = useState({ title: "", description: "" });
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTask, setEditedTask] = useState({ title: "", description: "" });
  const [runningTaskId, setRunningTaskId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTask.title.trim() && newTask.description.trim()) {
      console.log("Submitting Task:", newTask);  // Debugging
      addTask(newTask.title, newTask.description, newTask.deadline);
      setNewTask({ title: "", description: "", deadline: "" });
    }
  };
  
  const handleEdit = (task) => {
    setEditingTaskId(task.id);
    setEditedTask({ title: task.title, description: task.description, deadline: task.deadline });
  };

  const handleSave = (taskId) => {
    updateTask(taskId, editedTask.title, editedTask.description, editedTask.deadline);
    setEditingTaskId(null);
  };
  
  const handleTimerToggle = (taskId) => {
    setRunningTaskId((prevId) => (prevId === taskId ? null : taskId));
  };

  const filteredTasks = tasks.filter((task) => (filter === "All" ? true : task.status === filter));

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "short",
      month: "long",
      day: "numeric"
    });
  };

  return (
    <div id="tasklist">
      <h2>Task List</h2>

      <div>
        <button onClick={() => setFilter("All")} disabled={filter === "All"}>All</button>
        <button onClick={() => setFilter("In Progress")} disabled={filter === "In Progress"}>In Progress</button>
        <button onClick={() => setFilter("Completed")} disabled={filter === "Completed"}>Completed</button>
      </div>

      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Task Title" value={newTask.title} onChange={(e) => setNewTask({ ...newTask, title: e.target.value })} required />
        <input type="text" placeholder="Task Description" value={newTask.description} onChange={(e) => setNewTask({ ...newTask, description: e.target.value })} />
        <input type="date" value={newTask.deadline} 
          onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })} />

        <button type="submit">Add Task</button>
      </form>

      <ul>
        {filteredTasks.map((task) => (
          <li key={task.id}>
            {editingTaskId === task.id ? (
              <>
               <input type="text" value={editedTask.title} onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })} />
                <input type="text" value={editedTask.description} onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })} />
                <input type="date" value={editedTask.deadline} onChange={(e) => setEditedTask({ ...editedTask, deadline: e.target.value })} />

                <button onClick={() => handleSave(task.id)}>Save</button>
                <button onClick={() => setEditingTaskId(null)}>Cancel</button>
              </>
            ) : (
            <>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            {task.deadline && <p>Deadline: {formatDate(task.deadline)}</p>}

            <p>Status: {task.status}</p>
            <button onClick={() => handleEdit(task)}>Edit</button>
            <button onClick={() => toggleStatus(task.id)}>{task.status === "In Progress" ? "Complete" : "Undo"}</button>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
            
            {task.status != "Completed" && 
            <Timer
              taskId={task.id}
              isRunning={runningTaskId === task.id}
              onToggle={() => handleTimerToggle(task.id)}
              taskStatus = {task.status}
            />}
            
            
            </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );

};

export default TaskList;

