export interface FeedPost {
  id: string
  likes: number
  comments: number
  reposts: number
  content: string
  createdAt: string
  user: FeedPostUser
  imageURL: string
  isImageCropped: boolean
}

interface FeedPostUser {
  username: string
  handle: string
  avatarURL: string
}


export interface User {
  id: string
  username: string
  handle: string
  description: string
  avatarURL: string
  bannerURL: string
  followers: number
  posts: number
  subscriptions: Subscription[]
}


export interface Subscription {
  id: string
  title: string
  description: string
  price: number
}
