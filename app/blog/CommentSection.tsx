'use client'
import { useEffect, useState } from 'react'
import type { Comment, Author } from './PostCard'

export default function CommentSection({
  postId,
  onCount,
}: {
  postId: number
  onCount?: (n: number) => void
}) {
  const [comments, setComments] = useState<Comment[]>([])
  const [page, setPage] = useState(0)
  const [input, setInput] = useState('')
  const size = 10

  // load comment
  useEffect(() => {
    const load = async () => {
      const res = await fetch(`/api/posts/${postId}/comments?page=${page}&size=${size}`)
      const data: Comment[] = await res.json()
      setComments(prev => {
        const merged = [...prev, ...data]
        return merged
      })
    }
    load()
  }, [page, postId])

  // ✅ chỉ gọi onCount khi số lượng thực sự thay đổi
  useEffect(() => {
    if (onCount) {
      onCount(comments.length)
    }
  }, [comments.length]) // không thêm onCount vào deps để tránh tạo hàm mới mỗi render

  const add = async () => {
    if (!input.trim()) return
    const optimistic: Comment = {
      id: Date.now(),
      postId,
      content: input,
      createdAt: new Date().toISOString(),
      author: { name: 'Bạn', avatarUrl: 'https://i.pravatar.cc/150?img=12' } as Author,
    }
    setComments(prev => [optimistic, ...prev])
    setInput('')

    try {
      const res = await fetch(`/api/posts/${postId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: optimistic.content }),
      })
      const saved: Comment = await res.json()
      setComments(prev => [saved, ...prev.filter(c => c.id !== optimistic.id)])
    } catch (err) {
      console.error('Lỗi khi gửi comment:', err)
    }
  }

  return (
    <div className="mt-3">
      <div className="flex gap-2">
        <input
          className="flex-1 p-2 border rounded-md dark:bg-zinc-800 dark:text-white"
          placeholder="Viết bình luận..."
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <button onClick={add} className="px-3 py-2 rounded-md bg-zinc-200">Gửi</button>
      </div>

      <div className="mt-3 flex flex-col gap-3">
        {comments.map(c => (
          <div key={c.id} className="flex gap-2">
            <img src={c.author.avatarUrl} className="w-8 h-8 rounded-full" />
            <div>
              <div className="bg-zinc-100 dark:bg-zinc-800 rounded-2xl px-3 py-2">
                <div className="text-sm font-semibold">{c.author.name}</div>
                <div className="text-sm">{c.content}</div>
              </div>
              <div className="text-xs text-zinc-500 mt-1">
                {new Date(c.createdAt).toLocaleString('vi-VN')}
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => setPage(p => p + 1)}
        className="mt-3 text-sm text-zinc-500"
      >
        Tải thêm bình luận
      </button>
    </div>
  )
}
