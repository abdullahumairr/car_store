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
    <nav style={styles.navbar}>
      <div style={styles.container}>
        <div style={styles.left}>
          <h1 style={styles.logo}>
            Car<span style={{ color: "#0066cc" }}>Market</span>
          </h1>
        </div>

        <div style={styles.center}>
          <div style={styles.searchBox}>
            <Search size={20} color="#666" />
            <input
              type="text"
              placeholder="Cari mobil..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              style={styles.searchInput}
            />
          </div>
        </div>

        <div style={styles.right}>
          {(user?.role === "seller" || user?.role === "admin") && (
            <button style={styles.createBtn} onClick={onCreateClick}>
              <Plus size={18} />
              <span>Jual</span>
            </button>
          )}

          <div style={styles.userMenu}>
            <User size={20} />
            <span style={styles.userName}>{user?.fullname}</span>
          </div>

          <button style={styles.logoutBtn} onClick={handleLogout}>
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    backgroundColor: "white",
    borderBottom: "1px solid #e5e5e5",
    padding: "12px 0",
    position: "sticky",
    top: 0,
    zIndex: 100,
  },
  container: {
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "0 24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "24px",
  },
  left: {
    minWidth: "200px",
  },
  logo: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#333",
    cursor: "pointer",
  },
  center: {
    flex: 1,
    maxWidth: "600px",
  },
  searchBox: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    backgroundColor: "#f5f5f5",
    padding: "12px 16px",
    borderRadius: "8px",
    border: "1px solid #e5e5e5",
  },
  searchInput: {
    flex: 1,
    border: "none",
    backgroundColor: "transparent",
    fontSize: "14px",
    color: "#333",
  },
  right: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  createBtn: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    backgroundColor: "#0066cc",
    color: "white",
    padding: "10px 20px",
    borderRadius: "6px",
    fontSize: "14px",
    fontWeight: "600",
  },
  userMenu: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "8px 16px",
    backgroundColor: "#f5f5f5",
    borderRadius: "6px",
  },
  userName: {
    fontSize: "14px",
    fontWeight: "500",
    color: "#333",
  },
  logoutBtn: {
    padding: "10px",
    backgroundColor: "#fee",
    color: "#c33",
    borderRadius: "6px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};

export default Navbar;
