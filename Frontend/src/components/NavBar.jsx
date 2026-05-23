"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { 
  FaHome, 
  FaBuilding, 
  FaHeart, 
  FaUser, 
  FaSignInAlt, 
  FaUserPlus,
  FaTachometerAlt,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaSearch
} from "react-icons/fa";
import toast from "react-hot-toast";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    setRole(localStorage.getItem("role"));

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    toast.success("Logged out successfully!");
    router.push("/login");
    setIsOpen(false);
  };

  const navLinks = [
    { href: "/", label: "Home", icon: FaHome },
    { href: "/properties", label: "Properties", icon: FaBuilding },
    { href: "/favorites", label: "Favorites", icon: FaHeart },
    { href: "/profile", label: "Profile", icon: FaUser },
  ];

  const isActive = (href) => pathname === href;

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      scrolled ? "bg-slate-900/95 backdrop-blur-xl shadow-2xl" : "bg-transparent"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <Link 
            href="/" 
            className="text-2xl sm:text-3xl font-bold gradient-text hover:scale-105 transition-transform duration-300"
          >
            RealEstates
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-2 lg:gap-4">
            {navLinks.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-2 px-3 lg:px-4 py-2 rounded-xl transition-all duration-300 ${
                  isActive(href)
                    ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 border border-cyan-500/30"
                    : "text-gray-300 hover:text-cyan-400 hover:bg-white/5"
                }`}
              >
                <Icon className="text-sm" />
                <span className="text-sm lg:text-base">{label}</span>
              </Link>
            ))}
            
            {role === "ADMIN" && (
              <Link
                href="/admin"
                className={`flex items-center gap-2 px-3 lg:px-4 py-2 rounded-xl transition-all duration-300 ${
                  isActive("/admin")
                    ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 border border-cyan-500/30"
                    : "text-gray-300 hover:text-cyan-400 hover:bg-white/5"
                }`}
              >
                <FaTachometerAlt />
                <span>Dashboard</span>
              </Link>
            )}

            {!token ? (
              <div className="flex gap-3 ml-4">
                <Link
                  href="/login"
                  className="flex items-center gap-2 px-5 py-2 rounded-xl border border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-white transition-all duration-300"
                >
                  <FaSignInAlt />
                  <span>Login</span>
                </Link>
                <Link
                  href="/register"
                  className="flex items-center gap-2 px-5 py-2 rounded-xl btn-primary text-white"
                >
                  <FaUserPlus />
                  <span>Register</span>
                </Link>
              </div>
            ) : (
              <button
                onClick={logout}
                className="flex items-center gap-2 px-5 py-2 rounded-xl bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500 hover:text-white transition-all duration-300 ml-4"
              >
                <FaSignOutAlt />
                <span>Logout</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-xl bg-white/10 text-cyan-400 hover:bg-white/20 transition-all"
          >
            {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-500 overflow-hidden ${
          isOpen ? "max-h-[500px] opacity-100 py-4" : "max-h-0 opacity-0"
        }`}>
          <div className="flex flex-col gap-2 pb-4">
            {navLinks.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive(href)
                    ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 border border-cyan-500/30"
                    : "text-gray-300 hover:text-cyan-400 hover:bg-white/5"
                }`}
              >
                <Icon />
                <span>{label}</span>
              </Link>
            ))}
            
            {role === "ADMIN" && (
              <Link
                href="/admin"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:text-cyan-400 hover:bg-white/5"
              >
                <FaTachometerAlt />
                <span>Dashboard</span>
              </Link>
            )}

            {!token ? (
              <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-white/10">
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-white transition-all"
                >
                  <FaSignInAlt />
                  <span>Login</span>
                </Link>
                <Link
                  href="/register"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl btn-primary text-white"
                >
                  <FaUserPlus />
                  <span>Register</span>
                </Link>
              </div>
            ) : (
              <button
                onClick={logout}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500 hover:text-white transition-all mt-4"
              >
                <FaSignOutAlt />
                <span>Logout</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}