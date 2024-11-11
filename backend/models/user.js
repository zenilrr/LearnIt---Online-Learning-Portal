const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  accountType: {type: String,reuired: true},
  active: {type: Boolean,default: true,},
approved: {type: Boolean,default: true,}

});

const User = mongoose.model('User', userSchema);
module.exports = User;
//this is done for connection perpose
//this user model is as per the frontend demo made will be changed after
