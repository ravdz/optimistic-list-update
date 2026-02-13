# Optimistic List Update Demo

A minimal demo showcasing **`useActionState`** and **`useOptimistic`** in React 19 for managing a list and adding items with optimistic UI updates and progressive enhancement.

## What it does

- **List of posts** - Fetched on load via an action (no `useEffect` + `useState` for data).
- **Add post form** - Uses a form with `action` and `useActionState` for submission, loading state, and error handling.
- **Optimistic updates** - New posts appear in the list immediately while the “server” request runs; on failure, the UI can reflect the error (form shows error state).

No client-side router, no data library - just React 19 hooks and a small in-memory API for the demo.

## Stack

| Area     | Choice                  |
| -------- | ----------------------- |
| Runtime  | React 19                |
| Build    | Vite 7                  |
| Language | TypeScript              |
| Styling  | Tailwind CSS v4         |
| Tooling  | ESLint, Prettier, Husky |

## How it works

### `useActionState` for list fetch and form submit

- **List:** An action that returns the posts list is passed to `useActionState`. The list is loaded in a `useEffect` via `startTransition(() => fetchPosts())`, so you get `[posts, fetchPosts, isPending]` without manual `useState` for the array.
- **Form:** The add-post form uses `useActionState` with the same pattern: `[state, formAction, isPending]`. The form’s `action={formAction}` drives submission; `isPending` disables inputs and shows “Adding...”; `state` holds `{ ok, error }` for server/validation errors.

### `useOptimistic` for instant feedback

- **State:** `useOptimistic(posts, (state, newPost) => [...state, newPost])` gives `optimisticPosts` and `addOptimisticPost`.
- **Flow:** On submit, the form action calls `addOptimisticPost(tempPost)` so the new post shows in the list right away. The list renders `optimisticPosts`; when the real `posts` update (after a refetch or state update), React reconciles. If the request fails, the form shows the error (and in a full app you could revert the optimistic item).

### Data flow (simplified)

```
App
├── useActionState(fetchPosts)     → posts, fetchPosts, isPending
├── useOptimistic(posts, reducer)  → optimisticPosts, addOptimisticPost
├── useEffect → startTransition(fetchPosts)  // initial load
├── PostList(posts={optimisticPosts})
└── AddPostForm(addOptimisticPost)
        └── useActionState(formAction)  → state, formAction, isPending
                └── form action calls addOptimisticPost(tempPost) then postsApi.create()
```

## Project structure

```
src/
├── App.tsx                 # useActionState (fetch) + useOptimistic + layout
├── components/
│   ├── AddPostForm/        # useActionState (form), calls addOptimisticPost
│   ├── PostList/           # Renders optimistic list
│   └── PostItem/           # Single post card
├── lib/
│   └── posts.ts            # In-memory API (getAll, create, optional simulateFail)
└── types/
    └── posts.ts            # Post, CreatePostInput
```

## Run it

```bash
npm install
npm run dev
```

Then open the app and use “Add Post”. Optionally enable “Simulate Fail” to see error handling.

## Scripts

| Command          | Description          |
| ---------------- | -------------------- |
| `npm run dev`    | Start dev server     |
| `npm run build`  | Type-check + build   |
| `npm run lint`   | Run ESLint           |
| `npm run format` | Format with Prettier |

## References

- [React: useActionState](https://react.dev/reference/react/useActionState)
- [React: useOptimistic](https://react.dev/reference/react/useOptimistic)
- [React: Form actions and useActionState](https://react.dev/reference/react-dom/components/form#form-action)
