"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { User, AuthContextType } from "@/types/type";

// Create a context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create a provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsLoggedIn(true);
    }
  }, []);

  const register = (form: User) => {
    const userData: User = {
      ...form,
      avatar: form.avatar ? form.avatar : null,
    };
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
    alert("Register successfull");
  };

  const login = (email: string, password: string) => {
    const savedUser = JSON.parse(localStorage.getItem("user") || "{}");
    if (savedUser.email === email && savedUser.password === password) {
      setUser(savedUser);
      setIsLoggedIn(true);
    } else {
      alert("Invalid credentials");
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
