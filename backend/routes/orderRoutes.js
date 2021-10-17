import express from "express";

import {
  addOrderItems,
  getOrders,
  getOrderById,
} from "../controllers/orderController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", getOrders);
router.post("/", protect, addOrderItems);
router.get("/:id", protect, getOrderById);

export default router;
