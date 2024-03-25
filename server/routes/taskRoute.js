const express = require('express');
const router = express.Router(); 
const taskController = require('../controllers/taskController');
const authenticateUser = require('../middleware/authMiddleware');


router.post('/tasks/:taskId/complete/rate', authenticateUser,taskController.rateCompletedTask)

module.exports = router;
