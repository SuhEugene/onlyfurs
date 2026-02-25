export interface FeedPost {
  id: string;
  likes: number;
  comments: number;
  reposts: number;
  content: string;
  createdAt: string;
  createdAgo: number;
  user: FeedPostUser;
  imageURL: string | null;
  isImageCropped: boolean;
}

interface FeedPostUser {
  handle: string;
  username: string | null;
  avatarURL: string | null;
}

export interface User {
  id: number;
  username: string;
  handle: string;
  description: string | null;
  avatarURL: string | null;
  bannerURL: string | null;
  followers: number;
  posts: number;
  subscriptions: Subscription[];
}

export interface Subscription {
  id: number;
  title: string;
  description: string;
  price: number;
}
