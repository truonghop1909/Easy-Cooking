'use client'
import { useState } from 'react'
import { Post } from './PostCard';

export default function EditPostModal({
  post, onClose, onSaved,
}: { post: Post; onClose: () => void; onSaved: (p: Post) => void }) {
  const [content, setContent] = useState(post.content)
  const [imageUrl, setImageUrl] = useState(post.imageUrl || '')

  const save = async () => {
    const res = await fetch('/api/posts', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: post.id, content, imageUrl }),
    })
    const data: Post = await res.json()
    onSaved(data)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-white dark:bg-zinc-900 rounded-2xl p-4">
        <h3 className="font-semibold mb-3">Chỉnh sửa bài viết</h3>
        <textarea className="w-full p-2 border rounded-md dark:bg-zinc-800"
          rows={4} value={content} onChange={e => setContent(e.target.value)} />
        <input className="w-full p-2 border rounded-md mt-2 dark:bg-zinc-800"
          placeholder="Link ảnh (tùy chọn)" value={imageUrl}
          onChange={e => setImageUrl(e.target.value)} />
        <div className="mt-3 flex gap-2 justify-end">
          <button onClick={onClose} className="px-3 py-2 rounded-md bg-zinc-200">Hủy</button>
          <button onClick={save} className="px-3 py-2 rounded-md bg-orange-500 text-white">Lưu</button>
        </div>
      </div>
    </div>
  )
}
