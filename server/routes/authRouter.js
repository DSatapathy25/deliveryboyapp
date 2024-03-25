
const express = require('express');

const authController = require('../controllers/authController');
// const authenticateUser = require('../middleware/authMiddleware');
const userController = require('../controllers/userController')

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

// router.get('/logout',authController.logout)

console.log("routerrrrrrrrrrrr");

router.post('/profile/logout', authController.logout);
module.exports = router;
