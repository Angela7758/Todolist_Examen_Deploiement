import React from "react";
import "../styles/App.css";
import TaskItem from "./TaskItem.jsx";

export default function TaskList({ tasks, onToggle, onDelete }) {
  if (!tasks || tasks.length === 0) {
    return (
      <div className="empty-message">
        😴 Vous n'avez aucune tâche pour cette catégorie. Ajoutez-en une !
      </div>
    );
  }

  return (
    <div>
      {tasks.map((t) => (
        <TaskItem key={t.id} task={t} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </div>
  );
}
