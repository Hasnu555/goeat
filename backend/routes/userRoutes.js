
const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { registerUser, loginUser } = require('../controllers/authController');

router.post(
  '/register',
  [
    body('email').isEmail(),
    body('password').isLength({ min: 7 }),
  ],
  registerUser
);

router.post(
  '/login',
  [
    body('email').isEmail(),
    body('password').isLength({ min: 7 }),
  ],
  loginUser
);

module.exports = router;
