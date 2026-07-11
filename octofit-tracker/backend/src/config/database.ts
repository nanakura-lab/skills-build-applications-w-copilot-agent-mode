import mongoose from 'mongoose';

const octofit_db = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

export async function connectToDatabase() {
  try {
    await mongoose.connect(octofit_db);
    console.log('Connected to MongoDB database: octofit_db');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    throw error;
  }
}

export default {
  octofit_db,
  connectToDatabase,
};
