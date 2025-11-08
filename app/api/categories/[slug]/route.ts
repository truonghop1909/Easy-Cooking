import { NextResponse } from "next/server";
import { db } from "@/app/api/_mockdb";

// ✅ Lấy chi tiết category theo slug
export async function GET(
  req: Request,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params; // 🔥 BẮT BUỘC await (Next.js 15)
  console.log("🟢 Slug nhận được:", slug);

  const category = db.categories.find(
    (c) => c.slug.toLowerCase() === slug.toLowerCase()
  );

  if (!category) {
    console.log("❌ Không tìm thấy slug:", slug);
    return NextResponse.json(
      { message: "Không tìm thấy category" },
      { status: 404 }
    );
  }

  console.log("✅ Tìm thấy:", category.name);
  return NextResponse.json(category, { status: 200 });
}
