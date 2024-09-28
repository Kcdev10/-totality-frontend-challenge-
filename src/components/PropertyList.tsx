// /components/PropertyList.tsx
"use client";
import { useState } from "react";
import PropertyCard from "./PropertyCard";
import Filter from "./Filter";
import Properties from "../data/properties.json";

const PropertyList = () => {
  const [filteredProperties, setFilteredProperties] = useState(Properties);

  const handleFilter = (filters: {
    location: string;
    priceRange: number[];
    bedrooms: number | "";
    amenities: string[];
  }) => {
    const { location, priceRange, bedrooms, amenities } = filters;
    const filtered = Properties.filter((property) => {
      const matchesLocation = location
        ? property.location.toLowerCase().includes(location.toLowerCase())
        : true;
      const matchesPrice =
        property.price >= priceRange[0] && property.price <= priceRange[1];
      const matchesBedrooms = bedrooms ? property.bedrooms >= bedrooms : true;
      const matchesAmenities =
        amenities.length > 0
          ? amenities.every((amenity) => property.amenities.includes(amenity))
          : true;

      return (
        matchesLocation && matchesPrice && matchesBedrooms && matchesAmenities
      );
    });
    setFilteredProperties(filtered);
  };

  const handleClearFilters = () => {
    // Logic to reset the property list or fetch all properties again
    setFilteredProperties(Properties); // Assuming 'Properties' contains the full list of properties
  };

  return (
    <div className="flex md:flex-row flex-col gap-5 p-3 items-start">
      <div className="lg:flex-[1] flex-[2] w-full lg:sticky top-4">
        <Filter onFilter={handleFilter} onClearFilters={handleClearFilters} />
      </div>
      <div className="flex-[4] grid lg:grid-cols-3 sm:grid-cols-2 gap-6">
        {filteredProperties.map((property) => (
          <PropertyCard key={property.id} {...property} />
        ))}
      </div>
    </div>
  );
};

export default PropertyList;
