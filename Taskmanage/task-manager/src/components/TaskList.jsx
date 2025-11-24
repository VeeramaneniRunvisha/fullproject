// TaskList.jsx
import React, { useState, useEffect } from "react";
import { getTasks, addTask, toggleTaskCompletion } from "../services/taskService";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [priority, setPriority] = useState("low");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const data = await getTasks();
    setTasks(data);
  };

  const handleAddTask = async () => {
    if (!newTask.trim()) return;
    await addTask({ description: newTask, priority });
    setNewTask("");
    fetchTasks();
  };

  const handleToggle = async (id) => {
    await toggleTaskCompletion(id);
    fetchTasks();
  };

  return (
    <div className="task-container">
      <h2>My Tasks</h2>

      {/* Add Task */}
      <div className="task-input">
        <input
          type="text"
          placeholder="Enter new task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="high">High Priority</option>
          <option value="low">Low Priority</option>
        </select>
        <button onClick={handleAddTask}>Add Task</button>
      </div>

      {/* Task List */}
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className={task.completed ? "completed" : ""}>
            <span>{task.description} ({task.priority})</span>
            <button onClick={() => handleToggle(task.id)}>
              {task.completed ? "Undo" : "Complete"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
