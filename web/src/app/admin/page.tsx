"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";

import Button from "@/components/button";
import { TPost } from "@/types/Post";
import { DeletePostBySlugAPI, ReadAllPostsAPI } from "@/app/api/posts";
import dayjs from "@/utils/dayjs";
import useUser from "@/hooks/useUser";

export default function Admin() {
  const { loggedIn } = useUser();
  const router = useRouter();
  const [posts, setPosts] = useState<TPost[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMorePosts, setHasMorePosts] = useState(true);

  if (!loggedIn) {
    router.replace("/signin");
  }

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

  const deletePost = async (slug: string) => {
    try {
      await DeletePostBySlugAPI(slug);
      setCurrentPage(1);
      fetchPosts();
    } catch (error) {
      console.error("Error deleting post:", error);
      setPosts([]);
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
                  {dayjs(post.dateTime).format("YYYY/MM/DD")}
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
