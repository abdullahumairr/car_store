import { useState, useEffect } from "react";
import {
  getAllCars,
  createCar,
  updateCar,
  deleteCar,
  getImageUrl,
  normalizeCarImages,
} from "../../../services/api";
import Navbar from "../../../components/layout/Navbar";
import Sidebar from "../../../components/layout/Sidebar";
import CarCard from "../../../components/ui/CarCard";
import CarForm from "../../../components/ui/CarForm";
import { Edit2, Trash2, Package } from "lucide-react";

function SellerDashboard({ user, setUser }) {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
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
  }, []);

  useEffect(() => {
    applyFilters();
  }, [cars, searchQuery, filters, view]);

  const fetchCars = async () => {
    try {
      const response = await getAllCars();
      const carsData = Array.isArray(response.data)
        ? response.data
        : response.data?.data ?? response.data?.cars ?? [];

      setCars(
        carsData.map((c) => ({
          ...c,
          images: normalizeCarImages(c.image_url),
        }))
      );
    } catch (error) {
      console.error("Error fetching cars:", error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...cars];

    if (view === "my-cars") {
      filtered = filtered.filter((car) => car.user_id === user.id);
    } else {
      filtered = filtered.filter((car) => car.status === "available");
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (car) =>
          car.car_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          car.brand.toLowerCase().includes(searchQuery.toLowerCase())
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

  const handleEdit = (car) => {
    setEditingCar(car);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingCar(null);
  };

  const MyCarCard = ({ car }) => {
    const firstImage = car.images?.[0] ? getImageUrl(car.images[0]) : null;
    return (
      <div className="bg-white rounded-xl p-4 flex gap-4 shadow-sm hover:shadow-md transition-shadow">
        <div className="w-48 h-36 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
          {firstImage ? (
            <img
              src={getImageUrl(firstImage)}
              alt={car.car_name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
              No Image
            </div>
          )}
        </div>

        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900 mb-1">
            {car.car_name}
          </h3>
          <p className="text-sm text-gray-600 mb-2">
            {car.brand} • {car.year}
          </p>
          <p className="text-2xl font-bold text-blue-600 mb-2">
            Rp {parseInt(car.price).toLocaleString()}
          </p>
          <span
            className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
              car.status === "available"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {car.status === "available" ? "Tersedia" : "Terjual"}
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <button
            onClick={() => handleEdit(car)}
            className="p-2.5 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors"
          >
            <Edit2 size={18} />
          </button>
          <button
            onClick={() => handleDelete(car.id)}
            className="p-2.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        user={user}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onCreateClick={() => setShowForm(true)}
        setUser={setUser}
      />

      <div className="flex">
        <Sidebar filters={filters} onFilterChange={setFilters} />

        <main className="flex-1 p-6">
          {/* Tabs */}
          <div className="flex gap-2 mb-6 border-b-2 border-gray-200">
            <button
              onClick={() => setView("browse")}
              className={`flex items-center gap-2 px-6 py-3 text-sm font-semibold border-b-2 -mb-0.5 transition-colors ${
                view === "browse"
                  ? "text-blue-600 border-blue-600"
                  : "text-gray-600 border-transparent hover:text-gray-900"
              }`}
            >
              <Package size={18} />
              <span>Jelajah Mobil</span>
            </button>
            <button
              onClick={() => setView("my-cars")}
              className={`flex items-center gap-2 px-6 py-3 text-sm font-semibold border-b-2 -mb-0.5 transition-colors ${
                view === "my-cars"
                  ? "text-blue-600 border-blue-600"
                  : "text-gray-600 border-transparent hover:text-gray-900"
              }`}
            >
              <Package size={18} />
              <span>Mobil Saya</span>
            </button>
          </div>

          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {view === "browse" ? "Mobil Tersedia" : "Mobil Saya"}
            </h2>
            <p className="text-sm text-gray-600">
              {filteredCars.length} mobil ditemukan
            </p>
          </div>

          {loading ? (
            <div className="text-center py-20 text-gray-600">Memuat...</div>
          ) : filteredCars.length === 0 ? (
            <div className="text-center py-20 text-gray-600">
              {view === "my-cars"
                ? 'Anda belum memiliki mobil yang dijual. Klik tombol "Jual" untuk menambahkan.'
                : "Tidak ada mobil yang sesuai dengan filter"}
            </div>
          ) : (
            <div
              className={
                view === "browse"
                  ? "grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6"
                  : "flex flex-col gap-4"
              }
            >
              {view === "browse"
                ? filteredCars.map((car) => <CarCard key={car.id} car={car} />)
                : filteredCars.map((car) => (
                    <MyCarCard key={car.id} car={car} />
                  ))}
            </div>
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

export default SellerDashboard;
