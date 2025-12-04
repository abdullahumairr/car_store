import { useNavigate } from "react-router-dom";
import { getImageUrl } from "../../services/api";
import { MapPin, Gauge } from "lucide-react";

function CarCard({ car }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/car/${car.id}`);
  };

  const images =
    typeof car.images === "string" ? JSON.parse(car.images) : car.images;
  const firstImage = images && images.length > 0 ? images[0] : null;

  return (
    <div style={styles.card} onClick={handleClick}>
      <div style={styles.imageContainer}>
        {firstImage ? (
          <img
            src={getImageUrl(firstImage)}
            alt={car.car_name}
            style={styles.image}
          />
        ) : (
          <div style={styles.noImage}>No Image</div>
        )}
        {car.status === "sold" && <div style={styles.soldBadge}>TERJUAL</div>}
      </div>

      <div style={styles.content}>  
        <h3 style={styles.title}>{car.car_name}</h3>
        <p style={styles.brand}>
          {car.brand} • {car.year}
        </p>

        <div style={styles.info}>
          <div style={styles.infoItem}>
            <Gauge size={16} color="#666" />
            <span>{parseInt(car.mileage).toLocaleString()} km</span>
          </div>
          <div style={styles.infoItem}>
            <MapPin size={16} color="#666" />
            <span>{car.address}</span>
          </div>
        </div>

        <div style={styles.price}>
          Rp {parseInt(car.price).toLocaleString()}
        </div>
      </div>
    </div>
  );
}

const styles = {
  card: {
    backgroundColor: "white",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    cursor: "pointer",
    transition: "transform 0.2s, box-shadow 0.2s",
    ":hover": {
      transform: "translateY(-4px)",
      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    },
  },
  imageContainer: {
    width: "100%",
    height: "200px",
    position: "relative",
    backgroundColor: "#f5f5f5",
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
    color: "#999",
    fontSize: "14px",
  },
  soldBadge: {
    position: "absolute",
    top: "12px",
    right: "12px",
    backgroundColor: "rgba(255, 0, 0, 0.9)",
    color: "white",
    padding: "6px 12px",
    borderRadius: "4px",
    fontSize: "12px",
    fontWeight: "600",
  },
  content: {
    padding: "16px",
  },
  title: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#333",
    marginBottom: "4px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  brand: {
    fontSize: "14px",
    color: "#666",
    marginBottom: "12px",
  },
  info: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    marginBottom: "12px",
  },
  infoItem: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "13px",
    color: "#666",
  },
  price: {
    fontSize: "20px",
    fontWeight: "700",
    color: "#0066cc",
    marginTop: "8px",
  },
};

export default CarCard;
