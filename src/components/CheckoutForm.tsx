import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import { FaCheckDouble } from "react-icons/fa6";

const Checkout = () => {
  const [isDetailsEmpty, setIsDetailsEmpty] = useState(true);
  const [isConfirm, setIsConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const { cart, clearCart } = useCart(); // Get the cart data
  const bookedProperties = cart; // Parse the cart data

  const totalCost = bookedProperties.reduce((acc, property) => {
    return acc + property.price * (property.productQuantity || 0);
  }, 0);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zip: "",
    cardNumber: "",
    expirationDate: "",
    cvv: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (
      formData.name &&
      formData.phone &&
      formData.address &&
      formData.city &&
      formData.email &&
      formData.cardNumber &&
      formData.zip &&
      formData.expirationDate &&
      formData.cvv &&
      formData.address
    ) {
      setIsDetailsEmpty(false);
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckout = () => {
    // Implement the checkout logic here (payment processing, etc.)
    setLoading(true);
    setTimeout(() => {
      setIsConfirm(true);
      clearCart();
      setLoading(false);
    }, 3000);
  };

  return (
    <>
      {isConfirm ? (
        <div className="flex flex-col gap-2 justify-center items-center min-h-[calc(100vh-60px)]">
          <h2 className="text-gray-800 font-bold md:text-4xl text-xl capitalize">
            Order Confirm
          </h2>
          <div className="md:w-80 w-60 md:h-80 h-60 rounded-full bg-green-600 flex justify-center items-center">
            <FaCheckDouble className="text-[8rem] text-white" />
          </div>
        </div>
      ) : (
        <div className="container mx-auto p-4 max-w-lg">
          <h2 className="text-3xl font-bold mb-6 text-center">Checkout</h2>

          {/* Display booked properties and total cost */}
          <div className="bg-white shadow-md p-6 rounded-lg mb-6">
            <h3 className="text-xl font-semibold mb-4">Booked Properties</h3>
            <ul className="space-y-2">
              {bookedProperties.map((property) => (
                <li
                  key={property.id}
                  className="flex justify-between text-gray-700"
                >
                  <span>{property.title}</span>
                  <span>
                    {property.productQuantity} x ₹{property.price.toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>
            <div className="font-bold mt-4 text-xl">
              Total: ₹{totalCost.toFixed(2)}
            </div>
          </div>

          {/* User Details */}
          <div className="bg-white shadow-md p-6 rounded-lg mb-6">
            <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
            <div className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none"
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none"
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none"
              />
              <div className="flex space-x-4">
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none"
                />
                <input
                  type="text"
                  name="zip"
                  placeholder="ZIP Code"
                  value={formData.zip}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Payment Details */}
          <div className="bg-white shadow-md p-6 rounded-lg mb-6">
            <h3 className="text-xl font-semibold mb-4">Payment Details</h3>
            <div className="space-y-4">
              <input
                type="text"
                name="cardNumber"
                placeholder="Card Number"
                value={formData.cardNumber}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none"
              />
              <div className="flex space-x-4">
                <input
                  type="text"
                  name="expirationDate"
                  placeholder="MM/YY"
                  value={formData.expirationDate}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none"
                />
                <input
                  type="text"
                  name="cvv"
                  placeholder="CVV"
                  value={formData.cvv}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Confirm Checkout Button */}
          <button
            className={`w-full ${
              isDetailsEmpty ? "bg-gray-300" : "bg-teal-500"
            }   text-white py-3 px-4 rounded-lg mt-6 transition`}
            onClick={handleCheckout}
            disabled={isDetailsEmpty}
          >
            {loading ? "Please wait...." : "Confirm Checkout"}
          </button>
        </div>
      )}
    </>
  );
};

export default Checkout;
