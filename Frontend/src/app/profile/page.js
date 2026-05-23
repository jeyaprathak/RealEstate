"use client";

import { useEffect, useState } from "react";

import Navbar from "@/components/NavBar";

import { getuser } from "@/services/api";

import {
  FaUser,
  FaEnvelope,
  FaUserShield,
  FaCalendarAlt
} from "react-icons/fa";

export default function ProfilePage() {

  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    fetchUser();

  }, []);

  const fetchUser = async () => {

    try {

      const { data } = await getuser();

      setUser(data.user);

    } catch (error) {

      console.log(error);

      alert("Failed to fetch profile");

    } finally {

      setLoading(false);

    }

  };

  if (loading) {

    return (

      <>
        <Navbar />

        <div className="min-h-screen flex justify-center items-center bg-black">
          <div className="text-white text-xl">
            Loading Profile...
          </div>
        </div>
      </>

    );

  }

  return (

    <>

      <Navbar />

      <div className="min-h-screen bg-black flex justify-center items-center p-4">

        <div className="bg-[#16181f] border border-gray-800 rounded-3xl shadow-2xl p-8 w-full max-w-lg">

          {/* Profile Header */}
          <div className="flex flex-col items-center mb-8">

            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500 flex items-center justify-center text-white text-4xl font-bold mb-4">

              {user?.name?.charAt(0)}

            </div>

            <h1 className="text-3xl font-bold text-white">

              {user?.name}

            </h1>

            <p className="text-gray-400 mt-1">

              Welcome to your profile

            </p>

          </div>

          {/* Profile Details */}
          <div className="space-y-5">

            {/* Name */}
            <div className="bg-[#0f1117] rounded-2xl p-4 flex items-center gap-4">

              <div className="bg-cyan-500/10 text-cyan-400 p-3 rounded-xl">
                <FaUser />
              </div>

              <div>
                <p className="text-gray-500 text-sm">
                  Name
                </p>

                <h3 className="text-white font-semibold text-lg">
                  {user?.name}
                </h3>
              </div>

            </div>

            {/* Email */}
            <div className="bg-[#0f1117] rounded-2xl p-4 flex items-center gap-4">

              <div className="bg-emerald-500/10 text-emerald-400 p-3 rounded-xl">
                <FaEnvelope />
              </div>

              <div>
                <p className="text-gray-500 text-sm">
                  Email
                </p>

                <h3 className="text-white font-semibold text-lg">
                  {user?.email}
                </h3>
              </div>

            </div>

            {/* Role */}
            <div className="bg-[#0f1117] rounded-2xl p-4 flex items-center gap-4">

              <div className="bg-violet-500/10 text-violet-400 p-3 rounded-xl">
                <FaUserShield />
              </div>

              <div>
                <p className="text-gray-500 text-sm">
                  Role
                </p>

                <h3 className="text-white font-semibold text-lg">
                  {user?.role}
                </h3>
              </div>

            </div>

            {/* Created At */}
            <div className="bg-[#0f1117] rounded-2xl p-4 flex items-center gap-4">

              <div className="bg-yellow-500/10 text-yellow-400 p-3 rounded-xl">
                <FaCalendarAlt />
              </div>

              <div>
                <p className="text-gray-500 text-sm">
                  Joined On
                </p>

                <h3 className="text-white font-semibold text-lg">

                  {new Date(user?.createdAt).toLocaleDateString(
                    "en-IN",
                    {
                      day: "numeric",
                      month: "long",
                      year: "numeric"
                    }
                  )}

                </h3>
              </div>

            </div>

          </div>

        </div>

      </div>

    </>

  );

}