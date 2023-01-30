const User = require('../models/userModel');
const bcrypt = require("bcryptjs");

exports.create = async (req, res) => {
  try {
    //generate new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    //create new user
    const newUser = new User({
      name: req.body.username,
      password: hashedPassword,
    });

    //save user and respond
    const user = await newUser.save();
    res.status(200).json({
      message:"User added successfully"
    });
  } catch (err) {
    res.status(500).json(err)
  }
}

exports.readSingle = async (req, res) => {
    const { username } = req.params
    try {
      let user = await User.findOne({name: username})
      res.status(200).json(
        user
      );
    }
    catch (error) {
      res.status(400).json(
        error
      );    
    }
}
exports.readUserFollower = async (req, res) =>{
  const { username } = req.params
  try {
    let user = await User.findOne({name: username}).select("follower");
    res.status(200).json(
      user
    );
  }
  catch (error) {
    res.status(400).json(
      error
    );    
  }
}

exports.readUserFollowing = async (req, res) =>{
  const { username } = req.params
  try {
    let user = await User.findOne({name: username}).select("following");
    res.status(200).json(
      user
    );
  }
  catch (error) {
    res.status(400).json(
      error
    );    
  }
}
exports.userFollow = async (req, res) =>{
  const { username } = req.params
  try {
    let user1 = await User.findOneAndUpdate({name: username},{$push: {following: {followingName: req.body.username}}})
    let user2 = await User.findOneAndUpdate({name: req.body.username},{$push: {follower: {followerName: username}}})

    res.status(200).json(
      `You started following ${req.body.username}`
    );
  }
  catch (error) {
    res.status(400).json(
      error
    );    
  }
}
exports.userUnfollow = async (req, res) =>{
  const { username } = req.params
  try {
    let user = await User.findOneAndUpdate({name: username},{$pull: {following: {followingName: req.body.username}}});
    let user2 = await User.findOneAndUpdate({name: req.body.username},{$pull: {follower: {followerName: username}}})
    res.status(200).json(
      `You unfollowed ${req.body.username}`
    );
  }
  catch (error) {
    res.status(400).json(
      error
    );    
  }
}