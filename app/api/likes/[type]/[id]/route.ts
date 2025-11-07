import { NextResponse } from "next/server";
import { db } from "@/app/api/_mockdb";

// ✅ Lấy danh sách like theo bài viết hoặc công thức
export async function GET(
  req: Request,
  context: { params: Promise<{ type: string; id: string }> } // 👈 để type là string
) {
  const { type, id } = await context.params;
  const contentId = Number(id);

  // 👇 ép kiểu về "recipe" | "blog" nếu đúng, ngược lại bỏ qua
  const safeType = type === "blog" || type === "recipe" ? type : "blog";

  const likes = db.likes.filter(
    (l) => l.content_type === safeType && l.content_id === contentId
  );

  return NextResponse.json(
    { count: likes.length, likes },
    { status: 200 }
  );
}

// ✅ Thêm / Bỏ Like
export async function POST(
  req: Request,
  context: { params: Promise<{ type: string; id: string }> } // 👈 cũng là string
) {
  const { type, id } = await context.params;
  const contentId = Number(id);
  const { user_id } = await req.json();

  if (!user_id)
    return NextResponse.json({ message: "Thiếu user_id" }, { status: 400 });

  const safeType = type === "blog" || type === "recipe" ? type : "blog";

  const existing = db.likes.find(
    (l) =>
      l.content_type === safeType &&
      l.content_id === contentId &&
      l.user_id === user_id
  );

  if (existing) {
    // Nếu đã like -> bỏ like
    db.likes = db.likes.filter((l) => l.like_id !== existing.like_id);
  } else {
    // Nếu chưa like -> thêm like
    db.likes.push({
      like_id: db.likes.length + 1,
      content_type: safeType,
      content_id: contentId,
      user_id,
      created_at: new Date().toISOString(),
    });
  }

  const updated = db.likes.filter(
    (l) => l.content_type === safeType && l.content_id === contentId
  );

  return NextResponse.json(
    { liked: !existing, count: updated.length, likes: updated },
    { status: 200 }
  );
}
