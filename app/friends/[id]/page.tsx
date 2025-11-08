'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import { db } from '@/app/api/_mockdb';
import { useAuth } from '@/app/contexts/AuthContext';
import { FaUserPlus, FaUserCheck, FaRegHeart } from 'react-icons/fa';

export default function FriendDetailPage() {
  const params = useParams<{ id: string }>();
  const friendId = Number(params.id);
  const { user } = useAuth(); // 🟢 user hiện tại (đăng nhập)
  const friend = db.users.find((u) => u.user_id === friendId);

  if (!friend) return notFound();

  const [isFriend, setIsFriend] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  // ✅ Kiểm tra trong db xem có là bạn bè không
  useEffect(() => {
    if (!user) return;

    const relation = db.friends.find(
      (f) =>
        f.status === 'accepted' &&
        ((f.user_id === user.user_id && f.friend_id === friendId) ||
          (f.friend_id === user.user_id && f.user_id === friendId))
    );

    setIsFriend(!!relation);
  }, [user, friendId]);

  // ✅ Lấy công thức người bạn
  const userRecipes = db.recipes.filter((r) => r.author_id === friendId);

  return (
    <section className="container mx-auto px-4 py-12">
      {/* ======= Thông tin người dùng ======= */}
      <div className="flex flex-col md:flex-row md:items-center gap-8 mb-10">
        <div className="flex-shrink-0">
          <Image
            src={friend.avatar_url}
            alt={friend.full_name}
            width={120}
            height={120}
            className="rounded-full object-cover border border-gray-300"
          />
        </div>

        <div className="flex-1">
          <h1 className="text-3xl font-semibold">{friend.full_name}</h1>
          <p className="text-gray-500">@{friend.username}</p>
          <p className="mt-3 text-gray-700">{friend.bio}</p>

          <div className="flex gap-6 mt-4 text-sm text-gray-600">
            <span>
              <strong>{friend.email_verified ? '✔️' : '❌'}</strong> Xác minh email
            </span>
            <span>
              <strong>{friend.is_active ? '🟢' : '🔴'}</strong> Trạng thái
            </span>
            <span>
              Vai trò: <strong>{friend.role}</strong>
            </span>
          </div>

          {/* ✅ Nút kết bạn / đã là bạn */}
          {user && user.user_id !== friendId && (
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
          )}
        </div>
      </div>

      {/* ======= Công thức nấu ăn ======= */}
      <div className="border-t border-gray-200 pt-10">
        <h2 className="text-2xl font-semibold mb-6">
          Công thức của {friend.full_name.split(' ')[0]}
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
