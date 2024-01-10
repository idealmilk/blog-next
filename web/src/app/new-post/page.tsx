"use client";

import axios from "axios";
import { useRouter } from "next/navigation";

import PostForm from "@/components/PostForm";
import { Post } from "@/types/Post";
import { usePosts } from "../store/usePosts";

export default function NewPost() {
  const router = useRouter();

  const createPost = async (data: Post) => {
    data.dateTime = new Date().toISOString();

    try {
      const response = await axios.post(
        "http://localhost:4000/api/posts",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Post created successfully", response.data);
      usePosts.getState().fetchPosts();
      router.push("/admin");
    } catch (error) {
      console.error("Failed to create post", error);
    }
  };

  return (
    <div className="py-8">
      <PostForm postAction={createPost} />
    </div>
  );
}
