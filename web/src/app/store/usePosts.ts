import { Post } from "@/types/Post";
import axios from "axios";
import { create } from "zustand";

interface StoreState {
  posts: Post[];
  setPosts: (posts: Post[]) => void;
  fetchPosts: () => Promise<void>;
  refetchPosts: () => Promise<void>;
  page: number;
  limit: number;
}

export const usePosts = create<StoreState>((set, get) => ({
  posts: [],
  page: 1,
  limit: 5,
  setPosts: (posts: Post[]) => set({ posts }),
  fetchPosts: async () => {
    const { page, limit, posts } = get();
    try {
      const response = await axios.get(
        `http://localhost:4000/api/posts?page=${page}&limit=${limit}`
      );
      const newPosts = response.data;
      set({ posts: [...posts, ...newPosts], page: page + 1 });
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  },
  refetchPosts: async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/posts");
      const sortedPosts = response.data.sort(
        (a: Post, b: Post) => +new Date(b.dateTime) - +new Date(a.dateTime)
      );
      set({ posts: sortedPosts, page: 1 });
    } catch (error) {
      console.error("Error refetching posts:", error);
    }
  },
}));
