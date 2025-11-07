import { NextResponse } from "next/server";
import { db } from "../../_mockdb";

// ✅ Lấy thông tin user theo ID
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const userId = Number(id);

  const user = db.users.find((u) => u.user_id === userId);

  if (!user) {
    return NextResponse.json({ message: "Không tìm thấy user" }, { status: 404 });
  }

  // Ẩn thông tin nhạy cảm như password_hash
  const { password_hash, ...safeUser } = user;

  return NextResponse.json(safeUser, { status: 200 });
}
