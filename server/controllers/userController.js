
const User = require('../models/userSchema');
const Task = require('../models/taskSchema');
const connectDB = require('../db/connectDB');

const profile = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.status(200).json(user);
  } catch (error) {
    console.error('Error retrieving user profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const addTask = async (req, res) => {
  try {
    const taskData = req.body;
    const task = await Task.create(taskData);
    res.json({ message: "Task added successfully", data: task });
  } catch (error) {
    console.error("Error adding new task: ", error.message);
    res.status(500).send("Error adding the task");
  }
};

const fetchTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).send("Server Error");
  }
};

let acceptedTasks = [];
let completedTasks = [];

const acceptTask = async (req, res) => {
  const { taskId } = req.params;
  try {
    const task = await Task.findOne({ task_id: taskId });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    task.status = "accepted";
    await task.save();
    acceptedTasks.push(task);
    res.json(task);
  } catch (error) {
    console.error("Error accepting task:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const completeTask = async (req, res) => {
  const { taskId } = req.params;
  const { rating } = req.body;
  try {
    const taskIndex = acceptedTasks.findIndex(task => task.task_id === taskId);
    if (taskIndex === -1) {
      return res.status(404).json({ message: "Task not found" });
    }

    const completedTask = acceptedTasks.splice(taskIndex, 1)[0];

   
    completedTask.status = "completed";
    completedTask.rating = rating;
    await completedTask.save()
    completedTasks.push(completedTask);
   
    
    res.json(completedTask);
  } catch (error) {
    console.error("Error completing task:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const cancelTask = async (req, res) => {
  const { taskId } = req.params;
  try {
    const taskIndex = acceptedTasks.findIndex(task => task.task_id === taskId);
    if (taskIndex === -1) {
      return res.status(404).json({ message: "Task not found" });
    }

    const canceledTask = acceptedTasks.splice(taskIndex, 1)[0];
    canceledTask.status = "canceled";
    completedTasks.push(canceledTask);

    await Task.findByIdAndUpdate(canceledTask._id, { status: "canceled" });

    res.json(canceledTask);
  } catch (error) {
    console.error("Error canceling task:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const fetchCompletedTasks = (req, res) => {
  res.json(completedTasks);
};

const fetchAcceptedTasks = (req, res) => {
  res.json(acceptedTasks);
};





const fetchAllTasks = async (req, res) => {
  try {
   
    const tasks = await Task.find({});
    res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};



module.exports = { 
  fetchTasks, 
  acceptTask, 
  completeTask, 
  cancelTask, 
  fetchCompletedTasks,
  fetchAcceptedTasks,
  profile,
  addTask,
  fetchAllTasks
};
