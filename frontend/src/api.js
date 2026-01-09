import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

// Categories
export const fetchCategories = () => api.get("/api/categories/");
export const createCategory = (payload) =>
  api.post("/api/categories/", payload);

// Tasks
export const fetchTasks = (params) => api.get("/api/tasks/", { params });
export const createTask = (payload) => api.post("/api/tasks/", payload);
export const patchTask = (id, payload) => api.patch(`/api/tasks/${id}/`, payload);
export const deleteTask = (id) => api.delete(`/api/tasks/${id}/`);
