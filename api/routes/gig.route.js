import express from "express";
import {
  createGig,
  deleteGig,
  getGig,
  getGigs
} from "../controllers/gig.controller.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

// Create a new gig (requires authentication)
router.post("/", verifyToken, createGig);

// Delete a gig by ID (requires authentication)
router.delete("/:id", verifyToken, deleteGig);

// Get a single gig by ID (publicly accessible)
router.get("/single/:id", getGig);

// Get all gigs (publicly accessible)
router.get("/", getGigs);

export default router;
