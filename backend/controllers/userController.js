import User from "../models/userModel.js";
import { generateToken } from "../utils/generateToken.js";
import asyncHandler from "express-async-handler";

export const authUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      return res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      return res.sendApiError({
        title: "Invalid data",
        detail: "Invalid email or password",
      });
    }
  } catch (error) {
    return res.mongoError(error);
  }
};

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.sendApiError({
        title: "Existing data!",
        detail: "User with this email already exists!",
      });
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    if (user) {
      return res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({
        title: "Invalid data!",
        detail: "Invalid user detail!",
      });
    }
  } catch (error) {
    return res.mongoError(error);
  }
});

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });
    } else {
      res.sendApiError({
        title: "Invalid data",
        detail: "User not found!",
      });
    }
  } catch (error) {}
};
