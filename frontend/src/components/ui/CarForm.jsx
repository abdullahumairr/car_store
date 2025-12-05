// src/components/ui/CarForm.jsx
import { useState, useEffect } from "react";
import { X, Plus, Trash } from "lucide-react";

function CarForm({ onSubmit, onClose, initialData = null }) {
  const [formData, setFormData] = useState({
    car_name: "",
    brand: "",
    year: "",
    mileage: "",
    description: "",
    price: "",
    address: "",
    status: "available",
  });

  const [imageLinks, setImageLinks] = useState([""]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        car_name: initialData.car_name || "",
        brand: initialData.brand || "",
        year: initialData.year?.toString() || "",
        mileage: initialData.mileage?.toString() || "",
        description: initialData.description || "",
        price: initialData.price?.toString() || "",
        address: initialData.address || "",
        status: initialData.status || "available",
      });

      // Handle link foto existing
      try {
        let parsed = Array.isArray(initialData.image_url)
          ? initialData.image_url
          : JSON.parse(initialData.image_url || "[]");

        setImageLinks(parsed.length ? parsed : [""]);
      } catch {
        setImageLinks([""]);
      }
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData((s) => ({ ...s, [e.target.name]: e.target.value }));
  };

  const handleImageLinkChange = (index, value) => {
    const updated = [...imageLinks];
    updated[index] = value;
    setImageLinks(updated);
  };

  const addImageField = () => {
    if (imageLinks.length < 10) {
      setImageLinks([...imageLinks, ""]);
    }
  };

  const removeImageField = (index) => {
    const updated = imageLinks.filter((_, i) => i !== index);
    setImageLinks(updated.length ? updated : [""]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const filteredLinks = imageLinks.filter((link) => link.trim() !== "");

    const payload = {
      ...formData,
      image_url: filteredLinks,
    };

    try {
      await onSubmit(payload); // JSON payload
      onClose();
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Gagal menyimpan data mobil");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-5">
      <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-auto shadow-2xl">
        {/* HEADER */}
        <div className="flex justify-between items-center px-6 py-5 border-b border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-800">
            {initialData ? "Edit Mobil" : "Tambah Mobil Baru"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <X size={24} className="text-gray-600" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {/* INPUT DATA */}
          <div className="grid grid-cols-2 gap-5 mb-5">
            {/* Nama Mobil */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">
                Nama Mobil *
              </label>
              <input
                type="text"
                name="car_name"
                value={formData.car_name}
                onChange={handleChange}
                className="px-3 py-2.5 border border-gray-300 rounded-lg text-sm"
                required
              />
            </div>

            {/* Brand */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">
                Brand *
              </label>
              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                className="px-3 py-2.5 border border-gray-300 rounded-lg text-sm"
                required
              />
            </div>

            {/* Tahun */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">
                Tahun *
              </label>
              <input
                type="number"
                name="year"
                value={formData.year}
                onChange={handleChange}
                className="px-3 py-2.5 border border-gray-300 rounded-lg text-sm"
                required
              />
            </div>

            {/* Mileage */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">
                Kilometer *
              </label>
              <input
                type="number"
                name="mileage"
                value={formData.mileage}
                onChange={handleChange}
                className="px-3 py-2.5 border border-gray-300 rounded-lg text-sm"
                required
              />
            </div>

            {/* Harga */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">
                Harga *
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="px-3 py-2.5 border border-gray-300 rounded-lg text-sm"
                required
              />
            </div>

            {/* Lokasi */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">
                Lokasi *
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="px-3 py-2.5 border border-gray-300 rounded-lg text-sm"
                required
              />
            </div>
          </div>

          {/* DESKRIPSI */}
          <div className="flex flex-col gap-2 mb-5">
            <label className="text-sm font-medium text-gray-700">
              Deskripsi *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="px-3 py-2.5 border border-gray-300 rounded-lg text-sm"
              required
            />
          </div>

          {/* LINK FOTO */}
          <div className="flex flex-col gap-2 mb-5">
            <label className="text-sm font-medium text-gray-700">
              Link Foto Mobil (maks 10)
            </label>

            {imageLinks.map((link, index) => (
              <div key={index} className="flex gap-3">
                <input
                  type="text"
                  placeholder="https://example.com/image.jpg"
                  value={link}
                  onChange={(e) => handleImageLinkChange(index, e.target.value)}
                  className="flex-1 px-3 py-2.5 border border-gray-300 rounded-lg text-sm"
                />

                {imageLinks.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeImageField(index)}
                    className="p-2 bg-red-500 text-white rounded-lg"
                  >
                    <Trash size={18} />
                  </button>
                )}
              </div>
            ))}

            {imageLinks.length < 10 && (
              <button
                type="button"
                onClick={addImageField}
                className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg text-sm font-medium hover:bg-gray-200 w-fit"
              >
                <Plus size={18} /> Tambah Link Foto
              </button>
            )}
          </div>

          {/* STATUS */}
          <div className="flex flex-col gap-2 mb-5">
            <label className="text-sm font-medium text-gray-700">
              Status *
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="px-3 py-2.5 border border-gray-300 rounded-lg text-sm"
            >
              <option value="available">Tersedia</option>
              <option value="sold">Terjual</option>
            </select>
          </div>

          {/* BUTTON */}
          <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-semibold"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold disabled:opacity-50"
            >
              {loading ? "Menyimpan..." : initialData ? "Update" : "Simpan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CarForm;
