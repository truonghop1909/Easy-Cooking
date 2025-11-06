'use client'
import { useEffect, useState, useRef } from 'react'
import NewPostForm from './NewPostForm'
import PostCard, { Post } from './PostCard'

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [page, setPage] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hasMore, setHasMore] = useState(true)
  const size = 10
  const loadingRef = useRef(false) // chặn gọi trùng

  const loadPosts = async () => {
    if (loadingRef.current || !hasMore) return
    loadingRef.current = true
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`/api/posts?page=${page}&size=${size}`)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data: Post[] = await res.json()

      setPosts(prev => [...prev, ...data])
      // Nếu ít hơn size ⇒ hết dữ liệu
      if (data.length < size) setHasMore(false)
    } catch (e: any) {
      console.error('Load posts error:', e)
      setError('Không tải được bài viết. Kiểm tra API /api/posts.')
    } finally {
      setLoading(false)
      loadingRef.current = false
    }
  }

  useEffect(() => { loadPosts() }, [page])

  useEffect(() => {
    const onScroll = () => {
      if (!hasMore || loadingRef.current) return
      const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 150
      if (nearBottom) setPage(prev => prev + 1)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [hasMore])

  const handleNewPost = (newPost: Post) => {
    setPosts(prev => [newPost, ...prev])
  }

  return (
    <div className="flex flex-col items-center gap-6 py-8 bg-zinc-100 dark:bg-zinc-950 min-h-screen">
      <NewPostForm onPost={handleNewPost} />
      {posts.map(p => <PostCard key={p.id} post={p} />)}
      {loading && <p className="text-gray-500">Đang tải thêm...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!hasMore && posts.length > 0 && <p className="text-gray-400">Hết bài rồi 👋</p>}
    </div>
  )
}
