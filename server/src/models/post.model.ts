import mongoose from "mongoose";

export type TPost = {
  _id: number;
  title: string;
  slug: string;
  dateTime: string;
  body: string;
};

const postSchema = new mongoose.Schema<TPost>({
  title: { type: String, required: true },
  slug: { type: String, required: true },
  dateTime: { type: String, required: true },
  body: { type: String, required: true },
});

const PostModel = mongoose.model<TPost>("Post", postSchema);

export default PostModel;
