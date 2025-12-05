import { useState, useEffect } from "react";
import { X } from "lucide-react";

function UserForm({ onSubmit, onClose, initialData = null }) {
  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
    role: "user",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        fullname: initialData.fullname || "",
        username: initialData.username || "",
        email: initialData.email || "",
        password: "", // password kosong saat update
        role: initialData.role || "user",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData((s) => ({ ...s, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Kalau update dan password kosong → jangan kirim password
    const payload = { ...formData };
    if (initialData && payload.password.trim() === "") {
      delete payload.password;
    }

    try {
      await onSubmit(payload);
      onClose();
    } catch (error) {
      console.error("UserForm error:", error);
      alert("Gagal menyimpan user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-5">
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl">
        {/* HEADER */}
        <div className="flex justify-between items-center px-6 py-5 border-b border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-800">
            {initialData ? "Edit User" : "Tambah User Baru"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <X size={24} className="text-gray-600" />
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-2 gap-5 mb-5">
            {/* Fullname */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">
                Fullname *
              </label>
              <input
                type="text"
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
                required
                className="px-3 py-2.5 border border-gray-300 rounded-lg text-sm"
              />
            </div>

            {/* Username */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">
                Username *
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                className="px-3 py-2.5 border border-gray-300 rounded-lg text-sm"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="px-3 py-2.5 border border-gray-300 rounded-lg text-sm"
              />
            </div>

            {/* Password (optional on update) */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">
                Password {initialData ? "(kosongkan jika tidak diubah)" : "*"}
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="px-3 py-2.5 border border-gray-300 rounded-lg text-sm"
                required={!initialData}
              />
            </div>

            {/* Role */}
            <div className="flex flex-col gap-2 col-span-2">
              <label className="text-sm font-medium text-gray-700">
                Role *
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="px-3 py-2.5 border border-gray-300 rounded-lg text-sm"
              >
                <option value="user">User</option>
                <option value="seller">Seller</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>

          {/* BUTTONS */}
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
              {loading
                ? "Menyimpan..."
                : initialData
                ? "Update User"
                : "Simpan User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserForm;
