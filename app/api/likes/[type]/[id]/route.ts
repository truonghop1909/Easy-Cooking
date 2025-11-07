import { NextResponse } from "next/server";
import { db } from "@/app/api/_mockdb";

// Lấy danh sách like của bài hoặc công thức
export async function GET(
  req: Request,
  { params }: { params: { type: "recipe" | "blog"; id: string } }
) {
  const { type, id } = await params;
  const contentId = Number(id);

  const likes = db.likes.filter(
    (l) => l.content_type === type && l.content_id === contentId
  );

  return NextResponse.json(
    {
      count: likes.length,
      likes: likes,
    },
    { status: 200 }
  );
}

// Thêm / bỏ like
export async function POST(
  req: Request,
  { params }: { params: { type: "recipe" | "blog"; id: string } }
) {
  const { type, id } = await params;
  const contentId = Number(id);
  const { user_id } = await req.json();

  if (!user_id)
    return NextResponse.json({ message: "Thiếu user_id" }, { status: 400 });

  const existing = db.likes.find(
    (l) =>
      l.content_type === type &&
      l.content_id === contentId &&
      l.user_id === user_id
  );

  if (existing) {
    // Nếu đã like => bỏ like
    db.likes = db.likes.filter((l) => l.like_id !== existing.like_id);
  } else {
    // Nếu chưa like => thêm like
    db.likes.push({
      like_id: db.likes.length + 1,
      content_type: type,
      content_id: contentId,
      user_id,
      created_at: new Date().toISOString(),
    });
  }

  const updated = db.likes.filter(
    (l) => l.content_type === type && l.content_id === contentId
  );

  return NextResponse.json(
    {
      liked: !existing, // true nếu mới like, false nếu bỏ like
      count: updated.length,
      likes: updated,
    },
    { status: 200 }
  );
}
