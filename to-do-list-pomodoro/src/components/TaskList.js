import React, { useContext, useState } from "react";
import { TaskContext } from "../context/TaskContext";
import Timer from "./Timer";
import Modal from "./Modal"; 
import '../styles/TaskList.css';

const TaskList = () => {
  const { tasks, addTask, updateTask, deleteTask, toggleStatus, filter, setFilter } = useContext(TaskContext);
  const [newTask, setNewTask] = useState({ title: "", description: "" });
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTask, setEditedTask] = useState({ title: "", description: "" });
  const [runningTaskId, setRunningTaskId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isEditing) {
      updateTask(editingTaskId, editedTask.title, editedTask.description, editedTask.deadline);
      setEditingTaskId(null);
    } else {
      addTask(newTask.title, newTask.description, newTask.deadline);
      setNewTask({ title: "", description: "", deadline: "" });
    }
  
    setIsModalOpen(false); // Close modal after action
    setIsEditing(false); // Reset mode
  };
  
  
  const handleEdit = (task) => {
    setEditingTaskId(task.id);
    setEditedTask({ title: task.title, description: task.description, deadline: task.deadline});
    setIsEditing(true);
    setIsModalOpen(true);
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
    <div id="tasklist" className="tasklist-container">
      <h2>Task List</h2>

      {/*Filter Buttons, Header*/}
      <div className="tasklist-header">
        <div className="left-buttons">
          <button onClick={() => setFilter("All")} disabled={filter === "All"}>All</button>
          <button onClick={() => setFilter("In Progress")} disabled={filter === "In Progress"}>In Progress</button>
          <button onClick={() => setFilter("Completed")} disabled={filter === "Completed"}>Completed</button>
        </div>
        <button className="plus-button" onClick={() => setIsModalOpen(true)}>+</button>
      </div>

      
      {/* Task Form in Modal */}
      <Modal isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); setIsEditing(false); }}>
        <form onSubmit={handleSubmit}>
          <div className="button-container">
            <button type="button" className="cancel-btn"onClick={() => { setIsModalOpen(false); setIsEditing(false); }}>Cancel</button>
            <button type="submit" className="add-btn">{isEditing ? "Save" : "Add"}</button>
          </div>

          <h3>Title</h3>
          <input 
            type="text" 
            placeholder="Task Title" 
            value={isEditing ? editedTask.title : newTask.title} 
            onChange={(e) => isEditing 
              ? setEditedTask({ ...editedTask, title: e.target.value }) 
              : setNewTask({ ...newTask, title: e.target.value })}
            required 
          />

          <h3>Description</h3>
          <textarea 
            placeholder="Task Description" 
            value={isEditing ? editedTask.description : newTask.description} 
            onChange={(e) => isEditing 
              ? setEditedTask({ ...editedTask, description: e.target.value }) 
              : setNewTask({ ...newTask, description: e.target.value })}
          />

          <h3>Deadline</h3>
          <input 
            type="date" 
            value={isEditing ? editedTask.deadline : newTask.deadline} 
            onChange={(e) => isEditing 
              ? setEditedTask({ ...editedTask, deadline: e.target.value }) 
              : setNewTask({ ...newTask, deadline: e.target.value })}
          />
        </form>
      </Modal>

      {/* Task List */}
      <div className="tasklist-content">
        <ul className="task-grid">
          {filteredTasks.map((task) => (
            <li key={task.id} className="task-card">
              <div className="task-content">
                {/* Task Info (Left Side) */}
                <div className="task-info">
                  <h3>{task.title}</h3>
                  <p>{task.description}</p>
                  {task.deadline && <p className="deadline">Deadline: {formatDate(task.deadline)}</p>}
                  <hr className="task-divider"/>
                  
                  <div className="task-actions">
                  <button className={`status ${task.status.replace(/\s+/g, '-').toLowerCase()}`} onClick={() => toggleStatus(task.id)}>{task.status === "In Progress" ? "In Progress" : "Completed"} </button>
                    <button className="edit-btn" onClick={() => handleEdit(task)}>Edit</button>
                    <button className="delete-btn" onClick={() => deleteTask(task.id)}>Delete</button>
                  </div>
                </div>

                {/* Timer (Right Side) */}
                <div className="task-timer">
                  {task.status !== "Completed" && (
                    <Timer
                      taskId={task.id}
                      isRunning={runningTaskId === task.id}
                      onToggle={() => handleTimerToggle(task.id)}
                      taskStatus={task.status}
                    />
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default TaskList;
