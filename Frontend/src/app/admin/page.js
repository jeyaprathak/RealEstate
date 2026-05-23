"use client";

import { useEffect, useState } from "react";
import { getDashboardData } from "../../services/api";
import AdminProtected from "@/components/AdminProtected";
import AdminSidebar from "@/components/AdminSidebar";
import AnalyticsChart from "@/components/AnalyticsChart";
import { FaBuilding, FaClock, FaEnvelope, FaUsers } from "react-icons/fa";

export default function AdminPage() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    setLoading(true);
    try {
      const { data } = await getDashboardData();
      setDashboard(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    {
      title: "Total Users",
      value: dashboard?.totalUsers || 0,
      icon: FaUsers,
      color: "text-violet-400",
      bg: "bg-violet-500/10",
      border: "border-violet-500/20",
    },
    {
      title: "Total Properties",
      value: dashboard?.totalProperties || 0,
      icon: FaBuilding,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20",
    },
    {
      title: "Pending Approvals",
      value: dashboard?.pendingProperties || 0,
      icon: FaClock,
      color: "text-amber-400",
      bg: "bg-amber-500/10",
      border: "border-amber-500/20",
    },
    {
      title: "Total Inquiries",
      value: dashboard?.totalInquiries || 0,
      icon: FaEnvelope,
      color: "text-sky-400",
      bg: "bg-sky-500/10",
      border: "border-sky-500/20",
    },
  ];

  return (
    <AdminProtected>
      <div className="flex min-h-screen bg-[#060609]">
        <AdminSidebar />

        <div className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-emerald-400 to-violet-400 bg-clip-text text-transparent">
                Admin Dashboard
              </h1>
              <p className="text-gray-500 text-sm mt-1">Here's what's happening on your platform</p>
            </div>

            {/* Stats Grid */}
            {loading ? (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="bg-[#16181f] rounded-2xl p-5 animate-pulse border border-gray-800/60">
                    <div className="h-3 bg-gray-800 rounded w-1/2 mb-4"></div>
                    <div className="h-7 bg-gray-800 rounded w-1/3"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className={`bg-[#16181f] rounded-2xl p-5 border ${stat.border} hover:scale-105 transition-transform duration-300`}
                  >
                    <div className={`w-10 h-10 ${stat.bg} rounded-xl flex items-center justify-center mb-4`}>
                      <stat.icon className={`text-base ${stat.color}`} />
                    </div>
                    <p className="text-gray-500 text-xs mb-1">{stat.title}</p>
                    <p className={`text-2xl font-bold ${stat.color}`}>{stat.value.toLocaleString()}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Analytics Chart */}
            {!loading && dashboard && <AnalyticsChart dashboard={dashboard} />}
          </div>
        </div>
      </div>
    </AdminProtected>
  );
}