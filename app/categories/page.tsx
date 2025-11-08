"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CategoryItem } from "../components/item/CategoryItem";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((err) => console.error("❌ Lỗi fetch:", err));
  }, []);

  return (
    <section className="container mx-auto px-4 py-16">
      <h1 className="text-[28px] font-bold mb-8 border-b border-gray-200 pb-4">
        Categories
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 justify-items-center">
        {categories.map((cat) => (
          <Link key={cat.slug} href={`/categories/${cat.slug}`}>
            <CategoryItem name={cat.name} image={cat.image_url} />
          </Link>
        ))}
      </div>
    </section>
  );
}
