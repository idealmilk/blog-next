import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import mongoose, { ConnectOptions } from "mongoose";
import cookieParser from "cookie-parser";

import { postsRouter } from "./routes/posts.router";
import { authRouter } from "./routes/auth.router";

dotenv.config();

// MongoDB connection
const mongoUri: string =
  process.env.MONGO_URI || "mongodb://localhost:27017/blog";
mongoose
  .connect(mongoUri, {
    useUnifiedTopology: true,
  } as ConnectOptions)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => console.error("MongoDB connection error:", err));

if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

app.use(helmet());
app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL ?? "http://localhost:3000",
    optionsSuccessStatus: 200,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use("/api/posts", postsRouter);
app.use("/api/auth", authRouter);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
