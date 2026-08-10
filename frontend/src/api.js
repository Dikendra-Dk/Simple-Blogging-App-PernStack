import axios from "axios";

// Relative path — Vite's dev proxy (see vite.config.js) forwards this to
// the backend container. In production you'd point this at your real API URL.
const api = axios.create({ baseURL: "/api" });

export const getPosts = () => api.get("/posts").then((r) => r.data);
export const getPost = (id) => api.get(`/posts/${id}`).then((r) => r.data);
export const createPost = (post) => api.post("/posts", post).then((r) => r.data);
export const updatePost = (id, post) => api.put(`/posts/${id}`, post).then((r) => r.data);
export const deletePost = (id) => api.delete(`/posts/${id}`);

export default api;