const mongoose = require('mongoose');
const Task = require('../models/taskSchema');

const rateCompletedTask = async (taskId, rating) => {
  try {
   
    if (!taskId || !mongoose.Types.ObjectId.isValid(taskId)) {
      return { success: false, message: 'Invalid taskId' };
    }

    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { rating: rating },
      { new: true }
    );

    if (!updatedTask) {
      return { success: false, message: 'Task not found' };
    }

    return { success: true, message: 'Rating updated successfully', updatedTask };
  } catch (error) {
    console.error('Error rating completed task:', error);
    return { success: false, message: 'Internal server error' };
  }
};

module.exports = { rateCompletedTask };
