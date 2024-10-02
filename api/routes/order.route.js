import express from "express";
import { verifyToken } from "../middleware/jwt.js";
import { getOrders, intent, confirm } from "../controllers/order.controller.js";

const router = express.Router();

// Get all orders for the authenticated user
router.get("/", verifyToken, getOrders);

// Create a payment intent for a specific gig (requires authentication)
router.post("/create-payment-intent/:id", verifyToken, intent);

// Confirm an order after payment (requires authentication)
router.put("/", verifyToken, confirm);

export default router;
