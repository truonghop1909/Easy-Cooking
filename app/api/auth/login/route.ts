import { NextResponse } from "next/server"
import { db } from "../../_mockdb"   // 👈 kiểm tra đường dẫn này


export async function POST(req: Request) {
    console.log("🟢 API /api/auth/login đã được load")
    const body = await req.json()
    const { username, password } = body

    console.log("🟢 Login API nhận:", body)
    console.log("🟢 Tổng user:", db.users.length)

    const user = db.users.find((u) => u.username === username)

    if (!user) {
        console.log("❌ Không có user:", username)
        return NextResponse.json({ message: "Không tồn tại tài khoản" }, { status: 404 })
    }

    if (user.password_hash !== password) {
        console.log("❌ Sai mật khẩu:", password)
        console.log("👉 Mật khẩu đúng phải là:", user.password_hash)
        return NextResponse.json({ message: "Sai mật khẩu" }, { status: 401 })
    }

    console.log("✅ Đăng nhập thành công:", user.username)
    const { password_hash, ...safeUser } = user
    return NextResponse.json({ user: safeUser })
}
