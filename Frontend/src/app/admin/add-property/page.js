"use client";

import { useState } from "react";
import { createProperty, uploadImage } from "@/services/api";
import AdminProtected from "@/components/AdminProtected";
import AdminSidebar from "@/components/AdminSidebar";
import { FaUpload, FaTimes, FaImage } from "react-icons/fa";

export default function AddPropertyPage() {
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    city: "",
    location: "",
    price: "",
    bedrooms: "",
    bathrooms: "",
    propertyType: "",
    image: ""
  });

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Property title is required";
    } else if (formData.title.length < 3) {
      newErrors.title = "Title must be at least 3 characters";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    } else if (formData.description.length < 20) {
      newErrors.description = "Description must be at least 20 characters";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!formData.price) {
      newErrors.price = "Price is required";
    } else if (Number(formData.price) <= 0) {
      newErrors.price = "Price must be greater than 0";
    }

    if (!formData.image) {
      newErrors.image = "Property image is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      setErrors({ ...errors, image: "Please upload a valid image (JPEG, PNG, or WEBP)" });
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setErrors({ ...errors, image: "Image size must be less than 5MB" });
      return;
    }

    setUploading(true);
    setErrors({ ...errors, image: "" });

    try {
      const data = new FormData();
      data.append("image", file);
      const response = await uploadImage(data);

      setFormData({
        ...formData,
        image: response.data.imageUrl
      });
      setImagePreview(response.data.imageUrl);
    } catch (error) {
      setErrors({ ...errors, image: "Failed to upload image. Please try again." });
      console.log(error);
    } finally {
      setUploading(false);
    }
  };

  const removeImage = () => {
    setFormData({ ...formData, image: "" });
    setImagePreview("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      await createProperty(formData);
      alert("Property added successfully!");

      // Reset form
      setFormData({
        title: "",
        description: "",
        city: "",
        price: "",
        image: ""
      });
      setImagePreview("");
      setErrors({});

    } catch (error) {
      setErrors({
        submit: error.response?.data?.message || "Failed to add property. Please try again."
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminProtected>
      <div className="flex min-h-screen bg-darker">
        <AdminSidebar />

        <div className="flex-1 p-4 sm:p-6 lg:p-10">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Add New Property
              </h1>
              <p className="text-gray-400 mt-2">Fill in the details to list a new property</p>
            </div>

            {/* Form Card */}
            <form onSubmit={handleSubmit} className="bg-card rounded-2xl shadow-xl p-6 sm:p-8 border border-primary/10">
              {/* Title */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  Property Title <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  placeholder="e.g., Luxury Villa with Ocean View"
                  value={formData.title}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-secondary/50 border rounded-xl text-white placeholder-gray-500 focus:border-primary focus:ring-2 focus:ring-primary/50 transition-all ${errors.title ? "border-red-500" : "border-gray-700"
                    }`}
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-400">{errors.title}</p>
                )}
              </div>

              {/* Description */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  Description <span className="text-red-400">*</span>
                </label>
                <textarea
                  name="description"
                  placeholder="Describe the property in detail..."
                  rows="5"
                  value={formData.description}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-secondary/50 border rounded-xl text-white placeholder-gray-500 focus:border-primary focus:ring-2 focus:ring-primary/50 transition-all resize-none ${errors.description ? "border-red-500" : "border-gray-700"
                    }`}
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-400">{errors.description}</p>
                )}
                <p className="mt-1 text-xs text-gray-500">
                  {formData.description.length}/20+ characters
                </p>
              </div>

              {/* City and Price Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">
                    City <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="city"
                    placeholder="e.g., Mumbai, Delhi, Bangalore"
                    value={formData.city}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-secondary/50 border rounded-xl text-white placeholder-gray-500 focus:border-primary focus:ring-2 focus:ring-primary/50 transition-all ${errors.city ? "border-red-500" : "border-gray-700"
                      }`}
                  />
                  {errors.city && (
                    <p className="mt-1 text-sm text-red-400">{errors.city}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">
                    Price (₹) <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="number"
                    name="price"
                    placeholder="e.g., 5000000"
                    value={formData.price}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-secondary/50 border rounded-xl text-white placeholder-gray-500 focus:border-primary focus:ring-2 focus:ring-primary/50 transition-all ${errors.price ? "border-red-500" : "border-gray-700"
                      }`}
                  />
                  {errors.price && (
                    <p className="mt-1 text-sm text-red-400">{errors.price}</p>
                  )}
                </div>
              </div>
              {/* Location and Property Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">
                    Location
                  </label>

                  <input
                    type="text"
                    name="location"
                    placeholder="e.g., OMR"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-secondary/50 border border-gray-700 rounded-xl text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">
                    Property Type
                  </label>

                  <select
                    name="propertyType"
                    value={formData.propertyType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-secondary/50 border border-gray-700 rounded-xl text-white"
                  >
                    <option value="">Select Type</option>
                    <option value="Villa">Villa</option>
                    <option value="Apartment">Apartment</option>
                    <option value="House">House</option>
                    <option value="Land">Land</option>
                  </select>
                </div>
              </div>

              {/* Bedrooms and Bathrooms */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">
                    Bedrooms
                  </label>

                  <input
                    type="number"
                    name="bedrooms"
                    placeholder="e.g., 4"
                    value={formData.bedrooms}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-secondary/50 border border-gray-700 rounded-xl text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">
                    Bathrooms
                  </label>

                  <input
                    type="number"
                    name="bathrooms"
                    placeholder="e.g., 3"
                    value={formData.bathrooms}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-secondary/50 border border-gray-700 rounded-xl text-white"
                  />
                </div>
              </div>

              {/* Image Upload */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  Property Image <span className="text-red-400">*</span>
                </label>

                {!imagePreview ? (
                  <div className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${errors.image ? "border-red-500" : "border-gray-700 hover:border-primary"
                    }`}>
                    <input
                      type="file"
                      id="imageUpload"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <label
                      htmlFor="imageUpload"
                      className="cursor-pointer flex flex-col items-center gap-3"
                    >
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                        <FaImage className="text-primary text-2xl" />
                      </div>
                      <div>
                        <p className="text-primary font-semibold">Click to upload</p>
                        <p className="text-xs text-gray-500 mt-1">JPEG, PNG, WEBP (Max 5MB)</p>
                      </div>
                    </label>
                  </div>
                ) : (
                  <div className="relative rounded-xl overflow-hidden">
                    <img
                      src={imagePreview}
                      alt="Property preview"
                      className="w-full h-64 object-cover"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute top-3 right-3 bg-red-500 p-2 rounded-full hover:bg-red-600 transition-colors"
                    >
                      <FaTimes />
                    </button>
                  </div>
                )}

                {uploading && (
                  <div className="mt-3 flex items-center justify-center gap-2 text-primary">
                    <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                    <span>Uploading image...</span>
                  </div>
                )}

                {errors.image && (
                  <p className="mt-2 text-sm text-red-400">{errors.image}</p>
                )}
              </div>

              {/* Submit Error */}
              {errors.submit && (
                <div className="mb-6 bg-red-500/10 border border-red-500/30 rounded-xl p-3">
                  <p className="text-red-400 text-sm text-center">{errors.submit}</p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading || uploading}
                className="w-full bg-gradient-to-r from-primary to-primary-dark py-3 rounded-xl font-semibold text-white hover:scale-105 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Adding Property...</span>
                  </div>
                ) : (
                  "Add Property"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </AdminProtected>
  );
}