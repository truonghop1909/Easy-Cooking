import { NextResponse } from "next/server";
import { db } from "@/app/api/_mockdb";

// 🟢 Lấy toàn bộ danh sách recipes
export async function GET() {
  try {
    return NextResponse.json(db.recipes, { status: 200 });
  } catch (error) {
    console.error("❌ Lỗi khi lấy danh sách recipes:", error);
    return NextResponse.json(
      { message: "Lỗi server khi lấy recipes" },
      { status: 500 }
    );
  }
}
