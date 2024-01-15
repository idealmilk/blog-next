import { Post } from "@/types/Post";
import dayjs from "@/utils/dayjs";
import { destroy, get, post, put } from "@/utils/fetch";

export const CreatePost = async (data: Post) => {
  const currentDate = dayjs(new Date());
  data.dateTime = currentDate.toISOString();

  try {
    await post("http://localhost:4000/api/posts", data);
  } catch (error) {
    console.error("Failed to create post", error);
  }
};

export const ReadAllPosts = async (currentPage: number, limit: number) => {
  try {
    const response = await get<Post[]>(
      `http://localhost:4000/api/posts?page=${currentPage}&limit=${limit}`
    );
    return response;
  } catch (error) {
    console.error("Failed to load posts", error);
  }
};

export const ReadSinglePost = async (slug: string) => {
  try {
    const response = await get<Post>(`http://localhost:4000/api/posts/${slug}`);
    return response;
  } catch (error) {
    console.error("Failed to load posts", error);
  }
};

export const UpdatePost = async (originalSlug: string, data: Post) => {
  try {
    await put(`http://localhost:4000/api/posts/${originalSlug}`, data);
  } catch (error) {
    console.error("Failed to update post", error);
  }
};

export const DeletePostBySlug = async (slug: string) => {
  try {
    const response = await destroy(`http://localhost:4000/api/posts/${slug}`);
    return response;
  } catch (error) {
    console.error("Failed to delete post", error);
  }
};
