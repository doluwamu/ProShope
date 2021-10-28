import express from "express";

import {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
} from "../controllers/productController.js";
import { protect, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", getProducts);
router.post("/", protect, isAdmin, createProduct);
router.get("/:id", getProductById);
router.put("/:id", protect, isAdmin, updateProduct);
router.delete("/:id", protect, isAdmin, deleteProduct);

export default router;
