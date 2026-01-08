import React, { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm.jsx";
import TaskList from "./components/TaskList.jsx";
import CategoryForm from "./components/CategoryForm.jsx";
import "./styles/App.css";

import {
  fetchTasks,
  fetchCategories,
  createTask,
  createCategory,
  patchTask,
  deleteTask,
} from "./api";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [cats, setCats] = useState([]); 
  
  const [taskErrors, setTaskErrors] = useState({});
  const [catErrors, setCatErrors] = useState({});

  const [filterCat, setFilterCat] = useState(""); 

  // chargement au début
  useEffect(() => {
    fetchCategories()
      .then((r) => {
        setCats(r.data);
      })
      .catch(() => {
        console.log("Erreur categories"); 
      });

    fetchTasks()
      .then((r) => setTasks(r.data))
      .catch(() => console.log("Erreur tasks"));
  }, []);

  // ajouter catégorie
  const addCategory = (name) => {
    setCatErrors({}); 
    createCategory({ name: name })
      .then((res) => {
        setCats(cats.concat(res.data)); 
      })
      .catch((e) => {
        // pas super propre mais ça marche
        if (e.response && e.response.data) {
          setCatErrors(e.response.data);
        }
      });
  };

  // ajouter tâche
  const addTask = (data) => {
    setTaskErrors({});
    // data: { description, category_id }
    createTask({
      description: data.description,
      category: data.category_id, 
    })
      .then((res) => {
        setTasks([...tasks, res.data]);
        console.log("task ajoutée"); 
      })
      .catch((e) => {
        if (e.response && e.response.status === 400) {
          setTaskErrors(e.response.data);
        } else {
          alert("Erreur ajout tâche");
        }
      });
  };

  // cocher / décocher
  const toggleTask = (task) => {
    patchTask(task.id, { is_completed: !task.is_completed })
      .then((res) => {
        const updated = tasks.map((t) => (t.id === task.id ? res.data : t));
        setTasks(updated);
      })
      .catch(() => alert("Erreur mise à jour"));
  };

  // supprimer
  const removeTask = (id) => {
    deleteTask(id)
      .then(() => {
        setTasks(tasks.filter((t) => t.id !== id));
      })
      .catch(() => alert("Erreur suppression"));
  };

  // filtre simple
  let shown = tasks;
  if (filterCat !== "") {
    shown = tasks.filter((t) => String(t.category) === String(filterCat));
  }

  return (
    <div className="app-container">
      <h1>Ma To-Do List</h1>

      {/* ajout catégorie */}
      <CategoryForm onAddCategory={addCategory} errors={catErrors} />

      {/* filtre */}
      <select
        className="category-select"
        value={filterCat}
        onChange={(e) => setFilterCat(e.target.value)}
      >
        <option value="">Toutes les catégories</option>
        {cats.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>

      {/* ajout tâche */}
      <TaskForm categories={cats} onAddTask={addTask} errors={taskErrors} />

      <TaskList tasks={shown} onToggle={toggleTask} onDelete={removeTask} />
    </div>
  );
}
