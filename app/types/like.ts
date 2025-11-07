export interface Like {
  like_id: number; // ID duy nhất cho like
  content_type: "recipe" | "blog"; // loại nội dung được like
  content_id: number; // ID của bài viết hoặc công thức
  user_id: number; // người thả tim
  created_at: string; // thời gian thả tim

  // Nếu muốn hiển thị thông tin người dùng trực tiếp (join)
  user?: {
    full_name: string;
    avatar_url: string;
  };
}
