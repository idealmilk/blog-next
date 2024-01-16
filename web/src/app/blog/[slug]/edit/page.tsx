"use client";

import { useRouter } from "next/navigation"; // Corrected import
import { useCallback, useEffect, useState } from "react";

import PostForm from "@/components/post-form";
import { ReadSinglePostAPI, UpdatePost } from "@/app/api/posts";
import { TPost } from "@/types/Post";
import useUser from "@/hooks/useUser";

export default function EditPost({ params }: { params: { slug: string } }) {
  const { loggedIn } = useUser();
  const router = useRouter();

  if (!loggedIn) {
    router.replace("/signin");
  }

  const [post, setPost] = useState<TPost | null>(null);

  const fetchPost = async () => {
    try {
      const result = await ReadSinglePostAPI(params.slug);
      if ("error" in result) {
        return;
      }
      setPost(result);
    } catch (error) {
      console.error("Error fetching post:", error);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [params.slug]);

  const editPost = useCallback(
    async (data: TPost) => {
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
