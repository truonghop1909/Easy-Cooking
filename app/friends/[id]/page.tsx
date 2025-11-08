'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import { db } from '@/app/api/_mockdb'; // ✅ lấy từ mockdb
import { FaUserPlus, FaUserCheck, FaRegHeart } from 'react-icons/fa';

export default function FriendDetailPage() {
  const params = useParams<{ id: string }>();
  const userId = Number(params.id);
  const user = db.users.find((u) => u.user_id === userId);

  if (!user) return notFound();

  // ✅ Lọc danh sách công thức của user
  const userRecipes = db.recipes.filter((r) => r.author_id === userId);

  const [isFriend, setIsFriend] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  return (
    <section className="container mx-auto px-4 py-12">
      {/* ======= Thông tin người dùng ======= */}
      <div className="flex flex-col md:flex-row md:items-center gap-8 mb-10">
        <div className="flex-shrink-0">
          <Image
            src={user.avatar_url}
            alt={user.full_name}
            width={120}
            height={120}
            className="rounded-full object-cover border border-gray-300"
          />
        </div>

        <div className="flex-1">
          <h1 className="text-3xl font-semibold">{user.full_name}</h1>
          <p className="text-gray-500">@{user.username}</p>
          <p className="mt-3 text-gray-700">{user.bio}</p>

          {/* Thông tin thêm */}
          <div className="flex gap-6 mt-4 text-sm text-gray-600">
            <span>
              <strong>{user.email_verified ? '✔️' : '❌'}</strong> Xác minh email
            </span>
            <span>
              <strong>{user.is_active ? '🟢' : '🔴'}</strong> Trạng thái
            </span>
            <span>
              Vai trò: <strong>{user.role}</strong>
            </span>
          </div>

          {/* Nút hành động */}
          <div className="flex gap-4 mt-6">
            <button
              onClick={() => setIsFriend(!isFriend)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-white ${
                isFriend
                  ? 'bg-gray-400 hover:bg-gray-500'
                  : 'bg-orange-500 hover:bg-orange-600'
              } transition`}
            >
              {isFriend ? <FaUserCheck /> : <FaUserPlus />}
              {isFriend ? 'Đã là bạn' : 'Kết bạn'}
            </button>

            <button
              onClick={() => setIsFollowing(!isFollowing)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md border transition ${
                isFollowing
                  ? 'border-orange-500 text-orange-500'
                  : 'border-gray-300 text-gray-700'
              }`}
            >
              <FaRegHeart />
              {isFollowing ? 'Đang theo dõi' : 'Theo dõi'}
            </button>
          </div>
        </div>
      </div>

      {/* ======= Phần công thức nấu ăn ======= */}
      <div className="border-t border-gray-200 pt-10">
        <h2 className="text-2xl font-semibold mb-6">
          Công thức của {user.full_name.split(' ')[0]}
        </h2>

        {userRecipes.length === 0 ? (
          <p className="text-gray-500">Chưa có công thức nào được đăng.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {userRecipes.map((r) => (
              <Link
                key={r.recipe_id}
                href={`/recipes/${r.recipe_id}`}
                className="group block rounded-lg overflow-hidden border hover:shadow-md transition"
              >
                <img
                  src={r.image_url}
                  alt={r.title}
                  className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="p-3">
                  <h3 className="font-medium text-gray-800 group-hover:text-orange-600">
                    {r.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    ⭐ {r.stats.rating} | 💬 {r.stats.comments}
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
