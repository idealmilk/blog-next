"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";

import Button from "@/components/common/Button";
import { formatDate } from "@/helpers/formatDate";
import { Post } from "@/types/Post";

export default function Admin() {
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

  const deletePost = async (slug: string) => {
    try {
      await axios.delete(`http://localhost:4000/api/posts/${slug}`);
      console.log("Post deleted successfully");
      setPosts((posts) => posts.filter((post) => post.slug !== slug));
    } catch (error) {
      console.error("Failed to delete post", error);
    }
  };

  return (
    <div className="py-8">
      <Link href="/new-post">
        <Button>New Post</Button>
      </Link>

      {posts.length > 0 && (
        <ul className="pt-6">
          {posts.map((post, index) => (
            <li
              className="block justify-between pb-6 md:pb-4 md:flex "
              key={index}
            >
              <div className="block items-center md:flex">
                <p className="mr-6 text-sm text-gray-400 font-light">
                  {formatDate(new Date(post.dateTime))}
                </p>
                <Link href={`/blog/${post.slug}`}>
                  <p className="text-lg  font-medium pt-1 pb-2 md:py-0 md:text-2xl">
                    {post.title}
                  </p>
                </Link>
              </div>

              <div className="flex gap-4">
                <Link href={`/blog/${post.slug}/edit`}>
                  <button className="flex items-center justify-center bg-gray-100 border rounded-md w-8 h-8">
                    <FaPencilAlt />
                  </button>
                </Link>
                <button
                  onClick={() => deletePost(post.slug)}
                  className="flex items-center justify-center bg-gray-100 border rounded-md w-8 h-8"
                >
                  <FaTrashAlt />
                </button>
              </div>
            </li>
          ))}
        </ul>
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
