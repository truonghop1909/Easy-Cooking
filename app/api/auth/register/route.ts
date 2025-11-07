import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

export async function POST(req: Request) {
  const body = await req.json()
  const { username, password, full_name, email } = body

  // 📂 Đường dẫn đến file JSON thật
  const dataPath = path.join(process.cwd(), "app/api/_mockdb.json")

  // 📖 Đọc file hiện tại
  const raw = fs.readFileSync(dataPath, "utf8")
  const db = JSON.parse(raw)

  // 🔍 Kiểm tra trùng username
  const existing = db.users.find((u: any) => u.username === username)
  if (existing) {
    return NextResponse.json({ message: "Tài khoản đã tồn tại" }, { status: 400 })
  }

  const now = new Date().toISOString()

  const newUser = {
    user_id: db.users.length + 1,
    username,
    password_hash: password,
    full_name,
    email,
    avatar_url: "/avatarTruongHop.jpg",
    role: "user",
    bio: "",
    email_verified: 0 as 0,
    is_active: 1 as 1,
    created_at: now,
    updated_at: now,
  }

  // 🧠 Thêm user mới
  db.users.push(newUser)

  // 💾 Ghi lại file JSON
  fs.writeFileSync(dataPath, JSON.stringify(db, null, 2), "utf8")

  console.log("✅ User mới đã ghi vào file JSON:", newUser)

  return NextResponse.json({ user: newUser }, { status: 201 })
}
