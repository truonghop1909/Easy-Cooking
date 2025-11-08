"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/app/contexts/AuthContext";
import CommentSection from "./CommentSection";
import EditPostModal from "./EditPostModal";
import { Blog } from "../types/blog";

export default function PostCard({ blog }: { blog: Blog }) {
  const { user } = useAuth();

  // ✅ Bỏ stats gốc của blog, chỉ giữ views vì likes/comments tính động
  const [data, setData] = useState<Blog>(blog);
  const [stats, setStats] = useState({
    views: blog.stats?.views || 0,
    likes: 0,
    comments: 0,
  });
  const [liked, setLiked] = useState(false);
  const [showCmt, setShowCmt] = useState(false);
  const [editing, setEditing] = useState(false);

  // 🧑 Tác giả
  const [author, setAuthor] = useState<{ name: string; avatar: string }>({
    name: "Ẩn danh",
    avatar: "/avatarTruongHop.jpg",
  });

  // 🔹 Lấy thông tin tác giả
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`/api/users/${data.author_id}`);
        if (!res.ok) return;
        const u = await res.json();
        setAuthor({
          name: u.full_name,
          avatar: u.avatar_url || "/avatarTruongHop.jpg",
        });
      } catch (err) {
        console.error("❌ Lỗi tải tác giả:", err);
      }
    })();
  }, [data.author_id]);

  // 🔹 Hàm tải lại thống kê thật (like + comment)
  const refreshStats = useCallback(async () => {
    try {
      const [likeRes, cmtRes] = await Promise.all([
        fetch(`/api/likes/blog/${data.blog_id}`, { cache: "no-store" }),
        fetch(`/api/comments/blog/${data.blog_id}`, { cache: "no-store" }),
      ]);

      if (!likeRes.ok || !cmtRes.ok) throw new Error("Fetch lỗi");

      const likeData = await likeRes.json();
      const cmtData = await cmtRes.json();

      // ✅ Đếm tất cả comment (bao gồm reply)
      const totalComments = Array.isArray(cmtData)
        ? cmtData.filter((c: any) => c.content_id === data.blog_id).length
        : 0;

      setStats({
        views: blog.stats?.views || 0,
        likes: likeData.count || 0,
        comments: cmtData.total || cmtData.comments?.length || 0, // ✅ lấy tổng thực
      });


      // Kiểm tra user đã like chưa
      if (user && likeData.likes?.some((l: any) => l.user_id === user.user_id)) {
        setLiked(true);
      } else {
        setLiked(false);
      }
    } catch (err) {
      console.error("❌ Lỗi tải thống kê:", err);
    }
  }, [data.blog_id, user, blog.stats?.views]);


  // 📦 Tải 1 lần khi mount + khi user thay đổi
  useEffect(() => {
    refreshStats();
  }, [refreshStats]);

  // ❤️ Like / Unlike
  const handleLike = async () => {
    if (!user) return alert("Bạn cần đăng nhập để thả tim ❤️");

    const optimistic = !liked;
    setLiked(optimistic);
    setStats((prev) => ({
      ...prev,
      likes: prev.likes + (optimistic ? 1 : -1),
    }));

    try {
      const res = await fetch(`/api/likes/blog/${data.blog_id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: user.user_id }),
      });
      const json = await res.json();
      setLiked(json.liked);
      setStats((prev) => ({ ...prev, likes: json.count }));
    } catch (err) {
      console.error("❌ Lỗi khi like:", err);
      // rollback nếu lỗi
      setStats((prev) => ({
        ...prev,
        likes: prev.likes + (optimistic ? -1 : 1),
      }));
      setLiked(!optimistic);
    }
  };

  // 🔗 Chia sẻ
  const handleShare = async () => {
    const url = `${window.location.origin}/blog/${data.slug}`;
    await navigator.clipboard.writeText(url);
    alert("🔗 Đã sao chép link bài viết!");
  };

  // 🚩 Báo cáo
  const handleReport = () => {
    const reason = prompt("Mô tả nội dung cần báo cáo:");
    if (reason) alert("Cảm ơn bạn! Báo cáo đã được ghi nhận.");
  };

  return (
    <div
      id={`blog-${data.blog_id}`}
      className="w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-2xl shadow-md p-4 mx-auto"
    >
      {/* 🧑 Header tác giả */}
      <div className="flex items-center gap-3">
        <img
          src={author.avatar}
          className="w-10 h-10 rounded-full object-cover"
          alt={author.name}
        />
        <div>
          <h3 className="font-semibold">{author.name}</h3>
          <p className="text-sm text-gray-500">
            {new Date(data.created_at).toLocaleString("vi-VN")}
          </p>
        </div>
      </div>

      {/* 📝 Tiêu đề + nội dung */}
      <h2 className="text-xl font-semibold mt-4 text-gray-900 dark:text-gray-100">
        {data.title}
      </h2>
      <p className="mt-3 text-gray-800 dark:text-gray-300 whitespace-pre-wrap">
        {data.content}
      </p>

      {/* 🖼️ Ảnh minh họa */}
      {data.image_url && (
        <img
          src={data.image_url}
          alt={data.title}
          className="mt-3 rounded-xl max-h-[500px] w-full object-cover"
        />
      )}

      {/* 🏷️ Tags */}
      {data.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {data.tags.map((tag, i) => (
            <span
              key={i}
              className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-md"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* ⚙️ Thanh hành động */}
      <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
        <button
          onClick={handleLike}
          className={`px-3 py-1 rounded-full transition ${liked
            ? "bg-pink-100 text-pink-600"
            : "bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200"
            }`}
        >
          {liked ? "💖 Đã thích" : "🤍 Thích"} · {stats.likes}
        </button>

        <button
          onClick={() => setShowCmt((v) => !v)}
          className="px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200"
        >
          💬 Bình luận · {stats.comments}
        </button>

        <button
          onClick={handleShare}
          className="px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200"
        >
          🔗 Chia sẻ
        </button>

        <button
          onClick={() => setEditing(true)}
          className="px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200"
        >
          ✏️ Sửa
        </button>

        <button
          onClick={handleReport}
          className="px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200"
        >
          🚩 Báo cáo
        </button>
      </div>

      {/* 💬 Bình luận */}
      {showCmt && (
        <CommentSection
          contentId={data.blog_id}
          contentType="blog"        // ✅ thêm dòng này
          onCount={(n) =>
            setStats((prev) => ({
              ...prev,
              comments: n,
            }))
          }
        />

      )}

      {/* ✏️ Modal sửa bài */}
      {editing && (
        <EditPostModal
          blog={data}
          onClose={() => setEditing(false)}
          onSaved={(b) => setData(b)}
        />
      )}
    </div>
  );
}
