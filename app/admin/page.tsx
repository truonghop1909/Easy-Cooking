"use client";

export default function AdminDashboard() {
  const stats = [
    { label: "Tổng số công thức", value: 42 },
    { label: "Người dùng", value: 18 },
    { label: "Góp ý gửi đến", value: 7 },
    { label: "Bình luận", value: 135 },
  ];

  return (
    <section>
      <h1 className="text-3xl font-semibold mb-8 text-gray-800">
        Dashboard Tổng Quan
      </h1>

      {/* Thống kê */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s) => (
          <div
            key={s.label}
            className="bg-white shadow-sm border rounded-xl p-6 text-center hover:shadow-md transition"
          >
            <h2 className="text-2xl font-bold text-orange-500">{s.value}</h2>
            <p className="text-gray-600 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Hoạt động gần đây
        </h2>
        <div className="bg-white border rounded-xl p-6 shadow-sm">
          <ul className="space-y-3 text-gray-600 text-sm">
            <li>🍰 Người dùng <b>Hợp Trương</b> đã đăng công thức mới: “Bánh bông lan kem dâu”.</li>
            <li>🧑‍🍳 <b>Lan Anh</b> vừa gửi góp ý cho trang công thức.</li>
            <li>💬 <b>Nam Nguyễn</b> đã bình luận về “Classic Tomato Basil Pasta”.</li>
            <li>✅ Admin duyệt công thức “Vegan Salad Delight”.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
