// backend/routes/userRoutes.js

const express = require('express');
const router = express.Router();
const {getUserById} = require('../controllers/userController');
const auth = require('../middleware/authMiddleware');
// Route to fetch user data by ID
router.get('/', auth, getUserById);

module.exports = router;
