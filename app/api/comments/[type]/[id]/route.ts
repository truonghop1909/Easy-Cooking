import { NextResponse } from "next/server";
import { db } from "@/app/api/_mockdb";

// Kiểu comment tường minh
interface Comment {
  comment_id: number;
  content_type: "recipe" | "blog";
  content_id: number;
  user_id: number;
  parent_id: number | null;
  content: string;
  created_at: string;
}

// 🟢 LẤY DANH SÁCH COMMENT THEO BÀI VIẾT
export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const blogId = Number(id);

  const comments = db.comments
    .filter((c) => c.content_type === "blog" && c.content_id === blogId)
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )
    .map((c) => {
      const user = db.users.find((u) => u.user_id === c.user_id);
      return {
        ...c,
        user: user
          ? { full_name: user.full_name, avatar_url: user.avatar_url }
          : null,
      };
    });

  return NextResponse.json(comments, { status: 200 });
}

// 🟢 THÊM COMMENT MỚI
export async function POST(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const blogId = Number(id);
  const { user_id, content, parent_id = null } = await req.json();

  const user = db.users.find((u) => u.user_id === user_id);
  if (!user)
    return NextResponse.json({ message: "User không tồn tại" }, { status: 404 });

  const blog = db.blogs.find((b) => b.blog_id === blogId);
  if (!blog)
    return NextResponse.json(
      { message: "Không tìm thấy bài viết" },
      { status: 404 }
    );

  // ✅ ép kiểu rõ ràng để TS hiểu content_type là literal
  const newComment: Comment = {
    comment_id: db.comments.length + 1,
    content_type: "blog",
    content_id: blogId,
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
      avatar_url: user.avatar_url,
    },
  };

  return NextResponse.json(response, { status: 201 });
}
