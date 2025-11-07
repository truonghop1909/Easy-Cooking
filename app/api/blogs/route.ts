import { NextResponse } from "next/server";
import { db } from "@/app/api/_mockdb";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get("page") || 0);
  const size = Number(searchParams.get("size") || 10);

  const start = page * size;
  const end = start + size;

  const blogs = db.blogs.slice(start, end);

  return NextResponse.json({
    total: db.blogs.length,
    page,
    size,
    data: blogs,
  });
}

// ✅ THÊM MỚI HÀM POST
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { author_id, title, content, image_url } = body;

    if (!author_id || !content) {
      return NextResponse.json(
        { message: "Thiếu thông tin bài viết" },
        { status: 400 }
      );
    }

    const newBlog = {
      blog_id: db.blogs.length + 1,
      author_id,
      title: title || "Bài viết mới",
      slug: (title || `blog-${Date.now()}`)
        .toLowerCase()
        .replace(/\s+/g, "-"),
      content,
      image_url: image_url || "",
      tags: [],
      stats: { views: 0 }, // ✅ chỉ lưu views
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    db.blogs.unshift(newBlog); // Thêm vào đầu danh sách

    return NextResponse.json(newBlog, { status: 201 });
  } catch (error) {
    console.error("❌ Lỗi khi tạo blog:", error);
    return NextResponse.json(
      { message: "Lỗi server khi tạo bài viết" },
      { status: 500 }
    );
  }
}
