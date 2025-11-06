"use client";

import { useState, useMemo } from "react";
import { FaReply, FaHeart, FaEllipsisH } from "react-icons/fa";

interface Comment {
  id: number;
  recipeId: number;
  parentId: number | null;
  name: string;
  avatar: string;
  text: string;
  time: string;
}

export default function Section9RecipeComments({
  recipeId,
  comments = [],
}: {
  recipeId: number;
  comments: Comment[];
}) {
  const [replyTo, setReplyTo] = useState<number | null>(null);
  const [replyText, setReplyText] = useState("");
  const [newComment, setNewComment] = useState("");

  // Lọc comment theo bài viết
  const recipeComments = useMemo(
    () => comments.filter((c) => c.recipeId === recipeId),
    [recipeId, comments]
  );

  // Comment gốc (parentId = null)
  const rootComments = recipeComments.filter((c) => c.parentId === null);

  // Lấy reply của 1 comment
  const getReplies = (commentId: number) =>
    recipeComments.filter((c) => c.parentId === commentId);

  const handleReplySubmit = (commentId: number) => {
    console.log("Reply to:", commentId, replyText);
    setReplyText("");
    setReplyTo(null);
  };

  const handleNewComment = () => {
    if (!newComment.trim()) return;
    console.log("New comment:", newComment);
    setNewComment("");
  };

  return (
    <section className="mt-12 border-t border-gray-200 pt-8">
      {/* ======== TITLE ======== */}
      <h2 className="text-2xl font-bold mb-6">
        Comments{" "}
        <span className="text-gray-500 text-base">
          ({recipeComments.length})
        </span>
      </h2>

      {/* ======== COMMENT LIST ======== */}
      {rootComments.length === 0 && (
        <p className="text-gray-500 text-sm">No comments yet.</p>
      )}

      <div className="flex flex-col gap-8">
        {rootComments.map((c) => (
          <div key={c.id} className="border-b border-gray-100 pb-6">
            <CommentItem
              comment={c}
              onReplyClick={() => setReplyTo(replyTo === c.id ? null : c.id)}
            />

            {/* Reply input */}
            {replyTo === c.id && (
              <div className="ml-14 mt-3">
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder={`Reply to ${c.name}...`}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
                <button
                  onClick={() => handleReplySubmit(c.id)}
                  className="bg-orange-500 text-white px-4 py-1 rounded-md text-sm mt-2 hover:bg-orange-600 transition"
                >
                  Reply
                </button>
              </div>
            )}

            {/* Reply con */}
            {getReplies(c.id).length > 0 && (
              <div className="mt-4 ml-10 border-l-2 border-gray-100 pl-6">
                {getReplies(c.id).map((r) => (
                  <CommentItem key={r.id} comment={r} isReply />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ======== LOAD MORE ======== */}
      <div className="text-center mt-8">
        <button className="border border-gray-400 px-6 py-2 rounded-md text-sm hover:bg-gray-100 transition">
          Load 25 more comments
        </button>
      </div>

      {/* ======== WRITE A COMMENT ======== */}
      <div className="mt-12 border-t border-gray-200 pt-12">
        <h3 className="text-xl font-semibold mb-3">Write a comment</h3>
        <p className="text-right text-sm text-gray-500 mb-2">
          <a href="#" className="text-orange-500 hover:underline">
            Login
          </a>{" "}
          to post a comment
        </p>

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

/* ================= SUB COMPONENT ================= */

function CommentItem({
  comment,
  onReplyClick,
  isReply = false,
}: {
  comment: Comment;
  onReplyClick?: () => void;
  isReply?: boolean;
}) {
  return (
    <div className="flex items-start gap-4">
      <img
        src={comment.avatar}
        alt={comment.name}
        className={`rounded-full object-cover ${
          isReply ? "w-8 h-8" : "w-10 h-10"
        }`}
      />
      <div className="flex-1">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold">{comment.name}</h3>
          <span className="text-sm text-gray-500">{comment.time}</span>
        </div>
        <p className="text-gray-700 mt-2 leading-relaxed">{comment.text}</p>

        <div className="flex items-center gap-5 mt-3 text-sm text-gray-500">
          {onReplyClick && (
            <button
              onClick={onReplyClick}
              className="flex items-center gap-1 hover:text-orange-500"
            >
              <FaReply size={13} /> Reply
            </button>
          )}
          <button className="flex items-center gap-1 hover:text-orange-500">
            <FaHeart size={13} /> 48
          </button>
          <button className="flex items-center gap-1 hover:text-orange-500">
            <FaEllipsisH size={13} /> More
          </button>
        </div>
      </div>
    </div>
  );
}
