import { NextResponse } from "next/server";
import { db } from "@/app/api/_mockdb";
import { Comment } from "@/app/types/comment";

// 🟢 LẤY TẤT CẢ COMMENT (GỒM CẢ REPLY)
export async function GET(
  req: Request,
  context: { params: Promise<{ type: string; id: string }> }
) {
  const { type, id } = await context.params;
  const contentId = Number(id);

  // ✅ Lấy tất cả comment có cùng content_type & content_id
  const comments = db.comments.filter(
    (c: Comment) =>
      c.content_type === type &&
      String(c.content_id) === String(contentId) // tránh lỗi kiểu dữ liệu
  );

  // ✅ Tổng bao gồm cả comment con
  const total = comments.length;

  // ✅ Gắn thông tin người dùng cho từng comment
  const enriched = comments
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )
    .map((c: Comment) => {
      const user = db.users.find((u) => u.user_id === c.user_id);
      return {
        ...c,
        user: user
          ? {
              full_name: user.full_name,
              avatar_url: user.avatar_url || "/avatarTruongHop.jpg",
            }
          : undefined,
      };
    });

  console.log(
    `🟢 API COMMENTS: type=${type}, id=${contentId}, total=${total}, found=${enriched.length}`
  );

  return NextResponse.json(
    {
      total, // ✅ tổng cả cha + con
      comments: enriched,
    },
    { status: 200 }
  );
}

// 🟡 THÊM COMMENT MỚI
export async function POST(
  req: Request,
  context: { params: Promise<{ type: string; id: string }> }
) {
  const { type, id } = await context.params;
  const contentId = Number(id);
  const { user_id, content, parent_id = null } = await req.json();

  if (!user_id || !content) {
    return NextResponse.json(
      { message: "Thiếu thông tin bình luận" },
      { status: 400 }
    );
  }

  const user = db.users.find((u) => u.user_id === user_id);
  if (!user)
    return NextResponse.json({ message: "User không tồn tại" }, { status: 404 });

  const valid =
    type === "blog"
      ? db.blogs.find((b) => b.blog_id === contentId)
      : db.recipes.find((r) => r.recipe_id === contentId);

  if (!valid)
    return NextResponse.json(
      { message: `Không tìm thấy ${type}` },
      { status: 404 }
    );

  const newComment: Comment = {
    comment_id: db.comments.length + 1,
    content_type: type as "blog" | "recipe",
    content_id: contentId,
    user_id,
    parent_id,
    content,
    created_at: new Date().toISOString(),
  };

  db.comments.unshift(newComment);

  const response = {
    ...newComment,
    user: {
      full_name: user.full_name,
      avatar_url: user.avatar_url || "/avatarTruongHop.jpg",
    },
  };

  console.log(`💬 ${user.full_name} bình luận vào ${type} ${id}`);
  return NextResponse.json(response, { status: 201 });
}
