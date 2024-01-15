"use client";

import { useRouter } from "next/navigation"; // Corrected import
import { useCallback, useEffect, useState } from "react";

import PostForm from "@/components/PostForm";
import { ReadSinglePost, UpdatePost } from "@/app/api/posts";
import { Post } from "@/types/Post";

export default function EditPost({ params }: { params: { slug: string } }) {
  const router = useRouter();

  const [post, setPost] = useState<Post | null>(null);

  const fetchPost = async () => {
    try {
      const result = (await ReadSinglePost(params.slug)) as Post;
      setPost(result);
    } catch (error) {
      console.error("Error fetching post:", error);
    }
  };

  useEffect(() => {
    fetchPost();
  });

  const editPost = useCallback(
    async (data: Post) => {
      try {
        await UpdatePost(params.slug, data);
        router.push(`/blog/${data.slug}`);
      } catch (error) {
        console.error("Failed to update post", error);
      }
    },
    [params.slug, router]
  );

  if (!post) {
    return <div>Loading..</div>;
  }

  return (
    <div className="py-8">
      <PostForm post={post} postAction={editPost} />
    </div>
  );
}
