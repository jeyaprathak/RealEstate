"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/NavBar";
import PropertyCard from "@/components/Propertycard";
import LoadingSkeleton from "@/components/LoadingSpinner";
import { getProperties } from "@/services/api";
import { useEffect, useState } from "react";
import { FaSearch, FaMapMarkerAlt } from "react-icons/fa";

export default function PropertiesPage() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("");

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    setLoading(true);
    try {
      const { data } = await getProperties();
      setProperties(data.properties);
      setFilteredProperties(data.properties);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let updated = [...properties];
    
    if (search) {
      updated = updated.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    if (city) {
      updated = updated.filter((item) =>
        item.city.toLowerCase().includes(city.toLowerCase())
      );
    }
    
    setFilteredProperties(updated);
  }, [search, city, properties]);

  return (
    <>
      <Navbar />
      
      <div className="min-h-screen bg-gradient-to-b from-secondary to-darker">
        {/* Hero Banner */}
        <div className="relative bg-gradient-to-r from-primary/20 to-secondary py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Find Your Dream Property
              </span>
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Explore our curated collection of premium properties
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Search Filters */}
          <div className="grid md:grid-cols-2 gap-4 mb-10">
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Search by property name..."
                className="w-full pl-12 pr-4 py-3 bg-card border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-primary focus:ring-2 focus:ring-primary/50 transition-all"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            
            <div className="relative">
              <FaMapMarkerAlt className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Search by city..."
                className="w-full pl-12 pr-4 py-3 bg-card border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-primary focus:ring-2 focus:ring-primary/50 transition-all"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-gray-400">
              Found <span className="text-primary font-semibold">{filteredProperties.length}</span> properties
            </p>
          </div>

          {/* Properties Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <LoadingSkeleton key={i} />
              ))}
            </div>
          ) : filteredProperties.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-semibold mb-2">No properties found</h3>
              <p className="text-gray-400">Try adjusting your search criteria</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProperties.map((property) => (
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