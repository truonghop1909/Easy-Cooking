import { NextRequest, NextResponse } from 'next/server'
import { store } from '../../../_store'

export async function POST(_: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params
  const parsedId = parseInt(id, 10)

  const p = store.posts.find(x => x.id === parsedId)
  if (!p) return NextResponse.json({ message: 'Not found' }, { status: 404 })

  p.isLiked = !p.isLiked
  p.likeCount += p.isLiked ? 1 : -1

  return NextResponse.json({ likeCount: p.likeCount, isLiked: p.isLiked })
}
