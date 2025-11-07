export interface Blog {
  blog_id: number;
  author_id: number; // 🔗 liên kết với user_id trong User
  title: string;
  slug: string;
  content: string;
  image_url: string;
  tags: string[];
  stats: {
    views: number;
  };
  created_at: string;
  updated_at: string;
}
