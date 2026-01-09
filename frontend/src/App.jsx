import React, { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm.jsx";
import TaskList from "./components/TaskList.jsx";
import CategoryForm from "./components/CategoryForm.jsx";
import CategorySelector from "./components/CategorySelector.jsx";

import {
  fetchTasks,
  fetchCategories,
  createTask,
  createCategory,
  patchTask,
  deleteTask,
  deleteCategory,
} from "./api";

import "./styles/App.css";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [cats, setCats] = useState([]);

  const [taskErrors, setTaskErrors] = useState({});
  const [catErrors, setCatErrors] = useState({});

  const [filterCat, setFilterCat] = useState("");

  // Charger les données au démarrage
  const loadCategories = () => {
    fetchCategories()
      .then((res) => setCats(res.data))
      .catch(() => console.log("Erreur chargement catégories"));
  };

  const loadTasks = () => {
    fetchTasks()
      .then((res) => setTasks(res.data))
      .catch(() => console.log("Erreur chargement tâches"));
  };

  useEffect(() => {
    loadCategories();
    loadTasks();
  }, []);

  // Ajouter une catégorie
  const addCategory = (name) => {
    setCatErrors({});
    createCategory({ name })
      .then((res) => setCats([...cats, res.data]))
      .catch((e) => {
        if (e.response) setCatErrors(e.response.data);
      });
  };

  // Supprimer une catégorie
  const handleDeleteCategory = (id) => {
    if (!window.confirm("Supprimer cette catégorie ?")) return;

    deleteCategory(id)
      .then(() => {
        loadCategories();
        loadTasks(); // Pour éviter des tâches orphelines
      })
      .catch(() => alert("Erreur suppression catégorie"));
  };

  // Ajouter une tâche
  const addTask = (data) => {
    setTaskErrors({});

    createTask({
      description: data.description,
      category: data.category_id,
    })
      .then((res) => setTasks([...tasks, res.data]))
      .catch((e) => {
        if (e.response?.status === 400) {
          setTaskErrors(e.response.data);
        } else {
          alert("Erreur ajout tâche");
        }
      });
  };

  // Cocher / décocher
  const toggleTask = (task) => {
    patchTask(task.id, { is_completed: !task.is_completed })
      .then((res) => {
        setTasks(tasks.map((t) => (t.id === task.id ? res.data : t)));
      })
      .catch(() => alert("Erreur mise à jour"));
  };

  // Supprimer une tâche
  const removeTask = (id) => {
    deleteTask(id)
      .then(() => {
        setTasks(tasks.filter((t) => t.id !== id));
      })
      .catch(() => alert("Erreur suppression tâche"));
  };

  // Filtre par catégorie
  const shownTasks =
    filterCat === ""
      ? tasks
      : tasks.filter((t) => String(t.category) === String(filterCat));

  return (
    <div className="app-container">
      <h1>Ma To-Do List</h1>

      {/* Formulaire ajout catégorie */}
      <CategoryForm onAddCategory={addCategory} errors={catErrors} />

      {/* Zone contenant Select + TaskForm */}
      <div className="top-controls">
        <CategorySelector
          categories={cats}
          selected={filterCat}
          onChange={setFilterCat}
          onDelete={handleDeleteCategory}
        />

        <TaskForm categories={cats} onAddTask={addTask} errors={taskErrors} />
      </div>

      {/* Liste des tâches */}
      <TaskList
        tasks={shownTasks}
        onToggle={toggleTask}
        onDelete={removeTask}
      />
    </div>
  );
}
