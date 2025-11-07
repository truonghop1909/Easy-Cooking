"use client";
import { FaPlay } from "react-icons/fa";
import { db } from "@/app/api/_mockdb"; // ✅ import database mock

export default function Section2Recipe({ recipeId = 1 }: { recipeId?: number }) {
  // 🔹 Lấy công thức theo ID
  const recipe = db.recipes.find((r) => r.recipe_id === recipeId);

  if (!recipe) {
    return <p className="text-center text-gray-500 mt-10">Không tìm thấy công thức</p>;
  }

  const { description, image_url, video_url } = recipe;

  return (
    <div className="flex flex-col items-center w-full">
      {/* Mô tả ở trên */}
      <p className="text-gray-700 text-[15px] max-w-3xl text-center mb-6 leading-relaxed">
        {description}
      </p>

      {/* Hình ảnh hoặc video */}
      <div className="relative w-full max-w-5xl rounded-xl overflow-hidden">
        <img
          src={image_url}
          alt={recipe.title}
          className="w-full h-auto object-cover rounded-xl shadow-md"
        />

        {/* Nút Play (hiện nếu có video) */}
        {video_url && (
          <button
            className="absolute inset-0 flex items-center justify-center group"
            onClick={() => console.log("▶️ Play video:", video_url)}
          >
            <div className="bg-white/80 rounded-full p-5 group-hover:scale-110 transition">
              <FaPlay className="text-gray-900 text-2xl" />
            </div>
          </button>
        )}
      </div>
    </div>
  );
}
