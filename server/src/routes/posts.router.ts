import express, { Request, Response } from "express";
import { Post } from "../types/post";
import PostModel from "../models/post.model";

export const postsRouter = express.Router();

postsRouter.post("/", async (req, res) => {
  try {
    const { title, slug, dateTime, body } = req.body;

    const newPost = new PostModel({
      title,
      slug,
      dateTime,
      body,
    });

    await newPost.save();
    res.status(201).json(newPost);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

postsRouter.get("/", async (req: Request, res: Response) => {
  try {
    const posts = await PostModel.find(); // Fetch all posts
    res.status(200).json(posts); // Send the posts as JSON
  } catch (e: any) {
    res.status(500).send(e.message); // Send the error message in case of an error
  }
});

postsRouter.get("/:slug", async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const post = await PostModel.findOne({ slug: slug });

    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).send("Post not found");
    }
  } catch (error) {
    res.status(500).send("Server error");
  }
});

postsRouter.put("/:slug", async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const updateData = req.body; // Data to update the post with

    const updatedPost = await PostModel.findOneAndUpdate(
      { slug: slug },
      updateData,
      { new: true }
    );

    if (updatedPost) {
      res.status(200).json(updatedPost);
    } else {
      res.status(404).send("Post not found");
    }
  } catch (error) {
    res.status(500).send("Server error");
  }
});

postsRouter.delete("/:slug", async (req: Request, res: Response) => {
  console.log(req.params.slug);
  try {
    const deletedPost = await PostModel.findOneAndDelete({
      slug: req.params.slug,
    });
    console.log(deletedPost);
    if (!deletedPost) {
      return res.status(404).send("Post not found");
    }
    res
      .status(200)
      .send(`Post with slug ${req.params.slug} deleted successfully`);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});
