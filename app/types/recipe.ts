export interface Recipe {
  recipe_id: number
  author_id: number              // 🔗 liên kết với user_id trong User
  category_ids: number[]         // Danh sách ID danh mục
  title: string
  description: string
  image_url: string
  video_url: string
  prep_time: string
  cook_time: string
  serves: string
  ingredients: {
    section: string
    items: string[]
  }[]
  instructions: string[]
  nutrition_facts: {
    name: string
    value: string
  }[]
  stats: {
    rating: number
    comments: number
    trend: number
  }
  created_at: string
  updated_at: string
}
