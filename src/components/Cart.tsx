"use client";
// src/components/Cart.tsx
import React from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { TbShoppingCartOff } from "react-icons/tb";
import Link from "next/link";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();

  const handleIncrement = (
    propertyId: number,
    currentQuantity: number,
    maxQuantity: number
  ) => {
    if (currentQuantity < maxQuantity) {
      updateQuantity(propertyId, currentQuantity + 1);
    }
  };

  const handleDecrement = (propertyId: number, currentQuantity: number) => {
    if (currentQuantity > 1) {
      updateQuantity(propertyId, currentQuantity - 1);
    }
  };

  const getTotalCost = () =>
    cart.reduce(
      (total, item) => total + item.price * (item.productQuantity || 0),
      0
    );

  if (cart.length === 0) {
    return (
      <div className="h-[calc(100vh-56px)] flex flex-col items-center justify-center text-center bg-white shadow-lg rounded-lg">
        <p className="text-lg font-semibold">No properties booked yet.</p>
        <p className="text-lg font-semibold">Cart is empty</p>

        <div>
          <TbShoppingCartOff className="text-[20rem] text-gray-200" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-56px)] bg-gray-50 p-6 rounded-lg shadow-lg flex md:flex-row flex-col gap-4 items-start">
      <div className="w-full flex-[4]">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Your Bookings
        </h2>

        <div className="space-y-6">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex flex-col lg:flex-row justify-between items-start lg:items-center bg-white p-6 rounded-lg shadow-md space-y-4 lg:space-y-0 lg:space-x-6"
            >
              {/* Image and Details */}
              <div className="flex items-center space-x-4">
                <div className="relative w-32 h-24 rounded-lg overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex flex-col space-y-1">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Location: {item.location}
                  </p>
                  <p className="text-sm text-gray-600">
                    Amenities: {item.amenities.join(", ")}
                  </p>
                  {/* <p className="text-sm text-gray-600">
                  Booking Dates: {item.checkInDate} to {item.checkOutDate}
                </p> */}
                  <p className="text-sm text-gray-600">₹{item.price} /night</p>
                </div>
              </div>

              {/* Quantity and Price Controls */}
              <div className="grid grid-cols-3 space-x-4 lg:ml-auto">
                <div>
                  <p className="text-lg font-semibold text-gray-800">
                    ₹{item.price * (item.productQuantity || 0)}
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    className={`${
                      (item.productQuantity as number) <= 1
                        ? "bg-gray-300/40 cursor-not-allowed"
                        : "bg-gray-300 hover:bg-gray-300"
                    } text-gray-700 w-7 h-7 rounded-full flex items-center justify-center`}
                    onClick={() =>
                      handleDecrement(item.id, item.productQuantity as number)
                    }
                    disabled={(item.productQuantity as number) <= 1}
                  >
                    –
                  </button>

                  <span className="font-medium text-lg">
                    {item.productQuantity}
                  </span>

                  <button
                    className="bg-gray-200 text-gray-700 h-7 w-7 rounded-full flex justify-center items-center"
                    // onClick={() =>
                    //   updateQuantity(item.id, Math.min(1, item.quantity + 1))
                    // }
                    onClick={() =>
                      handleIncrement(
                        item.id,
                        item.productQuantity as number,
                        item.quantity
                      )
                    }
                    disabled={(item.productQuantity as number) >= item.quantity} // Prevent incrementing beyond 1
                  >
                    +
                  </button>
                </div>

                <button
                  className="text-red-500 hover:text-red-700 ml-4"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cart Total and Clear Button */}
      <div className="w-full flex-[2] sticky top-10 bg-white shadow-md p-6 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-800">Total:</h3>
          <span className="text-2xl font-bold text-gray-900">
            ₹{getTotalCost()}
          </span>
        </div>

        {/* Additional Information */}
        <div className="space-y-2 text-gray-600">
          <div className="flex justify-between items-center">
            <p>Total Properties:</p>
            <span>{cart.length}</span>
          </div>

          <div className="flex justify-between items-center">
            <p>Estimated Taxes (10%):</p>
            <span>₹{(getTotalCost() * 0.1).toFixed(2)}</span>
          </div>

          <div className="flex justify-between items-center font-semibold text-lg text-gray-800 border-t pt-2">
            <p>Grand Total:</p>
            <span>₹{(getTotalCost() * 1.1).toFixed(2)}</span>{" "}
            {/* Total + 10% Tax */}
          </div>
        </div>

        <Link
          href={{
            pathname: "/checkout", // Adjust the path according to your file structure
            query: { cart: JSON.stringify(cart) },
          }}
          className="w-full inline-block text-center bg-green-500 text-white py-3 px-4 rounded-lg mt-6 hover:bg-green-600 transition"
          onClick={() => alert("Proceed to Checkout")}
        >
          Proceed to Checkout
        </Link>

        <button
          className="w-full bg-red-500 text-white py-3 px-4 rounded-lg mt-4 hover:bg-red-600 transition"
          onClick={clearCart}
        >
          Clear Cart
        </button>
      </div>
    </div>
  );
};

export default Cart;
