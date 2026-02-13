import {
  useEffect,
  useActionState,
  useOptimistic,
  startTransition,
} from 'react'

import { PostList } from './components/PostList'
import { AddPostForm } from './components/AddPostForm'
import { postsApi } from './lib/posts'

import type { Post } from './types/posts'

function App() {
  const [posts, fetchPosts, isPending] = useActionState(async () => {
    return await postsApi.getAll()
  }, [])

  const [optimisticPosts, addOptimisticPost] = useOptimistic(
    posts,
    (state, action: Post) => {
      return [...state, action]
    }
  )

  useEffect(() => {
    startTransition(() => {
      fetchPosts()
    })
  }, [fetchPosts])

  const isInitialLoading = isPending && posts.length === 0

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Optimistic List Update Demo</h1>
      <div className="grid grid-cols-3 items-start gap-8">
        <div className="col-span-2 bg-gray-100 p-4 rounded-lg">
          <PostList posts={optimisticPosts} isLoading={isInitialLoading} />
        </div>
        <div className="col-span-1 bg-gray-100 p-4 rounded-lg sticky top-0">
          <AddPostForm addOptimisticPost={addOptimisticPost} />
        </div>
      </div>
    </div>
  )
}

export default App
