import { NextRequest, NextResponse } from 'next/server'
import { store } from '../_store'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const page = parseInt(searchParams.get('page') || '0', 10)
  const size = parseInt(searchParams.get('size') || '10', 10)
  const start = page * size
  const end = start + size
  const slice = store.posts.slice(start, end)
  return NextResponse.json(slice)
}

export async function PUT(req: NextRequest) {
  const body = await req.json() as { id: number; content: string; imageUrl?: string | null }
  const p = store.posts.find(x => x.id === body.id)
  if (!p) return NextResponse.json({ message: 'Not found' }, { status: 404 })
  p.content = body.content
  p.imageUrl = body.imageUrl ?? null
  return NextResponse.json(p)
}
