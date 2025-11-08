'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { db } from '@/app/api/_mockdb'
import { useAuth } from '@/app/contexts/AuthContext'

export default function FriendsPage() {
  const { user } = useAuth()
  const [search, setSearch] = useState('')

  // 🔍 Danh sách tất cả người dùng (lọc theo tìm kiếm)
  const filteredUsers = useMemo(() => {
    return db.users.filter(
      (u) =>
        u.full_name.toLowerCase().includes(search.toLowerCase()) ||
        u.username.toLowerCase().includes(search.toLowerCase())
    )
  }, [search])

  // 🧩 Danh sách bạn bè của người dùng hiện tại
  const myFriends = useMemo(() => {
    if (!user) return []
    const friendLinks = db.friends.filter(
      (f) =>
        (f.user_id === user.user_id || f.friend_id === user.user_id) &&
        f.status === 'accepted'
    )

    // Lấy ID của những người bạn thực sự (không lấy chính mình)
    const friendIds = friendLinks.map((f) =>
      f.user_id === user.user_id ? f.friend_id : f.user_id
    )

    // Trả về danh sách user tương ứng
    return db.users.filter((u) => friendIds.includes(u.user_id))
  }, [user])

  return (
    <section className="container mx-auto px-4 py-12">
      {/* ======== PHẦN 1: TÌM KIẾM NGƯỜI DÙNG ======== */}
      <div className="mb-12">
        <h1 className="text-3xl font-semibold mb-6">Tìm kiếm người dùng</h1>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Nhập tên hoặc username..."
          className="w-full sm:w-96 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 text-gray-700"
        />

        {/* Danh sách kết quả tìm kiếm */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((u) => (
              <Link
                key={u.user_id}
                href={`/friends/${u.user_id}`} // ✅ link tới trang hồ sơ user đó
                className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50 transition"
              >
                <img
                  src={u.avatar_url}
                  alt={u.full_name}
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div>
                  <h2 className="font-semibold">{u.full_name}</h2>
                  <p className="text-sm text-gray-500">@{u.username}</p>
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

      {/* ======== PHẦN 2: DANH SÁCH BẠN BÈ ======== */}
      <div className="border-t border-gray-200 pt-10">
        <h2 className="text-2xl font-semibold mb-6">Bạn bè của bạn</h2>

        {myFriends.length === 0 ? (
          <p className="text-gray-500 text-center mt-6">
            Bạn chưa có người bạn nào 😢
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {myFriends.map((u) => (
              <Link
                key={u.user_id}
                href={`/friends/${u.user_id}`} // ✅ dẫn tới đúng friend user_id
                className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50 transition"
              >
                <img
                  src={u.avatar_url}
                  alt={u.full_name}
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div>
                  <h2 className="font-semibold">{u.full_name}</h2>
                  <p className="text-sm text-gray-500">@{u.username}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
