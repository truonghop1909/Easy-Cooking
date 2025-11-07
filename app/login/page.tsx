'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../contexts/AuthContext'

export default function LoginPage() {
  const { login } = useAuth()
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const ok = await login(username, password)
    if (!ok) return setError('Sai tài khoản hoặc mật khẩu')

    // ✅ Đọc lại user từ localStorage
    const saved = localStorage.getItem('user')
    if (!saved) return router.push('/')

    const user = JSON.parse(saved)
    console.log("🧭 Role của user:", user.role)

    // ✅ Kiểm tra role để điều hướng
    if (user.role === 'admin') {
      router.push('/admin')
    } else {
      router.push('/')
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-orange-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-md w-[350px]"
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-orange-600">Đăng nhập</h2>
        {error && <p className="text-red-500 mb-3 text-sm">{error}</p>}

        <input
          type="text"
          placeholder="Tên đăng nhập"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 mb-3 border rounded-md"
        />

        <input
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border rounded-md"
        />

        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600"
        >
          Đăng nhập
        </button>
      </form>
    </div>
  )
}
