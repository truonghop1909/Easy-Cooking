export interface Friend {
  id: number;
  user_id: number;       // ID của người gửi lời mời hoặc chủ sở hữu quan hệ
  friend_id: number;     // ID của người bạn
  created_at: string;    // Thời điểm bắt đầu kết bạn
  status?: "pending" | "accepted"; // Trạng thái kết bạn (tùy chọn)
}