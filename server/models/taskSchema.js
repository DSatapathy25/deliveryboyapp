const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  
  task_id: String,
  pickup_address: String,
  delivery_address: String,
  time_slot: String,
  status: {
    type: String,
    enum: ['pending', 'accepted', 'completed', 'canceled'],
    default: 'pending'
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: null
  }
});

module.exports = mongoose.model('Task', taskSchema);
