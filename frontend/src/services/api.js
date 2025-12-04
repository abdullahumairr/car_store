import axios from "axios";

const API_URL = "http://localhost:7777";

const api = axios.create({
  baseURL: API_URL,
});

// Add token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth APIs
export const register = (userData) => api.post("/auth/register", userData);
export const login = (credentials) => api.post("/auth/login", credentials);


// Car APIs
export const getAllCars = () => api.get("/cars");
export const getCarById = (id) => api.get(`/cars/${id}`);
export const createCar = (formData) =>
  api.post("/cars", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const updateCar = (id, formData) =>
  api.put(`/cars/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const deleteCar = (id) => api.delete(`/cars/${id}`);

// Image URL helper
export const getImageUrl = (filename) => `${API_URL}/uploads/${filename}`;

export default api;
