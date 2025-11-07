'use client'
import { useState } from 'react'
import { Blog } from '../types/blog'

export default function EditPostModal({
  blog,
  onClose,
  onSaved,
}: {
  blog: Blog
  onClose: () => void
  onSaved: (b: Blog) => void
}) {
  const [content, setContent] = useState(blog.content)
  const [imageUrl, setImageUrl] = useState(blog.image_url || '')
  const [title, setTitle] = useState(blog.title)
  const [loading, setLoading] = useState(false)

  const save = async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/blogs/${blog.blog_id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          content,
          image_url: imageUrl,
        }),
      })
      if (!res.ok) throw new Error('Không thể cập nhật bài viết')
      const updated: Blog = await res.json()
      onSaved(updated)
      onClose()
    } catch (err) {
      console.error('❌ Lỗi cập nhật blog:', err)
      alert('Có lỗi khi lưu bài viết.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="w-full max-w-xl bg-white dark:bg-zinc-900 rounded-2xl p-5">
        <h3 className="font-semibold mb-3 text-lg">✏️ Chỉnh sửa bài viết</h3>

        {/* Tiêu đề */}
        <input
          className="w-full p-2 border rounded-md dark:bg-zinc-800 dark:text-white mb-3"
          placeholder="Tiêu đề bài viết"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* Nội dung */}
        <textarea
          className="w-full p-2 border rounded-md dark:bg-zinc-800 dark:text-white"
          rows={5}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        {/* Ảnh */}
        <input
          className="w-full p-2 border rounded-md mt-2 dark:bg-zinc-800 dark:text-white"
          placeholder="Link ảnh (tuỳ chọn)"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />

        {/* Preview ảnh */}
        {imageUrl && (
          <img
            src={imageUrl}
            alt="preview"
            className="mt-3 rounded-xl max-h-60 object-cover w-full"
          />
        )}

        <div className="mt-4 flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md bg-zinc-200 dark:bg-zinc-800 dark:text-gray-200"
          >
            Hủy
          </button>
          <button
            onClick={save}
            disabled={loading}
            className={`px-4 py-2 rounded-md text-white ${
              loading ? 'bg-gray-400' : 'bg-orange-500 hover:bg-orange-600'
            }`}
          >
            {loading ? 'Đang lưu...' : 'Lưu thay đổi'}
          </button>
        </div>
      </div>
    </div>
  )
}
