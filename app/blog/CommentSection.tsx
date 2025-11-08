"use client";

import { useState, useMemo, useEffect } from "react";
import { FaReply, FaHeart, FaEllipsisH } from "react-icons/fa";
import { useAuth } from "@/app/contexts/AuthContext";

interface Comment {
  comment_id: number;
  content_type: "recipe" | "blog";
  content_id: number;
  user_id: number;
  parent_id: number | null;
  content: string;
  created_at: string;
  user?: { full_name: string; avatar_url: string };
}

export default function CommentSection({
  contentId,
  contentType, // ✅ nhận rõ ràng từ component cha
  onCount,
}: {
  contentId: number;
  contentType: "recipe" | "blog";
  onCount?: (n: number) => void;
}) {
  const { user } = useAuth();

  const [comments, setComments] = useState<Comment[]>([]);
  const [replyTo, setReplyTo] = useState<number | null>(null);
  const [replyText, setReplyText] = useState("");
  const [newComment, setNewComment] = useState("");

  // 🟢 Load comment
  const load = async () => {
    try {
      const res = await fetch(`/api/comments/${contentType}/${contentId}`, {
        cache: "no-store",
      });
      const data = await res.json();

      const list = Array.isArray(data) ? data : data.comments || [];
      setComments(list);

      // ✅ Đếm tổng comment (bao gồm cả reply)
      onCount?.(data.total || list.length);
    } catch (error) {
      console.error("❌ Lỗi tải comment:", error);
    }
  };

  useEffect(() => {
    load();
  }, [contentId, contentType]);

  const rootComments = useMemo(
    () => comments.filter((c) => c.parent_id === null),
    [comments]
  );

  const getReplies = (id: number) =>
    comments.filter((c) => c.parent_id === id);

  // 🟡 Gửi comment hoặc reply
  const sendComment = async (text: string, parent_id: number | null = null) => {
    if (!text.trim()) return;
    if (!user) return alert("⚠️ Bạn cần đăng nhập!");

    const res = await fetch(`/api/comments/${contentType}/${contentId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: user.user_id,
        parent_id,
        content: text,
      }),
    });

    if (res.ok) {
      await load();
      if (parent_id) {
        setReplyText("");
        setReplyTo(null);
      } else {
        setNewComment("");
      }
    }
  };

  return (
    <section className="mt-10 border-t border-gray-200 pt-6">
      <h2 className="text-xl font-semibold mb-6">
        Bình luận{" "}
        <span className="text-gray-500 text-base">
          ({comments.length})
        </span>
      </h2>

      {rootComments.length === 0 && (
        <p className="text-gray-500 text-sm">Chưa có bình luận nào.</p>
      )}

      <div className="flex flex-col gap-8">
        {rootComments.map((c) => (
          <div key={c.comment_id} className="border-b border-gray-100 pb-6">
            <CommentItem
              comment={c}
              onReplyClick={() =>
                setReplyTo(replyTo === c.comment_id ? null : c.comment_id)
              }
            />

            {/* Ô nhập phản hồi */}
            {replyTo === c.comment_id && (
              <div className="ml-14 mt-3">
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder={`Phản hồi ${c.user?.full_name || "người dùng"}...`}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
                <button
                  onClick={() => sendComment(replyText, c.comment_id)}
                  className="bg-orange-500 text-white px-4 py-1 rounded-md text-sm mt-2 hover:bg-orange-600 transition"
                >
                  Gửi phản hồi
                </button>
              </div>
            )}

            {/* Hiển thị reply */}
            {getReplies(c.comment_id).length > 0 && (
              <div className="mt-4 ml-10 border-l-2 border-gray-100 pl-6">
                {getReplies(c.comment_id).map((r) => (
                  <CommentItem key={r.comment_id} comment={r} isReply />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Ô nhập comment mới */}
      <div className="mt-10 border-t border-gray-200 pt-10">
        <h3 className="text-lg font-semibold mb-3">Viết bình luận mới</h3>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="@Tên người dùng Viết bình luận của bạn..."
          className="w-full border border-gray-200 rounded-md px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-1 focus:ring-orange-500"
          rows={4}
        />
        <div className="text-right mt-3">
          <button
            onClick={() => sendComment(newComment)}
            className="bg-orange-500 text-white font-medium px-6 py-2 rounded-md text-sm hover:bg-orange-600 transition"
          >
            Gửi bình luận
          </button>
        </div>
      </div>
    </section>
  );
}

/* 🧩 Sub component: CommentItem */
function CommentItem({
  comment,
  onReplyClick,
  isReply = false,
}: {
  comment: Comment;
  onReplyClick?: () => void;
  isReply?: boolean;
}) {
  const userName = comment.user?.full_name || `User #${comment.user_id}`;
  const avatar = comment.user?.avatar_url || "/avatarTruongHop.jpg";
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  return (
    <div className="flex items-start gap-4">
      <img
        src={avatar}
        alt={userName}
        className={`rounded-full object-cover ${isReply ? "w-8 h-8" : "w-10 h-10"}`}
      />
      <div className="flex-1">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold">{userName}</h3>
          <span className="text-sm text-gray-500">
            {new Date(comment.created_at).toLocaleString("vi-VN")}
          </span>
        </div>
        <p className="text-gray-700 mt-2 leading-relaxed">{comment.content}</p>

        <div className="flex items-center gap-5 mt-3 text-sm text-gray-500">
          {onReplyClick && (
            <button
              onClick={onReplyClick}
              className="flex items-center gap-1 hover:text-orange-500"
            >
              <FaReply size={13} /> Trả lời
            </button>
          )}
          <button
            onClick={() => {
              setLiked((p) => !p);
              setLikeCount((p) => p + (liked ? -1 : 1));
            }}
            className={`flex items-center gap-1 transition ${
              liked ? "text-red-500" : "hover:text-orange-500"
            }`}
          >
            <FaHeart size={13} /> {likeCount}
          </button>
          <button className="flex items-center gap-1 hover:text-orange-500">
            <FaEllipsisH size={13} /> Thêm
          </button>
        </div>
      </div>
    </div>
  );
}
