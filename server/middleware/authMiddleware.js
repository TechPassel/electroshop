import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';

const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decode = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decode.id).select({
        password: 0,
      });
    } catch (error) {
      console.log(error, 'error');
      // res.send(401)
      throw new Error('Some error occured.Please try again');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
  next();
});

export { protect };
