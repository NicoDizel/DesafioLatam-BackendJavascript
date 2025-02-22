import { Router } from 'express';
const router = Router();
import { register, login } from "../controllers/auth.controller.js";

// Endpoint to register
router.post('/register', register);

// Endpoint to login
router.post('/login', login);

export default router;