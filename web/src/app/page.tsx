"use client";

import axios from "axios";
import { useEffect, useState } from "react";

import PostCard from "@/components/PostCard";
import Button from "@/components/common/Button";
import { Post } from "@/types/Post";
import { LoadPosts } from "@/helpers/loadPosts";

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMorePosts, setHasMorePosts] = useState(true);

  useEffect(() => {
    LoadPosts(setPosts, currentPage, setHasMorePosts);
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
