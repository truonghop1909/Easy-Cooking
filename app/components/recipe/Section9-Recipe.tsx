"use client";

import { useState, useMemo, useEffect } from "react";
import { usePathname } from "next/navigation";
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
  user?: {
    full_name: string;
    avatar_url: string;
  };
}

export default function Section9RecipeComments({ contentId }: { contentId: number }) {
  const { user } = useAuth(); // ✅ Hook nằm đúng chỗ
  const pathname = usePathname();
  const contentType: "recipe" | "blog" = pathname.includes("/blog/") ? "blog" : "recipe";

  const [comments, setComments] = useState<Comment[]>([]);
  const [replyTo, setReplyTo] = useState<number | null>(null);
  const [replyText, setReplyText] = useState("");
  const [newComment, setNewComment] = useState("");

  // ✅ Fetch comments khi load trang
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`/api/comments/${contentType}/${contentId}`);
        if (!res.ok) throw new Error("Không thể tải bình luận");
        const data = await res.json();
        setComments(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchComments();
  }, [contentId, contentType]);

  // ✅ Comment cha (parent)
  const rootComments = useMemo(
    () => comments.filter((c) => c.parent_id === null),
    [comments]
  );

  // ✅ Comment con (reply)
  const getReplies = (id: number) =>
    comments.filter((c) => c.parent_id === id);

  // ✅ Gửi comment mới
  const handleNewComment = async () => {
    if (!newComment.trim()) return;
    if (!user) {
      alert("Bạn cần đăng nhập để bình luận!");
      return;
    }

    try {
      const res = await fetch(`/api/comments/${contentType}/${contentId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: user.user_id,
          content: newComment,
        }),
      });

      const newCmt = await res.json();
      setComments((prev) => [newCmt, ...prev]);
      setNewComment("");
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Gửi reply
  const handleReplySubmit = async (parentId: number) => {
    if (!replyText.trim()) return;
    if (!user) {
      alert("Bạn cần đăng nhập để trả lời!");
      return;
    }

    try {
      const res = await fetch(`/api/comments/${contentType}/${contentId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: user.user_id,
          parent_id: parentId,
          content: replyText,
        }),
      });

      if (!res.ok) throw new Error("Không thể gửi phản hồi");

      const newReply = await res.json();
      setComments((prev) => [newReply, ...prev]);
      setReplyText("");
      setReplyTo(null);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="mt-12 border-t border-gray-200 pt-8">
      <h2 className="text-2xl font-bold mb-6">
        Comments{" "}
        <span className="text-gray-500 text-base">({comments.length})</span>
      </h2>

      {rootComments.length === 0 && (
        <p className="text-gray-500 text-sm">No comments yet.</p>
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

            {replyTo === c.comment_id && (
              <div className="ml-14 mt-3">
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder={`Reply to ${c.user?.full_name || "user"}...`}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
                <button
                  onClick={() => handleReplySubmit(c.comment_id)}
                  className="bg-orange-500 text-white px-4 py-1 rounded-md text-sm mt-2 hover:bg-orange-600 transition"
                >
                  Reply
                </button>
              </div>
            )}

            {/* Các reply con */}
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

      {/* Viết comment mới */}
      <div className="mt-12 border-t border-gray-200 pt-12">
        <h3 className="text-xl font-semibold mb-3">Write a comment</h3>

        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="@User Write your comment here..."
          className="w-full border border-gray-200 rounded-md px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-1 focus:ring-orange-500"
          rows={4}
        />

        <div className="text-right mt-3">
          <button
            onClick={handleNewComment}
            className="bg-orange-500 text-white font-medium px-6 py-2 rounded-md text-sm hover:bg-orange-600 transition"
          >
            Post comment
          </button>
        </div>
      </div>
    </section>
  );
}

/* =============== Sub component =============== */
function CommentItem({
  comment,
  onReplyClick,
  isReply = false,
}: {
  comment: Comment;
  onReplyClick?: () => void;
  isReply?: boolean;
}) {
  const { user } = useAuth(); // ✅ Hook hợp lệ trong component con
  const userName = comment.user?.full_name || `User #${comment.user_id}`;
  const avatar = comment.user?.avatar_url || "/avatarTruongHop.jpg";
  const contentType = comment.content_type;
  const contentId = comment.content_id;

  // ❤️ State like
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState<number>(0);

  // Fetch tổng like
  useEffect(() => {
    const fetchLikes = async () => {
      const res = await fetch(`/api/likes/${contentType}/${contentId}`);
      const data = await res.json();
      setLikeCount(data.count);

      if (user && data.likes.some((l: any) => l.user_id === user.user_id)) {
        setLiked(true);
      }
    };
    fetchLikes();
  }, [contentType, contentId, user]);

  // Toggle like
  const handleToggleLike = async () => {
    if (!user) {
      alert("Bạn cần đăng nhập để thả tim ❤️");
      return;
    }

    try {
      const res = await fetch(`/api/likes/${contentType}/${contentId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: user.user_id }),
      });
      const data = await res.json();
      setLiked(data.liked);
      setLikeCount(data.count);
    } catch (err) {
      console.error("Lỗi khi thả tim:", err);
    }
  };

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
          {/* Reply */}
          {onReplyClick && (
            <button
              onClick={onReplyClick}
              className="flex items-center gap-1 hover:text-orange-500"
            >
              <FaReply size={13} /> Reply
            </button>
          )}

          {/* ❤️ Like */}
          <button
            onClick={handleToggleLike}
            className={`flex items-center gap-1 transition ${
              liked ? "text-red-500" : "hover:text-orange-500"
            }`}
          >
            <FaHeart size={13} />
            {likeCount}
          </button>

          {/* More */}
          <button className="flex items-center gap-1 hover:text-orange-500">
            <FaEllipsisH size={13} /> More
          </button>
        </div>
      </div>
    </div>
  );
}
