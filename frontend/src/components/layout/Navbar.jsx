import { Search, Plus, LogOut, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Navbar({ user, searchQuery, onSearchChange, onCreateClick, setUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="bg-white border-b border-gray-200 py-3 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between gap-6">
        {/* Logo */}
        <div className="min-w-[200px]">
          <h1 className="text-3xl font-bold text-gray-800 cursor-pointer">
            Car<span className="text-blue-600">Market</span>
          </h1>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-2xl">
          <div className="flex items-center gap-3 bg-gray-100 px-4 py-3 rounded-lg border border-gray-200">
            <Search size={20} className="text-gray-600" />
            <input
              type="text"
              placeholder="Cari mobil..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="flex-1 bg-transparent border-none text-sm text-gray-800 outline-none placeholder:text-gray-500"
            />
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Tombol Jual (hanya untuk seller & admin) */}
          {(user?.role === "seller" || user?.role === "admin") && (
            <button
              onClick={onCreateClick}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors"
            >
              <Plus size={18} />
              <span>Jual</span>
            </button>
          )}

          {/* User Menu */}
          <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg">
            <User size={20} className="text-gray-600" />
            <span className="text-sm font-medium text-gray-800">
              {user?.fullname}
            </span>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="p-2.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg flex items-center justify-center transition-colors"
            title="Logout"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
