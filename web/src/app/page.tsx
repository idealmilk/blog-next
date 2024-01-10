"use client";

import axios from "axios";
import { useEffect, useState } from "react";

import PostCard from "@/components/PostCard";
import Button from "@/components/common/Button";
import { Post } from "@/types/Post";
import { usePosts } from "./store/usePosts";

export default function Home() {
  const { posts } = usePosts((state) => ({
    posts: state.posts,
  }));

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
