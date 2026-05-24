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
  const [filteredProperties, setFilteredProperties] = useState([]);

  const [loading, setLoading] = useState(true);

  // Search
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("");

  // Filters
  const [budget, setBudget] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [bedrooms, setBedrooms] = useState("");

  // Sorting
  const [sortBy, setSortBy] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);

  const propertiesPerPage = 6;

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    setLoading(true);

    try {
      const { data } = await getProperties();

      setProperties(data.properties || []);
      setFilteredProperties(data.properties || []);

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // FILTERING
  useEffect(() => {

    let updated = [...properties];

    // Search by title
    if (search.trim()) {
      updated = updated.filter((item) =>
        item.title
          ?.toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    // Search by city
    if (city.trim()) {
      updated = updated.filter((item) =>
        item.city
          ?.toLowerCase()
          .includes(city.toLowerCase())
      );
    }

    // Budget Filter
    if (budget) {
      updated = updated.filter(
        (item) =>
          Number(item.price) <= Number(budget)
      );
    }

    // Property Type Filter
    if (propertyType) {
      updated = updated.filter(
        (item) =>
          item.propertyType &&
          item.propertyType.toLowerCase() ===
            propertyType.toLowerCase()
      );
    }

    // Bedrooms Filter
    if (bedrooms) {
      updated = updated.filter(
        (item) =>
          Number(item.bedrooms) === Number(bedrooms)
      );
    }

    // Sorting
    if (sortBy === "low-high") {
      updated = [...updated].sort(
        (a, b) =>
          Number(a.price) - Number(b.price)
      );
    }

    if (sortBy === "high-low") {
      updated = [...updated].sort(
        (a, b) =>
          Number(b.price) - Number(a.price)
      );
    }

    setFilteredProperties(updated);

    setCurrentPage(1);

  }, [
    search,
    city,
    budget,
    propertyType,
    bedrooms,
    sortBy,
    properties,
  ]);

  // PAGINATION
  const indexOfLastProperty =
    currentPage * propertiesPerPage;

  const indexOfFirstProperty =
    indexOfLastProperty - propertiesPerPage;

  const currentProperties =
    filteredProperties.slice(
      indexOfFirstProperty,
      indexOfLastProperty
    );

  const totalPages = Math.ceil(
    filteredProperties.length /
      propertiesPerPage
  );

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-b from-secondary to-darker">

        {/* HERO */}
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

          {/* FILTERS */}
          <div className="grid md:grid-cols-3 gap-4 mb-10">

            {/* SEARCH */}
            <div className="relative">

              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />

              <input
                type="text"
                placeholder="Search property..."
                className="w-full pl-12 pr-4 py-3 bg-card border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-primary focus:ring-2 focus:ring-primary/50 transition-all"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />
            </div>

            {/* CITY */}
            <div className="relative">

              <FaMapMarkerAlt className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />

              <input
                type="text"
                placeholder="Search city..."
                className="w-full pl-12 pr-4 py-3 bg-card border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-primary focus:ring-2 focus:ring-primary/50 transition-all"
                value={city}
                onChange={(e) =>
                  setCity(e.target.value)
                }
              />
            </div>

            {/* BUDGET */}
            <input
              type="number"
              placeholder="Max Budget"
              className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-primary focus:ring-2 focus:ring-primary/50 transition-all"
              value={budget}
              onChange={(e) =>
                setBudget(e.target.value)
              }
            />

            {/* PROPERTY TYPE */}
            <select
              className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-700 rounded-xl text-white appearance-none focus:border-primary focus:ring-2 focus:ring-primary/50 transition-all"
              value={propertyType}
              onChange={(e) =>
                setPropertyType(e.target.value)
              }
            >

              <option
                value=""
                className="bg-[#1a1a1a] text-white"
              >
                All Types
              </option>

              <option
                value="Apartment"
                className="bg-[#1a1a1a] text-white"
              >
                Apartment
              </option>

              <option
                value="Villa"
                className="bg-[#1a1a1a] text-white"
              >
                Villa
              </option>

              <option
                value="House"
                className="bg-[#1a1a1a] text-white"
              >
                House
              </option>

            </select>

            {/* BEDROOMS */}
            <select
              className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-700 rounded-xl text-white appearance-none focus:border-primary focus:ring-2 focus:ring-primary/50 transition-all"
              value={bedrooms}
              onChange={(e) =>
                setBedrooms(e.target.value)
              }
            >

              <option
                value=""
                className="bg-[#1a1a1a] text-white"
              >
                Bedrooms
              </option>

              <option
                value="1"
                className="bg-[#1a1a1a] text-white"
              >
                1 BHK
              </option>

              <option
                value="2"
                className="bg-[#1a1a1a] text-white"
              >
                2 BHK
              </option>

              <option
                value="3"
                className="bg-[#1a1a1a] text-white"
              >
                3 BHK
              </option>

              <option
                value="4"
                className="bg-[#1a1a1a] text-white"
              >
                4 BHK
              </option>

            </select>

            {/* SORTING */}
            <select
              className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-700 rounded-xl text-white appearance-none focus:border-primary focus:ring-2 focus:ring-primary/50 transition-all"
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value)
              }
            >

              <option
                value=""
                className="bg-[#1a1a1a] text-white"
              >
                Sort By
              </option>

              <option
                value="low-high"
                className="bg-[#1a1a1a] text-white"
              >
                Price: Low to High
              </option>

              <option
                value="high-low"
                className="bg-[#1a1a1a] text-white"
              >
                Price: High to Low
              </option>

            </select>

          </div>

          {/* RESULTS COUNT */}
          <div className="mb-6">

            <p className="text-gray-400">
              Found{" "}

              <span className="text-primary font-semibold">
                {filteredProperties.length}
              </span>{" "}

              properties
            </p>

          </div>

          {/* GRID */}
          {loading ? (

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

              {[...Array(6)].map((_, i) => (
                <LoadingSkeleton key={i} />
              ))}

            </div>

          ) : currentProperties.length === 0 ? (

            <div className="text-center py-20">

              <div className="text-6xl mb-4">
                🔍
              </div>

              <h3 className="text-2xl font-semibold mb-2">
                No properties found
              </h3>

              <p className="text-gray-400">
                Try adjusting your search criteria
              </p>

            </div>

          ) : (

            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                {currentProperties.map((property) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                  />
                ))}

              </div>

              {/* PAGINATION */}
              <div className="flex justify-center gap-3 mt-10 flex-wrap">

                {[...Array(totalPages)].map(
                  (_, index) => (
                    <button
                      key={index}
                      onClick={() =>
                        setCurrentPage(index + 1)
                      }
                      className={`px-4 py-2 rounded-lg transition-all ${
                        currentPage === index + 1
                          ? "bg-primary text-white"
                          : "bg-gray-700 text-white hover:bg-gray-600"
                      }`}
                    >
                      {index + 1}
                    </button>
                  )
                )}

              </div>
            </>
          )}

        </div>
      </div>

      <Footer />
    </>
  );
}