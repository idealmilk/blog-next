import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { TPost } from "@/types/Post";
import Button from "@/components/button";
import dayjs from "@/utils/dayjs";
import { useMemo } from "react";

type PostFormProps = {
  post?: TPost;
  postAction: Function;
};

export default function PostForm({ post, postAction }: PostFormProps) {
  const dateTime = useMemo(() => {
    return post ? dayjs(new Date(post.dateTime)) : dayjs(new Date());
  }, []);

  const validationSchema = z.object({
    title: z.string().min(1, { message: "Title is required" }),
    slug: z.string().min(1, { message: "Slug is required" }),
    body: z.string().min(1, { message: "Body is required" }),
  });

  type ValidationSchema = z.infer<typeof validationSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      title: post?.title ? post.title : "",
      slug: post?.slug ? post.slug : "",
      body: post?.body ? post.body : "",
    },
  });

  const onSubmit: SubmitHandler<ValidationSchema> = (data) => postAction(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="z-10 text-md">
      <p className="pb-6 text-gray-400">タイトル</p>
      <div className="justify-between mb-4 font-mono text-2xl md:text-4xl flex">
        <input
          className={`flex w-full justify-center mb-6 backdrop-blur-2xl lg:static lg:w-auto ${
            errors.title && "border-red-500"
          } rounded appearance-none focus:outline-none focus:shadow-outline`}
          id="firstName"
          type="text"
          placeholder="タイトルを入力してください"
          {...register("title")}
        />

        <div className="hidden sm:flex flex-col items-center justify-center">
          <Button type="submit">Save</Button>
        </div>
      </div>

      <div className="flex items-center pb-8 text-gray-400">
        <p className="mr-6 ">投稿日</p>
        <p className="border rounded-md px-6  py-1">
          {dateTime.format("YYYY/MM/DD")}
        </p>
      </div>

      <div className="pb-6">
        <p className="text-gray-400 pb-6">スラッグ</p>
        <input
          type="text"
          {...register("slug")}
          className={`border rounded-md p-2 ${
            errors.slug && "border-red-500"
          } rounded appearance-none focus:outline-none focus:shadow-outline`}
        />
      </div>

      <div>
        <p className="text-gray-400 pb-6">記事詳細</p>
        <textarea
          {...register("body")}
          className={`w-full h-60 border rounded-md p-2 ${
            errors.body && "border-red-500"
          } rounded appearance-none focus:outline-none focus:shadow-outline`}
        />
      </div>
      <div className="flex sm:hidden flex-col pt-6 items-center justify-center">
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
}
