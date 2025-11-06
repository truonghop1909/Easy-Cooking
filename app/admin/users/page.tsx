"use client";

import { useState } from "react";
import { FiUser, FiUserCheck, FiUserX, FiShield, FiMail } from "react-icons/fi";

// 🧠 Dữ liệu người dùng mẫu (sau này có thể load từ API hoặc Firebase)
const usersData = [
    {
        id: 1,
        name: "Hợp Trương",
        email: "hoptruong@example.com",
        avatar: "/avatarTruongHop.jpg",
        role: "admin",
        status: "active",
        joined: "2025-10-01",
    },
    {
        id: 2,
        name: "Lan Anh",
        email: "lananh.cook@example.com",
        avatar: "/avatarTruongHop.jpg",
        role: "user",
        status: "active",
        joined: "2025-10-15",
    },
    {
        id: 3,
        name: "Nam Nguyễn",
        email: "namnguyen@gmail.com",
        avatar: "/avatarTruongHop.jpg",
        role: "user",
        status: "banned",
        joined: "2025-09-20",
    },
    {
        id: 4,
        name: "Emily Chen",
        email: "emily.chen@example.com",
        avatar: "/avatarTruongHop.jpg",
        role: "moderator",
        status: "active",
        joined: "2025-08-30",
    },
];

export default function AdminUsersPage() {
    const [filter, setFilter] = useState<"all" | "active" | "banned">("all");

    const filteredUsers =
        filter === "all"
            ? usersData
            : usersData.filter((u) => u.status === filter);

    const handleBanToggle = (id: number, currentStatus: string) => {
        const action = currentStatus === "active" ? "Khóa tài khoản" : "Mở khóa";
        alert(`⚙️ ${action} người dùng #${id}`);
    };

    return (
        <section>
            <h1 className="text-2xl font-semibold mb-6 text-gray-800">
                Quản lý người dùng
            </h1>

            {/* Bộ lọc */}
            <div className="flex gap-3 mb-6">
                {[
                    { label: "Tất cả", value: "all" },
                    { label: "Đang hoạt động", value: "active" },
                    { label: "Đã khóa", value: "banned" },
                ].map((item) => (
                    <button
                        key={item.value}
                        onClick={() => setFilter(item.value as any)}
                        className={`px-4 py-1.5 rounded-md border text-sm transition ${filter === item.value
                            ? "bg-orange-500 text-white border-orange-500"
                            : "border-gray-300 text-gray-600 hover:bg-gray-100"
                            }`}
                    >
                        {item.label}
                    </button>
                ))}
            </div>

            {/* Bảng danh sách người dùng */}
            <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
                <table className="w-full border-collapse">
                    <thead className="bg-gray-100 text-gray-700 text-sm">
                        <tr>
                            <th className="p-3 text-left w-16">#</th>
                            <th className="p-3 text-left">Tên người dùng</th>
                            <th className="p-3 text-left">Email</th>
                            <th className="p-3 text-left">Vai trò</th>
                            <th className="p-3 text-left">Ngày tham gia</th>
                            <th className="p-3 text-left">Trạng thái</th>
                            <th className="p-3 text-left">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((u) => (
                            <tr
                                key={u.id}
                                className="border-b hover:bg-gray-50 text-sm transition"
                            >
                                <td className="p-3 text-gray-500">{u.id}</td>

                                {/* Avatar + tên */}
                                <td className="p-3 flex items-center gap-3">
                                    <img
                                        src={u.avatar}
                                        alt={u.name}
                                        className="w-10 h-10 rounded-full object-cover"
                                    />
                                    <span className="font-medium">{u.name}</span>
                                </td>

                                <td className="p-3 text-gray-600">{u.email}</td>

                                {/* Role */}
                                <td className="p-3">
                                    <span
                                        className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-md ${u.role === "admin"
                                            ? "bg-orange-100 text-orange-700"
                                            : u.role === "moderator"
                                                ? "bg-blue-100 text-blue-700"
                                                : "bg-gray-100 text-gray-700"
                                            }`}
                                    >
                                        <FiShield size={12} />
                                        {u.role}
                                    </span>
                                </td>

                                {/* Ngày tham gia */}
                                <td className="p-3 text-gray-500">{u.joined}</td>

                                {/* Trạng thái */}
                                <td className="p-3">
                                    {u.status === "active" ? (
                                        <span className="inline-flex items-center gap-1 text-green-600">
                                            <FiUserCheck size={14} /> Hoạt động
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center gap-1 text-red-600">
                                            <FiUserX size={14} /> Đã khóa
                                        </span>
                                    )}
                                </td>

                                {/* Hành động */}
                                <td className="p-3">
                                    <div className="flex items-center justify-start gap-3 h-full">
                                        <button
                                            onClick={() => handleBanToggle(u.id, u.status)}
                                            className={`flex items-center justify-center h-8 px-3 text-sm rounded-md border transition ${u.status === "active"
                                                    ? "text-red-600 border-red-400 hover:bg-red-50"
                                                    : "text-green-600 border-green-400 hover:bg-green-50"
                                                }`}
                                        >
                                            {u.status === "active" ? "Khóa" : "Mở khóa"}
                                        </button>

                                        <button
                                            onClick={() => alert(`📧 Gửi email đến ${u.email}`)}
                                            className="flex items-center justify-center gap-1 h-8 px-3 text-sm rounded-md border border-blue-400 text-blue-600 hover:bg-blue-50 transition"
                                        >
                                            <FiMail size={14} /> Liên hệ
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {filteredUsers.length === 0 && (
                    <div className="text-center py-10 text-gray-500 text-sm">
                        Không có người dùng nào trong danh sách này.
                    </div>
                )}
            </div>
        </section>
    );
}
