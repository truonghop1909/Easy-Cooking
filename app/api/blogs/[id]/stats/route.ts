import { NextResponse } from "next/server";
import { db } from "@/app/api/_mockdb";

// 🟢 Cập nhật stats cho 1 bài blog
export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const body = await req.json();
  const { field } = body as { field: "views" | "likes" | "comments" };

  const blog = db.blogs.find((b) => b.blog_id === Number(id));
  if (!blog) {
    return NextResponse.json(
      { message: "Không tìm thấy bài viết" },
      { status: 404 }
    );
  }

  // ✅ Kiểm tra hợp lệ
  if (!["views", "likes", "comments"].includes(field)) {
    return NextResponse.json(
      { message: "Trường không hợp lệ" },
      { status: 400 }
    );
  }

  // ✅ Ép kiểu để tránh lỗi index
  (blog.stats as Record<"views" | "likes" | "comments", number>)[field] += 1;

  blog.updated_at = new Date().toISOString();

  console.log(`✅ Tăng ${field} cho blog ${id}:`, blog.stats[field]);
  return NextResponse.json(blog, { status: 200 });
}
