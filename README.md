# Optimistic List Update Demo

A minimal demo app: **`useActionState`** + **`useOptimistic`** (React 19) for list management and form submissions. Posts list, add-post form with optimistic UI, loading and error state, and an in-memory API for the demo.

## Stack

- **React 19**
- **Vite 7**
- **TypeScript**
- **Tailwind CSS 4**
- **ESLint**, **Prettier**, **Husky**

## Requirements

- Node.js 18+

## Quick start

1. **Clone and install**

   ```bash
   git clone <repo-url>
   cd optimistic-list-update
   npm install
   ```

2. **Run**

   ```bash
   npm run dev
   ```

   App: [http://localhost:5173](http://localhost:5173). Use “Add Post”; optionally enable “Simulate Fail” to see error handling.

## Project structure (overview)

- **App** - `src/App.tsx`: list state via `useState`, initial load via `useTransition` + `useEffect` + `postsApi.getAll()`; `useOptimistic` for optimistic posts; `useActionState` for the add-post form (action runs `addOptimisticPost` then `postsApi.create()`). Passes form action, pending state and error to the form.
- **Form** - `src/components/AddPostForm/`: presentational form; receives `onSubmit` (form action), `isPending`, `error` from App; no form logic inside.
- **List** - `src/components/PostList/`, `PostItem/`: render the (optimistic) posts list.
- **API** - `src/lib/posts.ts`: in-memory `getAll` and `create` (with optional `simulateFail`).
- **Types** - `src/types/posts.ts`: `Post`, `CreatePostInput`, `AddPostFormState`.

## Scripts

| Command                | Description           |
| ---------------------- | --------------------- |
| `npm run dev`          | Development server    |
| `npm run build`        | Type-check + build    |
| `npm run preview`      | Preview production    |
| `npm run lint`         | ESLint                |
| `npm run format`       | Prettier (write)      |
| `npm run format:check` | Prettier (check only) |

## Code quality: Husky

**Husky** is installed and configured via the `prepare` script. Add a `pre-commit` hook (e.g. with **lint-staged**) to run ESLint and Prettier on staged files before each commit if you want the same workflow as in the template.

```bash
# Hooks are set up on npm install (via "prepare")
```

## References

- [React: useActionState](https://react.dev/reference/react/useActionState)
- [React: useOptimistic](https://react.dev/reference/react/useOptimistic)
- [React: Form actions and useActionState](https://react.dev/reference/react-dom/components/form#form-action)

## License

MIT (or as needed for your project).
