"use client";

import Image from "next/image";
import { useState } from "react";
import { FaUser, FaLock, FaEnvelope, FaFacebook, FaGoogle } from "react-icons/fa";

export default function ProfilePage() {
  const [name, setName] = useState("Suzan M");
  const [username, setUsername] = useState("Miller");
  const [email, setEmail] = useState("suzan@gmail.com");
  const [password, setPassword] = useState("*******");

  return (
    <section className="container mx-auto px-6 py-12">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-gray-200 pb-4 mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
        <button className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 transition">
          SAVE
        </button>
      </div>

      {/* Avatar + Buttons */}
      <div className="flex items-center gap-6 mb-10">
        <div className="relative w-20 h-20 rounded-full overflow-hidden">
          <Image
            src="/avatarTruongHop.jpg"
            alt="User Avatar"
            fill
            className="object-cover"
          />
        </div>
        <div className="flex gap-3">
          <button className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition">
            Change photo
          </button>
          <button className="border border-gray-400 px-4 py-2 rounded-md hover:bg-gray-50 transition">
            Delete
          </button>
        </div>
      </div>

      {/* Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        {/* Full Name */}
        <div>
          <label className="block text-xs text-gray-600 mb-2">FULL NAME</label>
          <div className="flex items-center border-b border-gray-300">
            <FaUser className="text-gray-400 mr-2" />
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full py-1 text-gray-900 outline-none"
            />
          </div>
        </div>

        {/* Username */}
        <div>
          <label className="block text-xs text-gray-600 mb-2">USERNAME</label>
          <div className="flex items-center border-b border-gray-300">
            <FaUser className="text-gray-400 mr-2" />
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full py-1 text-gray-900 outline-none"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs text-gray-600 mb-2">EMAIL</label>
          <div className="flex items-center border-b border-gray-300">
            <FaEnvelope className="text-gray-400 mr-2" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full py-1 text-gray-900 outline-none"
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="block text-xs text-gray-600 mb-2">PASSWORD</label>
          <div className="flex items-center border-b border-gray-300">
            <FaLock className="text-gray-400 mr-2" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full py-1 text-gray-900 outline-none"
            />
          </div>
          <button className="text-orange-500 text-xs mt-1 hover:underline">
            Change
          </button>
        </div>
      </div>

      {/* Connected Accounts */}
      <div className="border-t border-gray-200 pt-6 mt-4">
        <h3 className="font-semibold text-gray-900 mb-4">
          Connected Accounts
        </h3>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-blue-600">
            <FaFacebook size={20} />
            <span className="text-gray-800">Suzan Miller</span>
          </div>
          <button className="text-sm text-gray-600 hover:text-orange-500">
            Disconnect
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-red-500">
            <FaGoogle size={20} />
            <span className="text-gray-800">Suzan@gmail.com</span>
          </div>
          <button className="text-sm text-gray-600 hover:text-orange-500">
            Disconnect
          </button>
        </div>
      </div>

      {/* Newsletter */}
      <div className="border-t border-gray-200 pt-6 mt-8">
        <h3 className="font-semibold text-gray-900 mb-3">Newsletter</h3>
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-700">
            You are currently subscribed to our newsletter
          </p>
          <button className="border border-gray-400 px-4 py-1 rounded-md hover:bg-gray-50 transition">
            Unsubscribe
          </button>
        </div>
      </div>

      {/* Sign out / Delete */}
      <div className="border-t border-gray-200 pt-6 mt-8 flex justify-between items-center text-sm">
        <button className="flex items-center gap-2 text-gray-700 hover:text-orange-500">
          <span>↩</span> Sign out
        </button>
        <button className="text-orange-500 hover:underline">
          Delete Account
        </button>
      </div>
    </section>
  );
}
