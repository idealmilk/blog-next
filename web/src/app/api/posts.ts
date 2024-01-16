import { TPost } from "@/types/Post";
import dayjs from "@/utils/dayjs";
import { destroy, get, post, put } from "@/utils/fetch";

export const CreatePostAPI = async (data: TPost) => {
  const currentDate = dayjs(new Date());
  data.dateTime = currentDate.toISOString();

  try {
    await post("http://localhost:4000/api/posts", data);
  } catch (error) {
    console.error("Failed to create post", error);
  }
};

export const ReadAllPostsAPI = async (currentPage: number, limit: number) => {
  try {
    const response = await get<TPost[]>(
      `http://localhost:4000/api/posts?page=${currentPage}&limit=${limit}`
    );
    return response;
  } catch (error) {
    console.error("Failed to load posts", error);
  }
};

export const ReadSinglePostAPI = async (slug: string) => {
  const response = await get<TPost>(`http://localhost:4000/api/posts/${slug}`);
  return response;
};

export const UpdatePost = async (originalSlug: string, data: TPost) => {
  try {
    await put(`http://localhost:4000/api/posts/${originalSlug}`, data);
  } catch (error) {
    console.error("Failed to update post", error);
  }
};

export const DeletePostBySlugAPI = async (slug: string) => {
  try {
    const response = await destroy(`http://localhost:4000/api/posts/${slug}`);
    return response;
  } catch (error) {
    console.error("Failed to delete post", error);
  }
};
