import React from "react";
// import { useCart } from "../context/CartContext";
import { Property } from "@/types/type";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

const PropertyCard: React.FC<Property> = ({
  id,
  title,
  description,
  price,
  image,
  location,
  bedrooms,
  amenities,
  availability,
  quantity,
}) => {
  const { addToCart } = useCart(); // Access the cart context

  const handleBookNow = (property: Property) => {
    addToCart({ ...property });
    alert("added to cart");
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="relative w-full aspect-[7/5]">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover rounded-sm"
          loading="lazy"
        />
      </div>

      <div className="p-4">
        <h2 className="font-bold text-xl">{title}</h2>
        <p className="text-gray-700">{description}</p>
        <div className="flex justify-between items-center mt-2">
          <p className="text-lg font-semibold">₹{price}/night</p>
          <p className="text-sm text-gray-500">{bedrooms} Bedrooms</p>
        </div>
        <p className="text-sm text-gray-700 mt-1 font-bold">
          Location: {location}
        </p>
        {/* <div className="mt-2">
          <h3 className="font-semibold">Amenities:</h3>
          <ul className="list-disc list-inside text-sm text-gray-600">
            {amenities.map((amenity, index) => (
              <li key={index}>{amenity}</li>
            ))}
          </ul>
        </div> */}
        <button
          onClick={() =>
            handleBookNow({
              id,
              title,
              description,
              price,
              image,
              location,
              bedrooms,
              amenities,
              availability,
              quantity,
            })
          }
          className="bg-teal-600  hover:bg-teal-500 text-white rounded py-2 px-4 mt-4"
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default PropertyCard;
