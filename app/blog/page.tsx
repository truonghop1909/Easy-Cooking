'use client'

import { useEffect, useState, useRef } from 'react'
import NewPostForm from './NewPostForm'
import PostCard from './PostCard'
import { Blog } from '../types/blog'

export default function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [page, setPage] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hasMore, setHasMore] = useState(true)
  const size = 10
  const loadingRef = useRef(false)

  // 🧩 Hàm load blog (phân trang)
  const loadBlogs = async () => {
    if (loadingRef.current || !hasMore) return
    loadingRef.current = true
    setLoading(true)
    setError(null)

    try {
      const res = await fetch(`/api/blogs?page=${page}&size=${size}`, {
        cache: 'no-store',
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)

      // ✅ API trả về object { total, page, size, data: Blog[] }
      const json = await res.json()
      const data: Blog[] = json.data || [] // ✅ Lấy mảng từ json.data

      setBlogs(prev => [...prev, ...data])
      if (data.length < size) setHasMore(false)
    } catch (err: any) {
      console.error('❌ Load blogs error:', err)
      setError('Không tải được bài viết. Kiểm tra API /api/blogs.')
    } finally {
      setLoading(false)
      loadingRef.current = false
    }
  }

  // 📥 Lần đầu load và khi đổi trang
  useEffect(() => {
    loadBlogs()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  // ⚙️ Cuộn để tải thêm
  useEffect(() => {
    const handleScroll = () => {
      if (!hasMore || loadingRef.current) return
      const nearBottom =
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 150
      if (nearBottom) setPage(prev => prev + 1)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [hasMore])

  // 🧡 Khi user đăng bài mới
  const handleNewBlog = (newBlog: Blog) => {
    setBlogs(prev => [newBlog, ...prev])
  }

  return (
    <div className="flex flex-col items-center gap-6 py-8 bg-zinc-100 dark:bg-zinc-950 min-h-screen">
      <NewPostForm onPost={handleNewBlog} />

      {blogs.map(b => (
        <PostCard key={b.blog_id} blog={b} />
      ))}

      {loading && <p className="text-gray-500">Đang tải thêm...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!hasMore && blogs.length > 0 && (
        <p className="text-gray-400">Hết bài rồi 👋</p>
      )}
    </div>
  )
}
