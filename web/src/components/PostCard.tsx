import Link from "next/link";

import { formatDate } from "@/helpers/formatDate";
import { truncateString } from "@/helpers/truncateString";
import { Post } from "@/types/Post";

type PostCardProps = {
  data: Post;
};

export default function PostCard({ data }: PostCardProps) {
  const dateTime = new Date(data.dateTime);
  return (
    <div className="z-10 max-w-5xl w-full py-8 border-b font-mono">
      <p className="text-sm text-gray-400 font-light">{formatDate(dateTime)}</p>
      <Link href={`/blog/${data.slug}`}>
        <h1 className="w-full pb-4 pt-2 backdrop-blur-2xl text-2xl font-medium lg:static lg:w-auto">
          {data.title}
        </h1>
      </Link>
      <p className="font-light">{truncateString(data.body, 140)}</p>
      <div className="pt-4">
        <Link href={`/blog/${data.slug}`} className="text-blue-500">
          READ MORE
        </Link>
      </div>
    </div>
  );
}
