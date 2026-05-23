"use client";

import { useEffect, useState } from "react";
import {
  getPendingProperties,
  approveProperty,
  rejectProperty,
  featureProperty
} from "@/services/api";
import AdminProtected from "@/components/AdminProtected";
import AdminSidebar from "@/components/AdminSidebar";
import { FaCheckCircle, FaTimesCircle, FaStar, FaBuilding, FaEye } from "react-icons/fa";
import Link from "next/link";

export default function ApprovalsPage() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);
  const [actionType, setActionType] = useState(null);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    setLoading(true);
    try {
      const { data } = await getPendingProperties();
      setProperties(data.properties);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    setProcessingId(id);
    setActionType("approve");
    try {
      await approveProperty(id);
      setProperties(properties.filter(p => p.id !== id));
    } catch (error) {
      console.log(error);
      alert("Failed to approve property");
    } finally {
      setProcessingId(null);
      setActionType(null);
    }
  };

  const handleReject = async (id) => {
    setProcessingId(id);
    setActionType("reject");
    try {
      await rejectProperty(id);
      setProperties(properties.filter(p => p.id !== id));
    } catch (error) {
      console.log(error);
      alert("Failed to reject property");
    } finally {
      setProcessingId(null);
      setActionType(null);
    }
  };

  const handleFeature = async (id) => {
    setProcessingId(id);
    setActionType("feature");
    try {
      await featureProperty(id);
      setProperties(properties.filter(p => p.id !== id));
    } catch (error) {
      console.log(error);
      alert("Failed to feature property");
    } finally {
      setProcessingId(null);
      setActionType(null);
    }
  };

  const stats = {
    total: properties.length,
    totalValue: properties.reduce((sum, p) => sum + (Number(p.price) || 0), 0),
    cities: new Set(properties.map(p => p.city)).size
  };

  return (
    <AdminProtected>
      <div className="flex min-h-screen bg-darker">
        <AdminSidebar />
        
        <div className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Property Approvals
              </h1>
              <p className="text-gray-400 mt-2">Review and manage pending property listings</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="bg-card rounded-xl p-5 border border-yellow-500/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-bold text-yellow-400">{stats.total}</p>
                    <p className="text-sm text-gray-400">Pending Approvals</p>
                  </div>
                  <div className="w-12 h-12 bg-yellow-500/10 rounded-full flex items-center justify-center">
                    <FaBuilding className="text-yellow-400 text-xl" />
                  </div>
                </div>
              </div>
              <div className="bg-card rounded-xl p-5 border border-primary/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-bold text-primary">{stats.cities}</p>
                    <p className="text-sm text-gray-400">Cities</p>
                  </div>
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <FaEye className="text-primary text-xl" />
                  </div>
                </div>
              </div>
              <div className="bg-card rounded-xl p-5 border border-green-500/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-bold text-green-400">
                      ₹{(stats.totalValue / 10000000).toFixed(1)}Cr
                    </p>
                    <p className="text-sm text-gray-400">Total Value</p>
                  </div>
                  <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center">
                    <FaStar className="text-green-400 text-xl" />
                  </div>
                </div>
              </div>
            </div>

            {/* Pending Properties */}
            {loading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="bg-card rounded-xl p-6 animate-pulse">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="w-full sm:w-48 h-32 bg-gray-700 rounded-xl"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-5 bg-gray-700 rounded w-1/2"></div>
                        <div className="h-4 bg-gray-700 rounded w-1/3"></div>
                        <div className="h-6 bg-gray-700 rounded w-1/4"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : properties.length === 0 ? (
              <div className="text-center py-16 bg-card rounded-2xl">
                <div className="text-6xl mb-4">✅</div>
                <h3 className="text-xl font-semibold mb-2">No pending approvals</h3>
                <p className="text-gray-400">All properties have been reviewed</p>
              </div>
            ) : (
              <div className="space-y-5">
                {properties.map((item) => (
                  <div
                    key={item.id}
                    className="bg-card rounded-2xl overflow-hidden border border-gray-700 hover:border-primary/30 transition-all"
                  >
                    <div className="flex flex-col md:flex-row">
                      {/* Image */}
                      <div className="md:w-64 h-48 md:h-auto">
                        <img
                          src={item.imageUrl || "https://images.unsplash.com/photo-1568605114967-8130f3a36994"}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      {/* Details */}
                      <div className="flex-1 p-5">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-3">
                          <div>
                            <h3 className="text-xl font-bold text-white">{item.title}</h3>
                            <p className="text-gray-400 text-sm">{item.city}</p>
                          </div>
                          <p className="text-2xl font-bold text-primary">
                            ₹{Number(item.price).toLocaleString("en-IN")}
                          </p>
                        </div>
                        
                        <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                          {item.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-3">
                          <button
                            onClick={() => handleApprove(item.id)}
                            disabled={processingId === item.id}
                            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-green-500 text-white hover:bg-green-600 transition-all disabled:opacity-50"
                          >
                            {processingId === item.id && actionType === "approve" ? (
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                              <FaCheckCircle />
                            )}
                            <span>Approve</span>
                          </button>
                          
                          <button
                            onClick={() => handleReject(item.id)}
                            disabled={processingId === item.id}
                            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600 transition-all disabled:opacity-50"
                          >
                            {processingId === item.id && actionType === "reject" ? (
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                              <FaTimesCircle />
                            )}
                            <span>Reject</span>
                          </button>
                          
                          <button
                            onClick={() => handleFeature(item.id)}
                            disabled={processingId === item.id}
                            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-amber-500 text-white hover:bg-amber-600 transition-all disabled:opacity-50"
                          >
                            {processingId === item.id && actionType === "feature" ? (
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                              <FaStar />
                            )}
                            <span>Approve & Feature</span>
                          </button>
                          
                          <Link
                            href={`/property/${item.id}`}
                            target="_blank"
                            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gray-700 text-gray-300 hover:bg-gray-600 transition-all"
                          >
                            <FaEye />
                            <span>Preview</span>
                          </Link>
                        </div>
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