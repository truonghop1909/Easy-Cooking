export interface User {
  user_id: number
  username: string
  full_name: string
  email: string
  password_hash: string
  avatar_url: string
  bio: string
  role: string
  email_verified: 0 | 1
  is_active: 0 | 1
  created_at: string
  updated_at: string
}
