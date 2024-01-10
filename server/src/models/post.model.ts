import mongoose from "mongoose";

interface Post {
  title: string;
  slug: string;
  dateTime: string;
  body: string;
}

const postSchema = new mongoose.Schema<Post>({
  title: { type: String, required: true },
  slug: { type: String, required: true },
  dateTime: { type: String, required: true },
  body: { type: String, required: true },
});

const PostModel = mongoose.model<Post>("Post", postSchema);

export default PostModel;
