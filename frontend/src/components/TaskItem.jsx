import React from "react";
import "../styles/App.css";

export default function TaskItem({ task, onToggle, onDelete }) {
  return (
    <div className="task-item">
      <label
        className="task-text"
        style={{
          textDecoration: task.is_completed ? "line-through" : "none",
          color: task.is_completed ? "#888" : "#000",
        }}
      >
        <input
          type="checkbox"
          checked={task.is_completed}
          onChange={() => onToggle(task)}
        />
        {task.description}
      </label>

      <button className="delete-btn" onClick={() => onDelete(task.id)}>
        Supprimer
      </button>
    </div>
  );
}
