import { NextResponse } from "next/server";
import { db } from "@/app/api/_mockdb";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const userId = Number(id);

  const friends = db.friends.filter(
    (f) => f.user_id === userId || f.friend_id === userId
  );

  return NextResponse.json(friends, { status: 200 });
}

export async function POST(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const userId = Number(id);
  const { friend_id } = await req.json();

  const existing = db.friends.find(
    (f) =>
      (f.user_id === userId && f.friend_id === friend_id) ||
      (f.friend_id === userId && f.user_id === friend_id)
  );

  if (existing) {
    db.friends = db.friends.filter((f) => f !== existing);
    return NextResponse.json({ message: "Đã hủy kết bạn", added: false });
  }

  db.friends.push({
    id: db.friends.length + 1,
    user_id: userId,
    friend_id,
    status: "accepted",
    created_at: new Date().toISOString(),
  });

  return NextResponse.json({ message: "Kết bạn thành công!", added: true });
}
