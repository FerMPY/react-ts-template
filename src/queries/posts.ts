import { queryOptions } from "@tanstack/react-query";

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export async function fetchPosts(): Promise<Post[]> {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=12",
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch posts (${response.status})`);
  }
  const posts: Post[] = await response.json();
  return posts;
}

export const postsQueryOptions = queryOptions({
  queryKey: ["posts"],
  queryFn: fetchPosts,
});
