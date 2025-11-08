import { NextResponse } from "next/server";
import { db } from "@/app/api/_mockdb";
import { Friend } from "@/app/types/friend";

// 🟢 ADMIN: LẤY TOÀN BỘ QUAN HỆ
export async function GET() {
  return NextResponse.json(db.friends, { status: 200 });
}

// 🟠 ADMIN: THÊM QUAN HỆ
export async function POST(req: Request) {
  const { user_id, friend_id, status = "accepted" } = await req.json();

  if (!user_id || !friend_id)
    return NextResponse.json({ message: "Thiếu user_id hoặc friend_id" }, { status: 400 });

  const exists = db.friends.find(
    (f) =>
      (f.user_id === user_id && f.friend_id === friend_id) ||
      (f.user_id === friend_id && f.friend_id === user_id)
  );

  if (exists)
    return NextResponse.json({ message: "Mối quan hệ đã tồn tại" }, { status: 400 });

  const newFriend: Friend = {
    id: db.friends.length + 1,
    user_id,
    friend_id,
    created_at: new Date().toISOString(),
    status,
  };

  db.friends.push(newFriend);
  return NextResponse.json(newFriend, { status: 201 });
}

// 🔴 ADMIN: XÓA QUAN HỆ
export async function DELETE(req: Request) {
  const { user_id, friend_id } = await req.json();

  if (!user_id || !friend_id)
    return NextResponse.json({ message: "Thiếu user_id hoặc friend_id" }, { status: 400 });

  const beforeCount = db.friends.length;

  db.friends = db.friends.filter(
    (f) =>
      !(
        (f.user_id === user_id && f.friend_id === friend_id) ||
        (f.user_id === friend_id && f.friend_id === user_id)
      )
  );

  const afterCount = db.friends.length;

  if (beforeCount === afterCount)
    return NextResponse.json({ message: "Không tìm thấy mối quan hệ cần xóa" }, { status: 404 });

  return NextResponse.json({ message: "Đã xóa quan hệ bạn bè" }, { status: 200 });
}
