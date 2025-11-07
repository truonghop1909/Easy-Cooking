'use client'
import React, { createContext, useContext, useState, useEffect } from 'react'

interface User {
  user_id: number
  username: string
  full_name: string
  email: string
  avatar_url: string
  role: string
  bio: string
}

interface AuthContextType {
  user: User | null
  login: (username: string, password: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {


  const [user, setUser] = useState<User | null>(null)

  const login = async (username: string, password: string) => {
    try {
      console.log("🚀 Gửi request login:", username, password)
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })
      console.log("📦 Response status:", res.status)
      if (!res.ok) return false

      const data = await res.json()
      console.log("✅ Server trả về:", data)
      setUser(data.user)
      localStorage.setItem('user', JSON.stringify(data.user))
      return true
    } catch (err) {
      console.error("❌ Lỗi login:", err)
      return false
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  useEffect(() => {
    const saved = localStorage.getItem('user')
    if (!saved) return

    try {
      const parsed = JSON.parse(saved)
      setUser(parsed)
    } catch (err) {
      console.error("⚠️ Lỗi khi đọc localStorage user:", err)
      localStorage.removeItem('user') // xoá dữ liệu bị hỏng
    }
  }, [])


  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
