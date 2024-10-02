import express from 'express';
import { verifyToken } from "../middleware/jwt.js";
import {
  createReview,
  getReviews,
  deleteReview,
} from "../controllers/review.controller.js";

const router = express.Router();

// Create a new review (requires authentication)
router.post("/", verifyToken, createReview);

// Get reviews for a specific gig (publicly accessible)
router.get("/:gigId", getReviews);

// Delete a review by ID (requires authentication)
router.delete("/:id", verifyToken, deleteReview);

export default router;
