import express from 'express';
import { deleteUser, getUser } from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

// Delete a user by ID (requires authentication)
router.delete("/:id", verifyToken, deleteUser);

// Get a user by ID (requires authentication)
router.get("/:id", verifyToken, getUser);

export default router;
