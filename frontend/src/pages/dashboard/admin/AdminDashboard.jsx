import { useState, useEffect } from "react";
import {
  getAllCars,
  createCar,
  updateCar,
  deleteCar,
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  getImageUrl,
  normalizeCarImages,
} from "../../../services/api";

import Navbar from "../../../components/layout/Navbar";
import Sidebar from "../../../components/layout/Sidebar";
import CarCard from "../../../components/ui/CarCard";
import CarForm from "../../../components/ui/CarForm";
import UserForm from "../../../components/ui/UserForm";

import { Edit2, Trash2, Users, Car, Package } from "lucide-react";

function AdminDashboard({ user, setUser }) {
  const [cars, setCars] = useState([]);
  const [users, setUsers] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");

  const [filters, setFilters] = useState({
    brands: [],
    priceRange: [0, 1000000000],
    mileageRange: [0, 500000],
  });

  const [showCarForm, setShowCarForm] = useState(false);
  const [editingCar, setEditingCar] = useState(null);

  const [showUserForm, setShowUserForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("browse");

  // =================================
  // FETCH DATA
  // =================================
  useEffect(() => {
    fetchCars();
    fetchUsers();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [cars, searchQuery, filters, view]);

  const fetchCars = async () => {
    try {
      const res = await getAllCars();

      const raw = res.data;
      const carList = Array.isArray(raw)
        ? raw
        : Array.isArray(raw?.data)
        ? raw.data
        : Array.isArray(raw?.cars)
        ? raw.cars
        : [];

      const normalized = carList.map((c) => ({
        ...c,
        images: normalizeCarImages(c),
        status: c.status || "available",
      }));

      setCars(normalized);
    } catch (err) {
      console.error("Error fetchCars:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await getAllUsers();

      const raw = res.data;
      const userList = Array.isArray(raw)
        ? raw
        : Array.isArray(raw?.users)
        ? raw.users
        : Array.isArray(raw?.data)
        ? raw.data
        : [];

      setUsers(userList);
    } catch (err) {
      console.error("Error fetchUsers:", err);
      setUsers([]);
    }
  };

  const applyFilters = () => {
    let filtered = [...cars];

    if (view === "browse") {
      filtered = filtered.filter((c) => c.status === "available");
    }

    if (searchQuery.trim() !== "") {
      filtered = filtered.filter(
        (car) =>
          car.car_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          car.brand.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filters.brands.length > 0) {
      filtered = filtered.filter((c) => filters.brands.includes(c.brand));
    }

    filtered = filtered.filter((c) => {
      const p = Number(c.price) || 0;
      return p >= filters.priceRange[0] && p <= filters.priceRange[1];
    });

    filtered = filtered.filter((c) => {
      const km = Number(c.mileage) || 0;
      return km >= filters.mileageRange[0] && km <= filters.mileageRange[1];
    });

    setFilteredCars(filtered);
  };

  const handleCreateCar = async (data) => {
    await createCar(data);
    await fetchCars();
    setShowCarForm(false);
  };

  const handleUpdateCar = async (data) => {
    await updateCar(editingCar.id, data);
    await fetchCars();
    setEditingCar(null);
    setShowCarForm(false);
  };

  const handleDeleteCar = async (id) => {
    if (!confirm("Hapus mobil ini?")) return;
    await deleteCar(id);
    await fetchCars();
  };

  // =================================
  // CRUD USER
  // =================================
  const handleCreateUser = async (data) => {
    await createUser(data);
    await fetchUsers();
    setShowUserForm(false);
  };

  const handleUpdateUserData = async (data) => {
    await updateUser(editingUser.id, data);
    await fetchUsers();
    setEditingUser(null);
    setShowUserForm(false);
  };

  const handleDeleteUserData = async (id) => {
    if (!confirm("Hapus user ini?")) return;
    await deleteUser(id);
    await fetchUsers();
  };

  // =================================
  // UI COMPONENTS
  // =================================
  const UserCard = ({ u }) => (
    <div className="bg-white rounded-xl p-5 shadow flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="bg-blue-50 w-14 h-14 rounded-full flex items-center justify-center">
          <Users size={26} className="text-blue-600" />
        </div>

        <div>
          <h3 className="text-lg font-semibold">{u.fullname}</h3>
          <p className="text-gray-500 text-sm">{u.email}</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span className="px-4 py-1.5 bg-gray-100 rounded-xl text-sm">
          {u.role}
        </span>

        <button
          onClick={() => {
            setEditingUser(u);
            setShowUserForm(true);
          }}
          className="p-2.5 bg-blue-50 text-blue-600 rounded-md"
        >
          <Edit2 size={18} />
        </button>

        {u.id !== user.id && (
          <button
            onClick={() => handleDeleteUserData(u.id)}
            className="p-2.5 bg-red-50 text-red-600 rounded-md"
          >
            <Trash2 size={18} />
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f5f7fa]">
      <Navbar
        user={user}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onCreateClick={() => setShowCarForm(true)}
        setUser={setUser}
      />

      <div className="flex">
        <Sidebar filters={filters} onFilterChange={setFilters} />

        <main className="flex-1 p-6">
          {/* TABS */}
          <div className="flex gap-2 mb-6 border-b border-gray-200 pb-1">
            <button
              onClick={() => setView("browse")}
              className={`px-6 py-3 ${
                view === "browse"
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-600"
              }`}
            >
              <Package size={18} className="inline-block mr-2" />
              Jelajah Mobil
            </button>

            <button
              onClick={() => setView("all-cars")}
              className={`px-6 py-3 ${
                view === "all-cars"
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-600"
              }`}
            >
              <Car size={18} className="inline-block mr-2" />
              Semua Mobil
            </button>

            <button
              onClick={() => setView("users")}
              className={`px-6 py-3 ${
                view === "users"
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-600"
              }`}
            >
              <Users size={18} className="inline-block mr-2" />
              Kelola Users
            </button>
          </div>

          {/* USERS LIST */}
          {view === "users" ? (
            <div className="flex flex-col gap-4">
              <button
                onClick={() => {
                  setEditingUser(null);
                  setShowUserForm(true);
                }}
                className="px-4 py-2 bg-blue-600 rounded text-white mb-4"
              >
                + Tambah User
              </button>

              {users.map((u) => (
                <UserCard key={u.id} u={u} />
              ))}
            </div>
          ) : (
            <div>
              {loading ? (
                <div className="text-center py-20">Memuat...</div>
              ) : filteredCars.length === 0 ? (
                <div className="text-center py-20">
                  Tidak ada mobil ditemukan
                </div>
              ) : (
                <div
                  className={
                    view === "browse"
                      ? "grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6"
                      : "flex flex-col gap-4"
                  }
                >
                  {filteredCars.map((c) =>
                    view === "browse" ? (
                      <CarCard key={c.id} car={c} />
                    ) : (
                      <div
                        key={c.id}
                        className="bg-white rounded-xl p-4 shadow flex gap-5"
                      >
                        {/* card admin */}
                        <img
                          src={getImageUrl(c.images?.[0])}
                          className="w-40 h-32 rounded object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="font-bold text-xl">{c.car_name}</h3>
                          <p className="text-gray-600">{c.brand}</p>
                          <p className="text-blue-600 font-bold text-lg">
                            Rp {Number(c.price).toLocaleString()}
                          </p>
                        </div>
                        <div className="flex flex-col gap-3">
                          <button
                            onClick={() => {
                              setEditingCar(c);
                              setShowCarForm(true);
                            }}
                            className="p-2 bg-blue-50 text-blue-600 rounded"
                          >
                            <Edit2 size={18} />
                          </button>
                          <button
                            onClick={() => handleDeleteCar(c.id)}
                            className="p-2 bg-red-50 text-red-600 rounded"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      {/* MODALS */}
      {showCarForm && (
        <CarForm
          initialData={editingCar}
          onSubmit={editingCar ? handleUpdateCar : handleCreateCar}
          onClose={() => {
            setShowCarForm(false);
            setEditingCar(null);
          }}
        />
      )}

      {showUserForm && (
        <UserForm
          initialData={editingUser}
          onSubmit={editingUser ? handleUpdateUserData : handleCreateUser}
          onClose={() => {
            setShowUserForm(false);
            setEditingUser(null);
          }}
        />
      )}
    </div>
  );
}

export default AdminDashboard;
