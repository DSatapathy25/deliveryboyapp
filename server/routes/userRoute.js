


const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateUser = require('../middleware/authMiddleware');
const Task = require('../models/taskSchema')
// Route to fetch today's tasks
router.get('/tasks', authenticateUser, userController.fetchTasks);

// Route to fetch user profile
router.get('/profile', authenticateUser, userController.profile);

// Route to accept a task
router.post('/tasks/:taskId/accept', authenticateUser, userController.acceptTask);

// Route to fetch accepted tasks
router.get('/accepted-tasks', authenticateUser, userController.fetchAcceptedTasks);

// Route to cancel an accepted task
router.put('/tasks/:taskId/cancel', authenticateUser, userController.cancelTask);

// Route to complete an accepted task
router.put('/tasks/:taskId/complete', authenticateUser, userController.completeTask);

// Route to add a new task
router.post('/tasks', userController.addTask);

// Route to fetch paginated tasks
router.get('/paginated-tasks', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    try {
        const tasks = await Task.find({})
            .skip(skip)
            .limit(limit)
            .exec();

        res.json(tasks);
    } catch (error) {
        console.error('Error fetching paginated tasks:', error);
        res.status(500).send('Server Error');
    }
});

router.get('/tasks/all', authenticateUser, userController.fetchAllTasks);

module.exports = router;
