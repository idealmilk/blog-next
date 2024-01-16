"use client";

import { useEffect, useState } from "react";

import PostCard from "@/components/post-card";
import Button from "@/components/button";
import { ReadAllPostsAPI } from "@/app/api/posts";
import { TPost } from "@/types/Post";

export default function Home() {
  const [posts, setPosts] = useState<TPost[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMorePosts, setHasMorePosts] = useState(true);

  const limit = 10;

  const fetchPosts = async () => {
    try {
      const result = await ReadAllPostsAPI(currentPage, limit);

      if (!Array.isArray(result)) {
        console.error("Received non-array result:", result);
        return;
      }

      if (currentPage > 1) {
        setPosts((prevPosts) => [...prevPosts, ...result]);
      } else {
        setPosts(result);
      }

      setHasMorePosts(result.length >= limit);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setPosts([]);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [currentPage]);

  const handleLoadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="w-full">
      {posts && posts.length > 0 && (
        <div className="w-4/6 mx-auto">
          {posts.map((post, index) => {
            return <PostCard data={post} key={index} />;
          })}
        </div>
      )}

      {hasMorePosts && (
        <div className="flex items-center justify-center mt-12">
          <span onClick={handleLoadMore}>
            <Button>Load More</Button>
          </span>
        </div>
      )}
    </div>
  );
}
