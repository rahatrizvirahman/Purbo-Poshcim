const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String
  },
  password: {
    type: String
  },
  verified:{
    type: Boolean,
    default: true
  },
  photoUrl: String,
  created: { 
    type: Date, 
    default: Date.now
  }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
