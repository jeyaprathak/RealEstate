"use client";

import { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function FavoriteButton({ property }) {
  const [saved, setSaved] = useState(false);
  const [animate, setAnimate] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      const exists = favorites.find((item) => item.id === property.id);
      if (exists) {
        setSaved(true);
      }
    }
  }, [property.id]);

  const toggleFavorite = () => {
    const token = localStorage.getItem("token");
    
    if (!token) {
      toast((t) => (
        <div className="flex flex-col gap-2">
          <p>Please login to save favorites</p>
          <button
            onClick={() => {
              toast.dismiss(t.id);
              router.push("/login");
            }}
            className="px-3 py-1 bg-cyan-500 rounded-lg text-sm"
          >
            Login Now
          </button>
        </div>
      ), { duration: 5000 });
      return;
    }

    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (saved) {
      favorites = favorites.filter((item) => item.id !== property.id);
      setSaved(false);
      toast.success("Removed from favorites");
    } else {
      favorites.push(property);
      setSaved(true);
      setAnimate(true);
      toast.success("Added to favorites!");
      setTimeout(() => setAnimate(false), 300);
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
  };

  return (
    <button
      onClick={toggleFavorite}
      className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
        saved
          ? "bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg shadow-red-500/20"
          : "glass-card text-gray-300 hover:text-white hover:border-red-500/50"
      } ${animate ? "scale-110" : "scale-100"}`}
    >
      {saved ? (
        <>
          <FaHeart className="animate-pulse" />
          <span>Saved to Favorites</span>
        </>
      ) : (
        <>
          <FaRegHeart />
          <span>Save Property</span>
        </>
      )}
    </button>
  );
}