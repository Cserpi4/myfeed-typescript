export interface PostPreviewImage {
  resolutions: { url: string }[];
}

export interface PostPreview {
  images?: PostPreviewImage[];
}

export interface SubredditDetail {
  icon_img?: string | null;
}

export interface Post {
  id: string;
  title: string;
  thumbnail?: string | null;
  preview?: PostPreview | null;
  subreddit: string;
  subreddit_name_prefixed: string;
  author: string;
  ups: number;
  created_utc: number;
  num_comments: number;
  sr_detail?: SubredditDetail;
  subreddit_icon_img?: string | null;
}