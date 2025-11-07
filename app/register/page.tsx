'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '../contexts/AuthContext'

export default function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()
  const { login } = useAuth() // dùng login() để lưu user ngay sau đăng ký

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name || !email || !password) {
      alert('Vui lòng nhập đầy đủ thông tin!')
      return
    }

    // 🔹 Giả lập lưu user (sau này có thể gửi API thật)
    const newUser = { name, email }

    // Lưu thông tin user vào localStorage
    localStorage.setItem('registeredUser', JSON.stringify(newUser))

    // Tự động đăng nhập ngay sau khi đăng ký
    await login(email, password)

    alert('Đăng ký thành công!')
    router.push('/')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-zinc-900">
      <form
        onSubmit={handleRegister}
        className="bg-white dark:bg-zinc-800 p-8 rounded-2xl shadow-xl w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-6 text-center text-orange-600">
          Đăng ký tài khoản
        </h1>

        <input
          type="text"
          placeholder="Họ tên"
          className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 dark:bg-zinc-700 dark:text-white"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 dark:bg-zinc-700 dark:text-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Mật khẩu"
          className="w-full p-3 mb-6 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 dark:bg-zinc-700 dark:text-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-medium transition"
        >
          Đăng ký
        </button>

        <p className="text-center mt-4 text-sm text-gray-600 dark:text-gray-300">
          Đã có tài khoản?{' '}
          <Link href="/login" className="text-orange-500 hover:underline">
            Đăng nhập
          </Link>
        </p>
      </form>
    </div>
  )
}
