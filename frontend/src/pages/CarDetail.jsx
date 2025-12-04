import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCarById, getImageUrl } from "../services/api";
import {
  ChevronLeft,
  ChevronRight,
  Share2,
  Heart,
  MapPin,
  User,
  Gauge,
} from "lucide-react";
import Navbar from "../components/layout/Navbar";

function CarDetail({ user, setUser }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchCarDetail();
  }, [id]);

  const fetchCarDetail = async () => {
    try {
      const response = await getCarById(id);
      setCar(response.data);

      // Parse images
      const parsedImages =
        typeof response.data.images === "string"
          ? JSON.parse(response.data.images)
          : response.data.images;
      setImages(parsedImages || []);
    } catch (error) {
      console.error("Error fetching car detail:", error);
      alert("Mobil tidak ditemukan");
      navigate(-1);
    } finally {
      setLoading(false);
    }
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleBooking = () => {
    alert("Fitur booking akan segera hadir!");
  };

  const handleWhatsApp = () => {
    alert("Fitur WhatsApp akan segera hadir!");
  };

  const handleChat = () => {
    alert("Fitur chat akan segera hadir!");
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <Navbar
          user={user}
          setUser={setUser}
          searchQuery=""
          onSearchChange={() => {}}
        />
        <div style={styles.loading}>Loading...</div>
      </div>
    );
  }

  if (!car) {
    return null;
  }

  return (
    <div style={styles.container}>
      <Navbar
        user={user}
        setUser={setUser}
        searchQuery=""
        onSearchChange={() => {}}
      />

      <div style={styles.content}>
        <button style={styles.backBtn} onClick={() => navigate(-1)}>
          ← Kembali
        </button>

        <div style={styles.detailContainer}>
          <div style={styles.leftSection}>
            {/* Image Gallery */}
            <div style={styles.imageGallery}>
              {images.length > 0 ? (
                <>
                  <img
                    src={getImageUrl(images[currentImageIndex])}
                    alt={car.car_name}
                    style={styles.mainImage}
                  />
                  {images.length > 1 && (
                    <>
                      <button style={styles.prevBtn} onClick={handlePrevImage}>
                        <ChevronLeft size={32} />
                      </button>
                      <button style={styles.nextBtn} onClick={handleNextImage}>
                        <ChevronRight size={32} />
                      </button>
                      <div style={styles.imageCounter}>
                        {currentImageIndex + 1} / {images.length}
                      </div>
                    </>
                  )}
                  <div style={styles.imageActions}>
                    <button style={styles.iconBtn}>
                      <Share2 size={20} />
                    </button>
                    <button style={styles.iconBtn}>
                      <Heart size={20} />
                    </button>
                  </div>
                </>
              ) : (
                <div style={styles.noImage}>No Image Available</div>
              )}
            </div>

            {/* Car Info */}
            <div style={styles.infoCard}>
              <div style={styles.badges}>
                <span style={styles.badge}>HIGHLIGHT</span>
              </div>

              <h1 style={styles.carName}>{car.car_name}</h1>
              <p style={styles.carSubtitle}>
                {car.brand} ({car.year})
              </p>

              <div style={styles.specs}>
                <div style={styles.specItem}>
                  <Gauge size={18} color="#666" />
                  <span>{parseInt(car.mileage).toLocaleString()} KM</span>
                </div>
                <div style={styles.specItem}>
                  <span>AUTOMATIC</span>
                </div>
              </div>

              <div style={styles.divider} />

              <h3 style={styles.sectionTitle}>Ikhtisar</h3>

              <div style={styles.overview}>
                <div style={styles.overviewItem}>
                  <User size={20} color="#666" />
                  <div>
                    <p style={styles.overviewLabel}>Penjual</p>
                    <p style={styles.overviewValue}>--</p>
                  </div>
                </div>

                <div style={styles.overviewItem}>
                  <MapPin size={20} color="#666" />
                  <div>
                    <p style={styles.overviewLabel}>Lokasi</p>
                    <p style={styles.overviewValue}>{car.address}</p>
                  </div>
                </div>

                <div style={styles.overviewItem}>
                  <Gauge size={20} color="#666" />
                  <div>
                    <p style={styles.overviewLabel}>Kapasitas mesin</p>
                    <p style={styles.overviewValue}>2.000 - 3.000 cc</p>
                  </div>
                </div>
              </div>

              <div style={styles.divider} />

              <h3 style={styles.sectionTitle}>Deskripsi</h3>
              <p style={styles.description}>{car.description}</p>
            </div>
          </div>

          <div style={styles.rightSection}>
            {/* Price Card */}
            <div style={styles.priceCard}>
              <div style={styles.price}>
                Rp {parseInt(car.price).toLocaleString()}
              </div>

              <button style={styles.bookingBtn} onClick={handleBooking}>
                🚗 Booking
              </button>

              <div style={styles.contactInfo}>
                <h4 style={styles.contactTitle}>Beli barang ini pakai</h4>
                <div style={styles.contactBadge}>
                  <span>
                    📱 Booking mobil, motor, atau handphone yang kamu mau.
                  </span>
                </div>
                <div style={styles.contactBadge}>
                  <span>
                    ✅ Hindari penipuan. Uangmu tersimpan aman di OLX dan
                    terkirim setelah deal dengan Penjual.
                  </span>
                </div>
                <div style={styles.contactBadge}>
                  <span>
                    💯 Jaminan uang kembali 100%* jika tidak cocok atau COD.
                  </span>
                </div>
              </div>

              <div style={styles.seller}>
                <div style={styles.sellerLogo}>
                  <div style={styles.logoCircle}>D</div>
                  <span style={styles.sellerName}>DEDE - FOCUS MOTOR</span>
                </div>
              </div>

              <button style={styles.whatsappBtn} onClick={handleWhatsApp}>
                💬 WhatsApp
              </button>

              <button style={styles.chatBtn} onClick={handleChat}>
                💬 Chat Dengan Penjual
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#f5f5f5",
  },
  content: {
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "24px",
  },
  backBtn: {
    backgroundColor: "white",
    padding: "10px 20px",
    borderRadius: "6px",
    fontSize: "14px",
    fontWeight: "500",
    color: "#333",
    marginBottom: "24px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  detailContainer: {
    display: "grid",
    gridTemplateColumns: "1fr 400px",
    gap: "24px",
  },
  leftSection: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  },
  imageGallery: {
    position: "relative",
    width: "100%",
    height: "500px",
    backgroundColor: "black",
    borderRadius: "12px",
    overflow: "hidden",
  },
  mainImage: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },
  noImage: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontSize: "18px",
  },
  prevBtn: {
    position: "absolute",
    left: "20px",
    top: "50%",
    transform: "translateY(-50%)",
    backgroundColor: "rgba(0,0,0,0.5)",
    color: "white",
    padding: "12px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  nextBtn: {
    position: "absolute",
    right: "20px",
    top: "50%",
    transform: "translateY(-50%)",
    backgroundColor: "rgba(0,0,0,0.5)",
    color: "white",
    padding: "12px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  imageCounter: {
    position: "absolute",
    bottom: "20px",
    left: "50%",
    transform: "translateX(-50%)",
    backgroundColor: "rgba(0,0,0,0.7)",
    color: "white",
    padding: "8px 16px",
    borderRadius: "20px",
    fontSize: "14px",
    fontWeight: "500",
  },
  imageActions: {
    position: "absolute",
    top: "20px",
    right: "20px",
    display: "flex",
    gap: "12px",
  },
  iconBtn: {
    backgroundColor: "rgba(0,0,0,0.5)",
    color: "white",
    padding: "12px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  infoCard: {
    backgroundColor: "white",
    borderRadius: "12px",
    padding: "24px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  badges: {
    display: "flex",
    gap: "8px",
    marginBottom: "16px",
  },
  badge: {
    backgroundColor: "#ffd700",
    color: "#333",
    padding: "6px 12px",
    borderRadius: "4px",
    fontSize: "12px",
    fontWeight: "600",
  },
  carName: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#333",
    marginBottom: "8px",
  },
  carSubtitle: {
    fontSize: "16px",
    color: "#666",
    marginBottom: "16px",
  },
  specs: {
    display: "flex",
    gap: "24px",
    marginBottom: "24px",
  },
  specItem: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "14px",
    color: "#666",
  },
  divider: {
    height: "1px",
    backgroundColor: "#e5e5e5",
    margin: "24px 0",
  },
  sectionTitle: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#333",
    marginBottom: "16px",
  },
  overview: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  overviewItem: {
    display: "flex",
    alignItems: "flex-start",
    gap: "12px",
  },
  overviewLabel: {
    fontSize: "13px",
    color: "#999",
    marginBottom: "4px",
  },
  overviewValue: {
    fontSize: "14px",
    color: "#333",
    fontWeight: "500",
  },
  description: {
    fontSize: "14px",
    color: "#666",
    lineHeight: "1.6",
    whiteSpace: "pre-wrap",
  },
  rightSection: {
    position: "sticky",
    top: "80px",
    height: "fit-content",
  },
  priceCard: {
    backgroundColor: "white",
    borderRadius: "12px",
    padding: "24px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  price: {
    fontSize: "32px",
    fontWeight: "700",
    color: "#333",
    marginBottom: "20px",
  },
  bookingBtn: {
    width: "100%",
    backgroundColor: "#0066cc",
    color: "white",
    padding: "14px",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "600",
    marginBottom: "16px",
  },
  contactInfo: {
    backgroundColor: "#e3f2fd",
    padding: "16px",
    borderRadius: "8px",
    marginBottom: "16px",
  },
  contactTitle: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#333",
    marginBottom: "12px",
  },
  contactBadge: {
    backgroundColor: "white",
    padding: "12px",
    borderRadius: "6px",
    marginBottom: "8px",
    fontSize: "13px",
    color: "#333",
    lineHeight: "1.5",
  },
  seller: {
    marginBottom: "16px",
  },
  sellerLogo: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px",
    backgroundColor: "#f5f5f5",
    borderRadius: "8px",
  },
  logoCircle: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    backgroundColor: "#ff0000",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "18px",
    fontWeight: "600",
  },
  sellerName: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#333",
  },
  whatsappBtn: {
    width: "100%",
    backgroundColor: "#25D366",
    color: "white",
    padding: "14px",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "600",
    marginBottom: "12px",
  },
  chatBtn: {
    width: "100%",
    backgroundColor: "white",
    color: "#0066cc",
    padding: "14px",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "600",
    border: "2px solid #0066cc",
  },
  loading: {
    textAlign: "center",
    padding: "60px 20px",
    fontSize: "16px",
    color: "#666",
  },
};

export default CarDetail;
