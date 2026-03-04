import { useState, useEffect, useRef } from 'react';
import { ChevronDownIcon, FunnelIcon } from '@heroicons/react/24/solid';

const categories = [
  "All",
  "Pottery & Clay Art",
  "Functional Ceramics",
  "Decorative Artworks",
  "Scented & Home Wellness Products",
  "Textile & Fiber Arts"
];
const sortOptions = [
  { label: "Price: Low to High", value: "asc" },
  { label: "Price: High to Low", value: "desc" },
];

const ProductFilters = ({
  selectedCategory,
  onCategoryChange,
  selectedSort,
  onSortChange,
  searchTerm,
  onSearchChange
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="mb-6 space-y-4" ref={dropdownRef}>
      {/* 🔍 Search Bar */}
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search products..."
        className="w-full sm:w-1/2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-black"
      />

      {/* 🧰 Filter Dropdown Button */}
      <button
        onClick={() => setIsDropdownOpen(prev => !prev)}
        className="flex items-center gap-1 px-3 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition"
      >
        <FunnelIcon className="w-5 h-5" />
        <span className="hidden sm:inline">Filter</span>
        <ChevronDownIcon className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* 🎛️ Dropdown Container */}
      {isDropdownOpen && (
        <div className="absolute z-50 mt-2 w-64 bg-white shadow-lg rounded-md p-4 space-y-4">
          {/* Category Filter */}
          <div>
            <h4 className="font-semibold mb-2">Category</h4>
            <div className="flex flex-col gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => {
                    onCategoryChange(category);
                    setIsDropdownOpen(false);
                  }}
                  className={`text-left px-3 py-1 rounded ${
                    selectedCategory === category
                      ? 'bg-black text-white'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Price Sort */}
          <div>
            <h4 className="font-semibold mb-2">Sort by Price</h4>
            <div className="flex flex-col gap-2">
              {sortOptions.map(option => (
                <button
                  key={option.value}
                  onClick={() => {
                    onSortChange(option.value);
                    setIsDropdownOpen(false);
                  }}
                  className={`text-left px-3 py-1 rounded ${
                    selectedSort === option.value
                      ? 'bg-black text-white'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductFilters;
