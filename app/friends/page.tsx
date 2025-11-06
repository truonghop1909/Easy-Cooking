"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { usersData } from "../data/userData";

export default function FriendsPage() {
  const [search, setSearch] = useState("");

  // Tìm kiếm tất cả người dùng (lọc theo tên hoặc username)
  const filteredUsers = useMemo(() => {
    return usersData.filter(
      (user) =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.username.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  // Danh sách bạn bè đã kết bạn
  const friends = usersData.filter((u) => u.isFriend);

  return (
    <section className="container mx-auto px-4 py-12">
      {/* =============== PHẦN 1: TÌM KIẾM BẠN BÈ =============== */}
      <div className="mb-10">
        <h1 className="text-3xl font-semibold mb-6">Tìm kiếm người dùng</h1>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Nhập tên hoặc username để tìm..."
          className="w-full sm:w-96 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 text-gray-700"
        />

        {/* Danh sách kết quả tìm kiếm */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <Link
                key={user.id}
                href={`/friends/${user.id}`}
                className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50 transition"
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div>
                  <h2 className="font-semibold">{user.name}</h2>
                  <p className="text-sm text-gray-500">@{user.username}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {user.isFriend ? "✅ Đã là bạn bè" : "➕ Chưa kết bạn"}
                  </p>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-gray-500 col-span-full text-center mt-4">
              Không tìm thấy người dùng nào.
            </p>
          )}
        </div>
      </div>

      {/* =============== PHẦN 2: DANH SÁCH BẠN BÈ =============== */}
      <div className="border-t border-gray-200 pt-10">
        <h2 className="text-2xl font-semibold mb-6">Bạn bè của bạn</h2>

        {friends.length === 0 ? (
          <p className="text-gray-500 text-center mt-6">
            Bạn chưa có người bạn nào 😢
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {friends.map((user) => (
              <Link
                key={user.id}
                href={`/friends/${user.id}`}
                className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50 transition"
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div>
                  <h2 className="font-semibold">{user.name}</h2>
                  <p className="text-sm text-gray-500">@{user.username}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {user.mutualFriends.length > 0
                      ? `${user.mutualFriends.length} bạn chung`
                      : "Không có bạn chung"}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
