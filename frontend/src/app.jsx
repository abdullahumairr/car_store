/* eslint-disable react-hooks/set-state-in-effect */
import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import AdminDashboard from "./pages/dashboard/admin/AdminDashboard.jsx";
import SellerDashboard from "./pages/dashboard/seller/SellerDashboard.jsx";
import UserDashboard from "./pages/dashboard/user/UserDashboard.jsx";
import CarDetail from "./pages/CarDetail.jsx";

const ProtectedRoute = ({ children, user }) => {
  const token = localStorage.getItem("token");

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const DashboardRedirect = ({ user, setUser }) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Redirect based on user role
  switch (user.role) {
    case "admin":
      return <AdminDashboard user={user} setUser={setUser} />;
    case "seller":
      return <SellerDashboard user={user} setUser={setUser} />;
    default:
      return <UserDashboard user={user} setUser={setUser} />;
  }
};

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error("Error parsing user data:", error);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
        }}
      >
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/login" element={<Login setUser={setUser} />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute user={user}>
            <DashboardRedirect user={user} setUser={setUser} />
          </ProtectedRoute>
        }
      />

      <Route
        path="/car/:id"
        element={
          <ProtectedRoute user={user}>
            <CarDetail user={user} setUser={setUser} />
          </ProtectedRoute>
        }
      />

      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default App;
