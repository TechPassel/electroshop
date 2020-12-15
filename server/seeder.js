import mongoose from 'mongoose';
import users from './data/user.js';
import products from './data/products.js';
import dotenv from 'dotenv';
import User from './models/userModel.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);
    const adminUserId = createdUsers[0]._id;

    const finalProducts = products.map((p) => {
      return { ...p, user: adminUserId };
    });
    await Product.insertMany(finalProducts);
    console.log('Data imported successfully.');
    process.exit();
  } catch (error) {
    console.error(`Error : ${error}`);
    process.exit(1);
  }
};

const clearAllData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log('Data destroyed successfully.');
    process.exit();
  } catch (error) {
    console.error(`Error : ${error}`);
    process.exit(1);
  }
};

if (process.argv[2] == '-d') {
  clearAllData();
} else {
  importData();
}
