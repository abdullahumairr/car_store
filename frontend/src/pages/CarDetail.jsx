import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCarById, normalizeCarImages, deleteCar } from "../services/api"; // <-- IMPORT
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

      // FIX
      const carData = response.data.data;

      setCar(carData);

      const parsedImages = normalizeCarImages(carData);
      setImages(parsedImages);
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

  const handleBooking = async () => {
    if (
      !confirm(
        "Yakin ingin booking mobil ini?"
      )
    )
      return;

    try {
      await deleteCar(id);
      alert("Selamat mobil berhasil di Booking!");
      navigate("/");
    } catch (error) {
      console.error("Booking failed:", error);
      alert("Gagal booking mobil.");
    }
  };

  const handleWhatsApp = () => {
    alert("Fitur WhatsApp akan segera hadir!");
  };

  const handleChat = () => {
    alert("Fitur chat akan segera hadir!");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5f5f5]">
        <Navbar
          user={user}
          setUser={setUser}
          searchQuery=""
          onSearchChange={() => {}}
        />
        <div className="text-center py-[60px] text-base text-[#666]">
          Loading...
        </div>
      </div>
    );
  }

  if (!car) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <Navbar
        user={user}
        setUser={setUser}
        searchQuery=""
        onSearchChange={() => {}}
      />

      <div className="max-w-[1400px] mx-auto px-6 py-6">
        <button
          onClick={() => navigate(-1)}
          className="bg-white px-5 py-2.5 rounded-md text-sm font-medium text-[#333] mb-6 shadow-[0_2px_4px_rgba(0,0,0,0.1)] border-0 cursor-pointer"
        >
          ← Kembali
        </button>

        <div className="grid grid-cols-[1fr_400px] gap-6">
          <div className="flex flex-col gap-6">
            {/* Image Gallery */}
            <div className="relative w-full h-[500px] bg-black rounded-xl overflow-hidden">
              {images.length > 0 ? (
                <>
                  <img
                    src={images[currentImageIndex]}
                    alt={car.car_name}
                    className="w-full h-full object-contain"
                  />

                  {images.length > 1 && (
                    <>
                      <button
                        onClick={handlePrevImage}
                        className="absolute left-5 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full flex items-center justify-center border-0 cursor-pointer"
                      >
                        <ChevronLeft size={32} />
                      </button>
                      <button
                        onClick={handleNextImage}
                        className="absolute right-5 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full flex items-center justify-center border-0 cursor-pointer"
                      >
                        <ChevronRight size={32} />
                      </button>
                      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-[20px] text-sm font-medium">
                        {currentImageIndex + 1} / {images.length}
                      </div>
                    </>
                  )}
                  <div className="absolute top-5 right-5 flex gap-3">
                    <button className="bg-black/50 text-white p-3 rounded-full flex items-center justify-center border-0 cursor-pointer">
                      <Share2 size={20} />
                    </button>
                    <button className="bg-black/50 text-white p-3 rounded-full flex items-center justify-center border-0 cursor-pointer">
                      <Heart size={20} />
                    </button>
                  </div>
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white text-lg">
                  No Image Available
                </div>
              )}
            </div>

            {/* Car Info */}
            <div className="bg-white rounded-xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.1)]">
              <div className="flex gap-2 mb-4">
                <span className="bg-[#ffd700] text-[#333] px-3 py-1.5 rounded text-xs font-semibold">
                  HIGHLIGHT
                </span>
              </div>

              <h1 className="text-[28px] font-bold text-[#333] mb-2">
                {car.car_name}
              </h1>
              <p className="text-base text-[#666] mb-4">
                {car.brand} ({car.year})
              </p>

              <div className="flex items-center gap-2 text-sm text-[#666]">
                <Gauge size={18} color="#666" />
                <span>{parseInt(car.mileage).toLocaleString()} KM</span>
              </div>

              <div className="h-px bg-[#e5e5e5] my-6" />

              <h3 className="text-lg font-semibold text-[#333] mb-4">
                Ikhtisar
              </h3>

              <div className="flex flex-col gap-4 mb-6">
                <div className="flex items-start gap-3">
                  <User size={20} color="#666" />
                  <div>
                    <p className="text-[13px] text-[#999] mb-1">Penjual</p>
                    <p className="text-sm text-[#333] font-medium">
                      Toyota Dealer
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin size={20} color="#666" />
                  <div>
                    <p className="text-[13px] text-[#999] mb-1">Lokasi</p>
                    <p className="text-sm text-[#333] font-medium">
                      {car.address}
                    </p>
                  </div>
                </div>
              </div>

              <div className="h-px bg-[#e5e5e5] my-6" />

              <h3 className="text-lg font-semibold text-[#333] mb-4">
                Deskripsi
              </h3>
              <p className="text-sm text-[#666] leading-relaxed whitespace-pre-wrap">
                {car.description}
              </p>
            </div>
          </div>

          <div className="sticky top-20 h-fit">
            {/* Price Card */}
            <div className="bg-white rounded-xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.1)]">
              <div className="text-[32px] font-bold text-[#333] mb-5">
                Rp {parseInt(car.price).toLocaleString()}
              </div>

              <button
                onClick={handleBooking}
                className="w-full bg-[#0066cc] text-white py-3.5 rounded-lg text-base font-semibold mb-4 border-0 cursor-pointer"
              >
                🚗 Booking
              </button>

              <div className="bg-[#e3f2fd] p-4 rounded-lg mb-4">
                <h4 className="text-sm font-semibold text-[#333] mb-3">
                  Beli barang ini pakai
                </h4>
                <div className="bg-white p-3 rounded-md mb-2 text-[13px] text-[#333] leading-relaxed">
                  <span>📱 Booking mobil yang kamu mau.</span>
                </div>
                <div className="bg-white p-3 rounded-md mb-2 text-[13px] text-[#333] leading-relaxed">
                  <span>
                    ✅ Hindari penipuan. Uangmu tersimpan aman di CarMarket dan
                    terkirim setelah deal dengan Penjual.
                  </span>
                </div>
                <div className="bg-white p-3 rounded-md text-[13px] text-[#333] leading-relaxed">
                  <span>
                    💯 Jaminan uang kembali 100%* jika bekas tabrak atau banjir.
                  </span>
                </div>
              </div>

              <button
                onClick={handleWhatsApp}
                className="w-full bg-[#25D366] text-white py-3.5 rounded-lg text-sm font-semibold mb-3 border-0 cursor-pointer"
              >
                💬 WhatsApp
              </button>

              <button
                onClick={handleChat}
                className="w-full bg-white text-[#0066cc] py-3.5 rounded-lg text-sm font-semibold border-2 border-[#0066cc] cursor-pointer"
              >
                💬 Chat Dengan Penjual
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CarDetail;
