"use client";

import { useRouter } from "next/navigation";

import PostForm from "@/components/post-form";
import { TPost } from "@/types/Post";
import { CreatePostAPI } from "@/app/api/posts";
import { useCallback } from "react";

export default function NewPost() {
  const router = useRouter();

  const createPost = useCallback(
    async (data: TPost) => {
      try {
        await CreatePostAPI(data);
        router.push(`/blog/${data.slug}`);
      } catch (error) {
        console.error("Failed to create post", error);
      }
    },
    [router]
  );

  return (
    <div className="py-8">
      <PostForm postAction={createPost} />
    </div>
  );
}
