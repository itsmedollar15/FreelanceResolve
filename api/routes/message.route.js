import express from "express";
import {
  createMessage,
  getMessages
} from "../controllers/message.controller.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

// Create a new message (requires authentication)
router.post("/", verifyToken, createMessage);

// Get messages for a specific conversation (requires authentication)
router.get("/:id", verifyToken, getMessages);

export default router;
