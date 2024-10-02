import express from "express";
import {
  createConversation,
  getConversations,
  getSingleConversation,
  updateConversation,
} from "../controllers/conversation.controller.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

// Get all conversations for the authenticated user
router.get("/", verifyToken, getConversations);

// Create a new conversation
router.post("/", verifyToken, createConversation);

// Get a single conversation by ID
router.get("/single/:id", verifyToken, getSingleConversation);

// Update a conversation by ID
router.put("/:id", verifyToken, updateConversation);

export default router;
