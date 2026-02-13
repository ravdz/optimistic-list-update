import type { Post, CreatePostInput } from '../types/posts'

const posts: Post[] = [
  {
    id: 1,
    title:
      'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
    body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
    createdAt: '2024-11-02T10:00:00.000Z',
  },
  {
    id: 2,
    title: 'qui est esse',
    body: 'est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla',
    createdAt: '2022-05-10T10:00:00.000Z',
  },
  {
    id: 3,
    title: 'ea molestias quasi exercitationem repellat qui ipsa sit aut',
    body: 'et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut',
    createdAt: '2026-01-11T10:00:00.000Z',
  },
]

export type CreatePostOptions = {
  simulateFail?: boolean
}

export const postsApi = {
  getAll: async (): Promise<Post[]> => {
    await new Promise((r) => setTimeout(r, 500))
    return posts
  },
  create: async (
    body: CreatePostInput,
    options?: CreatePostOptions
  ): Promise<Post> => {
    await new Promise((r) => setTimeout(r, 500))

    if (options?.simulateFail) {
      throw new Error('Simulated server error')
    }

    const post: Post = {
      ...body,
      id: posts.length + 1,
      createdAt: new Date().toISOString(),
    }
    posts.push(post)
    return post
  },
}
