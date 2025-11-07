export interface Comment {
  comment_id: number;
  content_type: "recipe" | "blog";
  content_id: number;
  user_id: number;
  parent_id: number | null;
  content: string;
  created_at: string;

  user?: {
    full_name: string;
    avatar_url: string;
  };
}
