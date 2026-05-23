"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/NavBar";
import PropertyCard from "@/components/Propertycard";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    
    // Check if user is logged in
    if (!token) {
      const confirmLogin = window.confirm("Please login to view your favorites. Would you like to login now?");
      if (confirmLogin) {
        router.push("/login");
      } else {
        router.push("/");
      }
      return;
    }
    
    const data = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(data);
  }, [router]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-cyan-400 mb-8 text-center">
            Favorite Properties
          </h1>
          
          {favorites.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">❤️</div>
              <h3 className="text-xl font-semibold text-white mb-2">No favorites yet</h3>
              <p className="text-gray-400">Start saving properties you love!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {favorites.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}