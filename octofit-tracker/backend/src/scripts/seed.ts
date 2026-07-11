import { connectToDatabase, User, Team, Activity, LeaderboardEntry, Workout } from '../models';

// Seed the octofit_db database with test data
async function seedDatabase() {
  try {
    await connectToDatabase();
    console.log('Connected to MongoDB for seeding');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.insertMany([
      {
        name: 'Ava Patel',
        email: 'ava@example.com',
        role: 'captain',
        fitnessGoal: 'Improve endurance',
      },
      {
        name: 'Noah Kim',
        email: 'noah@example.com',
        role: 'member',
        fitnessGoal: 'Build strength',
      },
      {
        name: 'Mina Chen',
        email: 'mina@example.com',
        role: 'member',
        fitnessGoal: 'Train for a 10K',
      },
    ]);

    await Team.insertMany([
      {
        name: 'Velocity',
        sport: 'running',
        members: users.slice(0, 2).map((user) => user.name),
        captain: 'Ava Patel',
      },
      {
        name: 'Summit',
        sport: 'cross-training',
        members: [users[2].name],
        captain: 'Mina Chen',
      },
    ]);

    await Activity.insertMany([
      {
        userName: 'Ava Patel',
        type: 'run',
        durationMinutes: 35,
        calories: 420,
      },
      {
        userName: 'Noah Kim',
        type: 'strength',
        durationMinutes: 50,
        calories: 310,
      },
      {
        userName: 'Mina Chen',
        type: 'cycle',
        durationMinutes: 45,
        calories: 500,
      },
    ]);

    await LeaderboardEntry.insertMany([
      { name: 'Ava Patel', points: 1400, team: 'Velocity', rank: 1 },
      { name: 'Noah Kim', points: 1260, team: 'Velocity', rank: 2 },
      { name: 'Mina Chen', points: 1180, team: 'Summit', rank: 3 },
    ]);

    await Workout.insertMany([
      {
        title: 'Upper Body Strength',
        focus: 'strength',
        durationMinutes: 40,
        level: 'intermediate',
      },
      {
        title: 'HIIT Cardio',
        focus: 'cardio',
        durationMinutes: 25,
        level: 'advanced',
      },
      {
        title: 'Mobility Flow',
        focus: 'recovery',
        durationMinutes: 20,
        level: 'beginner',
      },
    ]);

    console.log('Seed completed successfully');
  } catch (error) {
    console.error('Seed failed', error);
    process.exitCode = 1;
  } finally {
    await import('mongoose').then((mongoose) => mongoose.default.connection.close());
  }
}

seedDatabase();
