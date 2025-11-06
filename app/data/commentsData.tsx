export const commentsData = [
  // --- Recipe 1: Strawberry Cream Cheesecake ---
  {
    id: 1,
    recipeId: 1, // => id bài viết
    parentId: null, // => comment gốc thì null
    name: "Jelanee Uwae",
    avatar: "/avatarTruongHop.jpg",
    text: "Mình làm thử thấy vị rất ngon!",
    time: "45min ago",
  },
  {
    id: 2,
    recipeId: 1,
    parentId: 1, // => reply của comment id=1
    name: "Noell Blue",
    avatar: "/avatarTruongHop.jpg",
    text: "Chuẩn luôn, mình làm theo công thức cũng ra đúng vị đó 😋",
    time: "30min ago",
  },
  {
    id: 3,
    recipeId: 1,
    parentId: null,
    name: "Qiu Xun",
    avatar: "/avatarTruongHop.jpg",
    text: "Phần kem hơi khó đánh, có tips nào không?",
    time: "1h ago",
  },
  {
    id: 5, // ID 5 (Đã thêm)
    recipeId: 1,
    parentId: 3, // => reply của comment id=3
    name: "Tricia Albert", // Tác giả bài viết trả lời
    avatar: "/avatarTruongHop.jpg",
    text: "Bạn thử để que đánh và âu vào tủ lạnh 15 phút trước khi đánh xem, kem sẽ bông cứng nhanh hơn đó!",
    time: "30min ago",
  },
  {
    id: 14, // ID 14 (Đã thêm)
    recipeId: 1,
    parentId: 5, // => reply của reply (lồng 3 cấp)
    name: "Qiu Xun",
    avatar: "/avatarTruongHop.jpg",
    text: "Cảm ơn bạn, để mình thử xem sao!",
    time: "15min ago",
  },

  // --- Recipe 2: Chocolate Fudge Cake ---
  {
    id: 4,
    recipeId: 2,
    parentId: null,
    name: "Henk Fortuir",
    avatar: "/avatarTruongHop.jpg",
    text: "Mình dùng thêm chocolate chip, ngon tuyệt!",
    time: "15min ago",
  },
  {
    id: 6, // ID 6 (Đã thêm)
    recipeId: 2,
    parentId: null,
    name: "David Lee",
    avatar: "/avatarTruongHop.jpg",
    text: "Bánh này có bị ngọt gắt không bạn? Mình không hảo ngọt lắm.",
    time: "2h ago",
  },
  {
    id: 7, // ID 7 (Đã thêm)
    recipeId: 2,
    parentId: 6, // => reply của comment id=6
    name: "Michael Brown", // Tác giả
    avatar: "/avatarTruongHop.jpg",
    text: "Công thức này vị chocolate đắng nhẹ, không gắt nhé bạn. Bạn có thể giảm 20g đường nếu muốn.",
    time: "1h ago",
  },

  // --- Recipe 3: Lemon Tart Delight ---
  {
    id: 8, // ID 8 (Đã thêm)
    recipeId: 3,
    parentId: null,
    name: "Anh Tran",
    avatar: "/avatarTruongHop.jpg",
    text: "Tuyệt vời! Vị chanh thơm mà không bị đắng vỏ. Cảm ơn bạn đã chia sẻ.",
    time: "5h ago",
  },

  // --- Recipe 4: Classic Tomato Basil Pasta ---
  {
    id: 9, // ID 9 (Đã thêm)
    recipeId: 4,
    parentId: null,
    name: "Carlos Gomez",
    avatar: "/avatarTruongHop.jpg",
    text: "Công thức mỳ Ý đơn giản mà hiệu quả thật sự. Mình làm bữa tối cho cả nhà ai cũng khen.",
    time: "4h ago",
  },

  // --- Recipe 5: Fluffy Buttermilk Pancakes ---
  {
    id: 10, // ID 10 (Đã thêm)
    recipeId: 5,
    parentId: null,
    name: "Emily Chen",
    avatar: "/avatarTruongHop.jpg",
    text: "Bánh xốp và mềm! Bí quyết là không trộn bột quá kỹ đúng không ạ?",
    time: "Yesterday",
  },
  {
    id: 11, // ID 11 (Đã thêm)
    recipeId: 5,
    parentId: 10, // => reply của comment id=10
    name: "John Miller", // Tác giả
    avatar: "/avatarTruongHop.jpg",
    text: "Chính xác bạn nhé! Trộn vừa đủ ướt là được, còn lợn cợn chút xíu cũng không sao.",
    time: "20h ago",
  },

  // --- Recipe 6: Mediterranean Quinoa Salad ---
  {
    id: 12, // ID 12 (Đã thêm)
    recipeId: 6,
    parentId: null,
    name: "Kenji Tanaka",
    avatar: "/avatarTruongHop.jpg",
    text: "Món salad này rất hợp để mang đi làm (meal prep). Mình làm 1 mẻ ăn được 2 bữa trưa.",
    time: "2 days ago",
  },
  {
    id: 13, // ID 13 (Đã thêm)
    recipeId: 6,
    parentId: null,
    name: "Sarah Jenkins",
    avatar: "/avatarTruongHop.jpg",
    text: "Nước sốt ngon quá! Vị chanh dầu oliu rất hợp.",
    time: "1 day ago",
  },
];