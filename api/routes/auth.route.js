import express from 'express';
import { register, login, logout } from '../controllers/auth.controller.js';

const router = express.Router();

// Register a new user
router.post('/register', register);

// Login a user
router.post('/login', login);

// Logout a user
router.post('/logout', logout);

export default router;
