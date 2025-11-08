"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { RecipeItem } from "../item/RecipeItem";

interface Recipe {
  recipe_id: number;
  title: string;
  image_url: string;
  slug?: string;
  rating?: number;
}

export default function Section2Home() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Lấy toàn bộ công thức từ DB mock
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await fetch("/api/recipes", { cache: "no-store" });
        if (!res.ok) throw new Error("Không thể tải công thức");
        const data = await res.json();
        setRecipes(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("❌ Lỗi tải công thức:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipes();
  }, []);

  if (loading) {
    return (
      <section className="container mx-auto px-4 py-12 text-center text-gray-500">
        Đang tải danh sách công thức...
      </section>
    );
  }

  // ✅ Giả lập 2 nhóm (sau này có thể lọc theo category hoặc rating)
  const half = Math.ceil(recipes.length / 2);
  const superDelicious = recipes.slice(0, half);
  const sweetTooth = recipes.slice(half);

  return (
    <section className="container mx-auto px-4 py-12">
      {/* 🍝 Super Delicious */}
      <h2 className="text-[28px] font-bold text-gray-900 mb-8">
        Super Delicious
      </h2>
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8 mb-12">
        {superDelicious.map((item) => (
          <Link
            key={item.recipe_id}
            href={`/recipes/${item.slug || item.recipe_id}`}
          >
            <RecipeItem
              name={item.title}
              image={item.image_url || "/banner01.jpg"}
              rating={item.rating || 5}
            />
          </Link>
        ))}
      </div>

      {/* 🍩 Sweet Tooth */}
      <h2 className="text-[28px] font-bold text-gray-900 mb-8">
        Sweet Tooth
      </h2>
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
        {sweetTooth.map((item) => (
          <Link
            key={item.recipe_id}
            href={`/recipes/${item.slug || item.recipe_id}`}
          >
            <RecipeItem
              name={item.title}
              image={item.image_url || "/banner01.jpg"}
              rating={item.rating || 5}
            />
          </Link>
        ))}
      </div>
    </section>
  );
}
