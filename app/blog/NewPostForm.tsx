"use client";
import React, { useState } from 'react'
import { useAuth } from '@/app/contexts/AuthContext'
import { Blog } from '../types/blog'

export default function NewPostForm({ onPost }: { onPost: (blog: Blog) => void }) {
  const { user } = useAuth()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) {
      alert('⚠️ Bạn cần đăng nhập để đăng bài.')
      return
    }
    if (!content.trim() && !title.trim()) return

    setLoading(true)

    try {
      const res = await fetch('/api/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          author_id: user.user_id,
          title,
          content,
          image_url: imageUrl,
        }),
      })

      if (!res.ok) throw new Error('Lỗi khi đăng bài')

      const saved: Blog = await res.json()
      onPost(saved) // ✅ chỉ gọi 1 lần, bài thật từ API

      // Dọn form sau khi đăng thành công
      setTitle('')
      setContent('')
      setImageUrl('')
    } catch (err) {
      console.error('❌ Lỗi khi đăng bài:', err)
      alert('Không thể đăng bài. Vui lòng thử lại.')
    } finally {
      setLoading(false)
    }
  }


  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-2xl shadow p-4 mb-6"
    >
      <h3 className="font-semibold mb-3 text-lg">📝 Viết bài chia sẻ</h3>

      <input
        type="text"
        placeholder="Tiêu đề bài viết..."
        className="w-full p-2 border rounded-md mb-2 dark:bg-zinc-800 dark:text-white"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="w-full p-2 rounded-md border dark:bg-zinc-800 dark:text-white"
        rows={3}
        placeholder="Chia sẻ công thức, mẹo bếp hoặc trải nghiệm của bạn..."
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

      {imageUrl && (
        <img
          src={imageUrl}
          alt="preview"
          className="mt-3 rounded-xl max-h-[400px] w-full object-cover"
        />
      )}

      <button
        type="submit"
        disabled={loading}
        className={`mt-3 px-4 py-2 rounded-xl text-white font-medium transition ${loading ? 'bg-gray-400' : 'bg-orange-500 hover:bg-orange-600'
          }`}
      >
        {loading ? 'Đang đăng...' : 'Đăng bài'}
      </button>
    </form>
  )
}
