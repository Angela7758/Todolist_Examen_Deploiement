import React, { useState } from "react";

export default function CategoryForm({ onAddCategory, errors }) {
  const [name, setName] = useState("");

  const submit = (e) => {
    e.preventDefault();
    const n = name.trim();
    if (!n) return;

    onAddCategory(n);
    setName("");
  };

  return (
    <div className="category-form">
      {/* petit formulaire */}
      <form onSubmit={submit}>
        <input
          className="task-input"
          type="text"
          placeholder="Ajouter une nouvelle catégorie"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button className="task-add-button" type="submit">
          Ajouter Catégorie
        </button>
      </form>

      {/* erreur simple */}
      {errors && errors.name && (
        <p className="error">
          {Array.isArray(errors.name) ? errors.name[0] : errors.name}
        </p>
      )}
    </div>
  );
}
