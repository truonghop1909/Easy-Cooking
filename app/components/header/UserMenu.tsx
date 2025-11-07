'use client'

import Link from "next/link";
import {
  FiUser,
  FiSettings,
  FiSend,
  FiLogOut,
  FiHeart,
  FiUsers,
  FiUpload,
  FiRepeat,
} from "react-icons/fi";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/contexts/AuthContext";

interface UserMenuProps {
  onClose: () => void;
}

export const UserMenu = ({ onClose }: UserMenuProps) => {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    onClose();
    router.push("/login");
  };

  // 🔸 Lấy chữ cái đầu nếu không có avatar
  const initials = user?.full_name
    ? user.full_name.charAt(0).toUpperCase()
    : "U";

  return (
    <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-100 z-50 overflow-hidden">
      {/* === USER INFO === */}
      <div className="flex items-center gap-3 p-4 border-b border-gray-100">
        {/* ✅ Nếu có avatar_url thì hiển thị ảnh thật */}
        {user?.avatar_url ? (
          <img
            src={user.avatar_url}
            alt="Avatar"
            className="w-10 h-10 rounded-full object-cover border border-gray-200"
          />
        ) : (
          <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-semibold">
            {initials}
          </div>
        )}

        <div>
          <div className="font-semibold">{user?.full_name || "Người dùng"}</div>
          <div className="text-sm text-gray-500">@{user?.username || "username"}</div>
          <div className="text-xs text-gray-400">
            {user?.role === "admin" ? "Quản trị viên" : "Thành viên"}
          </div>
        </div>
      </div>

      {/* === MAIN MENU === */}
      <nav className="p-2">
        <Link
          href="/user"
          onClick={onClose}
          className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-50 text-gray-700"
        >
          <FiUser className="w-5 h-5" />
          <span>Bếp cá nhân</span>
        </Link>

        <Link
          href="/friends"
          onClick={onClose}
          className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-50 text-gray-700"
        >
          <FiUsers className="w-5 h-5" />
          <span>Bạn bè</span>
        </Link>

        <Link
          href="/favorites"
          onClick={onClose}
          className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-50 text-gray-700"
        >
          <FiHeart className="w-5 h-5" />
          <span>Món yêu thích</span>
        </Link>

        <Link
          href="/upload-recipe"
          onClick={onClose}
          className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-50 text-gray-700"
        >
          <FiUpload className="w-5 h-5" />
          <span>Đăng tải công thức</span>
        </Link>

        <Link
          href="/repost"
          onClick={onClose}
          className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-50 text-gray-700"
        >
          <FiRepeat className="w-5 h-5" />
          <span>Đăng lại món ăn</span>
        </Link>
      </nav>

      {/* === SETTINGS === */}
      <div className="border-t border-gray-100 p-2">
        <Link
          href="/settings"
          onClick={onClose}
          className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-50 text-gray-700"
        >
          <FiSettings className="w-5 h-5" />
          <span>Cài đặt</span>
        </Link>

        <Link
          href="/feedback"
          onClick={onClose}
          className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-50 text-gray-700"
        >
          <FiSend className="w-5 h-5" />
          <span>Gửi góp ý</span>
        </Link>
      </div>

      {/* === LOGOUT === */}
      <div className="p-2 border-t border-gray-100">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-50 text-red-600"
        >
          <FiLogOut className="w-5 h-5" />
          <span>Thoát</span>
        </button>
      </div>
    </div>
  );
};
