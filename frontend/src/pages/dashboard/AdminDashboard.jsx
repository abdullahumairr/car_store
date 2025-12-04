import { useState, useEffect } from "react";
import {
  getAllCars,
  createCar,
  updateCar,
  deleteCar,
  getImageUrl,
} from "../../services/api";
import api from "../../services/api";
import Navbar from "../../components/layout/Navbar";
import Sidebar from "../../components/layout/Sidebar";
import CarCard from "../../components/ui/CarCard";
import CarForm from "../../components/ui/CarForm";
import { Edit2, Trash2, Users, Car, Package } from "lucide-react";

function AdminDashboard({ user, setUser }) {
  const [cars, setCars] = useState([]);
  const [users, setUsers] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    locations: [],
    brands: [],
    priceRange: [0, 1000000000],
    mileageRange: [0, 500000],
  });
  const [showForm, setShowForm] = useState(false);
  const [editingCar, setEditingCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("browse");

  useEffect(() => {
    fetchCars();
    fetchUsers();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [cars, searchQuery, filters, view]);

  const fetchCars = async () => {
    try {
      const response = await getAllCars();
      const carsData = Array.isArray(response.data)
        ? response.data
        : response.data?.data || [];
      setCars(carsData);
    } catch (error) {
      console.error("Error fetching cars:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await api.get("/users");
      const usersData = Array.isArray(response.data)
        ? response.data
        : response.data?.data || [];
      setUsers(usersData);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  const applyFilters = () => {
    let filtered = [...cars];

    if (view === "browse") {
      filtered = filtered.filter((car) => car.status === "available");
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (car) =>
          car.car_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          car.brand.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filters.locations.length > 0) {
      filtered = filtered.filter((car) =>
        filters.locations.some((loc) => car.address.includes(loc))
      );
    }

    if (filters.brands.length > 0) {
      filtered = filtered.filter((car) => filters.brands.includes(car.brand));
    }

    filtered = filtered.filter(
      (car) =>
        parseInt(car.price) >= filters.priceRange[0] &&
        parseInt(car.price) <= filters.priceRange[1]
    );

    filtered = filtered.filter(
      (car) =>
        parseInt(car.mileage) >= filters.mileageRange[0] &&
        parseInt(car.mileage) <= filters.mileageRange[1]
    );

    setFilteredCars(filtered);
  };

  const handleCreate = async (formData) => {
    try {
      await createCar(formData);
      await fetchCars();
      setShowForm(false);
    } catch (error) {
      console.error("Error creating car:", error);
      throw error;
    }
  };

  const handleUpdate = async (formData) => {
    try {
      await updateCar(editingCar.id, formData);
      await fetchCars();
      setShowForm(false);
      setEditingCar(null);
    } catch (error) {
      console.error("Error updating car:", error);
      throw error;
    }
  };

  const handleDelete = async (carId) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus mobil ini?")) {
      try {
        await deleteCar(carId);
        await fetchCars();
      } catch (error) {
        console.error("Error deleting car:", error);
        alert("Gagal menghapus mobil");
      }
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus user ini?")) {
      try {
        await api.delete(`/users/${userId}`);
        await fetchUsers();
      } catch (error) {
        console.error("Error deleting user:", error);
        alert("Gagal menghapus user");
      }
    }
  };

  const handleEdit = (car) => {
    setEditingCar(car);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingCar(null);
  };

  const AllCarCard = ({ car }) => {
    const images =
      typeof car.images === "string" ? JSON.parse(car.images) : car.images;
    const firstImage = images && images.length > 0 ? images[0] : null;

    return (
      <div style={styles.allCarCard}>
        <div style={styles.allCarImage}>
          {firstImage ? (
            <img
              src={getImageUrl(firstImage)}
              alt={car.car_name}
              style={styles.image}
            />
          ) : (
            <div style={styles.noImage}>No Image</div>
          )}
        </div>
        <div style={styles.allCarContent}>
          <h3 style={styles.allCarTitle}>{car.car_name}</h3>
          <p style={styles.allCarBrand}>
            {car.brand} • {car.year}
          </p>
          <p style={styles.allCarPrice}>
            Rp {parseInt(car.price).toLocaleString()}
          </p>
          <span
            style={{
              ...styles.statusBadge,
              backgroundColor:
                car.status === "available" ? "#d4edda" : "#f8d7da",
              color: car.status === "available" ? "#155724" : "#721c24",
            }}
          >
            {car.status === "available" ? "Tersedia" : "Terjual"}
          </span>
        </div>
        <div style={styles.allCarActions}>
          <button style={styles.editBtn} onClick={() => handleEdit(car)}>
            <Edit2 size={18} />
          </button>
          <button style={styles.deleteBtn} onClick={() => handleDelete(car.id)}>
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    );
  };

  const UserCard = ({ user: userData }) => (
    <div style={styles.userCard}>
      <div style={styles.userInfo}>
        <div style={styles.userAvatar}>
          <Users size={24} color="#0066cc" />
        </div>
        <div>
          <h3 style={styles.userFullname}>{userData.fullname}</h3>
          <p style={styles.userEmail}>{userData.email}</p>
          <p style={styles.userDetails}>
            {userData.username} • {userData.phone_number}
          </p>
        </div>
      </div>
      <div style={styles.userActions}>
        <span
          style={{
            ...styles.roleBadge,
            backgroundColor:
              userData.role === "admin"
                ? "#e3f2fd"
                : userData.role === "seller"
                ? "#fff3e0"
                : "#f3e5f5",
            color:
              userData.role === "admin"
                ? "#0066cc"
                : userData.role === "seller"
                ? "#ff6f00"
                : "#7b1fa2",
          }}
        >
          {userData.role}
        </span>
        {userData.id !== user.id && (
          <button
            style={styles.deleteBtn}
            onClick={() => handleDeleteUser(userData.id)}
          >
            <Trash2 size={18} />
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div style={styles.container}>
      <Navbar
        user={user}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onCreateClick={() => setShowForm(true)}
        setUser={setUser}
      />

      <div style={styles.content}>
        <Sidebar filters={filters} onFilterChange={setFilters} />

        <main style={styles.main}>
          <div style={styles.tabs}>
            <button
              style={view === "browse" ? styles.tabActive : styles.tab}
              onClick={() => setView("browse")}
            >
              <Package size={18} />
              <span>Jelajah Mobil</span>
            </button>
            <button
              style={view === "all-cars" ? styles.tabActive : styles.tab}
              onClick={() => setView("all-cars")}
            >
              <Car size={18} />
              <span>Semua Mobil</span>
            </button>
            <button
              style={view === "users" ? styles.tabActive : styles.tab}
              onClick={() => setView("users")}
            >
              <Users size={18} />
              <span >Kelola Users</span>
            </button>
          </div>

          {view === "users" ? (
            <>
              <div style={styles.header}>
                <h2 style={styles.title}>Kelola Users</h2>
                <p style={styles.count}>{users.length} users terdaftar</p>
              </div>

              <div style={styles.listContainer}>
                {users.map((u) => (
                  <UserCard key={u.id} user={u} />
                ))}
              </div>
            </>
          ) : (
            <>
              <div style={styles.header}>
                <h2 style={styles.title}>
                  {view === "browse" ? "Mobil Tersedia" : "Semua Mobil"}
                </h2>
                <p style={styles.count}>
                  {filteredCars.length} mobil ditemukan
                </p>
              </div>

              {loading ? (
                <div style={styles.loading}>Memuat...</div>
              ) : filteredCars.length === 0 ? (
                <div style={styles.empty}>
                  Tidak ada mobil yang sesuai dengan filter
                </div>
              ) : (
                <div
                  style={view === "browse" ? styles.grid : styles.listContainer}
                >
                  {view === "browse"
                    ? filteredCars.map((car) => (
                        <CarCard key={car.id} car={car} />
                      ))
                    : filteredCars.map((car) => (
                        <AllCarCard key={car.id} car={car} />
                      ))}
                </div>
              )}
            </>
          )}
        </main>
      </div>

      {showForm && (
        <CarForm
          onSubmit={editingCar ? handleUpdate : handleCreate}
          onClose={handleCloseForm}
          initialData={editingCar}
        />
      )}
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#f5f7fa",
  },
  content: {
    display: "flex",
  },
  main: {
    flex: 1,
    padding: "24px",
  },
  tabs: {
    display: "flex",
    gap: "8px",
    marginBottom: "24px",
    borderBottom: "2px solid #e5e7eb",
  },
  tab: {
    padding: "12px 24px",
    backgroundColor: "transparent",
    color: "#6b7280",
    fontSize: "14px",
    fontWeight: "500",
    borderBottom: "2px solid transparent",
    marginBottom: "-2px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    border: "none",
    cursor: "pointer",
  },
  tabActive: {
    padding: "12px 24px",
    backgroundColor: "transparent",
    color: "#0066cc",
    fontSize: "14px",
    fontWeight: "600",
    borderBottom: "2px solid #0066cc",
    marginBottom: "-2px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    border: "none",
    cursor: "pointer",
  },
  header: {
    marginBottom: "24px",
  },
  title: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#1a1a1a",
    marginBottom: "8px",
  },
  count: {
    fontSize: "14px",
    color: "#6b7280",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "24px",
  },
  listContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  allCarCard: {
    backgroundColor: "white",
    borderRadius: "12px",
    padding: "16px",
    display: "flex",
    gap: "16px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
  },
  allCarImage: {
    width: "200px",
    height: "140px",
    borderRadius: "8px",
    overflow: "hidden",
    backgroundColor: "#f5f5f5",
    flexShrink: 0,
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  noImage: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#9ca3af",
    fontSize: "14px",
  },
  allCarContent: {
    flex: 1,
  },
  allCarTitle: {
    fontSize: "20px",
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: "4px",
  },
  allCarBrand: {
    fontSize: "14px",
    color: "#6b7280",
    marginBottom: "8px",
  },
  allCarPrice: {
    fontSize: "22px",
    fontWeight: "700",
    color: "#0066cc",
    marginBottom: "8px",
  },
  statusBadge: {
    display: "inline-block",
    padding: "4px 12px",
    borderRadius: "12px",
    fontSize: "12px",
    fontWeight: "600",
  },
  allCarActions: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  editBtn: {
    padding: "10px",
    backgroundColor: "#e3f2fd",
    color: "#0066cc",
    borderRadius: "6px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "none",
    cursor: "pointer",
  },
  deleteBtn: {
    padding: "10px",
    backgroundColor: "#fef2f2",
    color: "#dc2626",
    borderRadius: "6px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "none",
    cursor: "pointer",
  },
  userCard: {
    backgroundColor: "white",
    borderRadius: "12px",
    padding: "20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
  },
  userInfo: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
  userAvatar: {
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    backgroundColor: "#e3f2fd",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  userFullname: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: "4px",
  },
  userEmail: {
    fontSize: "14px",
    color: "#6b7280",
    marginBottom: "4px",
  },
  userDetails: {
    fontSize: "13px",
    color: "#9ca3af",
  },
  userActions: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  roleBadge: {
    padding: "6px 16px",
    borderRadius: "12px",
    fontSize: "13px",
    fontWeight: "600",
  },
  loading: {
    textAlign: "center",
    padding: "60px 20px",
    fontSize: "16px",
    color: "#6b7280",
  },
  empty: {
    textAlign: "center",
    padding: "60px 20px",
    fontSize: "16px",
    color: "#6b7280",
  },
};

export default AdminDashboard;
