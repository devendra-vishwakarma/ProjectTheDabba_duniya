const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6 // You can adjust this based on your security requirements
  },
  email:{
    type:String,
    requierd:true,
    trim:true
  }
});

// Create the User model from the schema
const User = mongoose.model('User', userSchema);

module.exports = User;
