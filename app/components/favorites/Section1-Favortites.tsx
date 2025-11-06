"use client";

import { useState } from "react";
import { FaHeart, FaEdit, FaTrashAlt } from "react-icons/fa";

export default function Section1Favorites() {
  const [sortOption, setSortOption] = useState("latest");

  return (
    <section className="container mx-auto border-b border-gray-200 pb-2 py-12">
      {/* ===== Tiêu đề & Sort ===== */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <FaHeart className="text-orange-500 text-xl" />
          <h1 className="text-2xl font-bold">Favorites</h1>
        </div>

        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="border border-gray-300 rounded-md text-sm px-3 py-1"
        >
          <option value="latest">Sort</option>
          <option value="name">Name A–Z</option>
          <option value="rating">Top Rated</option>
        </select>
      </div>

      {/* ===== Thanh công cụ bên dưới ===== */}
      <div className="flex items-center gap-4 mt-3 text-sm text-gray-700 py-5">
        <span>(98 Recipes)</span>

        <button className="flex items-center gap-1 hover:text-orange-500">
          <FaEdit size={13} /> Select
        </button>

        <label className="flex items-center gap-1 cursor-pointer">
          <input type="checkbox" className="accent-orange-500" /> All
        </label>

        <button className="flex items-center gap-1 text-red-500 hover:text-red-600">
          <FaTrashAlt size={13} /> Delete
        </button>
      </div>
    </section>
  );
}
