const express = require('express');
const router = express.Router();
const { registerUser, loginUser, checkSession, logoutUser } = require('../controllers/authController');


// Register and login routes with CSRF protection
//console.log("from routes")
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/check', checkSession);
router.post('/logout', logoutUser);

module.exports = router;
