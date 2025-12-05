import { useState, useEffect } from "react";
import { getAllCars, normalizeCarImages } from "../../../services/api";
import Navbar from "../../../components/layout/Navbar";
import Sidebar from "../../../components/layout/Sidebar";
import CarCard from "../../../components/ui/CarCard";
import { Store, ExternalLink } from "lucide-react";

function UserDashboard({ user, setUser }) {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    brands: [],
    priceRange: [0, 1000000000],
    mileageRange: [0, 500000],
  });
  const [loading, setLoading] = useState(true);
  const [showSellerModal, setShowSellerModal] = useState(false);

  useEffect(() => {
    fetchCars();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [cars, searchQuery, filters]);

  const fetchCars = async () => {
    try {
      const response = await getAllCars();
      const carsData = Array.isArray(response.data)
        ? response.data
        : response.data?.data ?? response.data?.cars ?? [];

      setCars(
        carsData.map((c) => ({
          ...c,
          images: normalizeCarImages(c.image_url), // FIXED
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

  const handleBecomeSeller = () => {
    setShowSellerModal(true);
  };

  const handleOpenGoogleForm = () => {
    window.open("https://forms.google.com/your-form-url", "_blank");
    setShowSellerModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        user={user}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        setUser={setUser}
      />

      {/* Banner Jadi Seller */}
      <div className="bg-blue-50 border-b border-blue-200 py-5 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <Store size={48} className="text-blue-600" strokeWidth={2} />
            <div>
              <h3 className="text-lg font-bold text-gray-900">
                Ingin Jual Mobil Anda?
              </h3>
              <p className="text-sm text-gray-600">
                Daftar sebagai seller dan mulai jual mobil dengan mudah
              </p>
            </div>
          </div>
          <button
            onClick={handleBecomeSeller}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-sm font-semibold whitespace-nowrap transition-colors"
          >
            Jadi Seller Sekarang
          </button>
        </div>
      </div>

      <div className="flex">
        <Sidebar filters={filters} onFilterChange={setFilters} />

        <main className="flex-1 p-6">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Mobil Tersedia
            </h2>
            <p className="text-sm text-gray-600">
              {filteredCars.length} mobil ditemukan
            </p>
          </div>

          {loading ? (
            <div className="text-center py-20 text-gray-600">Memuat...</div>
          ) : filteredCars.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-base text-gray-700 font-medium mb-2">
                Tidak ada mobil yang sesuai dengan filter
              </p>
              <p className="text-sm text-gray-500">
                Coba ubah filter atau kata kunci pencarian Anda
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCars.map((car) => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Modal Jadi Seller */}
      {showSellerModal && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-5"
          onClick={() => setShowSellerModal(false)}
        >
          <div
            className="bg-white rounded-2xl w-full max-w-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-4 px-6 py-5 border-b border-gray-200">
              <Store size={32} className="text-blue-600" />
              <h3 className="text-xl font-bold text-gray-900">
                Daftar Sebagai Seller
              </h3>
            </div>

            <div className="px-6 py-5">
              <p className="text-sm text-gray-600 leading-relaxed mb-5">
                Untuk menjadi seller dan mulai menjual mobil, Anda perlu mengisi
                formulir pendaftaran seller terlebih dahulu.
              </p>
              <ul className="space-y-3">
                <li className="text-sm text-gray-700">
                  ✅ Gratis tanpa biaya pendaftaran
                </li>
                <li className="text-sm text-gray-700">
                  ✅ Jual mobil dengan mudah
                </li>
                <li className="text-sm text-gray-700">
                  ✅ Jangkau pembeli lebih luas
                </li>
                <li className="text-sm text-gray-700">
                  ✅ Dashboard khusus seller
                </li>
              </ul>
            </div>

            <div className="flex justify-end gap-3 px-6 py-5 border-t border-gray-200">
              <button
                onClick={() => setShowSellerModal(false)}
                className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-semibold transition-colors"
              >
                Batal
              </button>
              <button
                onClick={handleOpenGoogleForm}
                className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold transition-colors"
              >
                <span>Isi Formulir</span>
                <ExternalLink size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserDashboard;
