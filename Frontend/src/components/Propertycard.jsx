"use client";

import Link from "next/link";
import { FaMapMarkerAlt, FaBed, FaBath, FaArrowsAlt } from "react-icons/fa";
import { useState } from "react";

export default function PropertyCard({ property }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group bg-[#16181f] rounded-2xl overflow-hidden border border-gray-800/60 hover:border-emerald-500/30 shadow-lg hover:shadow-emerald-500/5 transition-all duration-500 hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={property.imageUrl || "https://images.unsplash.com/photo-1568605114967-8130f3a36994"}
          alt={property.title}
          className={`w-full h-full object-cover transition-transform duration-700 ${isHovered ? "scale-110" : "scale-100"}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#16181f]/80 via-transparent to-transparent"></div>

        {/* Price Badge */}
        <div className="absolute top-3 right-3 bg-[#16181f]/90 backdrop-blur-sm px-3 py-1.5 rounded-lg font-bold text-emerald-400 text-sm border border-emerald-500/20">
          ₹{Number(property.price).toLocaleString("en-IN")}
        </div>

        {/* Featured Badge */}
        {property.featured && (
          <div className="absolute top-3 left-3 bg-violet-500/90 px-2.5 py-1 rounded-lg text-xs font-semibold text-white">
            ✦ FEATURED
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-base font-semibold mb-2 line-clamp-1 text-gray-100 group-hover:text-emerald-400 transition-colors">
          {property.title}
        </h3>

        <div className="flex items-center gap-1.5 text-gray-500 mb-4">
          <FaMapMarkerAlt className="text-emerald-500 text-xs flex-shrink-0" />
          <span className="text-sm">{property.city}</span>
        </div>

        {/* Property Features */}
        <div className="flex items-center justify-between border-t border-gray-800/60 pt-3 mb-4">
          <div className="flex items-center gap-1.5 text-gray-500">
            <FaBed className="text-emerald-500/70 text-xs" />
            <span className="text-xs">3 Beds</span>
          </div>
          <div className="flex items-center gap-1.5 text-gray-500">
            <FaBath className="text-emerald-500/70 text-xs" />
            <span className="text-xs">2 Baths</span>
          </div>
          <div className="flex items-center gap-1.5 text-gray-500">
            <FaArrowsAlt className="text-emerald-500/70 text-xs" />
            <span className="text-xs">1500 sqft</span>
          </div>
        </div>

        <Link
          href={`/property/${property.id}`}
          className="block w-full text-center bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 py-2.5 rounded-xl text-sm font-semibold hover:bg-emerald-500 hover:text-white hover:border-emerald-500 transition-all duration-300"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}