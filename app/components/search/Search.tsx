"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link"; // 1. Import Link
import { FiX } from "react-icons/fi";

// 2. Import dữ liệu thật của bạn
import { recipesData } from "@/app/data/recipesData";
import { categoriesData } from "@/app/data/categoriesData";

interface SearchProps {
  onClose: () => void;
}

export const Search = ({ onClose }: SearchProps) => {
  // 3. Bắt đầu với query rỗng
  const [query, setQuery] = useState("");

  // 4. Hàm helper để lấy tên danh mục từ ID
  const getCategoryName = (categoryId: number) => {
    const category = categoriesData.find(cat => cat.id === categoryId);
    return category ? category.name : "Uncategorized";
  };

  // 5. Lọc 'recipesData' thật, dựa trên 'title'
  const filteredResults = recipesData
    .filter(item =>
      item.title.toLowerCase().includes(query.toLowerCase())
    )
    .sort((a, b) =>
      a.title.toLowerCase().localeCompare(b.title.toLowerCase())
    );

  return (
    <div className="fixed inset-0 bg-white/95 backdrop-blur-sm z-50 flex flex-col p-6 sm:px-16 sm:py-10 overflow-y-auto">

      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 z-10"
      >
        <FiX size={30} />
      </button>

      {/* Search input */}
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

      {/* Results */}
      <div className="flex flex-col divide-y divide-gray-200">
        {/* 6. Chỉ hiển thị kết quả nếu query không rỗng */}
        {query.length > 0 ? (
          filteredResults.length > 0 ? (
            filteredResults.map((item) => {
              // 7. Lấy tên danh mục đầu tiên
              const categoryName = getCategoryName(item.categoryIds[0]);

              return (
                // 8. Bọc bằng <Link> và thêm onClick={onClose}
                <Link
                  key={item.id}
                  href={`/recipes/${item.id}`} // Dẫn đến trang chi tiết
                  onClick={onClose} // Đóng search khi nhấp
                  className="flex items-center gap-4 py-3 hover:bg-gray-50 cursor-pointer transition"
                >
                  <div className="w-[48px] h-[48px] relative rounded-md overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    {/* 9. Dùng item.title */}
                    <h3 className="text-[15px] font-semibold text-gray-900 leading-tight">
                      {item.title}
                    </h3>
                    {/* 10. Hiển thị tên danh mục thật */}
                    <p className="text-[13px] text-gray-500">{categoryName}</p>
                  </div>
                </Link>
              );
            })
          ) : (
            <p className="text-gray-500 text-center py-4">
              No results found for "{query}".
            </p>
          )
        ) : (
          // 11. Thông báo khi chưa gõ gì
          <p className="text-gray-500 text-center py-4">
            Type something to find a recipe.
          </p>
        )}
      </div>

      {/* Nút "See all results" */}
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