"use client";
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image"; // Importing Next.js Image component
import { User } from "@/types/type"; // Import User type

const ProfileLogo = "/ProfileLogo.jpg";

const Auth = () => {
  const { register, login, user, isLoggedIn, logout } = useAuth();
  const [form, setForm] = useState<User>({
    username: "",
    email: "",
    password: "",
    avatar: null,
  });
  const [isRegistering, setIsRegistering] = useState(true);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const fileUrl = URL.createObjectURL(file);
      setForm({ ...form, avatar: fileUrl }); // Keep as File type
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isRegistering) {
      register(form);
      setIsRegistering(!isRegistering);
    } else {
      login(form.email, form.password);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        {isLoggedIn ? (
          <div className="text-center">
            <h3 className="text-2xl font-semibold mb-4">
              Welcome, {user?.username}
            </h3>
            <Image
              src={user?.avatar ? user.avatar : ProfileLogo}
              alt={`${user?.username}'s avatar`}
              className="w-24 h-24 rounded-full mx-auto mb-4"
              width={96} // Set width
              height={96} // Set height
            />
            <button
              onClick={logout}
              className="mt-4 bg-teal-600 text-white rounded-lg px-4 py-2 hover:bg-teal-700 transition duration-200"
            >
              Logout
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <h2 className="text-2xl font-semibold mb-6 text-center">
              {isRegistering ? "Register" : "Login"}
            </h2>
            {isRegistering && (
              <>
                <input
                  type="text"
                  placeholder="Username"
                  required
                  value={form.username}
                  onChange={(e) =>
                    setForm({ ...form, username: e.target.value })
                  }
                  className="mb-4 w-full border border-gray-300 rounded-lg p-2"
                />
              </>
            )}
            <input
              type="email"
              placeholder="Email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="mb-4 w-full border border-gray-300 rounded-lg p-2"
            />
            <input
              type="password"
              placeholder="Password"
              required
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="mb-4 w-full border border-gray-300 rounded-lg p-2"
            />
            {isRegistering && (
              <div>
                <label htmlFor="" className="ml-2 mb-1 inline-block font-bold">
                  Choose Profile
                </label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="mb-4 w-full border border-gray-300 rounded-lg p-2"
                />
              </div>
            )}

            {avatarPreview && (
              <Image
                src={avatarPreview}
                alt="Avatar Preview"
                className="w-24 h-24 rounded-full mx-auto mb-4 border border-gray-300"
                width={96} // Set width
                height={96} // Set height
              />
            )}

            <button
              type="submit"
              className="mb-4 bg-teal-600 text-white rounded-lg px-4 py-2 w-full hover:bg-teal-700 transition duration-200"
            >
              {isRegistering ? "Register" : "Login"}
            </button>

            <button
              type="button"
              onClick={() => setIsRegistering(!isRegistering)}
              className="text-teal-600 underline w-full"
            >
              {isRegistering
                ? "Already have an account? Login"
                : "Don't have an account? Register"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Auth;
