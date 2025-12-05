import { useNavigate } from "react-router-dom";
import { MapPin, Gauge } from "lucide-react";
import { normalizeCarImages } from "../../services/api";

function CarCard({ car }) {
  const navigate = useNavigate();

  if (!car) {
    console.error("CarCard: car prop is undefined");
    return null;
  }

  const handleClick = () => {
    navigate(`/car/${car.id}`);
  };

  const images = normalizeCarImages(car);
  const firstImage = images.length > 0 ? images[0] : null;

  // Fallback image URL
  const getSafeImageUrl = (url) => {
    if (!url) return "https://via.placeholder.com/300x200?text=No+Image";

    // Jika URL punya karakter aneh, encode
    try {
      new URL(url);
      return url;
    } catch {
      // Jika URL invalid, gunakan placeholder
      return "https://via.placeholder.com/300x200?text=Invalid+URL";
    }
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-200 cursor-pointer"
    >
      <div className="relative w-full h-48 bg-gray-100">
        <img
          src={getSafeImageUrl(firstImage)}
          alt={car.car_name || "Car"}
          className="w-full h-full object-cover"
          onError={(e) => {
            console.error("Image load failed, using fallback:", firstImage);
            e.target.onerror = null;
            e.target.src =
              "https://via.placeholder.com/300x200?text=Image+Error";
          }}
        />

        {String(car.status || "").toLowerCase() === "sold" && (
          <div className="absolute top-3 right-3 bg-red-600/90 text-white px-3 py-1.5 rounded text-xs font-semibold">
            TERJUAL
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-1 truncate">
          {car.car_name ?? "-"}
        </h3>
        <p className="text-sm text-gray-600 mb-3">
          {car.brand ?? "-"} • {car.year ?? "-"}
        </p>

        <div className="flex flex-col gap-2 mb-3">
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <Gauge size={16} className="text-gray-500" />
            <span>
              {car.mileage
                ? `${parseInt(car.mileage).toLocaleString()} km`
                : "-"}
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <MapPin size={16} className="text-gray-500" />
            <span className="truncate">{car.address ?? "-"}</span>
          </div>
        </div>

        <div className="text-xl font-bold text-blue-600 mt-2">
          Rp {car.price ? parseInt(car.price).toLocaleString() : "-"}
        </div>
      </div>
    </div>
  );
}

export default CarCard;
