import { Post } from "@/types/Post";
import axios from "axios";
import { create } from "zustand";

interface StoreState {
  posts: Post[];
  setPosts: (posts: Post[]) => void;
  fetchPosts: () => Promise<void>;
}

export const usePosts = create<StoreState>((set) => ({
  posts: [],
  setPosts: (posts: Post[]) => set({ posts }),
  fetchPosts: async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/posts");
      const sortedPosts = response.data.sort(
        (a: Post, b: Post) => +new Date(b.dateTime) - +new Date(a.dateTime)
      );
      set({ posts: sortedPosts });
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  },
}));
