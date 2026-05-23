"use client";

import { useEffect, useState } from "react";
import { getAllInquiries, deleteInquiry } from "@/services/api";
import AdminProtected from "@/components/AdminProtected";
import AdminSidebar from "@/components/AdminSidebar";
import { FaTrash, FaEnvelope, FaUser, FaBuilding, FaSearch } from "react-icons/fa";

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  const [selectedInquiry, setSelectedInquiry] = useState(null);

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const { data } = await getAllInquiries();
      setInquiries(data.inquiries);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setDeletingId(id);
    try {
      await deleteInquiry(id);
      setInquiries(inquiries.filter(item => item.id !== id));
      if (selectedInquiry?.id === id) setSelectedInquiry(null);
    } catch (error) {
      console.log(error);
      alert("Failed to delete inquiry");
    } finally {
      setDeletingId(null);
    }
  };

  const filteredInquiries = inquiries.filter(item =>
    item.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
    item.property?.title?.toLowerCase().includes(search.toLowerCase()) ||
    item.message?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminProtected>
      <div className="flex min-h-screen bg-darker">
        <AdminSidebar />
        
        <div className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Customer Inquiries
              </h1>
              <p className="text-gray-400 mt-2">Manage and respond to customer inquiries</p>
            </div>

            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative max-w-md">
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search by user, property or message..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-card border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-primary focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
              <div className="bg-card rounded-xl p-4 border border-primary/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <FaEnvelope className="text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">{inquiries.length}</p>
                    <p className="text-xs text-gray-400">Total Inquiries</p>
                  </div>
                </div>
              </div>
              <div className="bg-card rounded-xl p-4 border border-primary/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-500/10 rounded-full flex items-center justify-center">
                    <FaUser className="text-green-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">
                      {new Set(inquiries.map(i => i.user?.id)).size}
                    </p>
                    <p className="text-xs text-gray-400">Unique Users</p>
                  </div>
                </div>
              </div>
              <div className="bg-card rounded-xl p-4 border border-primary/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-amber-500/10 rounded-full flex items-center justify-center">
                    <FaBuilding className="text-amber-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">
                      {new Set(inquiries.map(i => i.property?.id)).size}
                    </p>
                    <p className="text-xs text-gray-400">Properties</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Inquiries Grid */}
            {loading ? (
              <div className="space-y-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="bg-card rounded-xl p-6 animate-pulse">
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <div className="h-4 bg-gray-700 rounded w-32"></div>
                        <div className="h-3 bg-gray-700 rounded w-24"></div>
                      </div>
                      <div className="h-8 w-20 bg-gray-700 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredInquiries.length === 0 ? (
              <div className="text-center py-16 bg-card rounded-2xl">
                <div className="text-6xl mb-4">📧</div>
                <h3 className="text-xl font-semibold mb-2">No inquiries found</h3>
                <p className="text-gray-400">No customer inquiries to display</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredInquiries.map((item) => (
                  <div
                    key={item.id}
                    className={`bg-card rounded-2xl border transition-all cursor-pointer hover:border-primary/50 ${
                      selectedInquiry?.id === item.id
                        ? "border-primary shadow-lg shadow-primary/10"
                        : "border-gray-700"
                    }`}
                    onClick={() => setSelectedInquiry(selectedInquiry?.id === item.id ? null : item)}
                  >
                    <div className="p-5">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                            <FaUser className="text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-white">{item.user?.name || "Unknown User"}</h3>
                            <p className="text-xs text-gray-500">{item.user?.email}</p>
                          </div>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(item.id);
                          }}
                          disabled={deletingId === item.id}
                          className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all disabled:opacity-50"
                        >
                          {deletingId === item.id ? (
                            <div className="w-4 h-4 border-2 border-red-400 border-t-transparent rounded-full animate-spin"></div>
                          ) : (
                            <FaTrash />
                          )}
                        </button>
                      </div>

                      <div className="mb-3">
                        <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                          <FaBuilding className="text-primary" />
                          <span>Property: </span>
                          <span className="text-white font-medium">{item.property?.title || "Unknown"}</span>
                        </div>
                        <p className="text-gray-400 text-sm">
                          <span className="text-gray-500">City:</span> {item.property?.city || "Unknown"}
                        </p>
                      </div>

                      <div className="bg-gray-800/50 rounded-xl p-4">
                        <p className="text-gray-300 text-sm leading-relaxed">
                          {item.message}
                        </p>
                      </div>

                      <div className="mt-3 text-right">
                        <p className="text-xs text-gray-500">
                          {new Date(item.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminProtected>
  );
}