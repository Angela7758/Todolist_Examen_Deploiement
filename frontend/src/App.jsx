import React, { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm.jsx";
import TaskList from "./components/TaskList.jsx";
import CategoryForm from "./components/CategoryForm.jsx";
import CategorySelector from "./components/CategorySelector.jsx";
import "./styles/App.css";

import {
  fetchTasks,
  fetchCategories,
  createTask,
  createCategory,
  patchTask,
  deleteTask,
  deleteCategory,
} from "./api";

export default function App() {
  // -------------------------------
  // États globaux
  // -------------------------------
  const [tasks, setTasks] = useState([]);
  const [cats, setCats] = useState([]);
  const [filterCat, setFilterCat] = useState(""); // catégorie sélectionnée pour filtrer

  const [taskErrors, setTaskErrors] = useState({});
  const [catErrors, setCatErrors] = useState({});

  // -------------------------------
  // Charger catégories + tâches au démarrage
  // -------------------------------
  const loadCategories = () => {
    fetchCategories()
      .then((res) => setCats(res.data))
      .catch(() => console.log("Erreur lors du chargement des catégories"));
  };

  const loadTasks = () => {
    fetchTasks()
      .then((res) => setTasks(res.data))
      .catch(() => console.log("Erreur lors du chargement des tâches"));
  };

  useEffect(() => {
    loadCategories();
    loadTasks();
  }, []);

  // -------------------------------
  // Ajouter une nouvelle catégorie
  // -------------------------------
  const addCategory = (name) => {
    setCatErrors({});
    createCategory({ name })
      .then((res) => {
        setCats([...cats, res.data]);
      })
      .catch((e) => {
        if (e.response?.data) setCatErrors(e.response.data);
      });
  };

  // -------------------------------
  // Supprimer une catégorie
  // -------------------------------
  const handleDeleteCategory = async (id) => {
    if (!window.confirm("Supprimer cette catégorie ?")) return;

    try {
      await deleteCategory(id);
      loadCategories(); // recharger liste
      loadTasks(); // enlever les tâches liées
    } catch (error) {
      alert("Erreur : impossible de supprimer la catégorie.");
    }
  };

  // -------------------------------
  // Ajouter une tâche
  // -------------------------------
  const addTask = (data) => {
    setTaskErrors({});

    createTask({
      description: data.description,
      category: data.category_id,
    })
      .then((res) => setTasks([...tasks, res.data]))
      .catch((e) => {
        if (e.response?.status === 400) setTaskErrors(e.response.data);
        else alert("Erreur lors de l’ajout de la tâche");
      });
  };

  // -------------------------------
  // Marquer une tâche complétée / non complétée
  // -------------------------------
  const toggleTask = (task) => {
    patchTask(task.id, { is_completed: !task.is_completed })
      .then((res) => {
        const updated = tasks.map((t) => (t.id === task.id ? res.data : t));
        setTasks(updated);
      })
      .catch(() => alert("Erreur mise à jour de la tâche"));
  };

  // -------------------------------
  // Supprimer une tâche
  // -------------------------------
  const removeTask = (id) => {
    deleteTask(id)
      .then(() => setTasks(tasks.filter((t) => t.id !== id)))
      .catch(() => alert("Erreur suppression tâche"));
  };

  // -------------------------------
  // Filtrer les tâches
  // -------------------------------
  const shownTasks =
    filterCat === ""
      ? tasks
      : tasks.filter((t) => String(t.category) === String(filterCat));

  // -------------------------------
  // Rendu principal
  // -------------------------------
  return (
    <div className="app-container">
      <h1>Ma To-Do List</h1>

      {/* Formulaire pour ajouter une catégorie */}
      <CategoryForm onAddCategory={addCategory} errors={catErrors} />

      {/* Sélecteur de catégories (avec bouton supprimer) */}
      <CategorySelector
        categories={cats}
        selected={filterCat}
        onChange={setFilterCat}
        onDelete={handleDeleteCategory}
      />

      {/* Formulaire pour ajouter une tâche */}
      <TaskForm categories={cats} onAddTask={addTask} errors={taskErrors} />

      {/* Liste des tâches filtrées */}
      <TaskList tasks={shownTasks} onToggle={toggleTask} onDelete={removeTask} />
    </div>
  );
}
