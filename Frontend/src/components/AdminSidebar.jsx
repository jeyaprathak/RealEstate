"use client";

import Link from "next/link";
import { useState } from "react";
import {
  FaBars,
  FaTachometerAlt,
  FaPlusCircle,
  FaBuilding,
  FaEnvelope,
  FaCheckCircle,
  FaTimes,
  FaSignOutAlt
} from "react-icons/fa";
import { usePathname, useRouter } from "next/navigation";

export default function AdminSidebar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    { href: "/admin", label: "Dashboard", icon: FaTachometerAlt },
    { href: "/admin/add-property", label: "Add Property", icon: FaPlusCircle },
    { href: "/admin/manage-properties", label: "Manage Properties", icon: FaBuilding },
    { href: "/admin/inquiries", label: "Inquiries", icon: FaEnvelope },
    { href: "/admin/approvals", label: "Property Approvals", icon: FaCheckCircle },
  ];

  const isActive = (href) => pathname === href;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    router.push("/login");
  };

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setOpen(!open)}
        className="lg:hidden fixed top-20 left-4 z-50 bg-emerald-500 p-2.5 rounded-xl shadow-lg shadow-emerald-500/20 text-white"
      >
        {open ? <FaTimes size={16} /> : <FaBars size={16} />}
      </button>

      {/* Sidebar */}
      <div
        className={`bg-[#0f1117] border-r border-gray-800/60 min-h-screen fixed lg:static top-0 left-0 z-40 transition-all duration-300 flex-shrink-0 ${
          open ? "w-64" : "w-0 lg:w-64 overflow-hidden"
        }`}
      >
        <div className="p-6 h-full flex flex-col">
          {/* Brand */}
          <div className="mb-8">
            <h2 className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-violet-400 bg-clip-text text-transparent">
              Admin Panel
            </h2>
            <p className="text-xs text-gray-600 mt-0.5">EliteEstates Management</p>
          </div>

          {/* Nav */}
          <nav className="flex flex-col gap-1 flex-1">
            {menuItems.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive(href)
                    ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20"
                    : "text-gray-500 hover:text-gray-200 hover:bg-gray-800/50"
                }`}
              >
                <Icon className={`text-xs flex-shrink-0 ${isActive(href) ? "text-emerald-400" : "text-gray-600"}`} />
                <span className="whitespace-nowrap">{label}</span>
              </Link>
            ))}
          </nav>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all mt-4"
          >
            <FaSignOutAlt className="text-xs" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/60 z-30 lg:hidden backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}