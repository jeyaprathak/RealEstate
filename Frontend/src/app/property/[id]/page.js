"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { createInquiry, getSingleProperty } from "@/services/api";
import Navbar from "@/components/NavBar";
import Footer from "@/components/Footer";
import FavoriteButton from "@/components/FavoriteButton";
import { FaBed, FaBath, FaArrowsAlt, FaMapMarkerAlt, FaRupeeSign, FaEnvelope, FaUser } from "react-icons/fa";
import toast from "react-hot-toast";

export default function PropertyDetails() {
  const params = useParams();
  const router = useRouter();
  const [property, setProperty] = useState(null);
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (params?.id) {
      fetchProperty();
    }
    const token = localStorage.getItem("token");
    if (token) {
      setUser({ token });
    }
  }, [params]);

  const fetchProperty = async () => {
    try {
      const { data } = await getSingleProperty(params.id);
      setProperty(data.property);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load property");
    }
  };

  const handleInquiry = async () => {
    const token = localStorage.getItem("token");
    
    if (!token) {
      toast((t) => (
        <div className="flex flex-col gap-2">
          <p>Please login to send an inquiry</p>
          <button
            onClick={() => {
              toast.dismiss(t.id);
              router.push("/login");
            }}
            className="px-3 py-1 bg-cyan-500 rounded-lg text-sm"
          >
            Login Now
          </button>
        </div>
      ), { duration: 5000 });
      return;
    }

    if (!message.trim()) {
      toast.error("Please enter a message before sending");
      return;
    }

    setSending(true);
    try {
      await createInquiry({
        propertyId: property.id,
        message
      });
      toast.success("Inquiry sent successfully!");
      setMessage("");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to send inquiry");
    } finally {
      setSending(false);
    }
  };

  if (!property) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex justify-center items-center">
          <div className="loading-spinner"></div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Image Gallery */}
          <div className="mb-8 rounded-2xl overflow-hidden shadow-2xl">
            <img
              src={property.imageUrl || "https://images.unsplash.com/photo-1568605114967-8130f3a36994"}
              alt={property.title}
              className="w-full h-[400px] md:h-[500px] object-cover"
            />
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
                  {property.title}
                </h1>
                <div className="flex items-center gap-2 text-gray-400">
                  <FaMapMarkerAlt className="text-cyan-400" />
                  <span>{property.city}</span>
                </div>
              </div>

              {/* Price */}
              <div className="glass-card p-6">
                <p className="text-gray-400 text-sm mb-1">Listed Price</p>
                <p className="text-3xl md:text-4xl font-bold text-cyan-400">
                  ₹ {Number(property.price).toLocaleString("en-IN")}
                </p>
              </div>

              {/* Description */}
              <div className="glass-card p-6">
                <h2 className="text-xl font-bold text-white mb-4">Description</h2>
                <p className="text-gray-300 leading-relaxed">
                  {property.description}
                </p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Favorite Button */}
              <div className="glass-card p-6">
                <FavoriteButton property={property} />
              </div>

              {/* Inquiry Form */}
              <div className="glass-card p-6">
                <h2 className="text-xl font-bold text-white mb-4">Send an Inquiry</h2>
                <p className="text-gray-400 text-sm mb-4">
                  Interested in this property? Send a message to the listing agent.
                </p>
                <textarea
                  placeholder="Hi, I'm interested in this property. Could you please provide more details about..."
                  className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/50 transition-all resize-none"
                  rows="4"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <button
                  onClick={handleInquiry}
                  disabled={sending}
                  className="w-full mt-4 btn-primary py-3 rounded-xl font-semibold text-white transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {sending ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </div>
                  ) : (
                    "Send Inquiry"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}