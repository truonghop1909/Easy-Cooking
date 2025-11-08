"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import RecipeCard from "../item/RecipeCard";

interface Recipe {
  recipe_id: number;
  title: string;
  image_url: string;
  slug?: string;
}

interface Section6HomeProps {
  title?: string;
}

export default function Section6Home({ title = "Latest Recipes" }: Section6HomeProps) {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [visibleCount, setVisibleCount] = useState(12);

  // 🟢 Fetch toàn bộ công thức
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await fetch("/api/recipes", { cache: "no-store" });
        if (!res.ok) throw new Error("Không thể tải công thức");
        const data = await res.json();
        setRecipes(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("❌ Lỗi tải recipes:", err);
      }
    };
    fetchRecipes();
  }, []);

  const handleLoadMore = () => setVisibleCount((prev) => prev + 8);

  return (
    <section className="container mx-auto px-4 py-16">
      {/* Tiêu đề */}
      <h2 className="text-[26px] font-semibold text-gray-900 mb-8">
        {title}
      </h2>

      {/* Grid công thức */}
      {recipes.length > 0 ? (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {recipes.slice(0, visibleCount).map((r) => (
              <Link
                key={r.recipe_id}
                href={`/recipes/${r.slug || r.recipe_id}`}
                className="block"
              >
                <RecipeCard
                  title={r.title}
                  image={r.image_url || "/banner01.jpg"}
                />
              </Link>
            ))}
          </div>

          {/* Nút Load More */}
          {visibleCount < recipes.length && (
            <div className="flex justify-center mt-10">
              <button
                onClick={handleLoadMore}
                className="border border-gray-300 px-6 py-2 rounded-md text-gray-800 hover:bg-gray-50 transition"
              >
                Load More
              </button>
            </div>
          )}
        </>
      ) : (
        <p className="text-gray-500 text-center">Không có công thức nào để hiển thị.</p>
      )}
    </section>
  );
}
