import { NextResponse } from "next/server";
import { db } from "@/app/api/_mockdb";

// ✅ Lấy chi tiết category theo slug
export async function GET(
  req: Request,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params; // ✅ phải await Promise
  const category = db.categories.find((c) => c.slug === slug);

  if (!category) {
    return NextResponse.json(
      { message: "Không tìm thấy category" },
      { status: 404 }
    );
  }

  return NextResponse.json(category, { status: 200 });
}
