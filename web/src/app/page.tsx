"use client";

import axios from "axios";
import { useEffect, useState } from "react";

import PostCard from "@/components/PostCard";
import Button from "@/components/common/Button";
import { usePosts } from "./store/usePosts";

export default function Home() {
  const { posts, fetchPosts } = usePosts((state) => ({
    posts: state.posts,
    fetchPosts: state.fetchPosts,
  }));

  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchPosts(); // Fetch initial posts
  }, []);

  const displayedPosts = posts.slice(0, page * 5);

  return (
    <div className="w-full">
      {displayedPosts && displayedPosts.length > 0 && (
        <div className="w-4/6 mx-auto">
          {displayedPosts.map((post, index) => (
            <PostCard data={post} key={index} />
          ))}
        </div>
      )}

      <div className="flex items-center justify-center mt-12">
        <span
          onClick={() => {
            fetchPosts();
            setPage(page + 1);
          }}
        >
          <Button>Load More</Button>
        </span>
      </div>
    </div>
  );
}
