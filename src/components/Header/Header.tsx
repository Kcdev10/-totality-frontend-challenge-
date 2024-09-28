"use client";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import React from "react";
import { BiCart } from "react-icons/bi";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image"; // Importing Next.js Image component
import { BiLogOutCircle } from "react-icons/bi";

const ProfileLogo = "/ProfileLogo.jpg";

export default function Header() {
  const { cart } = useCart();
  const { user, isLoggedIn, logout } = useAuth();

  return (
    <header className="bg-teal-600 text-white">
      <nav className="flex justify-between items-center px-4 py-3">
        <div>
          <Link href={"/"} className="uppercase font-bold text-2xl">
            rental
          </Link>
        </div>
        <div className="flex items-center gap-4 font-medium text-lg capitalize">
          {/* <Link href={"/"}>Home</Link> */}
          {isLoggedIn ? (
            <>
              <span className="">{user?.username}</span>
              <Link href={"/"} className="relative">
                {/* Display user's avatar or a default logo if avatar is not available */}
                <Image
                  src={user?.avatar || ProfileLogo}
                  alt={`${user?.username}'s avatar`}
                  className="w-10 h-10 rounded-full"
                  width={40} // Set width
                  height={40} // Set height
                />
              </Link>
              <button onClick={logout} className="text-white" title="logout">
                <BiLogOutCircle size={22} />
              </button>
            </>
          ) : (
            <Link href={"/auth"}>Register</Link>
          )}
          <Link href={"/cart"} className="relative">
            <BiCart size={35} />
            {cart.length > 0 && (
              <span className="absolute -top-1 right-0 w-5 h-5 bg-white text-black rounded-full flex justify-center items-center text-xs font-extrabold">
                {cart.length}
              </span>
            )}
          </Link>
        </div>
      </nav>
    </header>
  );
}
