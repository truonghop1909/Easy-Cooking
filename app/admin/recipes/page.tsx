"use client";

import { recipesData } from "@/app/data/recipesData";

export default function AdminRecipesPage() {
  return (
    <section>
      <h1 className="text-2xl font-semibold mb-6">Quản lý công thức</h1>
      <table className="w-full border-collapse bg-white rounded-xl shadow-sm overflow-hidden">
        <thead className="bg-gray-100 text-gray-700 text-sm">
          <tr>
            <th className="p-3 text-left">Ảnh</th>
            <th className="p-3 text-left">Tên món</th>
            <th className="p-3 text-left">Tác giả</th>
            <th className="p-3 text-left">Ngày</th>
            <th className="p-3 text-left">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {recipesData.map((r) => (
            <tr key={r.id} className="border-b hover:bg-gray-50 text-sm">
              <td className="p-3">
                <img
                  src={r.image}
                  alt={r.title}
                  className="w-14 h-14 rounded-md object-cover"
                />
              </td>
              <td className="p-3">{r.title}</td>
              <td className="p-3">{r.author.name}</td>
              <td className="p-3 text-gray-500">{r.author.date}</td>
              <td className="p-3">
                <button className="text-blue-500 hover:underline mr-3">Duyệt</button>
                <button className="text-red-500 hover:underline">Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
