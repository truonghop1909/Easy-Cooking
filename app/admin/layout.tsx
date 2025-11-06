"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiHome, FiUsers, FiBookOpen, FiMail } from "react-icons/fi";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", icon: <FiHome />, href: "/admin" },
    { name: "Recipes", icon: <FiBookOpen />, href: "/admin/recipes" },
    { name: "Users", icon: <FiUsers />, href: "/admin/users" },
    { name: "Feedback", icon: <FiMail />, href: "/admin/feedback" },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="text-2xl font-bold p-6 border-b border-gray-700">
          🍳 Admin Panel
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 p-3 rounded-md transition ${
                pathname === item.href
                  ? "bg-orange-500 text-white"
                  : "hover:bg-gray-800 text-gray-300"
              }`}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 bg-gray-50 p-8">{children}</main>
    </div>
  );
}
