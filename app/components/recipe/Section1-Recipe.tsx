"use client";
import { FaShareAlt, FaBookmark, FaStar } from "react-icons/fa";
import { FaArrowTrendUp } from "react-icons/fa6";
import Image from "next/image";
import { db } from "@/app/api/_mockdb"; // ✅ import data trực tiếp

export default function Section1Recipe({ recipeId = 1 }: { recipeId?: number }) {
  // 🔹 Lấy công thức theo ID (mặc định lấy ID = 1)
  const recipe = db.recipes.find((r) => r.recipe_id === recipeId);

  if (!recipe) {
    return <p className="text-center text-gray-500 mt-10">Không tìm thấy công thức</p>;
  }

  // 🔹 Lấy thông tin tác giả
  const author = db.users.find((u) => u.user_id === recipe.author_id);

  const authorData = {
    name: author?.full_name || "Ẩn danh",
    avatar: author?.avatar_url || "/avatarTruongHop.jpg",
    date: new Date(recipe.created_at).toLocaleDateString("vi-VN"),
  };

  const stats = recipe.stats;

  return (
    <header className="border-b pb-5 mb-10">
      {/* === Trend + Action === */}
      <div className="flex justify-between items-center text-sm text-gray-600 mb-3">
        <div className="flex items-center gap-2">
          <FaArrowTrendUp className="text-gray-800" />
          <span>{stats.trend}% would make this again</span>
        </div>
        <div className="flex items-center gap-5 text-lg text-gray-700">
          <FaShareAlt className="cursor-pointer hover:text-black transition" />
          <FaBookmark className="cursor-pointer hover:text-black transition" />
        </div>
      </div>

      {/* === Title === */}
      <h1 className="text-[42px] font-extrabold text-gray-900 mb-5 leading-tight">
        {recipe.title}
      </h1>

      {/* === Author Info === */}
      <div className="flex items-center gap-3 text-sm text-gray-700">
        <Image
          src={authorData.avatar}
          alt={authorData.name}
          width={34}
          height={34}
          className="rounded-full object-cover border border-gray-200"
        />
        <span className="font-medium">{authorData.name}</span>
        <span className="text-gray-500">• {authorData.date}</span>
        <span className="text-gray-500">• {stats.comments} comments</span>

        {/* Rating */}
        <div className="flex text-orange-500 ml-2">
          {Array(stats.rating)
            .fill(0)
            .map((_, i) => (
              <FaStar key={i} />
            ))}
        </div>
      </div>
    </header>
  );
}
