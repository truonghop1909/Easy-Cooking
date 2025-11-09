"use client";

import { useEffect, useState } from "react";
import { CategoryItem } from "../item/CategoryItem";

interface Category {
  category_id: number;
  name: string;
  image_url: string;
}

export default function Section3Home() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Lấy danh mục từ DB mock qua API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories", { cache: "no-store" });
        if (!res.ok) throw new Error("Không thể tải danh mục");
        const data = await res.json();
        setCategories(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("❌ Lỗi tải danh mục:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  if (loading)
    return (
      <section className="container mx-auto px-4 py-12 text-center text-gray-500">
        Đang tải danh mục...
      </section>
    );

  if (categories.length === 0)
    return (
      <section className="container mx-auto px-4 py-12 text-center text-gray-500">
        Hiện chưa có danh mục nào.
      </section>
    );

  return (
    <section className="max-w-6xl mx-auto px-4 py-12 text-center">
      <h2 className="text-[26px] sm:text-[28px] font-bold text-gray-900 mb-10">
        Popular Categories
      </h2>

      <div
        className="
          grid 
          grid-cols-2 
          sm:grid-cols-2
          md:grid-cols-3 
          lg:grid-cols-4
          xl:grid-cols-5
          gap-4 
          sm:gap-6 
          md:gap-8 
          justify-items-center
        "
      >
        {categories.map((item) => (
          <CategoryItem
            key={item.category_id}
            name={item.name}
            image={item.image_url || "/banner01.jpg"}
          />
        ))}
      </div>
    </section>
  );
}
