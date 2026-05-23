"use client";

import { useEffect, useState } from "react";
import { getProperties, deleteProperty } from "@/services/api";

import AdminProtected from "@/components/AdminProtected";
import AdminSidebar from "@/components/AdminSidebar";

import Link from "next/link";

import {
  FaEdit,
  FaTrash,
  FaSearch,
  FaBuilding,
  FaPlus,
  FaEye,
  FaTimes
} from "react-icons/fa";

export default function ManagePropertiesPage() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  // Modal State
  const [selectedProperty, setSelectedProperty] = useState(null);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    setLoading(true);

    try {
      const { data } = await getProperties();

      setProperties(data.properties || []);
    } catch (error) {
      console.log(error);
      alert("Failed to fetch properties");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this property?"
    );

    if (!confirmDelete) return;

    setDeletingId(id);

    try {
      await deleteProperty(id);

      setProperties((prev) =>
        prev.filter((property) => property.id !== id)
      );

      alert("Property deleted successfully");
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Failed to delete property"
      );
    } finally {
      setDeletingId(null);
    }
  };

  const filteredProperties = properties.filter((property) => {
    return (
      property.title
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      property.city
        ?.toLowerCase()
        .includes(search.toLowerCase())
    );
  });

  return (
    <AdminProtected>
      <div className="flex min-h-screen bg-[#060609]">
        <AdminSidebar />

        <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
          <div className="max-w-7xl mx-auto">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-emerald-400 to-violet-400 bg-clip-text text-transparent">
                  Manage Properties
                </h1>

                <p className="text-gray-500 text-sm mt-1">
                  {properties.length} Total Properties
                </p>
              </div>

              <Link
                href="/admin/add-property"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-sm font-semibold transition-all"
              >
                <FaPlus className="text-xs" />
                Add Property
              </Link>
            </div>

            {/* Search */}
            <div className="mb-6">
              <div className="relative max-w-sm">
                <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-600 text-xs" />

                <input
                  type="text"
                  placeholder="Search by title or city..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-[#16181f] border border-gray-800 rounded-xl text-white text-sm placeholder-gray-600 focus:border-emerald-500/40 focus:outline-none transition-all"
                />
              </div>
            </div>

            {/* Loading */}
            {loading ? (
              <div className="text-center py-20 text-white">
                Loading properties...
              </div>
            ) : filteredProperties.length === 0 ? (
              <div className="text-center py-20 bg-[#16181f] rounded-2xl border border-gray-800/60">
                <FaBuilding className="text-4xl text-gray-700 mx-auto mb-3" />

                <h3 className="text-base font-semibold text-gray-400 mb-1">
                  No properties found
                </h3>

                <p className="text-sm text-gray-600">
                  Add a new property
                </p>
              </div>
            ) : (
              <div className="bg-[#16181f] rounded-2xl border border-gray-800/60 overflow-hidden">

                {/* Table Header */}
                <div className="hidden md:grid grid-cols-[2fr_1fr_1fr_auto] gap-4 px-5 py-3 bg-[#0f1117] border-b border-gray-800/60">
                  <span className="text-xs font-semibold text-gray-500 uppercase">
                    Property
                  </span>

                  <span className="text-xs font-semibold text-gray-500 uppercase">
                    City
                  </span>

                  <span className="text-xs font-semibold text-gray-500 uppercase">
                    Price
                  </span>

                  <span className="text-xs font-semibold text-gray-500 uppercase text-right">
                    Actions
                  </span>
                </div>

                {/* Rows */}
                <div className="divide-y divide-gray-800/40">
                  {filteredProperties.map((property) => (
                    <div
                      key={property.id}
                      className="flex flex-col md:grid md:grid-cols-[2fr_1fr_1fr_auto] gap-3 md:gap-4 px-5 py-4 hover:bg-gray-800/20 transition-colors"
                    >
                      {/* Property */}
                      <div className="flex items-center gap-3">
                        <img
                          src={
                            property.image ||
                            "https://images.unsplash.com/photo-1568605114967-8130f3a36994"
                          }
                          alt={property.title}
                          className="w-14 h-10 rounded-lg object-cover border border-gray-700"
                        />

                        <div>
                          <p className="text-sm font-medium text-gray-200">
                            {property.title}
                          </p>

                          <p className="text-xs text-gray-500 md:hidden">
                            {property.city}
                          </p>
                        </div>
                      </div>

                      {/* City */}
                      <div className="hidden md:flex items-center">
                        <span className="text-sm text-gray-400">
                          {property.city}
                        </span>
                      </div>

                      {/* Price */}
                      <div className="hidden md:flex items-center">
                        <span className="text-sm font-semibold text-emerald-400">
                          ₹
                          {Number(property.price).toLocaleString(
                            "en-IN"
                          )}
                        </span>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center justify-end gap-2">

                        {/* View */}
                        <button
                          onClick={() =>
                            setSelectedProperty(property)
                          }
                          className="p-2 rounded-lg bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 transition-all"
                        >
                          <FaEye className="text-xs" />
                        </button>

                        {/* Edit */}
                        <Link
                          href={`/admin/edit-property/${property.id}`}
                          className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500 hover:text-white transition-all"
                        >
                          <FaEdit className="text-xs" />
                        </Link>

                        {/* Delete */}
                        <button
                          onClick={() =>
                            handleDelete(property.id)
                          }
                          disabled={deletingId === property.id}
                          className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all disabled:opacity-50"
                        >
                          {deletingId === property.id ? (
                            <div className="w-3 h-3 border border-red-400 border-t-transparent rounded-full animate-spin"></div>
                          ) : (
                            <FaTrash className="text-xs" />
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* View Modal */}
        {selectedProperty && (
          <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">

            <div className="bg-[#16181f] w-full max-w-4xl rounded-2xl overflow-hidden border border-gray-800 relative max-h-[90vh] overflow-y-auto">

              {/* Close */}
              <button
                onClick={() => setSelectedProperty(null)}
                className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full z-10"
              >
                <FaTimes />
              </button>

              {/* Image */}
              <img
                src={
                  selectedProperty.image ||
                  "https://images.unsplash.com/photo-1568605114967-8130f3a36994"
                }
                alt={selectedProperty.title}
                className="w-full h-72 object-cover"
              />

              {/* Content */}
              <div className="p-6">

                <h2 className="text-3xl font-bold text-white mb-4">
                  {selectedProperty.title}
                </h2>

                <p className="text-gray-400 mb-6 leading-relaxed">
                  {selectedProperty.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

                  <div className="bg-[#0f1117] p-4 rounded-xl">
                    <p className="text-gray-500 text-sm mb-1">
                      City
                    </p>

                    <p className="text-white font-semibold">
                      {selectedProperty.city}
                    </p>
                  </div>

                  <div className="bg-[#0f1117] p-4 rounded-xl">
                    <p className="text-gray-500 text-sm mb-1">
                      Location
                    </p>

                    <p className="text-white font-semibold">
                      {selectedProperty.location}
                    </p>
                  </div>

                  <div className="bg-[#0f1117] p-4 rounded-xl">
                    <p className="text-gray-500 text-sm mb-1">
                      Property Type
                    </p>

                    <p className="text-white font-semibold">
                      {selectedProperty.propertyType}
                    </p>
                  </div>

                  <div className="bg-[#0f1117] p-4 rounded-xl">
                    <p className="text-gray-500 text-sm mb-1">
                      Bedrooms
                    </p>

                    <p className="text-white font-semibold">
                      {selectedProperty.bedrooms}
                    </p>
                  </div>

                  <div className="bg-[#0f1117] p-4 rounded-xl">
                    <p className="text-gray-500 text-sm mb-1">
                      Bathrooms
                    </p>

                    <p className="text-white font-semibold">
                      {selectedProperty.bathrooms}
                    </p>
                  </div>

                  <div className="bg-[#0f1117] p-4 rounded-xl">
                    <p className="text-gray-500 text-sm mb-1">
                      Price
                    </p>

                    <p className="text-emerald-400 font-bold text-lg">
                      ₹
                      {Number(
                        selectedProperty.price
                      ).toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}
      </div>
    </AdminProtected>
  );
}