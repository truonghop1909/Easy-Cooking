"use client";

import { db } from "@/app/api/_mockdb";

export default function Section4Recipe({ recipeId = 1 }: { recipeId?: number }) {
  // 🔹 Lấy công thức từ database
  const recipe = db.recipes.find((r) => r.recipe_id === recipeId);

  if (!recipe) {
    return (
      <p className="text-center text-gray-500 mt-10">
        Không tìm thấy công thức
      </p>
    );
  }

  const { instructions } = recipe;

  if (!instructions || instructions.length === 0) {
    return (
      <p className="text-gray-500 text-center mt-10">
        Công thức này chưa có hướng dẫn.
      </p>
    );
  }

  return (
    <section className="mt-8">
      <h2 className="text-2xl font-bold mb-6 border-b border-gray-200 pb-2 text-gray-900">
        Instructions
      </h2>

      <div className="space-y-5">
        {instructions.map((step: string, index: number) => (
          <div key={index} className="flex gap-4 items-start">
            {/* Số thứ tự bước */}
            <div className="flex-shrink-0 w-7 h-7 flex items-center justify-center bg-orange-500 text-white font-bold rounded-full shadow-sm">
              {index + 1}
            </div>

            {/* Nội dung hướng dẫn */}
            <p className="text-gray-700 leading-relaxed">{step}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
