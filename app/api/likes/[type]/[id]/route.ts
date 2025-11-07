import { NextResponse } from "next/server";
import { db } from "@/app/api/_mockdb";

// 🟢 LẤY DANH SÁCH LIKE
export async function GET(
  req: Request,
  context: { params: Promise<{ type: "recipe" | "blog"; id: string }> }
) {
  const { type, id } = await context.params; // ✅ phải await
  const contentId = Number(id);

  const likes = db.likes.filter(
    (l) => l.content_type === type && l.content_id === contentId
  );

  return NextResponse.json(
    {
      count: likes.length,
      likes,
    },
    { status: 200 }
  );
}

// 🟠 THÊM / BỎ LIKE
export async function POST(
  req: Request,
  context: { params: Promise<{ type: "recipe" | "blog"; id: string }> }
) {
  const { type, id } = await context.params; // ✅ chỗ này cũng vậy
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
    // ❌ Nếu đã like => bỏ like
    db.likes = db.likes.filter((l) => l.like_id !== existing.like_id);
  } else {
    // ✅ Nếu chưa like => thêm like
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
      liked: !existing, // true = vừa like, false = bỏ like
      count: updated.length,
      likes: updated,
    },
    { status: 200 }
  );
}
