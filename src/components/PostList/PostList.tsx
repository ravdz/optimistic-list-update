import { PostItem } from '../PostItem'
import type { Post } from '../../types/posts'

interface PostListProps {
  posts: Post[]
  isLoading: boolean
}

export const PostList = ({ posts, isLoading }: PostListProps) => {
  const sortedPosts = [...posts].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Post List</h1>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <ul className="space-y-4">
          {sortedPosts.map((post) => (
            <PostItem key={post.id} post={post} />
          ))}
        </ul>
      )}
    </div>
  )
}
