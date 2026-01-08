import React, { useState } from "react";
import "../styles/App.css";

export default function TaskForm({ categories, onAddTask, errors }) {
  const [desc, setDesc] = useState("");
  const [catId, setCatId] = useState("");

  const submit = (e) => {
    e.preventDefault();

    // validation très simple
    if (desc.trim() === "") return;
    if (catId === "") return;

    onAddTask({
      description: desc.trim(),
      category_id: catId,
    });

    setDesc("");
    // (petit "oubli" volontaire: on ne reset pas la catégorie, mais c'est ok)
  };

  return (
    <form className="task-form" onSubmit={submit}>
      <input
        type="text"
        placeholder="Nouvelle tâche..."
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />

      <select value={catId} onChange={(e) => setCatId(e.target.value)}>
        <option value="">Choisir une catégorie</option>
        {categories.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>

      <button type="submit" className="add-button">
        Ajouter
      </button>

      {/* affichage erreurs backend (simple) */}
      {errors && errors.description && (
        <p className="error">
          {Array.isArray(errors.description) ? errors.description[0] : errors.description}
        </p>
      )}

      {(errors?.category || errors?.category_id) && (
        <p className="error">
          {(errors.category && errors.category[0]) ||
            (errors.category_id && errors.category_id[0])}
        </p>
      )}
    </form>
  );
}
