"use client";

import { useRouter } from "next/navigation";

import PostForm from "@/components/PostForm";
import { Post } from "@/types/Post";
import { CreatePost } from "@/app/api/posts";
import { useCallback } from "react";

export default function NewPost() {
  const router = useRouter();

  const createNewPost = useCallback(
    async (data: Post) => {
      try {
        await CreatePost(data);
        router.push(`/blog/${data.slug}`);
      } catch (error) {
        console.error("Failed to create post", error);
      }
    },
    [router]
  );

  return (
    <div className="py-8">
      <PostForm postAction={createNewPost} />
    </div>
  );
}
