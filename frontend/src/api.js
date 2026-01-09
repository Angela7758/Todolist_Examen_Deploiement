import axios from "axios";

// URL de base provenant des variables d’environnement Vite
const API_URL = import.meta.env.VITE_API_URL;

export const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});



// Récupérer toutes les catégories
export const fetchCategories = () => api.get("/api/categories/");

// Créer une catégorie
export const createCategory = (payload) =>
  api.post("/api/categories/", payload);

// ❌ Supprimer une catégorie
export const deleteCategory = (id) =>
  api.delete(`/api/categories/${id}/`);



// Récupérer les tâches (+ filtre optionnel)
export const fetchTasks = (params) =>
  api.get("/api/tasks/", { params });

// Créer une tâche
export const createTask = (payload) =>
  api.post("/api/tasks/", payload);

// Modifier une tâche (patch)
export const patchTask = (id, payload) =>
  api.patch(`/api/tasks/${id}/`, payload);

// Supprimer une tâche
export const deleteTask = (id) =>
  api.delete(`/api/tasks/${id}/`);
