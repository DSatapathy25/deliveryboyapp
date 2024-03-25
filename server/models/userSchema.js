const mongoose = require("mongoose");





const { Schema, model ,models} = mongoose;


const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      unique: true,
      required: true
    },
    password: {
      type: String,
      minLength: 1,
      required: true
    }
  },
  { timestamps: true }
);



const User =models.User || model('User', UserSchema);

module.exports = User;
