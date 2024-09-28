"use client";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { Property } from "@/types/type"; // Assuming you have a Property type defined

type CartContextType = {
  cart: Property[];
  addToCart: (property: Property) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const getCartFromLocalStorage = (): Property[] => {
  if (typeof window !== "undefined") {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  }
  return [];
};

const saveCartToLocalStorage = (cart: Property[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<Property[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  const addToCart = (property: Property) => {
    if (property) {
      setCart((prev) => {
        const existingProperty = prev.find((item) => item.id === property.id);
        if (existingProperty) {
          return prev.map((item) =>
            item.id === property.id
              ? {
                  ...item,
                  productQuantity:
                    item.productQuantity && item.productQuantity < item.quantity
                      ? item.productQuantity + 1
                      : item.productQuantity,
                }
              : item
          );
        }
        return [...prev, { ...property, productQuantity: 1 }];
      });
    }
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, productQuantity: quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCart = getCartFromLocalStorage();
      setCart(storedCart);
      setIsMounted(true);
      // Set this to true after mounting
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      saveCartToLocalStorage(cart);
    }
  }, [cart, isMounted]);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
