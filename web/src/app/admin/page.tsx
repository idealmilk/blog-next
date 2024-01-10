"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";

import Button from "@/components/common/Button";
import { formatDate } from "@/helpers/formatDate";
import { usePosts } from "@/store/usePosts";
import { Post } from "@/types/Post";

export default function Admin() {
  const { posts } = usePosts((state) => ({
    posts: state.posts,
  }));

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
    </div>
  );
}
