import { useState, useEffect } from "react";
import { getAllCars } from "../../services/api";
import Navbar from "../../components/layout/Navbar";
import Sidebar from "../../components/layout/Sidebar";
import CarCard from "../../components/ui/CarCard";
import { Store, ExternalLink } from "lucide-react";

function UserDashboard({ user, setUser }) {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    locations: [],
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
      const availableCars = response.data.filter(
        (car) => car.status === "available"
      );
      setCars(availableCars);
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

  const handleBecomeSeller = () => {
    setShowSellerModal(true);
  };

  const handleOpenGoogleForm = () => {
    // Ganti URL ini dengan Google Form Anda
    window.open("https://forms.google.com/your-form-url", "_blank");
    setShowSellerModal(false);
  };

  return (
    <div style={styles.container}>
      <Navbar
        user={user}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        setUser={setUser}
      />

      {/* Banner Jadi Seller */}
      <div style={styles.banner}>
        <div style={styles.bannerContent}>
          <div style={styles.bannerLeft}>
            <Store size={48} color="#0066cc" strokeWidth={2} />
            <div>
              <h3 style={styles.bannerTitle}>Ingin Jual Mobil Anda?</h3>
              <p style={styles.bannerText}>
                Daftar sebagai seller dan mulai jual mobil dengan mudah
              </p>
            </div>
          </div>
          <button style={styles.bannerBtn} onClick={handleBecomeSeller}>
            Jadi Seller Sekarang
          </button>
        </div>
      </div>

      <div style={styles.content}>
        <Sidebar filters={filters} onFilterChange={setFilters} />

        <main style={styles.main}>
          <div style={styles.header}>
            <h2 style={styles.title}>Mobil Tersedia</h2>
            <p style={styles.count}>{filteredCars.length} mobil ditemukan</p>
          </div>

          {loading ? (
            <div style={styles.loading}>Memuat...</div>
          ) : filteredCars.length === 0 ? (
            <div style={styles.empty}>
              <p style={styles.emptyText}>
                Tidak ada mobil yang sesuai dengan filter
              </p>
              <p style={styles.emptySubtext}>
                Coba ubah filter atau kata kunci pencarian Anda
              </p>
            </div>
          ) : (
            <div style={styles.grid}>
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
          style={styles.modalOverlay}
          onClick={() => setShowSellerModal(false)}
        >
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <Store size={32} color="#0066cc" />
              <h3 style={styles.modalTitle}>Daftar Sebagai Seller</h3>
            </div>
            <div style={styles.modalBody}>
              <p style={styles.modalText}>
                Untuk menjadi seller dan mulai menjual mobil, Anda perlu mengisi
                formulir pendaftaran seller terlebih dahulu.
              </p>
              <ul style={styles.modalList}>
                <li>✅ Gratis tanpa biaya pendaftaran</li>
                <li>✅ Jual mobil dengan mudah</li>
                <li>✅ Jangkau pembeli lebih luas</li>
                <li>✅ Dashboard khusus seller</li>
              </ul>
            </div>
            <div style={styles.modalActions}>
              <button
                style={styles.modalCancelBtn}
                onClick={() => setShowSellerModal(false)}
              >
                Batal
              </button>
              <button
                style={styles.modalConfirmBtn}
                onClick={handleOpenGoogleForm}
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

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#f5f7fa",
  },
  banner: {
    backgroundColor: "#e3f2fd",
    borderBottom: "1px solid #bbdefb",
    padding: "20px 24px",
  },
  bannerContent: {
    maxWidth: "1400px",
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "24px",
  },
  bannerLeft: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
  bannerTitle: {
    fontSize: "18px",
    fontWeight: "700",
    color: "#1a1a1a",
    marginBottom: "4px",
  },
  bannerText: {
    fontSize: "14px",
    color: "#666",
  },
  bannerBtn: {
    backgroundColor: "#0066cc",
    color: "white",
    padding: "12px 24px",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "600",
    border: "none",
    cursor: "pointer",
    whiteSpace: "nowrap",
    transition: "background-color 0.2s",
  },
  content: {
    display: "flex",
  },
  main: {
    flex: 1,
    padding: "24px",
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
  loading: {
    textAlign: "center",
    padding: "60px 20px",
    fontSize: "16px",
    color: "#6b7280",
  },
  empty: {
    textAlign: "center",
    padding: "60px 20px",
  },
  emptyText: {
    fontSize: "16px",
    color: "#374151",
    marginBottom: "8px",
    fontWeight: "500",
  },
  emptySubtext: {
    fontSize: "14px",
    color: "#9ca3af",
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
    padding: "20px",
  },
  modal: {
    backgroundColor: "white",
    borderRadius: "16px",
    width: "100%",
    maxWidth: "500px",
    boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)",
  },
  modalHeader: {
    padding: "24px",
    borderBottom: "1px solid #e5e7eb",
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
  modalTitle: {
    fontSize: "20px",
    fontWeight: "700",
    color: "#1a1a1a",
  },
  modalBody: {
    padding: "24px",
  },
  modalText: {
    fontSize: "14px",
    color: "#4b5563",
    lineHeight: "1.6",
    marginBottom: "20px",
  },
  modalList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  modalActions: {
    padding: "24px",
    borderTop: "1px solid #e5e7eb",
    display: "flex",
    justifyContent: "flex-end",
    gap: "12px",
  },
  modalCancelBtn: {
    padding: "10px 20px",
    backgroundColor: "#f3f4f6",
    color: "#374151",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "600",
    border: "none",
    cursor: "pointer",
  },
  modalConfirmBtn: {
    padding: "10px 20px",
    backgroundColor: "#0066cc",
    color: "white",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "600",
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
};

export default UserDashboard;
