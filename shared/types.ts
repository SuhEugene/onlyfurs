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
