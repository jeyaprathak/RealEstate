"use client";

import Link from "next/link";
import { FaSearch, FaArrowRight, FaShieldAlt, FaClock, FaUsers } from "react-icons/fa";
import { useState } from "react";

export default function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-slate-900/50 to-cyan-900/20"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fadeInUp">
          <span className="inline-block px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-sm font-semibold mb-6">
            ✨ Premium Real Estate Platform
          </span>
        </div>
        
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 animate-fadeInUp">
          <span className="gradient-text">
            Discover Your
          </span>
          <br />
          <span className="text-white">Dream Property Today</span>
        </h1>
        
        <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto mb-10 animate-fadeInUp">
          Experience luxury living with our premium collection of homes, apartments, and investment properties across India
        </p>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12 animate-fadeInUp">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-cyan-400" />
              <input
                type="text"
                placeholder="Search by city, property type..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl glass-card text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/50 transition-all outline-none"
              />
            </div>
            <Link
              href={searchQuery ? `/properties?search=${searchQuery}` : "/properties"}
              className="btn-primary px-8 py-4 rounded-xl font-semibold text-white flex items-center justify-center gap-2 group"
            >
              <span>Explore Now</span>
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto animate-fadeInUp">
          <div className="glass-card p-6 text-center">
            <div className="text-3xl font-bold text-cyan-400">500+</div>
            <div className="text-gray-400 mt-1">Premium Properties</div>
          </div>
          <div className="glass-card p-6 text-center">
            <div className="text-3xl font-bold text-cyan-400">200+</div>
            <div className="text-gray-400 mt-1">Happy Clients</div>
          </div>
          <div className="glass-card p-6 text-center">
            <div className="text-3xl font-bold text-cyan-400">50+</div>
            <div className="text-gray-400 mt-1">Cities Covered</div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-6 mt-12 animate-fadeIn">
          <div className="flex items-center gap-2 text-gray-400">
            <FaShieldAlt className="text-cyan-400" />
            <span className="text-sm">Verified Listings</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <FaClock className="text-cyan-400" />
            <span className="text-sm">24/7 Support</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <FaUsers className="text-cyan-400" />
            <span className="text-sm">Trusted by 1000+</span>
          </div>
        </div>
      </div>
    </section>
  );
}