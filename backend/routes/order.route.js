import express from "express";
import { createOrder, getOrders, getOrder, updateOrderStatus } from "../controllers/order.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { permit } from "../middleware/role.middleware.js";

const router = express.Router();

router.post("/", protect, createOrder);
router.get("/", protect, getOrders);
router.get("/:id", protect, getOrder);
router.patch("/:id/status", protect, permit("admin", "delivery", "warehouse"), updateOrderStatus);

export default router;
