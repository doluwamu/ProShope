import express from "express";

import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
  deleteUser,
} from "../controllers/userController.js";
import { protect, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", protect, isAdmin, getUsers);
router.post("/", registerUser);
router.post("/login", authUser);
router.put("/profile", protect, updateUserProfile);
router.get("/profile", protect, getUserProfile);
router.delete("/:id", protect, isAdmin, deleteUser);

export default router;
