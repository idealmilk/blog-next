"use client";

import axios from "axios";
import { useRouter } from "next/navigation"; // Corrected import
import { useEffect, useState } from "react";

import PostForm from "@/components/PostForm";
import { Post } from "@/types/Post";

export default function EditPost({ params }: { params: { slug: string } }) {
  const router = useRouter();

  const [post, setPost] = useState<Post | null>(null);
  const [originalSlug, setOriginalSlug] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/posts/${params.slug}`)
      .then((response) => {
        console.log("Fetched post:", response.data); // Log the fetched post
        setPost(response.data);
        setOriginalSlug(response.data.slug);
      })
      .catch((error) => console.error("Error fetching post:", error));
  }, [params.slug]);

  if (!post) {
    return <div>Loading..</div>;
  }

  const editPost = async (data: Post) => {
    data.dateTime = post.dateTime;

    try {
      const response = await axios.put(
        `http://localhost:4000/api/posts/${originalSlug}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Post updated successfully");
      router.push("/admin");
    } catch (error) {
      console.error("Failed to update post", error);
    }
  };

  return (
    <div className="py-8">
      <PostForm post={post} postAction={editPost} />
    </div>
  );
}
