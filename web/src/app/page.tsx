"use client";

import axios from "axios";
import { useEffect, useState } from "react";

import PostCard from "@/components/PostCard";
import Button from "@/components/common/Button";
import { Post } from "@/types/Post";

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMorePosts, setHasMorePosts] = useState(true);

  const loadPosts = () => {
    axios
      .get(`http://localhost:4000/api/posts?page=${currentPage}&limit=10`)
      .then((response) => {
        if (currentPage > 1) {
          setPosts((prevPosts) => [...prevPosts, ...response.data]);
        } else {
          setPosts(response.data); // Set new posts for the first page
        }

        // Disable "Load More" if fewer than 10 posts are returned
        if (response.data.length < 10) {
          setHasMorePosts(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
        setHasMorePosts(false); // Disable "Load More" in case of an error
      });
  };

  useEffect(() => {
    loadPosts();
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
