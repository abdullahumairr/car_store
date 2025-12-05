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
// Versi yang lebih robust
export const normalizeCarImages = (car) => {
  if (!car) {
    console.warn('normalizeCarImages: car is null/undefined');
    return [];
  }
  
  // Ambil dari berbagai kemungkinan field
  const imageData = car.image_url || car.images || car.imageUrl || null;
  
  if (!imageData) {
    console.warn('normalizeCarImages: No image data found for car:', car.id);
    return [];
  }
  
  console.log('normalizeCarImages raw data:', {
    carId: car.id,
    imageData: imageData,
    type: typeof imageData
  });
  
  try {
    // CASE 1: Sudah array
    if (Array.isArray(imageData)) {
      const filtered = imageData.filter(img => 
        img && typeof img === 'string' && img.trim() !== ""
      );
      console.log('CASE 1 - Array result:', filtered);
      return filtered;
    }
    
    // CASE 2: String
    if (typeof imageData === 'string') {
      const trimmed = imageData.trim();
      
      // Kosong
      if (!trimmed || trimmed === '[]' || trimmed === '""' || trimmed === 'null') {
        console.log('CASE 2 - Empty string');
        return [];
      }
      
      // Coba parse sebagai JSON
      try {
        let parseStr = trimmed;
        
        // Debug: lihat string asli
        console.log('CASE 2 - String to parse:', parseStr);
        
        // Hapus quotes luar jika ada
        if (parseStr.startsWith('"') && parseStr.endsWith('"')) {
          parseStr = parseStr.slice(1, -1);
        }
        
        // Ganti escape character
        parseStr = parseStr.replace(/\\"/g, '"');
        
        console.log('CASE 2 - After cleaning:', parseStr);
        
        // Coba parse JSON
        const parsed = JSON.parse(parseStr);
        console.log('CASE 2 - Parsed result:', parsed);
        
        if (Array.isArray(parsed)) {
          return parsed.filter(img => 
            img && typeof img === 'string' && img.trim() !== ""
          );
        }
        
        if (typeof parsed === 'string') {
          return parsed.trim() ? [parsed.trim()] : [];
        }
        
        return [];
      } catch (jsonError) {
        console.log('CASE 2 - JSON parse failed, trying as plain string:', jsonError);
        
        // Coba sebagai plain URL
        const cleanUrl = trimmed.replace(/^["']|["']$/g, '').trim();
        if (cleanUrl && cleanUrl !== '[]') {
          return [cleanUrl];
        }
        
        return [];
      }
    }
    
    console.log('CASE 3 - Unknown format');
    return [];
  } catch (error) {
    console.error('normalizeCarImages error:', error, car);
    return [];
  }
};

// Fungsi lama getImageUrl tetap ada
export const getImageUrl = (path) => {
  if (!path) return null;

  if (path.startsWith("http")) return path;

  return `http://localhost:7777${path}`;
};
// AUTH
export const register = (data) => api.post("/auth/register", data);
export const login = (data) => api.post("/auth/login", data);

// CARS
export const getAllCars = () => api.get("/cars");
export const getCarById = (id) => api.get(`/cars/${id}`);
export const createCar = (data) => api.post("/cars", data);
export const updateCar = (id, data) => api.put(`/cars/${id}`, data);
export const deleteCar = (id) => api.delete(`/cars/${id}`);

// USERS (ADMIN)
export const getAllUsers = () => api.get("/users");
export const createUser = (data) => api.post("/users", data);
export const updateUser = (id, data) => api.put(`/users/${id}`, data);
export const deleteUser = (id) => api.delete(`/users/${id}`);

export default api;
