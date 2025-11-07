import { NextResponse } from "next/server";
import { db } from "@/app/api/_mockdb";

// GET /api/categories
export async function GET() {
  return NextResponse.json(db.categories, { status: 200 });
}
