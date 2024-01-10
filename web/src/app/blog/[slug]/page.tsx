"use client";

import axios from "axios";
import { useState, useEffect } from "react";

import { formatDate } from "@/helpers/formatDate";
import { Post } from "@/types/Post";

export default function BlogPost({ params }: { params: { slug: string } }) {
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/posts/${params.slug}`)
      .then((response) => {
        console.log("Fetched post:", response.data); // Log the fetched post
        setPost(response.data);
      })
      .catch((error) => console.error("Error fetching post:", error));
  }, [params.slug]);

  if (!post) {
    return <div>Loading..</div>;
  }

  const dateTime = new Date(post.dateTime);

  return (
    <div className="w-full pt-6">
      <div className="w-3/5 mx-auto">
        <p className="text-sm text-gray-400 font-light">
          {formatDate(dateTime)}
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
