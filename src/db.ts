import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const MONGO_URL = process.env.MONGO_URL || '';
let isConnected = false;

export const connectDB = async () => {
  if (!isConnected) {
    await mongoose.connect(MONGO_URL);
    isConnected = true;
    console.log('Database connected successfully');
  }
  return mongoose;
};

