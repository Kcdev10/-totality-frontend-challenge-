// /components/Filter.tsx
import { FilterProps } from "@/types/type";
import { useState } from "react";

// Define the type for the filter options

const amenitiesOptions = ["WiFi", "Air Conditioning", "Parking", "Pool"];

const Filter: React.FC<FilterProps> = ({ onFilter, onClearFilters }) => {
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState([500, 100000]);
  const [bedrooms, setBedrooms] = useState<number | "">("");
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  const handleFilterChange = () => {
    onFilter({ location, priceRange, bedrooms, amenities: selectedAmenities });
  };

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((item) => item !== amenity)
        : [...prev, amenity]
    );
  };

  const handleClearFilters = () => {
    setLocation("");
    setPriceRange([500, 100000]);
    setBedrooms("");
    setSelectedAmenities([]);
    onClearFilters(); // Call the parent function to clear filters
  };

  return (
    <div className="bg-white w-full">
      <h2 className="text-lg font-semibold mb-4">Filter Properties</h2>

      <div className="space-y-4">
        {/* Location Input */}
        <div>
          <label className="block text-sm text-gray-700 mb-1 font-bold">
            Location
          </label>
          <input
            type="text"
            placeholder="Enter location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-1 focus:border-teal-500 w-full"
          />
        </div>

        {/* Price Range Inputs */}
        <div className="flex gap-4">
          {/* Min Price Input */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">
              Min Price
            </label>
            <input
              type="number"
              placeholder="1000"
              min={1000}
              value={priceRange[0]}
              onChange={(e) =>
                setPriceRange([Number(e.target.value), priceRange[1]])
              }
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-1 focus:border-teal-500 w-full"
            />
          </div>

          {/* Max Price Input */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">
              Max Price
            </label>
            <input
              type="number"
              placeholder=""
              value={priceRange[1]}
              onChange={(e) =>
                setPriceRange([priceRange[0], Number(e.target.value)])
              }
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-1 focus:border-teal-500 w-full"
            />
          </div>
        </div>

        {/* Bedrooms Input */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">
            Bedrooms
          </label>
          <input
            type="number"
            placeholder="Number of bedrooms"
            value={bedrooms}
            onChange={(e) =>
              setBedrooms(e.target.value === "" ? "" : Number(e.target.value))
            }
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-1 focus:border-teal-500 w-full"
          />
        </div>

        {/* Amenities Checkboxes */}
        <div>
          <h3 className="text-sm font-bold text-gray-700 mb-1">Amenities</h3>
          <div className="flex flex-wrap gap-2">
            {amenitiesOptions.map((amenity) => (
              <label key={amenity} className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedAmenities.includes(amenity)}
                  onChange={() => toggleAmenity(amenity)}
                  className="mr-2"
                />
                {amenity}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Filter Button */}
      <button
        onClick={handleFilterChange}
        className="mt-6 bg-teal-600  hover:bg-teal-500 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 w-full"
      >
        Apply Filters
      </button>

      {/* Clear Filters Button */}
      <button
        onClick={handleClearFilters}
        className="mt-2 bg-gray-300 hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-lg transition duration-200 w-full"
      >
        Clear Filters
      </button>
    </div>
  );
};

export default Filter;
