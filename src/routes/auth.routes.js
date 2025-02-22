const { Router } = require('express');
const router = Router();
const { register, login } = require("../controllers/auth.controller.js")

// Endpoint to register
router.post('/register', register);

// Endpoint to login
router.post('/login', login);

module.exports = router;