import { useState, useEffect } from "react";
import "../App.css";

export default function TaskTracker() {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );
  const [task, setTask] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (task.trim()) {
      setTasks([...tasks, { id: Date.now(), text: task, completed: false }]);
      setTask("");
    }
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  return (
    <div className="container">
      <h2>Task Tracker</h2>
      <div className="task-input">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Add a new task..."
        />
        <button onClick={addTask}>Add</button>
      </div>
      <ul className="task-list">
        {tasks.map((t) => (
          <li key={t.id} className={`task ${t.completed ? "completed" : ""}`}>
            <span>{t.text}</span>
            <div>
              <button className="complete-btn" onClick={() => toggleTask(t.id)}>
                ✅
              </button>
              <button className="delete-btn" onClick={() => deleteTask(t.id)}>
                ❌
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
