// src/services/api.js
import axios from "axios";

const API_URL = "http://localhost:7777";

const api = axios.create({
  baseURL: API_URL,
});

// Auto set token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export function normalizeCarImages(car) {
  if (!car) return [];

  let raw = car.image_url ?? car.images ?? [];

  if (Array.isArray(raw)) {
    return raw.filter(Boolean);
  }

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter(Boolean) : [];
  } catch {
    return raw ? [raw] : [];
  }
}

export const getImageUrl = (path) => {
  if (!path) return null;
  if (path.startsWith("http")) return path;
  return `http://localhost:7777/${path}`;
};

export async function getSellerNameByCarId(carId) {
  const res = await getAllCars();
  const allCars = res.data.data || res.data || [];

  const found = allCars.find((c) => c.id == carId);

  return found?.seller_name || found?.username || found?.name || null;
}

// AUTH
export const register = (data) => api.post("/auth/register", data);
export const login = (data) => api.post("/auth/login", data);

// CARS
export const getAllCars = () => api.get(`/cars`);
export const getCarById = (id) => api.get(`/cars/${id}`);
export const deleteCar = (id) => api.delete(`/cars/${id}`);
export const updateCar = (id, data) => api.put(`/cars/${id}`, data);
export const createCar = (data) => api.post(`/cars`, data);

// USERS
export const getAllUsers = () => api.get("/users");
export const getUserById = (id) => api.get(`/users/${id}`);
export const createUser = (data) => api.post("/users", data);
export const updateUser = (id, data) => api.put(`/users/${id}`, data);
export const deleteUser = (id) => api.delete(`/users/${id}`);

export default api;
