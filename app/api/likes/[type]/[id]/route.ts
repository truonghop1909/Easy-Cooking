import { NextResponse } from "next/server";
import { db } from "@/app/api/_mockdb";
import { Like } from "@/app/types/like";

// 🟩 Lấy danh sách like + tổng số like của 1 nội dung (blog, recipe, ...)
export async function GET(
  req: Request,
  context: { params: Promise<{ type: string; id: string }> }
) {
  const { type, id } = await context.params;
  const targetId = Number(id);

  // 🔍 Lọc tất cả likes thuộc nội dung cụ thể
  const likes = db.likes
    .filter((l: Like) => l.content_type === type && l.content_id === targetId)
    // 🧠 Gắn thêm thông tin user (join)
    .map((l: Like) => {
      const user = db.users.find((u) => u.user_id === l.user_id);
      return {
        ...l,
        user: user
          ? {
              full_name: user.full_name,
              avatar_url: user.avatar_url || "/avatarTruongHop.jpg",
            }
          : undefined,
      };
    });

  return NextResponse.json(
    {
      count: likes.length,
      likes,
    },
    { status: 200 }
  );
}

// 🟥 Toggle Like (Like/Unlike)
export async function POST(
  req: Request,
  context: { params: Promise<{ type: string; id: string }> }
) {
  const { type, id } = await context.params;
  const { user_id } = await req.json();

  if (!user_id)
    return NextResponse.json({ message: "Thiếu user_id" }, { status: 400 });

  const targetId = Number(id);

  // 🔍 Kiểm tra đã like chưa
  const existing = db.likes.find(
    (l: Like) =>
      l.user_id === user_id &&
      l.content_type === type &&
      l.content_id === targetId
  );

  // 💔 Nếu đã like → bỏ like
  if (existing) {
    db.likes = db.likes.filter((l) => l !== existing);
    const count = db.likes.filter(
      (l: Like) => l.content_type === type && l.content_id === targetId
    ).length;

    console.log(`💔 ${user_id} unliked ${type} ${id}`);
    return NextResponse.json({ liked: false, count }, { status: 200 });
  }

  // ❤️ Nếu chưa like → thêm mới
  const newLike: Like = {
    like_id: db.likes.length + 1,
    content_type: type as "blog" | "recipe",
    content_id: targetId,
    user_id,
    created_at: new Date().toISOString(),
  };

  db.likes.push(newLike);

  const count = db.likes.filter(
    (l: Like) => l.content_type === type && l.content_id === targetId
  ).length;

  console.log(`❤️ ${user_id} liked ${type} ${id}`);
  return NextResponse.json({ liked: true, count }, { status: 201 });
}
