'use client'
import React, { useState } from 'react'

export interface Author { name: string; avatarUrl: string }
export interface Comment { id: number; postId: number; author: Author; content: string; createdAt: string }
export interface Post {
  id: number; author: Author; content: string; imageUrl?: string | null; createdAt: string;
  likeCount: number; isLiked?: boolean; commentCount: number;
}

import CommentSection from './CommentSection'
import EditPostModal from './EditPostModal'

export default function PostCard({ post }: { post: Post }) {
  const [data, setData] = useState<Post>(post)
  const [showCmt, setShowCmt] = useState(false)
  const [editing, setEditing] = useState(false)

  const toggleLike = async () => {
    // optimistic
    setData(d => ({ ...d, isLiked: !d.isLiked, likeCount: d.likeCount + (d.isLiked ? -1 : 1) }))
    try {
      const res = await fetch(`/api/posts/${data.id}/like`, { method: 'POST' })
      const json = await res.json()
      setData(d => ({ ...d, ...json }))
    } catch (_) {}
  }

  const share = async () => {
    const url = `${window.location.origin}/blog#post-${data.id}`
    await navigator.clipboard.writeText(url)
    alert('Đã copy link bài viết!')
  }

  const report = () => {
    const reason = prompt('Mô tả nội dung cần báo cáo:')
    if (reason) alert('Cảm ơn bạn. Báo cáo đã ghi nhận.')
  }

  return (
    <div id={`post-${data.id}`} className="w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-2xl shadow-md p-4">
      <div className="flex items-center gap-3">
        <img src={data.author.avatarUrl} className="w-10 h-10 rounded-full" alt="avatar" />
        <div>
          <h3 className="font-semibold">{data.author.name}</h3>
          <p className="text-sm text-gray-500">{new Date(data.createdAt).toLocaleString('vi-VN')}</p>
        </div>
      </div>

      <p className="mt-3 text-gray-800 dark:text-gray-200 whitespace-pre-wrap">{data.content}</p>

      {data.imageUrl && (
        <img src={data.imageUrl} alt="post" className="mt-3 rounded-xl max-h-[500px] w-full object-cover" />
      )}

      {/* thanh hành động */}
      <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
        <button onClick={toggleLike} className="px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800">
          {data.isLiked ? '💖 Đã thích' : '🤍 Thích'} · {data.likeCount}
        </button>
        <button onClick={() => setShowCmt(v => !v)} className="px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800">
          💬 Bình luận · {data.commentCount}
        </button>
        <button onClick={share} className="px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800">🔗 Share</button>
        <button onClick={() => setEditing(true)} className="px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800">✏️ Sửa</button>
        <button onClick={report} className="px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800">🚩 Report</button>
      </div>

      {showCmt && <CommentSection postId={data.id} onCount={(n) => setData(d => ({ ...d, commentCount: n }))} />}

      {editing && (
        <EditPostModal
          post={data}
          onClose={() => setEditing(false)}
          onSaved={(p) => setData(p)}
        />
      )}
    </div>
  )
}
