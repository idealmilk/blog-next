"use client";

import axios from "axios";
import React, { useEffect } from "react";
import Link from "next/link";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";

import Button from "@/components/common/Button";
import { formatDate } from "@/helpers/formatDate";
import { usePosts } from "../store/usePosts";

export default function Admin() {
  const { posts, page, limit, fetchPosts } = usePosts((state) => ({
    posts: state.posts,
    page: state.page,
    limit: state.limit,
    fetchPosts: state.fetchPosts,
  }));

  useEffect(() => {
    fetchPosts(); // Fetch initial posts
  }, []);

  const displayedPosts = posts.slice(0, page * limit);

  const deletePost = async (slug: string) => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/api/posts/${slug}`
      );

      console.log("Post deleted successfully");
      usePosts.getState().fetchPosts();
    } catch (error) {
      console.error("Failed to delete post", error);
    }
  };

  return (
    <div className="py-8">
      <Link href="/new-post">
        <Button>New Post</Button>
      </Link>

      {displayedPosts && displayedPosts.length > 0 && (
        <ul className="pt-6">
          {displayedPosts.map((post, index) => (
            <li className="flex justify-between pt-4" key={index}>
              <div className="flex items-center">
                <p className="mr-6 text-sm text-gray-400 font-light">
                  {formatDate(new Date(post.dateTime))}
                </p>
                <Link href={`/blog/${post.slug}`}>
                  <p className="text-2xl font-medium">{post.title}</p>
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
      <div className="flex items-center justify-center mt-12">
        <span onClick={() => fetchPosts()}>
          <Button>Load More</Button>
        </span>
      </div>
    </div>
  );
}
