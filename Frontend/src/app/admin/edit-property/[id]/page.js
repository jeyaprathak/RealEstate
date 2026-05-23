"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  getSingleProperty,
  updateProperty,
  uploadImage
} from "@/services/api";

import AdminProtected from "@/components/AdminProtected";
import AdminSidebar from "@/components/AdminSidebar";

import {
  FaArrowLeft,
  FaSave,
  FaTimes,
  FaImage
} from "react-icons/fa";

import Link from "next/link";

export default function EditPropertyPage() {
  const params = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [uploading, setUploading] = useState(false);

  const [imagePreview, setImagePreview] = useState("");

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

  useEffect(() => {
    if (params?.id) {
      fetchProperty();
    }
  }, [params]);

  const fetchProperty = async () => {
    try {
      const { data } = await getSingleProperty(params.id);

      const property = data.property;

      setFormData({
        title: property.title || "",
        description: property.description || "",
        city: property.city || "",
        location: property.location || "",
        price: property.price || "",
        bedrooms: property.bedrooms || "",
        bathrooms: property.bathrooms || "",
        propertyType: property.propertyType || "",
        image: property.image || ""
      });

      setImagePreview(property.image || "");
    } catch (error) {
      console.log(error);
      alert("Failed to fetch property");
    } finally {
      setFetching(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setUploading(true);

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
      console.log(error);
      alert("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  const removeImage = () => {
    setFormData({
      ...formData,
      image: ""
    });

    setImagePreview("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      await updateProperty(params.id, {
        title: formData.title,
        description: formData.description,
        city: formData.city,
        location: formData.location,
        price: Number(formData.price),
        bedrooms: Number(formData.bedrooms),
        bathrooms: Number(formData.bathrooms),
        propertyType: formData.propertyType,
        image: formData.image
      });

      alert("Property updated successfully");

      router.push("/admin/manage-properties");
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Failed to update property"
      );
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="text-white p-10">
        Loading...
      </div>
    );
  }

  return (
    <AdminProtected>
      <div className="flex min-h-screen bg-black">
        <AdminSidebar />

        <div className="flex-1 p-4 sm:p-6 lg:p-10">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/admin/manage-properties"
              className="inline-flex items-center gap-2 text-gray-400 mb-6"
            >
              <FaArrowLeft />
              Back
            </Link>

            <h1 className="text-3xl font-bold text-white mb-8">
              Edit Property
            </h1>

            <form
              onSubmit={handleSubmit}
              className="bg-[#16181f] rounded-2xl p-6 border border-gray-800"
            >
              {/* Title */}
              <div className="mb-6">
                <label className="block text-white mb-2">
                  Title
                </label>

                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-[#0f1117] border border-gray-700 text-white"
                />
              </div>

              {/* Description */}
              <div className="mb-6">
                <label className="block text-white mb-2">
                  Description
                </label>

                <textarea
                  rows={5}
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-[#0f1117] border border-gray-700 text-white"
                />
              </div>

              {/* City & Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                  className="px-4 py-3 rounded-xl bg-[#0f1117] border border-gray-700 text-white"
                />

                <input
                  type="text"
                  name="location"
                  placeholder="Location"
                  value={formData.location}
                  onChange={handleChange}
                  className="px-4 py-3 rounded-xl bg-[#0f1117] border border-gray-700 text-white"
                />
              </div>

              {/* Price & Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <input
                  type="number"
                  name="price"
                  placeholder="Price"
                  value={formData.price}
                  onChange={handleChange}
                  className="px-4 py-3 rounded-xl bg-[#0f1117] border border-gray-700 text-white"
                />

                <select
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleChange}
                  className="px-4 py-3 rounded-xl bg-[#0f1117] border border-gray-700 text-white"
                >
                  <option value="">Select Type</option>
                  <option value="Villa">Villa</option>
                  <option value="Apartment">Apartment</option>
                  <option value="House">House</option>
                  <option value="Land">Land</option>
                </select>
              </div>

              {/* Bedrooms & Bathrooms */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <input
                  type="number"
                  name="bedrooms"
                  placeholder="Bedrooms"
                  value={formData.bedrooms}
                  onChange={handleChange}
                  className="px-4 py-3 rounded-xl bg-[#0f1117] border border-gray-700 text-white"
                />

                <input
                  type="number"
                  name="bathrooms"
                  placeholder="Bathrooms"
                  value={formData.bathrooms}
                  onChange={handleChange}
                  className="px-4 py-3 rounded-xl bg-[#0f1117] border border-gray-700 text-white"
                />
              </div>

              {/* Image */}
              <div className="mb-6">
                {!imagePreview ? (
                  <div className="border-2 border-dashed border-gray-700 rounded-xl p-8 text-center">
                    <input
                      type="file"
                      id="imageUpload"
                      onChange={handleImageUpload}
                      className="hidden"
                    />

                    <label
                      htmlFor="imageUpload"
                      className="cursor-pointer flex flex-col items-center gap-3"
                    >
                      <FaImage className="text-4xl text-emerald-400" />

                      <span className="text-gray-300">
                        Upload Image
                      </span>
                    </label>
                  </div>
                ) : (
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-64 object-cover rounded-xl"
                    />

                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute top-3 right-3 bg-red-500 p-2 rounded-full"
                    >
                      <FaTimes />
                    </button>
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={loading || uploading}
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
              >
                <FaSave />

                {loading ? "Updating..." : "Update Property"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </AdminProtected>
  );
}