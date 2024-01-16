import express, { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import UserModel from "../models/auth.model";

export const authRouter = express.Router();

const secretKey =
  "a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6";

//api/auth/register
authRouter.post(
  "/register",
  [
    check("name")
      .isLength({ min: 3 })
      .withMessage("the name must have a minimum length of 3")
      .trim(),

    check("email")
      .isEmail()
      .withMessage("invalid email address")
      .normalizeEmail(),

    check("password")
      .isLength({ min: 8, max: 15 })
      .withMessage(
        "your password should have a minimum and maximum length between 8-15"
      )
      .matches(/\d/)
      .withMessage("your password should have at least one number")
      .matches(/[!@#$%^&*(),.?":{}|<>]/)
      .withMessage("your password should have at least one special character"),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { email, name, password } = req.body;

    try {
      const user = await UserModel.findOne({ email });

      if (user) {
        return res
          .status(422)
          .json({ errors: ["User with this email already exists"] });
      }

      const newUser = new UserModel({ name, email, password });
      await newUser.save();

      const token = jwt.sign({ userId: newUser._id }, secretKey);
      res.cookie("token", token, { httpOnly: true });

      res.json({
        message: "User successfully created",
        user: { id: newUser._id, email: newUser.email },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ errors: ["Internal server error"] });
    }
  }
);

//api/auth/signin
authRouter.post("/signin", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ userId: user._id }, secretKey);
    res.cookie("token", token, { httpOnly: true });

    res.json({
      message: "Sign in successful",
      user: { id: user._id, email: user.email },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// /api/auth/logout
authRouter.get("/logout", (req: Request, res: Response) => {
  res.clearCookie("token");
  res.json({ message: "Logout successful" });
});

// /api/auth/me
authRouter.get("/me", async (req: Request, res: Response) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(403).json({ errors: ["You are not logged in."] });
    }

    try {
      const decodedToken = jwt.verify(token, secretKey) as { userId: string };

      const userId = decodedToken.userId;

      const user = await UserModel.findById(userId);

      if (!user) {
        return res.status(404).json({ errors: ["User not found."] });
      }

      res.status(200).json({ user });
    } catch (err) {
      // Token verification failed
      console.error("Token verification failed:", err);
      return res.status(403).json({ errors: ["Invalid session."] });
    }
  } catch (error) {
    console.error("Error retrieving user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
