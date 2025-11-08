import { NextResponse } from "next/server";
import { db } from "@/app/api/_mockdb";

// 🟢 LẤY DANH SÁCH BLOG (có phân trang)
export async function GET(req: Request) {
  try {
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
  } catch (error) {
    console.error("❌ Lỗi khi GET blogs:", error);
    return NextResponse.json(
      { message: "Lỗi server khi lấy danh sách blogs" },
      { status: 500 }
    );
  }
}

// 🟠 TẠO MỚI BLOG
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

    const slug = (title || `blog-${Date.now()}`)
      .toLowerCase()
      .replace(/\s+/g, "-");

    const newBlog = {
      blog_id: db.blogs.length + 1,
      author_id,
      title: title || "Bài viết mới",
      slug,
      content,
      image_url: image_url || "https://picsum.photos/seed/new-blog/800/600",
      tags: [],
      stats: {
        views: 0,
        likes: 0,
        comments: 0,
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    db.blogs.unshift(newBlog);

    console.log("✅ Đã tạo blog:", newBlog.title);
    return NextResponse.json(newBlog, { status: 201 });
  } catch (error) {
    console.error("❌ Lỗi khi tạo blog:", error);
    return NextResponse.json(
      { message: "Lỗi server khi tạo bài viết" },
      { status: 500 }
    );
  }
}
