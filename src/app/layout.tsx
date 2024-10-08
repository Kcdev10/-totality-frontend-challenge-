import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { AuthProvider } from "@/context/AuthContext";

const font = Montserrat({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "‘Totality-Frontend-Challenge'",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${font.className} antialiased`}>
        <AuthProvider>
          <CartProvider>
            <Header />
            {children}
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
