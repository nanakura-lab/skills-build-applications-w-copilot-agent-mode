import mongoose, { Schema, model, Model } from 'mongoose';

const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, default: 'member' },
  fitnessGoal: { type: String, default: 'Build consistency' },
  createdAt: { type: Date, default: Date.now },
});

const teamSchema = new Schema({
  name: { type: String, required: true },
  sport: { type: String, default: 'fitness' },
  members: [{ type: String }],
  captain: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const activitySchema = new Schema({
  userName: { type: String, required: true },
  type: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  calories: { type: Number, default: 0 },
  date: { type: Date, default: Date.now },
});

const leaderboardSchema = new Schema({
  name: { type: String, required: true },
  points: { type: Number, required: true },
  team: { type: String, default: 'Independent' },
  rank: { type: Number, required: true },
});

const workoutSchema = new Schema({
  title: { type: String, required: true },
  focus: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  level: { type: String, default: 'beginner' },
});

export const User = model('User', userSchema);
export const Team = model('Team', teamSchema);
export const Activity = model('Activity', activitySchema);
export const LeaderboardEntry = model('Leaderboard', leaderboardSchema);
export const Workout = model('Workout', workoutSchema);

export async function connectToDatabase() {
  if (mongoose.connection.readyState >= 1) {
    return mongoose.connection;
  }

  await mongoose.connect(mongoUri, {
    dbName: 'octofit_db',
  });

  return mongoose.connection;
}
