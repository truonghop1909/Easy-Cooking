"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiX } from "react-icons/fi";

interface Recipe {
  recipe_id: number;
  title: string;
  image_url: string;
  category_id: number;
  created_at: string;
}

interface Category {
  id: number;
  name: string;
}

interface SearchProps {
  onClose: () => void;
}

export const Search = ({ onClose }: SearchProps) => {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

  // 🔹 Lấy data từ DB API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [rRes, cRes] = await Promise.all([
          fetch("/api/recipes", { cache: "no-store" }),
          fetch("/api/categories", { cache: "no-store" }),
        ]);
        const [rData, cData] = await Promise.all([rRes.json(), cRes.json()]);
        setRecipes(Array.isArray(rData) ? rData : []);
        setCategories(Array.isArray(cData) ? cData : []);
      } catch (err) {
        console.error("❌ Lỗi tải dữ liệu:", err);
      }
    };
    fetchData();
  }, []);

  // 🔹 Lấy tên danh mục từ ID
  const getCategoryName = (id: number) =>
    categories.find((c) => c.id === id)?.name || "Uncategorized";

  // 🔹 Lọc công thức theo query
  const filteredResults = recipes
    .filter((r) =>
      r.title.toLowerCase().includes(query.trim().toLowerCase())
    )
    .sort((a, b) =>
      a.title.toLowerCase().localeCompare(b.title.toLowerCase())
    );

  return (
    <div className="fixed inset-0 bg-white/95 backdrop-blur-sm z-50 flex flex-col p-6 sm:px-16 sm:py-10 overflow-y-auto">
      {/* ❌ Nút đóng */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 z-10"
      >
        <FiX size={30} />
      </button>

      {/* 🔍 Ô tìm kiếm */}
      <div className="flex items-center border-b border-gray-300 pb-2 mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search recipes..."
          className="w-full text-gray-800 text-lg focus:outline-none bg-transparent"
          autoFocus
        />
        <button
          onClick={() => setQuery("")}
          className="text-gray-600 hover:text-gray-900"
        >
          <FiX size={22} />
        </button>
      </div>

      {/* 🧾 Kết quả */}
      <div className="flex flex-col divide-y divide-gray-200">
        {query.length > 0 ? (
          loading ? (
            <p className="text-center text-gray-500 py-4">Loading...</p>
          ) : filteredResults.length > 0 ? (
            filteredResults.map((item) => (
              <Link
                key={item.recipe_id}
                href={`/recipes/${item.recipe_id}`}
                onClick={onClose}
                className="flex items-center gap-4 py-3 hover:bg-gray-50 cursor-pointer transition"
              >
                <div className="w-[48px] h-[48px] relative rounded-md overflow-hidden">
                  <Image
                    src={item.image_url}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-[15px] font-semibold text-gray-900 leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-[13px] text-gray-500">
                    {getCategoryName(item.category_id)}
                  </p>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-gray-500 text-center py-4">
              No results found for "{query}".
            </p>
          )
        ) : (
          <p className="text-gray-500 text-center py-4">
            Type something to find a recipe.
          </p>
        )}
      </div>

      {/* 🧭 Xem tất cả */}
      {query.length > 0 && filteredResults.length > 0 && (
        <div className="flex justify-center mt-8">
          <button className="border border-gray-400 text-gray-700 text-sm px-4 py-1.5 rounded hover:bg-gray-100 transition">
            See all {filteredResults.length} results
          </button>
        </div>
      )}
    </div>
  );
};
