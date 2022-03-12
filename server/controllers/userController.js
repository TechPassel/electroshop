import User from '../models/userModel.js';
import generateToken from '../utils/tokenUtil.js';
import asyncHandler from 'express-async-handler';

const authenticateUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

const getUserDetails = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const user = await User.findById(userId);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.body.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if(req.body.password){
      console.log(req.body.password, "password");
      user.password = req.body.password;
    }
    
    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });

  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

export { authenticateUser, registerUser, getUserDetails, updateUser };
