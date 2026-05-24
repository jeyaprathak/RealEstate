"use client";

import { useState } from "react";
import { registerUser } from "@/services/api";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaArrowLeft, FaCheckCircle } from "react-icons/fa";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    if (!formData.name) {
      toast.error("Name is required");
      return false;
    }
    if (formData.name.length < 2) {
      toast.error("Name must be at least 2 characters");
      return false;
    }
    if (!formData.email) {
      toast.error("Email is required");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return false;
    }
    if (!formData.password) {
      toast.error("Password is required");
      return false;
    }
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    }
    if (!/(?=.*[A-Z])(?=.*[0-9])/.test(formData.password)) {
      toast.error("Password must contain at least one uppercase letter and one number");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      await registerUser(formData);
      toast.success("Registration Successful! Please login.");
      router.push("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/20 to-cyan-900/20"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Back Button */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors mb-6"
        >
          <FaArrowLeft />
          <span>Back to Home</span>
        </Link>

        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold gradient-text mb-2">
            RealEstates
          </h1>
          <p className="text-gray-400">Create your account to get started</p>
        </div>

        {/* Form Card */}
        <div className="glass-card p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">
                Full Name
              </label>
              <div className="relative">
                <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-cyan-400" />
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/50 transition-all outline-none"
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">
                Email Address
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-cyan-400" />
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/50 transition-all outline-none"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">
                Password
              </label>
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-cyan-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-12 pr-12 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/50 transition-all outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-cyan-400 transition-colors"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* Password Requirements */}
            <div className="space-y-1 text-xs">
              <p className={`flex items-center gap-1 ${formData.password.length >= 6 ? "text-green-400" : "text-gray-500"}`}>
                <FaCheckCircle className="text-[10px]" />
                <span>At least 6 characters</span>
              </p>
              <p className={`flex items-center gap-1 ${/(?=.*[A-Z])/.test(formData.password) ? "text-green-400" : "text-gray-500"}`}>
                <FaCheckCircle className="text-[10px]" />
                <span>At least one uppercase letter</span>
              </p>
              <p className={`flex items-center gap-1 ${/(?=.*[0-9])/.test(formData.password) ? "text-green-400" : "text-gray-500"}`}>
                <FaCheckCircle className="text-[10px]" />
                <span>At least one number</span>
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-3 rounded-xl font-semibold text-white transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed mt-4"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Creating account...</span>
                </div>
              ) : (
                "Register"
              )}
            </button>

            {/* Login Link */}
            <p className="text-center text-gray-400">
              Already have an account?{" "}
              <Link href="/login" className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors">
                Login here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}