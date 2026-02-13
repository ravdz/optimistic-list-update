import type { Post } from '../../types/posts'

interface PostItemProps {
  post: Post
}

export const PostItem = ({ post }: PostItemProps) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-bold">{post.title}</h3>
      <p className="text-sm text-gray-600">{post.body}</p>
    </div>
  )
}
