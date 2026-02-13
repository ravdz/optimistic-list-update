interface AddPostFormProps {
  onSubmit: (payload: FormData) => void
  isPending: boolean
  error: string | null
}

export const AddPostForm = ({
  onSubmit,
  isPending,
  error,
}: AddPostFormProps) => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Add Post</h1>
      <form action={onSubmit}>
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
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
      </form>
    </div>
  )
}
