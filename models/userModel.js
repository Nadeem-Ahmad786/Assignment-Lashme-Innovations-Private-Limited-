const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  password:{
    type:String,
    required: true,
  }, 
  follower:[{
    followerName: String
  }],
  following: [{
    followingName: String
  }],
}, {timestamps: true});

const User = mongoose.model("User", UserSchema);

module.exports = User;