import {
  useEffect,
  useActionState,
  useOptimistic,
  useState,
  useTransition,
} from 'react'

import { PostList } from './components/PostList'
import { AddPostForm } from './components/AddPostForm'
import { postsApi } from './lib/posts'

import type { Post, CreatePostInput, AddPostFormState } from './types/posts'

function App() {
  const [posts, setPosts] = useState<Post[]>([])
  const [isListPending, startTransition] = useTransition()

  const [optimisticPosts, addOptimisticPost] = useOptimistic(
    posts,
    (state, action: Post) => {
      return [...state, action]
    }
  )

  useEffect(() => {
    startTransition(async () => {
      const data = await postsApi.getAll()
      setPosts(data)
    })
  }, [])

  const isInitialLoading = isListPending && posts.length === 0

  const [formState, formAction, isFormPending] = useActionState<
    AddPostFormState,
    FormData
  >(
    async (_state: AddPostFormState, payload: FormData) => {
      console.log('formAction', payload)
      const input: CreatePostInput = {
        title: payload.get('title') as string,
        body: payload.get('body') as string,
      }
      const simulateFail = payload.get('simulateFail') === 'on'

      const tempPost: Post = {
        ...input,
        id: Date.now(),
        createdAt: new Date().toISOString(),
      }
      addOptimisticPost(tempPost)
      try {
        await postsApi.create(input, { simulateFail })
      } catch (error) {
        console.error(error)
        return { ok: false, error: 'Failed to add post' }
      }
      return { ok: true, error: null }
    },
    { ok: true, error: null }
  )

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Optimistic List Update Demo</h1>
      <div className="grid grid-cols-3 items-start gap-8">
        <div className="col-span-2 bg-gray-100 p-4 rounded-lg">
          <PostList posts={optimisticPosts} isLoading={isInitialLoading} />
        </div>
        <div className="col-span-1 bg-gray-100 p-4 rounded-lg sticky top-0">
          <AddPostForm
            onSubmit={formAction}
            isPending={isFormPending}
            error={formState.error}
          />
        </div>
      </div>
    </div>
  )
}

export default App
