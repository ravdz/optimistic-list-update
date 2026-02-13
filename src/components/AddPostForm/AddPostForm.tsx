import { useActionState } from 'react'
import type { CreatePostInput, Post } from '../../types/posts'
import { postsApi } from '../../lib/posts'

interface AddPostFormProps {
  addOptimisticPost: (input: Post) => void
}

type AddPostFormState = {
  ok: boolean
  error: string | null
}

export const AddPostForm = ({ addOptimisticPost }: AddPostFormProps) => {
  const [state, formAction, isPending] = useActionState<
    AddPostFormState,
    FormData
  >(
    async (_state: AddPostFormState, payload: FormData) => {
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
    <div>
      <h1 className="text-2xl font-bold mb-4">Add Post</h1>
      <form action={formAction}>
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            disabled={isPending}
            type="text"
            id="title"
            required
            name="title"
            placeholder="Enter title"
            className="mt-1 block w-full rounded-md border-gray-300 bg-white p-2 shadow-sm text-sm"
          />
        </div>
        <div className="mt-3">
          <label
            htmlFor="body"
            className="block text-sm font-medium text-gray-700"
          >
            Body
          </label>
          <input
            disabled={isPending}
            type="text"
            id="body"
            required
            name="body"
            placeholder="Enter body"
            className="mt-1 block w-full rounded-md border-gray-300 bg-white p-2 shadow-sm text-sm"
          />
        </div>
        <div className="mt-3 flex items-center gap-1">
          <input
            disabled={isPending}
            type="checkbox"
            id="simulateFail"
            name="simulateFail"
          />
          <label
            htmlFor="simulateFail"
            className="block text-sm font-medium text-gray-700"
          >
            Simulate Fail
          </label>
        </div>
        <div className="mt-4">
          <button
            disabled={isPending}
            type="submit"
            className="px-2 py-1.5 bg-green-500 text-sm text-white rounded-md hover:bg-green-600 cursor-pointer"
          >
            {isPending ? 'Adding...' : 'Add Post'}
          </button>
          {state.error && (
            <p className="text-red-500 text-sm mt-2">{state.error}</p>
          )}
        </div>
      </form>
    </div>
  )
}
