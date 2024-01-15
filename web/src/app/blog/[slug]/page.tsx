"use client";

import { useEffect, useState } from "react";

import { ReadSinglePost } from "@/app/api/posts";
import { Post } from "@/types/Post";
import dayjs from "dayjs";

export default function BlogPost({ params }: { params: { slug: string } }) {
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

  if (!post) {
    return <div>Loading..</div>;
  }

  return (
    <div className="w-full pt-6">
      <div className="w-3/5 mx-auto">
        <p className="text-sm text-gray-400 font-light">
          {dayjs(post.dateTime).format("YYYY/MM/DD")}
        </p>
        <h1 className="w-full pb-4 pt-2 backdrop-blur-2xl text-2xl font-medium lg:static lg:w-auto">
          {post.title}
        </h1>
        <div className="font-light overflow-x-auto">
          <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
            {post.body}
          </pre>
        </div>
      </div>
    </div>
  );
}
