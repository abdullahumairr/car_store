import { useState } from "react";

function Sidebar({ filters, onFilterChange }) {
  const [priceRange, setPriceRange] = useState(
    filters.priceRange || [0, 1000000000]
  );
  const [mileageRange, setMileageRange] = useState(
    filters.mileageRange || [0, 500000]
  );

  const locations = [
    "Jakarta Selatan",
    "Jakarta Pusat",
    "Jakarta Utara",
    "Jakarta Barat",
    "Jakarta Timur",
    "Tangerang",
    "Bekasi",
    "Depok",
    "Bogor",
  ];

  const brands = [
    "Toyota",
    "Honda",
    "Suzuki",
    "Daihatsu",
    "Mitsubishi",
    "Nissan",
    "Mazda",
    "BMW",
    "Mercedes-Benz",
    "Hyundai",
  ];

  const handlePriceChange = (index, value) => {
    const newRange = [...priceRange];
    newRange[index] = parseInt(value);
    setPriceRange(newRange);
    onFilterChange({ ...filters, priceRange: newRange });
  };

  const handleMileageChange = (index, value) => {
    const newRange = [...mileageRange];
    newRange[index] = parseInt(value);
    setMileageRange(newRange);
    onFilterChange({ ...filters, mileageRange: newRange });
  };

  const handleLocationChange = (location) => {
    const currentLocations = filters.locations || [];
    const newLocations = currentLocations.includes(location)
      ? currentLocations.filter((l) => l !== location)
      : [...currentLocations, location];
    onFilterChange({ ...filters, locations: newLocations });
  };

  const handleBrandChange = (brand) => {
    const currentBrands = filters.brands || [];
    const newBrands = currentBrands.includes(brand)
      ? currentBrands.filter((b) => b !== brand)
      : [...currentBrands, brand];
    onFilterChange({ ...filters, brands: newBrands });
  };

  const handleReset = () => {
    setPriceRange([0, 1000000000]);
    setMileageRange([0, 500000]);
    onFilterChange({
      locations: [],
      brands: [],
      priceRange: [0, 1000000000],
      mileageRange: [0, 500000],
    });
  };

  return (
    <div style={styles.sidebar}>
      <div style={styles.header}>
        <h3 style={styles.title}>Filter</h3>
        <button style={styles.resetBtn} onClick={handleReset}>
          Reset
        </button>
      </div>

      <div style={styles.section}>
        <h4 style={styles.sectionTitle}>Lokasi</h4>
        <div style={styles.checkboxList}>
          {locations.map((location) => (
            <label key={location} style={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={(filters.locations || []).includes(location)}
                onChange={() => handleLocationChange(location)}
                style={styles.checkbox}
              />
              <span style={styles.checkboxText}>{location}</span>
            </label>
          ))}
        </div>
      </div>

      <div style={styles.section}>
        <h4 style={styles.sectionTitle}>Harga</h4>
        <div style={styles.rangeInputs}>
          <input
            type="number"
            placeholder="Min"
            value={priceRange[0]}
            onChange={(e) => handlePriceChange(0, e.target.value)}
            style={styles.rangeInput}
          />
          <span>-</span>
          <input
            type="number"
            placeholder="Max"
            value={priceRange[1]}
            onChange={(e) => handlePriceChange(1, e.target.value)}
            style={styles.rangeInput}
          />
        </div>
        <div style={styles.priceLabels}>
          <span style={styles.priceLabel}>
            Rp {priceRange[0].toLocaleString()}
          </span>
          <span style={styles.priceLabel}>
            Rp {priceRange[1].toLocaleString()}
          </span>
        </div>
      </div>

      <div style={styles.section}>
        <h4 style={styles.sectionTitle}>Kilometer</h4>
        <div style={styles.rangeInputs}>
          <input
            type="number"
            placeholder="Min"
            value={mileageRange[0]}
            onChange={(e) => handleMileageChange(0, e.target.value)}
            style={styles.rangeInput}
          />
          <span>-</span>
          <input
            type="number"
            placeholder="Max"
            value={mileageRange[1]}
            onChange={(e) => handleMileageChange(1, e.target.value)}
            style={styles.rangeInput}
          />
        </div>
        <div style={styles.priceLabels}>
          <span style={styles.priceLabel}>
            {mileageRange[0].toLocaleString()} km
          </span>
          <span style={styles.priceLabel}>
            {mileageRange[1].toLocaleString()} km
          </span>
        </div>
      </div>

      <div style={styles.section}>
        <h4 style={styles.sectionTitle}>Brand</h4>
        <div style={styles.checkboxList}>
          {brands.map((brand) => (
            <label key={brand} style={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={(filters.brands || []).includes(brand)}
                onChange={() => handleBrandChange(brand)}
                style={styles.checkbox}
              />
              <span style={styles.checkboxText}>{brand}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  sidebar: {
    width: "280px",
    backgroundColor: "white",
    borderRight: "1px solid #e5e5e5",
    padding: "24px",
    height: "calc(100vh - 60px)",
    overflowY: "auto",
    position: "sticky",
    top: "60px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "24px",
  },
  title: {
    fontSize: "20px",
    fontWeight: "600",
    color: "#333",
  },
  resetBtn: {
    fontSize: "14px",
    color: "#0066cc",
    backgroundColor: "transparent",
    padding: "6px 12px",
    borderRadius: "4px",
    fontWeight: "500",
  },
  section: {
    marginBottom: "32px",
    paddingBottom: "24px",
    borderBottom: "1px solid #e5e5e5",
  },
  sectionTitle: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#333",
    marginBottom: "16px",
  },
  checkboxList: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  checkboxLabel: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer",
    fontSize: "14px",
    color: "#333",
  },
  checkbox: {
    width: "16px",
    height: "16px",
    cursor: "pointer",
  },
  checkboxText: {
    fontSize: "14px",
  },
  rangeInputs: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "8px",
  },
  rangeInput: {
    flex: 1,
    padding: "8px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "14px",
  },
  priceLabels: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "12px",
    color: "#666",
  },
  priceLabel: {
    fontSize: "12px",
    color: "#666",
  },
};

export default Sidebar;
