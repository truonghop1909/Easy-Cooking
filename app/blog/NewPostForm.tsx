'use client'
import React, { useState } from 'react'
import { Post } from './PostCard' // ⚠️ sửa đúng tên file PostCard.tsx (ông viết nhầm thành PostCart)

export default function NewPostForm({ onPost }: { onPost: (post: Post) => void }) {
  const [content, setContent] = useState('')
  const [imageUrl, setImageUrl] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim()) return

    const newPost: Post = {
      id: Date.now(),
      author: { name: 'Bạn', avatarUrl: 'https://i.pravatar.cc/150?img=12' },
      content,
      imageUrl: imageUrl || null,
      createdAt: new Date().toISOString(),
      likeCount: 0,          // 👈 thêm các trường bắt buộc
      isLiked: false,
      commentCount: 0,
    }

    onPost(newPost)
    setContent('')
    setImageUrl('')
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-2xl shadow p-4 mb-6"
    >
      <textarea
        className="w-full p-2 rounded-md border dark:bg-zinc-800 dark:text-white"
        rows={3}
        placeholder="Chia sẻ công thức hay mẹo nấu ăn của bạn..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <input
        type="text"
        placeholder="Link ảnh (tùy chọn)"
        className="w-full p-2 mt-2 border rounded-md dark:bg-zinc-800 dark:text-white"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />
      <button
        type="submit"
        className="mt-3 bg-orange-500 text-white px-4 py-2 rounded-xl hover:bg-orange-600"
      >
        Đăng bài
      </button>
    </form>
  )
}
