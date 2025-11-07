"use client";

import Image from "next/image";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  // Nếu chưa đăng nhập
  if (!user) {
    return (
      <section className="flex justify-center items-center min-h-screen text-gray-600">
        <div className="text-center">
          <p>Vui lòng đăng nhập để xem hồ sơ.</p>
          <button
            onClick={() => router.push("/login")}
            className="mt-3 bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition"
          >
            Đăng nhập
          </button>
        </div>
      </section>
    );
  }

  // Nếu đã đăng nhập
  return (
    <section className="container mx-auto px-6 py-12">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-gray-200 pb-4 mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Hồ sơ cá nhân</h1>
        <button className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 transition">
          LƯU
        </button>
      </div>

      {/* Avatar + Info */}
      <div className="flex items-center gap-6 mb-10">
        <div className="relative w-24 h-24 rounded-full overflow-hidden border border-gray-200">
          <Image
            src={user.avatar_url || "/avatarTruongHop.jpg"}
            alt="User Avatar"
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            {user.full_name}
          </h2>
          <p className="text-gray-600">@{user.username}</p>
          <p className="text-sm text-gray-400 mt-1">
            {user.role === "admin" ? "Quản trị viên" : "Thành viên"}
          </p>
        </div>
      </div>

      {/* Thông tin chi tiết */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <div>
          <label className="block text-xs text-gray-600 mb-2">HỌ VÀ TÊN</label>
          <div className="flex items-center border-b border-gray-300 pb-1">
            <FaUser className="text-gray-400 mr-2" />
            <span className="text-gray-900">{user.full_name}</span>
          </div>
        </div>

        <div>
          <label className="block text-xs text-gray-600 mb-2">TÊN NGƯỜI DÙNG</label>
          <div className="flex items-center border-b border-gray-300 pb-1">
            <FaUser className="text-gray-400 mr-2" />
            <span className="text-gray-900">{user.username}</span>
          </div>
        </div>

        <div>
          <label className="block text-xs text-gray-600 mb-2">EMAIL</label>
          <div className="flex items-center border-b border-gray-300 pb-1">
            <FaEnvelope className="text-gray-400 mr-2" />
            <span className="text-gray-900">{user.email}</span>
          </div>
        </div>

        <div>
          <label className="block text-xs text-gray-600 mb-2">MẬT KHẨU</label>
          <div className="flex items-center border-b border-gray-300 pb-1">
            <FaLock className="text-gray-400 mr-2" />
            <span className="text-gray-900">********</span>
          </div>
          <button className="text-orange-500 text-xs mt-1 hover:underline">
            Đổi mật khẩu
          </button>
        </div>
      </div>

      {/* Đăng xuất / Xóa tài khoản */}
      <div className="border-t border-gray-200 pt-6 mt-8 flex justify-between items-center text-sm">
        <button
          onClick={() => {
            logout();
            router.push("/login");
          }}
          className="flex items-center gap-2 text-gray-700 hover:text-orange-500"
        >
          <span>↩</span> Đăng xuất
        </button>
        <button className="text-orange-500 hover:underline">
          Xóa tài khoản
        </button>
      </div>
    </section>
  );
}
