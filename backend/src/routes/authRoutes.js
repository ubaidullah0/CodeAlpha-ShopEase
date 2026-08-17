const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const rateLimit = require('express-rate-limit');

const authLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour window
    max: 10, // start blocking after 10 requests
    message: { error: 'Too many login/register attempts from this IP, please try again after an hour' }
});

router.post('/register', authLimiter, register);
router.post('/login', authLimiter, login);

module.exports = router;
