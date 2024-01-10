"use client";

import axios from "axios";
import { useEffect, useState } from "react";

import PostCard from "@/components/PostCard";
import Button from "@/components/common/Button";
import { Post } from "@/types/Post";

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/posts")
      .then((response) => {
        console.log("Fetched posts:", response.data); // Log the fetched posts
        const sortedPosts = response.data.sort(
          (a: Post, b: Post) => +new Date(b.dateTime) - +new Date(a.dateTime)
        );

        setPosts(sortedPosts);
      })
      .catch((error) => console.error("Error fetching posts:", error));
  }, []);

  return (
    <div className="w-full">
      {posts && posts.length > 0 && (
        <div className="w-4/6 mx-auto">
          {posts.map((post, index) => {
            return <PostCard data={post} key={index} />;
          })}
        </div>
      )}

      <div className="flex items-center justify-center mt-12">
        <Button>Load More</Button>
      </div>
    </div>
  );
}
