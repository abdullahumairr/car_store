/* eslint-disable react-refresh/only-export-components */
// src/context/AppContext.jsx
import React, { createContext, useState, useEffect, useContext } from "react";
import {
  loginService,
  registerService,
  logoutService,
} from "../services/authService";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  const login = async (email, password) => {
    try {
      const res = await loginService(email, password);

      // backend returns: data: { user, token }
      const { user, token } = res;

      setToken(token);
      setUser(user);

      localStorage.setItem("user", JSON.stringify(user));

      showNotification("Login successful!", "success");
      return { success: true };
    } catch (error) {
      showNotification(error.message || "Login failed", "error");
      return { success: false };
    }
  };

  const register = async (data) => {
    try {
      await registerService(data);
      showNotification("Registration successful!", "success");
      return { success: true };
    } catch (error) {
      showNotification(error.message || "Registration failed", "error");
      return { success: false };
    }
  };

  const logout = () => {
    logoutService();
    setToken("");
    setUser(null);
    localStorage.removeItem("user");
    showNotification("Logged out successfully", "info");
  };

  const showNotification = (message, type = "info") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        token,
        login,
        register,
        logout,
        showNotification,
      }}
    >
      {children}
      {notification && (
        <div className="fixed top-4 right-4 z-50">
          <div
            className={`px-6 py-3 rounded-lg text-white shadow-lg ${
              notification.type === "success"
                ? "bg-green-500"
                : notification.type === "error"
                ? "bg-red-500"
                : notification.type === "warning"
                ? "bg-yellow-500"
                : "bg-blue-500"
            }`}
          >
            {notification.message}
          </div>
        </div>
      )}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
