import { useState } from "react";

function Sidebar({ filters, onFilterChange }) {
  const [priceRange, setPriceRange] = useState(
    filters.priceRange || [0, 1000000000]
  );
  const [mileageRange, setMileageRange] = useState(
    filters.mileageRange || [0, 500000]
  );

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
    <aside className="w-fit bg-white border-r border-gray-200 p-6 h-[calc(100vh-64px)] overflow-y-auto sticky top-16">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-gray-800">Filter</h3>
        <button
          onClick={handleReset}
          className="text-sm text-blue-600 hover:text-blue-700 font-medium px-3 py-1.5 rounded hover:bg-blue-50 transition-colors"
        >
          Reset
        </button>
      </div>

      {/* Harga */}
      <div className="mb-8 pb-6 border-b border-gray-200">
        <h4 className="text-base font-semibold text-gray-800 mb-4">Harga</h4>
        <div className="flex items-center gap-2 mb-2">
          <input
            type="number"
            placeholder="Min"
            value={priceRange[0]}
            onChange={(e) => handlePriceChange(0, e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none"
          />
          <span className="text-gray-500">-</span>
          <input
            type="number"
            placeholder="Max"
            value={priceRange[1]}
            onChange={(e) => handlePriceChange(1, e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none"
          />
        </div>
        <div className="flex justify-between text-xs text-gray-600">
          <span>Rp {priceRange[0].toLocaleString()}</span>
          <span>Rp {priceRange[1].toLocaleString()}</span>
        </div>
      </div>

      {/* Kilometer */}
      <div className="mb-8 pb-6 border-b border-gray-200">
        <h4 className="text-base font-semibold text-gray-800 mb-4">
          Kilometer
        </h4>
        <div className="flex items-center gap-2 mb-2">
          <input
            type="number"
            placeholder="Min"
            value={mileageRange[0]}
            onChange={(e) => handleMileageChange(0, e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none"
          />
          <span className="text-gray-500">-</span>
          <input
            type="number"
            placeholder="Max"
            value={mileageRange[1]}
            onChange={(e) => handleMileageChange(1, e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none"
          />
        </div>
        <div className="flex justify-between text-xs text-gray-600">
          <span>{mileageRange[0].toLocaleString()} km</span>
          <span>{mileageRange[1].toLocaleString()} km</span>
        </div>
      </div>

      {/* Brand */}
      <div className="mb-8">
        <h4 className="text-base font-semibold text-gray-800 mb-4">Brand</h4>
        <div className="flex flex-col gap-3">
          {brands.map((brand) => (
            <label
              key={brand}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={(filters.brands || []).includes(brand)}
                onChange={() => handleBrandChange(brand)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
              />
              <span className="text-sm text-gray-700 group-hover:text-gray-900">
                {brand}
              </span>
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
