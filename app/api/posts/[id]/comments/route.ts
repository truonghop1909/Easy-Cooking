import { NextRequest, NextResponse } from 'next/server'
import { store } from '../../../_store'

export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params
  const parsedId = parseInt(id, 10)
  const { searchParams } = new URL(req.url)
  const page = parseInt(searchParams.get('page') || '0', 10)
  const size = parseInt(searchParams.get('size') || '10', 10)

  const list = store.comments.filter(c => c.postId === parsedId)
  const slice = list.slice(page * size, page * size + size)
  return NextResponse.json(slice)
}

export async function POST(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params
  const parsedId = parseInt(id, 10)

  const { content } = await req.json() as { content: string }

  const newCmt = {
    id: Date.now(),
    postId: parsedId, // ✅ dùng parsedId thay vì id
    author: { name: 'Bạn', avatarUrl: 'https://i.pravatar.cc/150?img=12' },
    content,
    createdAt: new Date().toISOString(),
  }

  store.comments.unshift(newCmt)

  const p = store.posts.find(x => x.id === parsedId) // ✅ so sánh cùng kiểu number
  if (p) p.commentCount += 1

  return NextResponse.json(newCmt, { status: 201 })
}
