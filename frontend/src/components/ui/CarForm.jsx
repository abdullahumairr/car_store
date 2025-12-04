import { useState, useEffect } from "react";
import { X } from "lucide-react";

function CarForm({ onSubmit, onClose, initialData = null }) {
  const [formData, setFormData] = useState({
    car_name: "",
    brand: "",
    year: "",
    mileage: "",
    description: "",
    price: "",
    address: "",
  });
  const [images, setImages] = useState([]);
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
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();

    // Append all text fields
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    // Append images
    images.forEach((image) => {
      data.append("images", image);
    });

    try {
      await onSubmit(data);
      onClose();
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Gagal menyimpan data mobil");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <div style={styles.header}>
          <h2 style={styles.title}>
            {initialData ? "Edit Mobil" : "Tambah Mobil Baru"}
          </h2>
          <button style={styles.closeBtn} onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGrid}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Nama Mobil *</label>
              <input
                type="text"
                name="car_name"
                value={formData.car_name}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Brand *</label>
              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Tahun *</label>
              <input
                type="number"
                name="year"
                value={formData.year}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Kilometer *</label>
              <input
                type="number"
                name="mileage"
                value={formData.mileage}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Harga *</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Lokasi *</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Deskripsi *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              style={styles.textarea}
              rows="4"
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>
              Foto Mobil * {!initialData && "(Maksimal 10 foto)"}
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              style={styles.fileInput}
              required={!initialData}
            />
            {images.length > 0 && (
              <p style={styles.fileInfo}>{images.length} file dipilih</p>
            )}
          </div>

          <div style={styles.actions}>
            <button type="button" style={styles.cancelBtn} onClick={onClose}>
              Batal
            </button>
            <button type="submit" style={styles.submitBtn} disabled={loading}>
              {loading ? "Menyimpan..." : initialData ? "Update" : "Simpan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
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
    borderRadius: "12px",
    width: "100%",
    maxWidth: "800px",
    maxHeight: "90vh",
    overflow: "auto",
    boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "24px",
    borderBottom: "1px solid #e5e5e5",
  },
  title: {
    fontSize: "24px",
    fontWeight: "600",
    color: "#333",
  },
  closeBtn: {
    padding: "8px",
    backgroundColor: "transparent",
    color: "#666",
  },
  form: {
    padding: "24px",
  },
  formGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "20px",
    marginBottom: "20px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  label: {
    fontSize: "14px",
    fontWeight: "500",
    color: "#333",
  },
  input: {
    padding: "12px",
    border: "1px solid #ddd",
    borderRadius: "6px",
    fontSize: "14px",
  },
  textarea: {
    padding: "12px",
    border: "1px solid #ddd",
    borderRadius: "6px",
    fontSize: "14px",
    resize: "vertical",
    fontFamily: "inherit",
  },
  fileInput: {
    padding: "8px",
    border: "1px solid #ddd",
    borderRadius: "6px",
    fontSize: "14px",
  },
  fileInfo: {
    fontSize: "13px",
    color: "#666",
    marginTop: "4px",
  },
  actions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "12px",
    marginTop: "24px",
    paddingTop: "24px",
    borderTop: "1px solid #e5e5e5",
  },
  cancelBtn: {
    padding: "12px 24px",
    backgroundColor: "#f5f5f5",
    color: "#333",
    borderRadius: "6px",
    fontSize: "14px",
    fontWeight: "600",
  },
  submitBtn: {
    padding: "12px 24px",
    backgroundColor: "#0066cc",
    color: "white",
    borderRadius: "6px",
    fontSize: "14px",
    fontWeight: "600",
  },
};

export default CarForm;
