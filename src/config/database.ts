export {};

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/salon', {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`MongoDB Connected`);
  } catch (err) {
    console.error("MongoDB connection error:", err);
    throw err;
  }
};

mongoose.connection.on('disconnected', () => console.log('MongoDB disconnected'));
mongoose.connection.on('reconnected', () => console.log('MongoDB reconnected'));

module.exports = { connectDB };