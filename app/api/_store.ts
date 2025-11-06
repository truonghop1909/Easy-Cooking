// Lưu tạm trong RAM để demo

import { Comment, Post } from "@/app/blog/PostCard"

export const store = {
  posts: [] as Post[],
  comments: [] as Comment[],
}

function seed() {
  if (store.posts.length) return
  for (let i = 0; i < 40; i++) {
    store.posts.push({
      id: i + 1,
      author: { name: `Người dùng ${i + 1}`, avatarUrl: `https://i.pravatar.cc/150?img=${(i % 50) + 1}` },
      content: `Công thức ${i + 1}: mẹo nấu ăn siêu nhanh.`,
      imageUrl: i % 3 === 0 ? `https://picsum.photos/600/400?random=${i}` : null,
      createdAt: new Date(Date.now() - i * 60000).toISOString(),
      likeCount: Math.floor(Math.random() * 50),
      isLiked: false,
      commentCount: 0,
    })
  }
}
seed()
