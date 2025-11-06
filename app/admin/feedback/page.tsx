"use client";

import { useState } from "react";
import { FiMail, FiCheckCircle, FiClock } from "react-icons/fi";

// 🧠 Dữ liệu mẫu (sau này có thể lấy từ API)
const feedbackData = [
  {
    id: 1,
    name: "Hợp Trương",
    email: "hoptruong@example.com",
    message:
      "Giao diện web rất đẹp và dễ dùng! Mình góp ý là thêm phần lọc món ăn theo khẩu phần thì tiện hơn.",
    date: "2025-10-30",
    status: "unread",
  },
  {
    id: 2,
    name: "Lan Anh",
    email: "lananh.cook@example.com",
    message:
      "Công thức đăng lên bị lỗi ảnh minh họa không hiện, mong admin kiểm tra lại nhé!",
    date: "2025-10-28",
    status: "read",
  },
  {
    id: 3,
    name: "Nam Nguyễn",
    email: "namnguyen98@gmail.com",
    message:
      "Mình rất thích phần bình luận có thể reply, nếu thêm tính năng like comment thì càng tuyệt!",
    date: "2025-10-26",
    status: "unread",
  },
];

export default function AdminFeedbackPage() {
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all");

  const filteredFeedbacks =
    filter === "all"
      ? feedbackData
      : feedbackData.filter((f) => f.status === filter);

  const handleMarkAsRead = (id: number) => {
    console.log("Marked as read:", id);
    alert(`✅ Đã đánh dấu góp ý #${id} là ĐÃ XỬ LÝ`);
  };

  return (
    <section>
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">
        Quản lý góp ý người dùng
      </h1>

      {/* Bộ lọc */}
      <div className="flex gap-3 mb-6">
        {[
          { label: "Tất cả", value: "all" },
          { label: "Chưa đọc", value: "unread" },
          { label: "Đã xử lý", value: "read" },
        ].map((item) => (
          <button
            key={item.value}
            onClick={() => setFilter(item.value as any)}
            className={`px-4 py-1.5 rounded-md border text-sm transition ${
              filter === item.value
                ? "bg-orange-500 text-white border-orange-500"
                : "border-gray-300 text-gray-600 hover:bg-gray-100"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Danh sách góp ý */}
      <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100 text-gray-700 text-sm">
            <tr>
              <th className="p-3 text-left w-16">#</th>
              <th className="p-3 text-left">Người gửi</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Nội dung</th>
              <th className="p-3 text-left">Ngày gửi</th>
              <th className="p-3 text-left">Trạng thái</th>
              <th className="p-3 text-left">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {filteredFeedbacks.map((f) => (
              <tr
                key={f.id}
                className="border-b hover:bg-gray-50 text-sm transition"
              >
                <td className="p-3 text-gray-500">{f.id}</td>
                <td className="p-3 font-medium">{f.name}</td>
                <td className="p-3 text-gray-600">{f.email}</td>
                <td className="p-3 text-gray-700 max-w-xs truncate">
                  {f.message}
                </td>
                <td className="p-3 text-gray-500">{f.date}</td>
                <td className="p-3">
                  {f.status === "unread" ? (
                    <span className="inline-flex items-center gap-1 text-yellow-600">
                      <FiClock size={14} /> Chưa đọc
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-green-600">
                      <FiCheckCircle size={14} /> Đã xử lý
                    </span>
                  )}
                </td>
                <td className="p-3">
                  {f.status === "unread" ? (
                    <button
                      onClick={() => handleMarkAsRead(f.id)}
                      className="text-blue-500 hover:underline"
                    >
                      Đánh dấu đã xử lý
                    </button>
                  ) : (
                    <button className="text-gray-400 cursor-not-allowed">
                      ✓
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredFeedbacks.length === 0 && (
          <div className="text-center py-10 text-gray-500 text-sm">
            Không có góp ý nào trong mục này.
          </div>
        )}
      </div>
    </section>
  );
}
