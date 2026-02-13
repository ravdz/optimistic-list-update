export type Post = {
  id: number
  title: string
  body: string
  createdAt: string
}

export type CreatePostInput = Omit<Post, 'id' | 'createdAt'>

export type AddPostFormState = {
  ok: boolean
  error: string | null
}
