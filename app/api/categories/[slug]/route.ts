import { NextResponse } from "next/server";
import { db } from "@/app/api/_mockdb";

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  const { slug } = await params;
  const category = db.categories.find((c) => c.slug === slug);

  if (!category)
    return NextResponse.json({ message: "Không tìm thấy category" }, { status: 404 });

  return NextResponse.json(category, { status: 200 });
}
