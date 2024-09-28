export interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  register: (form: User) => void;
  login: (email: string, password: string) => void;
  logout: () => void;
}

export interface CartContextType {
  cart: Property[];
  addToCart: (property: Property) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
}

export interface User {
  username: string;
  email: string;
  password: string;
  avatar?: string | null;
}

export interface Property {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  location: string;
  bedrooms: number;
  amenities: string[];
  availability: boolean;
  quantity: number;
  productQuantity?: number;
}

export interface PropertyListProps {
  properties: Property[];
}

export interface Filters {
  location: string;
  priceRange: number[];
}

export interface FilterProps {
  onFilter: (filters: {
    location: string;
    priceRange: number[];
    bedrooms: number | "";
    amenities: string[];
  }) => void;

  onClearFilters: () => void;
}
